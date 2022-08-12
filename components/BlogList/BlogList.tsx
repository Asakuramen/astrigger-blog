import { NextPage } from "next";
import Image from "next/image";
import { BlogMetaData } from "lib/getBlogContent";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  allBlogsMetaData: BlogMetaData[] | undefined;
  showThumbnail?: boolean;
};

const BlogList: NextPage<Props> = ({ allBlogsMetaData, showThumbnail }) => {
  // URL形式 /blogs?tag=react&page=1
  const router = useRouter();
  const urlQuery = router.query;
  // 表示するブログ一覧のタグフィルター
  const [tag, setTag] = useState<string | string[]>("");
  // 表示するブログ一覧のページ番号、ページネーション処理で使用する
  const [page, setPage] = useState(0);
  //
  const [allBlogsMetaDataFilterd, setAllBlogsMetaDataFilterd] = useState<BlogMetaData[]>(
    []
  );

  const SHOW_CONTENTS_NUMBER = 4; //1ページに表示するコンテンツ数
  /**
   * URLクエリパラメータを取得し、表示するcontentsをフィルタ処理する
   * tag : 指定のタグのcontentのみreturnする、指定なしの場合は全てのcontentをreturnする
   * page : 表示するページ番号を指定、ページネーション処理
   */
  useEffect(() => {
    if (router.isReady) {
      let tag: string | string[] = [];
      if (urlQuery.tag) {
        tag = urlQuery.tag;
      }

      let page = Number(urlQuery.page);
      if (page) {
        if (isNaN(page)) {
          page = 0;
        }
      } else {
      }

      const temp_page = Number(urlQuery.page);
      if (isNaN(temp_page)) {
        // console.log('Invalid URL query parameter "page"');
      } else {
        setPage(temp_page);
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
        console.log(temp_allBlogsMetaData);

        setAllBlogsMetaDataFilterd(temp_allBlogsMetaData);
      }
      // 異常系　１つもコンテンツを取得できなかった場合
      else {
        setAllBlogsMetaDataFilterd([]);
      }
    }
  }, [urlQuery, router]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {allBlogsMetaDataFilterd.length !== 0 ? (
        allBlogsMetaDataFilterd.map((blogMetaData: BlogMetaData, index) => {
          return (
            <div
              className="bg-gray-50 rounded overflow-hidden shadow-md hover:shadow-xl transition duration-500 hover:-translate-y-2"
              key={blogMetaData.id}
            >
              <Link href={`/blogs/${blogMetaData.id}`}>
                <a>
                  {showThumbnail && (
                    <div className="relative w-full h-48">
                      <Image
                        className="w-full"
                        src={blogMetaData.thumbnail}
                        alt="thumbnail"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}

                  <div className="px-6 py-4">
                    <p className="text-gray-400 text-sm">{blogMetaData.published_at}</p>
                    <div className="font-bold text-xl mt-1 mb-1">
                      {blogMetaData.title}
                    </div>
                  </div>
                  <div className="px-6 pb-4">
                    {blogMetaData.topics.map((topic) => {
                      return (
                        <span
                          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                          key={topic}
                        >
                          {`#${topic}`}
                        </span>
                      );
                    })}
                  </div>
                </a>
              </Link>
            </div>
          );
        })
      ) : (
        <div className="font-bold text-xl">
          指定条件を満たす記事は見つかりませんでした。
        </div>
      )}
    </div>
  );
};

export default BlogList;
