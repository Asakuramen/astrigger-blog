import styles from "./[id].module.css";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import "zenn-content-css";
import { JSDOM } from "jsdom";
import Header2 from "components/organisms/Header/Header2";
import Footer from "components/organisms/Footer/Footer";
import Badge from "components/molecules/Badge";
import { getTagName } from "contents/tags";
import { ParsedUrlQuery } from "querystring";
import { Content, getContentById, getContentsIds } from "lib/microcms/api";
import CommentForm from "components/organisms/CommentForm/Container";

interface Params extends ParsedUrlQuery {
  id: string;
}
/**
 * 生成する全てのブログ記事の静的ページのパスを生成し、getStaticPropsに渡す
 */
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  // 全てのブログ記事(markdown)のファイル名を取得する
  const ids = await getContentsIds("blog");
  const paths = ids.map((id) => {
    return {
      params: id,
    };
  });

  return {
    paths: paths,
    fallback: false, //pathに含まれないURLにアクセスした際に404ページを表示する
  };
};

// ----------------------------------------------------------
// ----------------------------------------------------------

type TableOfContent = {
  level: string;
  title: string;
  href: string;
};

type Props = {
  content: Content;
  tableOfContent: TableOfContent[];
};

/**
 * 静的ページ生成に必要なデータを生成し、コンポーネントにpropsとして渡す
 */
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  // ブログ記事markdownをHTML(string)に変換する
  const content: Content = await getContentById(context.params!.id);

  // HTML(string)をHTML(DOM)に変換する
  const domHtml = new JSDOM(content.body).window.document;

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
    props: { content: content, tableOfContent: tableOfContent },
  };
};

// ----------------------------------------------------------
// ----------------------------------------------------------

/**
 * １ブログ記事のコンポーネント
 */
const Blog: NextPage<Props> = (props) => {
  const { content, tableOfContent } = props;

  return (
    <>
      <Head>
        <title>{content.title}</title>
        <meta name="description" content={content.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header2 sticky={false} />

      <div
        className="max-w-screen-xl mx-auto px-3 sm:px-6 py-6 min-h-[calc(100vh_-_6rem)]"
        id="article"
      >
        <div className="flex flex-row">
          <div className="w-full md:w-[calc(100%_-_20rem)] mr-3">
            <div className="p-4 sm:p-8 shadow-md rounded-xl bg-white">
              <small className="text-gray-500">投稿日 : {content.revisedAt}</small>
              <h1 className="text-3xl font-bold my-3">{content.title}</h1>
              {content.tags.map((tag) => {
                return (
                  <div key={tag} className="inline-block">
                    <Badge>{getTagName(tag)}</Badge>
                  </div>
                );
              })}
              <div
                className="znc mt-10"
                dangerouslySetInnerHTML={{ __html: content.body }}
              />
            </div>
            <div className="h-10" />
            <CommentForm contentId={content.id} />
          </div>

          <div className="hidden md:block w-80 ml-3">
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

export default Blog;
