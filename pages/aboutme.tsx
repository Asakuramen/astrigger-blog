import Head from "next/head";
import Header from "components/Header";

const aboutme = () => {
  return (
    <>
      <Head>
        <title>asTriggerのホームページ</title>
        <meta name="description" content="blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header pageKind="works" />
    </>
  );
};

export default aboutme;
