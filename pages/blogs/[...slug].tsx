import Head from "next/head";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import "zenn-content-css";
import Header2 from "components/organisms/Header/Header2";
import { getTagName, tagList } from "../../lib/tags";
import BlogList from "components/organisms/BlogList/BlogList";
import SidenavTags from "components/organisms/SidenavTags/SidenavTags";
import Footer from "components/organisms/Footer/Footer";
import { ParsedUrlQuery } from "querystring";
import { ContentMetadata, getContentMetadatasByTag } from "lib/microcms/api";
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

  let tagName = getTagName(tag);
  if (tagName === "全ての記事") {
    tagName = "全て";
  }

  return (
    <>
      <Head>
        <title>{`${tagName} の記事一覧`}</title>
        <meta
          name="description"
          content={`フロントエンド、バックエンド、ハードウェア開発に関する、エンジニアに役立つ情報をお届けします。`}
        />
      </Head>
      <Header2 sticky={false} />

      <div
        className="max-w-screen-xl mx-auto px-3 sm:px-6 py-6 min-h-[calc(100vh_-_6rem)]"
        id="article"
      >
        <div className="h-10" />
        <div className="flex flex-row">
          <div className="w-auto md:w-[calc(100%_-_18rem)] mr-3 ">
            <H1anchor>{tagName}の記事一覧</H1anchor>
            <div className="pb-4 border-b-2 border-gray-300"></div>
            <div className="h-10" />

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
