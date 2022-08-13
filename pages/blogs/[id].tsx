import styles from "./[id].module.css";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { getAllBlogsId, getBlogContentData } from "lib/getBlogContent";
import "zenn-content-css";
import { JSDOM } from "jsdom";
import Header2 from "components/Header/Header2";

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

// ----------------------------------------------------------
// ----------------------------------------------------------

type BlogData = {
  id: string;
  title: string;
  topics: string[];
  published_at: string;
  thumbnail: string;
  blogContentHtml: string;
};

type TableOfContent = {
  level: string;
  title: string;
  href: string;
};

/**
 * 静的ページ生成に必要なデータを生成し、コンポーネントにpropsとして渡す
 */
export const getStaticProps: GetStaticProps = async (context: any) => {
  // ブログ記事markdownをHTML(string)に変換する
  const blogData: BlogData = await getBlogContentData(context.params.id);

  // HTML(string)をHTML(DOM)に変換する
  const domHtml = new JSDOM(blogData.blogContentHtml).window.document;

  // DOMから目次を検索し、{hタグレベル、タイトル名、リンク先}、を取得する
  const elements = domHtml.querySelectorAll<HTMLElement>("h1, h2");
  const tableOfContent: TableOfContent[] = [];
  elements.forEach((element) => {
    const level = element.tagName;
    const title = element.innerHTML.split("</a> ")[1];
    const href = "#" + element.id;
    const record = { level: level, title: title, href: href };
    tableOfContent.push(record);
  });

  return {
    props: { blogData: blogData, tableOfContent: tableOfContent },
  };
};

// ----------------------------------------------------------
// ----------------------------------------------------------

type Props = {
  blogData: BlogData;
  tableOfContent: TableOfContent[];
};

/**
 * １ブログ記事のコンポーネント
 */
const Blog: NextPage<Props> = ({ blogData, tableOfContent }) => {
  return (
    <>
      <Head>
        <title>AsTrigger - Works - {blogData.title}</title>
        <meta name="description" content={blogData.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header2 sticky={false} />

      <div className="max-w-screen-lg mx-auto px-3 sm:px-6 py-6" id="article">
        <div className="flex flex-row">
          <div className="w-auto md:w-[calc(100%_-_18rem)] p-4 sm:p-8 mr-3 shadow-md rounded-xl bg-white">
            <small className="text-gray-500">投稿日 : {blogData.published_at}</small>
            <h1 className="text-3xl font-bold my-3">{blogData.title}</h1>
            {blogData.topics.map((topics) => {
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
              dangerouslySetInnerHTML={{ __html: blogData.blogContentHtml }}
            />
          </div>
          <div className="hidden md:block w-72 ml-3">
            <div className="flex flex-col sticky top-6">
              <div className="p-6 shadow-md rounded-xl mb-6 bg-white ">
                <p className="text-xl text-bold mb-4">目次</p>
                <ul className={`${styles.ul_h1} ${styles.ul_h2}`}>
                  {tableOfContent.map((anchor: TableOfContent) => {
                    if (anchor.level === "H1") {
                      return (
                        <li className={styles.li_h1} key={anchor.href}>
                          <a href={anchor.href}>{anchor.title}</a>
                        </li>
                      );
                    } else {
                      return (
                        <li className={styles.li_h2} key={anchor.href}>
                          <a href={anchor.href}>{anchor.title}</a>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
