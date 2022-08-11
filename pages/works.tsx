import { NextPage } from "next";
import { getBlogsMetaData } from "lib/getBlogContent";
import Head from "next/head";
import Header from "components/Header/Header";
import { BlogMetaData } from "lib/getBlogContent";
import BlogList from "components/BlogList/BlogList";
import { getWorksMetaData, WorkContentMetadata } from "lib/getWorkContent";
import WorkList from "components/WorkList/WorkList";

// ServerSideGeneration
export async function getStaticProps() {
  //外部からデータを取得
  const allWorkContentsMetaData = getWorksMetaData(0, 12);

  return {
    props: {
      allWorkContentsMetaData, // コンポーネントに渡すデータ
    },
  };
}

type Props = {
  allWorkContentsMetaData: WorkContentMetadata[] | undefined;
};

const Blog: NextPage<Props> = ({ allWorkContentsMetaData }) => {
  return (
    <>
      <Head>
        <title>asTriggerのブログ</title>
        <meta name="description" content="works" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header pageKind="works" stickey={false} />

      <div className="max-w-screen-lg mx-auto px-6 py-6">
        <h1 className="p-4 mt-4 mb-10 mx-64 text-center font-extrabold text-transparent text-7xl bg-clip-text bg-gradient-to-l from-pink-500 via-red-500 to-yellow-500">
          Works
        </h1>

        <WorkList allWorkContentsMetaData={allWorkContentsMetaData}></WorkList>
      </div>
    </>
  );
};

export default Blog;
