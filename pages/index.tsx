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
      <Header pageKind="top" />

      <h1 className="p-4 mt-4 mb-10 mx-48 text-center font-extrabold text-transparent text-7xl bg-clip-text bg-conic-to-l from-yellow-500 via-purple-500 to-blue-500">
        Top
      </h1>
      <h1 className="text-7xl text-bold mt-5 mb-10 text-center">🕑Commig Soon...</h1>
    </>
  );
};

export default Home;
