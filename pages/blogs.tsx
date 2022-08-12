import { NextPage } from "next";
import { getBlogsMetaData } from "lib/getBlogContent";
import Head from "next/head";
import Header from "components/Header/Header";
import { BlogMetaData } from "lib/getBlogContent";
import BlogList from "components/BlogList/BlogList";
import Pagination from "components/Pagination/Pagination";
import path from "path";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// ServerSideGeneration
export async function getStaticProps() {
  //外部からデータを取得
  const allBlogsMetaData = getBlogsMetaData(0, 12);

  return {
    props: {
      allBlogsMetaData, // コンポーネントに渡すデータ
    },
  };
}

type Props = {
  allBlogsMetaData: BlogMetaData[] | undefined;
};

const Blog: NextPage<Props> = ({ allBlogsMetaData }) => {
  // BlogsのDOM要素
  const [allBlogsMetaDataFilterd, setAllBlogsMetaDataFilterd] = useState<BlogMetaData[]>(
    []
  );

  // Paginationに必要な変数
  const directoryBlogs = path.join(process.cwd(), "/blogs");
  const [paginationState, setPaginationState] = useState({
    currentPage: 0,
    totalPage: 0,
    currentUrl: "http://localhost:3000/blogs",
  }); // [currentPage, totalPage]

  //1ページに表示するコンテンツ数
  const SHOW_CONTENTS_NUMBER = 4;

  // URL形式 /blogs?tag=react&page=1
  const router = useRouter();
  const urlQuery = router.query;

  /**
   * URLクエリパラメータを取得し、表示するcontentsをフィルタ処理する
   * tag : 指定のタグのcontentのみreturnする、指定なしの場合は全てのcontentをreturnする
   * page : 表示するページ番号を指定、ページネーション処理
   */
  useEffect(() => {
    if (router.isReady) {
      //クエリパラメータtagのバリデーション、指定なし(undefined)
      let tag: string | string[] = [];
      if (urlQuery.tag) {
        tag = urlQuery.tag;
      }

      //クエリパラメータpageのバリデーション、指定なし(undefined) || 数値でない(isNaN)
      let page = Number(urlQuery.page);
      if (!page || isNaN(page)) {
        page = 0;
      }

      console.log("tag : " + tag);
      console.log("page : " + page);

      // 正常系
      if (allBlogsMetaData) {
        let temp_allBlogsMetaData = Array.from(allBlogsMetaData);
        // タグによる記事フィルター、指定なしの場合はフィルタリングしない
        if (tag.length !== 0) {
          temp_allBlogsMetaData = allBlogsMetaData.filter((blogMetaData) => {
            return blogMetaData.topics.some((topic) => {
              return topic.toLowerCase() === tag; //URLのクエリパラメータに大文字を使用しないため
            });
          });
        }
        // ページネーションによる記事フィルター
        const startIndex = page * SHOW_CONTENTS_NUMBER;
        const endIndex = startIndex + SHOW_CONTENTS_NUMBER;
        temp_allBlogsMetaData = temp_allBlogsMetaData.slice(startIndex, endIndex);

        setAllBlogsMetaDataFilterd(temp_allBlogsMetaData);
        console.log(temp_allBlogsMetaData);

        // Paginationのボタン表示を更新
        let currentUrl = "";
        if (typeof window !== "undefined") {
          currentUrl = location.href;
        } else {
          currentUrl = "";
        }
        setPaginationState({
          currentPage: page,
          totalPage: temp_allBlogsMetaData.length,
          currentUrl: currentUrl,
        });
      }
      // 異常系　１つもコンテンツを取得できなかった場合
      else {
        setAllBlogsMetaDataFilterd([]);
      }
    }
  }, [urlQuery, router]);

  return (
    <>
      <Head>
        <title>asTriggerのブログ</title>
        <meta name="description" content="blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header pageKind="blog" stickey={false} />

      <div className="max-w-screen-lg mx-auto px-6 py-6">
        <h1 className="p-4 mt-4 mb-10 mx-64 text-center font-extrabold text-transparent text-7xl bg-clip-text bg-gradient-to-l from-pink-500 via-red-500 to-yellow-500">
          Blog
        </h1>

        <div className="mb-10">
          <BlogList
            allBlogsMetaData={allBlogsMetaDataFilterd}
            showThumbnail={true}
          ></BlogList>
        </div>

        <div>
          <Pagination
            currentPage={paginationState.currentPage}
            totalPage={paginationState.totalPage}
            currentUrl={paginationState.currentUrl}
          />
        </div>
      </div>
    </>
  );
};

export default Blog;
