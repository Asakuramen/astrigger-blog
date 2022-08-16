import Head from "next/head";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { BlogMetaData, getBlogMetaDatasByTag } from "lib/getBlogContent";
import "zenn-content-css";
import Header2 from "components/Header/Header2";
import tagList from "../../contents/tags";
import BlogList from "components/BlogList/BlogList";
import SidenavTags from "components/SidenavTags/SidenavTags";

/**
 * 生成する全てのブログ記事の静的ページのパスを生成し、getStaticPropsに渡す
 */
export const getStaticPaths: GetStaticPaths = async () => {
  // 全てのtag名を取得する

  tagList;

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
 * 静的ページ生成に必要なデータを生成し、コンポーネントにpropsとして渡す
 */
export const getStaticProps: GetStaticProps = async (context: any) => {
  // 全てのブログ記事から、tag名と一致するブログ記事のMetaDataを取得する
  const tag = context.params.slug[0];
  console.log(tag);
  const blogMetaDatas = getBlogMetaDatasByTag(tag);

  return {
    props: { blogMetaDatas: blogMetaDatas },
  };
};

// ----------------------------------------------------------
// ----------------------------------------------------------

type Props = {
  blogMetaDatas: BlogMetaData[];
};

/**
 * １ブログ記事のコンポーネント
 */
const Blog: NextPage<Props> = ({ blogMetaDatas }) => {
  return (
    <>
      <Head>
        <title>{`AsTrigger - Blog`}</title>
        <meta name="description" content="blog" />
      </Head>
      <Header2 sticky={false} />

      <div className="max-w-screen-xl mx-auto px-3 sm:px-6 py-6" id="article">
        <div className="flex flex-row">
          <div className="w-auto md:w-[calc(100%_-_18rem)] mr-3 ">
            <BlogList allBlogsMetaData={blogMetaDatas} showThumbnail={true}></BlogList>
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
    </>
  );
};

export default Blog;
