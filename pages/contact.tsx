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
    </>
  );
};

export default contact;
