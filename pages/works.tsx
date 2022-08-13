import { NextPage } from "next";
import Head from "next/head";
import { getWorksMetaData, WorkContentMetadata } from "lib/getWorkContent";
import WorkList from "components/WorkList/WorkList";
import Header2 from "components/Header/Header2";
import H1anchor from "components/UIparts/H1anchor";

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
        <title>AsTrigger - Works</title>
        <meta name="description" content="works" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header2 sticky={false} />

      <div className="max-w-screen-lg mx-auto px-3 py-3">
        <div className="h-10" />

        <div className="text-center">
          <H1anchor text="WORKS" />
        </div>

        <div className="h-10" />

        <WorkList allWorkContentsMetaData={allWorkContentsMetaData}></WorkList>
      </div>
    </>
  );
};

export default Blog;
