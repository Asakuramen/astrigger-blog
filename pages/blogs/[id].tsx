import Head from "next/head";
import Header from "components/Header";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { getAllBlogsId, getBlogContentData } from "lib/blogRead";
import "zenn-content-css";
import { useEffect } from "react";

interface Props {
  blogContent: {
    id: string;
    title: string;
    topics: string[];
    published_at: string;
    thumbnail: string;
    blogContentHtml: string;
  };
}

/**
 * 生成する全てのブログ記事の静的ページのパスを生成し、getStaticPropsに渡す
 */
export const getStaticPaths: GetStaticPaths = async () => {
  // 全てのブログ記事(markdown)のファイル名を取得する
  const paths = getAllBlogsId();
  return {
    paths,
    // fallback = falseの場合、pathに含まれないURLにアクセスした際に404ページを表示する
    // fallback = trueの場合、pathに含まれないURLに基づいた動的なページを生成できる
    fallback: false,
  };
};

/**
 * 静的ページ生成に必要なデータを生成し、コンポーネントにpropsとして渡す
 */
export const getStaticProps: GetStaticProps = async (context: any) => {
  const blogContent = await getBlogContentData(context.params.id);
  return {
    props: { blogContent },
  };
};

/**
 * １ブログ記事のコンポーネント
 */
const Blog: NextPage<Props> = ({ blogContent }) => {
  return (
    <>
      <Head>
        <title>asTriggerのブログ</title>
        <meta name="description" content="blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header pageKind="blogs" />

      <div className="max-w-screen-lg mx-auto px-6 py-6">
        <div className="flex flex-row">
          <div className="w-auto md:w-[calc(100%_-_18rem)] p-10 mr-3 shadow-md rounded-xl bg-white">
            <small className="text-gray-500">投稿日 : {blogContent.published_at}</small>
            <h1 className="text-3xl font-bold my-3">{blogContent.title}</h1>
            {blogContent.topics.map((topics) => {
              return (
                <span
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  key={topics}
                >
                  {`#${topics}`}
                </span>
              );
            })}
            <div
              className="znc mt-10"
              dangerouslySetInnerHTML={{ __html: blogContent.blogContentHtml }}
            />
          </div>
          <div className="hidden md:block w-72 ml-3">
            <div className="flex flex-col">
              <div className="p-4 shadow-md rounded-xl mb-6 bg-white">
                <p className="text-xl text-bold mb-4">目次</p>
                <ol>
                  <li className="list-disc list-inside text-gray-500 mb-1">
                    {blogContent.title}
                  </li>
                  <li className="list-disc list-inside text-gray-500 mb-1">
                    目次機能は開発中です
                  </li>
                </ol>
              </div>
              <div className="p-4 shadow-md rounded-xl mb-6 bg-white">
                <p className="text-xl text-bold mb-4">最近の記事</p>
                <ol>
                  <li className="list-disc list-inside text-gray-500 mb-1">
                    最近の記事表示機能は開発中です
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
