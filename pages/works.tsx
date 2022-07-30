import Head from "next/head";
import Header from "components/Header";

const works = () => {
  return (
    <>
      <Head>
        <title>asTriggerのポートフォリオ</title>
        <meta name="description" content="blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header pageKind="works" />
    </>
  );
};

export default works;
