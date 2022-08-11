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
      <Header pageKind="works" stickey={false} />

      <h1 className="p-4 mt-4 mb-10 mx-64 text-center font-extrabold text-transparent text-7xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
        Works
      </h1>
      <h1 className="text-7xl text-bold mt-5 mb-10 text-center">🕑Commig Soon...</h1>
    </>
  );
};

export default works;
