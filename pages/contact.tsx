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
      <Header pageKind="contact" />

      <h1 className="text-7xl text-bold mt-5 mb-10 text-center">Contact</h1>
      <h1 className="text-7xl text-bold mt-5 mb-10 text-center">🕑Commig Soon...</h1>
    </>
  );
};

export default contact;
