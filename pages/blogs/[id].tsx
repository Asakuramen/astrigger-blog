import Head from "next/head";
import Header from "components/Header";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { getAllBlogsId, getBlogContentData } from "lib/blogRead";

interface Props {
  blogContent: {
    id: string;
    title: string;
    date: string;
    thumbnail: string;
    tags: string;
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

      <div className="max-w-screen-md mx-auto px-6 py-6">
        <article>
          <h1>{blogContent.title}</h1>
          <small className="mb-4">{blogContent.date}</small>
          <div
            className="markdown"
            dangerouslySetInnerHTML={{ __html: blogContent.blogContentHtml }}
          />
        </article>
      </div>
    </>
  );
};

export default Blog;
