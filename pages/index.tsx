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

      <h1 className="text-7xl text-bold mt-5 mb-10 text-center">Home</h1>
      <h1 className="text-7xl text-bold mt-5 mb-10 text-center">🕑Commig Soon...</h1>
    </>
  );
};

export default Home;
