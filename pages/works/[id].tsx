import styles from "./[id].module.css";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import "zenn-content-css";
import { JSDOM } from "jsdom";
import { getWorkContent, getWorksContentId, WorkContent } from "lib/getWorkContent";
import Header2 from "components/Header/Header2";
import Footer from "components/Footer/Footer";

/**
 * 生成する全てのブログ記事の静的ページのパスを生成し、getStaticPropsに渡す
 */
export const getStaticPaths: GetStaticPaths = async () => {
  // 全てのブログ記事(markdown)のファイル名を取得する
  const paths = getWorksContentId();
  return {
    paths,
    // fallback = falseの場合、pathに含まれないURLにアクセスした際に404ページを表示する
    // fallback = trueの場合、pathに含まれないURLに基づいた動的なページを生成できる
    fallback: false,
  };
};

// ----------------------------------------------------------
// ----------------------------------------------------------

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
  const content: WorkContent = await getWorkContent(context.params.id);

  // HTML(string)をHTML(DOM)に変換する
  const dom = new JSDOM(content.bodyHtml).window.document;

  // DOMから目次を検索し、{hタグレベル、タイトル名、リンク先}、を取得する
  const elements = dom.querySelectorAll<HTMLElement>("h1, h2");
  const tableOfContent: TableOfContent[] = [];
  elements.forEach((element) => {
    const level = element.tagName;
    const title = element.innerHTML.split("</a> ")[1];
    const href = "#" + element.id;
    const record = { level: level, title: title, href: href };
    tableOfContent.push(record);
  });

  return {
    props: { content: content, tableOfContent: tableOfContent },
  };
};

// ----------------------------------------------------------
// ----------------------------------------------------------

type Props = {
  content: WorkContent;
  tableOfContent: TableOfContent[];
};

/**
 * １つのWork記事表示のコンポーネント
 * @param content １つのWorkコンテンツ
 * @param tableOfContent １つのWorkコンテンツの目次情報
 */
const Work: NextPage<Props> = ({ content, tableOfContent }) => {
  return (
    <>
      <Head>
        <title>{content.title}</title>
        <meta name="description" content={content.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header2 sticky={false} />

      <div className="max-w-screen-lg mx-auto px-3 sm:px-6 py-6" id="article">
        <div className="flex flex-row">
          <div className="w-auto md:w-[calc(100%_-_18rem)] p-4 sm:p-8 mr-3 shadow-md rounded-xl bg-white">
            <small className="text-gray-500">投稿日 : {content.published_at}</small>
            <h1 className="text-3xl font-bold my-3">{content.title}</h1>
            {content.topics.map((topics) => {
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
              dangerouslySetInnerHTML={{ __html: content.bodyHtml }}
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

      <Footer />
    </>
  );
};

export default Work;
