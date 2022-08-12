import { NextPage } from "next";
import { getBlogsMetaData } from "lib/getBlogContent";
import Head from "next/head";
import Header from "components/Header/Header";
import { BlogMetaData } from "lib/getBlogContent";
import BlogList from "components/BlogList/BlogList";

// ServerSideGeneration
export async function getStaticProps() {
  //外部からデータを取得
  const allBlogsMetaData = getBlogsMetaData(0, 8);

  return {
    props: {
      allBlogsMetaData, // コンポーネントに渡すデータ
    },
  };
}

type Props = {
  allBlogsMetaData: BlogMetaData[] | undefined;
};

const Blog: NextPage<Props> = ({ allBlogsMetaData }) => {
  return (
    <>
      <Head>
        <title>asTriggerのブログ</title>
        <meta name="description" content="blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header pageKind="blog" stickey={false} />

      <div className="max-w-screen-lg mx-auto px-6 py-6">
        <h1 className="p-4 mt-4 mb-10 mx-64 text-center font-extrabold text-transparent text-7xl bg-clip-text bg-gradient-to-l from-pink-500 via-red-500 to-yellow-500">
          Blog
        </h1>

        <BlogList allBlogsMetaData={allBlogsMetaData} showThumbnail={true}></BlogList>
      </div>
    </>
  );
};

export default Blog;
