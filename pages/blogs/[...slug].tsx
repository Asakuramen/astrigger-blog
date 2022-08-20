import Head from "next/head";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import "zenn-content-css";
import Header2 from "components/Header/Header2";
import { getTagName, tagList } from "../../contents/tags";
import BlogList from "components/BlogList/BlogList";
import SidenavTags from "components/SidenavTags/SidenavTags";
import Footer from "components/Footer/Footer";
import { ParsedUrlQuery } from "querystring";
import { ContentMetadata, getContentMetadatasByTag } from "lib/microcms/api";

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
    "blog",
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
        <title>{`ブログ記事 ${getTagName(tag)}`}</title>
        <meta
          name="description"
          content={`新しい技術のキャッチアップ情報や、エンジニアに役立つ情報をお届けします。`}
        />
      </Head>
      <Header2 sticky={false} />

      <div
        className="max-w-screen-xl mx-auto px-3 sm:px-6 py-6 min-h-[calc(100vh_-_6rem)]"
        id="article"
      >
        <div className="flex flex-row">
          <div className="w-auto md:w-[calc(100%_-_18rem)] mr-3 ">
            <BlogList blogMetaDatas={contentMetaDatas} showThumbnail={true}></BlogList>
          </div>
          <div className="hidden md:block w-72 ml-3">
            <div className="flex flex-col sticky top-6">
              <div className="p-4 shadow-md rounded-md mb-6 bg-white ">
                <SidenavTags />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-16"></div>
      <Footer />
    </>
  );
};

export default Blog;
