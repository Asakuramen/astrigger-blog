import Head from "next/head";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import "zenn-content-css";
import Header2 from "components/organisms/Header/Header2";
import { tagList } from "../../lib/tags";
import Footer from "components/organisms/Footer/Footer";
import { ParsedUrlQuery } from "querystring";
import { ContentMetadata, getContentMetadatasByTag } from "lib/microcms/api";
import WorkList from "components/organisms/WorkList/WorkList";
import H1anchor from "components/molecules/H1anchor";

interface Params extends ParsedUrlQuery {
  slug: string[];
}

/**
 * 生成する全てのブログ記事の静的ページのパスを生成し、getStaticPropsに渡す
 */
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  // 全てのtag名を取得する

  const paths = tagList.map((tag) => {
    return {
      params: {
        slug: [tag.path, "1"],
      },
    };
  });

  return {
    paths,
    // fallback = falseの場合、pathに含まれないURLにアクセスした際に404ページを表示する
    // fallback = trueの場合、pathに含まれないURLに基づいた動的なページを生成できる
    fallback: false,
  };
};

// ----------------------------------------------------------
// ----------------------------------------------------------

/**
 * コンポーネントに渡すPropsの型
 */
interface Props {
  contentMetaDatas: ContentMetadata[];
  tag: string;
}

/**
 * 静的ページ生成に必要なデータを生成し、コンポーネントにpropsとして渡す
 */
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  // 特定のtagを持つcontentをmicroCMSから取得して整形し、propsとしてコンポーネントに渡す
  const SHOW_CONTENT_NUMBER_PER_PAGE = 10;
  const tag: string = context.params!.slug[0];
  const contentMetaDatas = await getContentMetadatasByTag(
    "work", // contentType = work記事
    SHOW_CONTENT_NUMBER_PER_PAGE,
    tag
  );

  return {
    props: { contentMetaDatas: contentMetaDatas, tag: tag },
  };
};

// ----------------------------------------------------------
// ----------------------------------------------------------

/**
 * １ブログ記事のコンポーネント
 */
const Blog: NextPage<Props> = (props) => {
  const { contentMetaDatas, tag } = props;
  return (
    <>
      <Head>
        <title>Gourami Engineering - Works</title>
        <meta name="description" content="Gourami Engineering - Works" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header2 sticky={false} />

      <div className="max-w-screen-lg mx-auto px-3 py-3 min-h-[calc(100vh_-_6rem)]">
        <div className="h-10" />

        <div className="text-center">
          <H1anchor text="WORKS" />
        </div>

        <div className="h-10" />

        <WorkList workContentsMetaDatas={contentMetaDatas}></WorkList>
      </div>

      <Footer />
    </>
  );
};

export default Blog;
