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

      <h1 className="text-7xl text-bold mt-5 mb-10 text-center">About me</h1>
      <h1 className="text-7xl text-bold mt-5 mb-10 text-center">🕑Commig Soon...</h1>
    </>
  );
};

export default aboutme;
