import CommonLayout from "components/CommonLayout";
import Head from "next/head";
import Header from "components/Header";

const contact = () => {
  return (
    <>
      <Head>
        <title>asTriggerへの問い合わせページ</title>
        <meta name="description" content="blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header pageKind="contact" stickey={false} />

      <h1 className="p-4 mt-4 mb-10 mx-48 text-center font-extrabold text-transparent text-7xl bg-clip-text bg-gradient-to-r from-green-200 via-green-400 to-purple-700">
        Contact
      </h1>
      <h1 className="text-7xl text-bold mt-5 mb-10 text-center">🕑Commig Soon...</h1>
    </>
  );
};

export default contact;
