import type { NextPage } from "next";
import Head from "next/head";
import Header from "components/Header";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>asTriggerのホームページ</title>
        <meta name="description" content="blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header pageKind="blogs" />
    </>
  );
};

export default Home;
