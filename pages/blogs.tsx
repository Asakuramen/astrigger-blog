import { NextPage } from "next";
import { getBlogsMetaData } from "lib/getBlogContent";
import Head from "next/head";
import { BlogMetaData } from "lib/getBlogContent";
import BlogList from "components/BlogList/BlogList";
import Pagination from "components/Pagination/Pagination";
import path from "path";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header2 from "components/Header/Header2";
import H1anchor from "components/UIparts/H1anchor";
import Footer from "components/Footer/Footer";

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
        <title>Gourami Engineering - Blog</title>
        <meta name="description" content="blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header2 sticky={false} />

      <div className="max-w-screen-lg mx-auto px-3 py-3 min-h-[calc(100vh_-_6rem)]">
        <div className="h-10" />

        <div className="text-center">
          <H1anchor text="BLOG" />
        </div>

        <div className="h-10" />
        <div className="flex flex-row items-end">
          <H1anchor text="All Articles" />
          <div className="mr-0 ml-auto">{allBlogsMetaData!.length + " Articles"}</div>
        </div>

        <div className="h-6" />

        <BlogList
          allBlogsMetaData={allBlogsMetaDataFilterd}
          showThumbnail={true}
        ></BlogList>

        <div className="h-10" />

        <div>
          <Pagination
            currentPage={paginationState.currentPage}
            totalPage={paginationState.totalPage}
            currentUrl={paginationState.currentUrl}
          />
        </div>
      </div>

      <div className="h-16" />
      <Footer />
    </>
  );
};

export default Blog;
