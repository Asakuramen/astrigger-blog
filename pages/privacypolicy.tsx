import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import "zenn-content-css";
import Header2 from "components/organisms/Header/Header2";
import H1anchor from "components/molecules/H1anchor";
import Footer from "components/organisms/Footer/Footer";
import { Content, getContentById } from "lib/microcms/api";

/**
 * 静的ページ生成に必要なデータを生成し、コンポーネントにpropsとして渡す
 */
export const getStaticProps: GetStaticProps = async (context: any) => {
  // ブログ記事markdownをHTML(string)に変換する
  // プライバシーポリシーのID="y70aqtfq6hno" 固定
  const content: Content = await getContentById("y70aqtfq6h");

  return {
    props: { content: content },
  };
};

type Props = {
  content: Content;
};

const PrivacyPolicy: NextPage<Props> = ({ content }) => {
  return (
    <>
      <Head>
        <title>Gourami Engineering - Praivacy Policy</title>
        <meta name="description" content={content.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header2 sticky={true} />

      <div className="max-w-screen-lg mx-auto px-3 py-3 min-h-[calc(100vh_-_6rem)]">
        <div className="h-10" />
        <div className="text-center">
          <H1anchor text="プライバシーポリシー・免責事項" />
        </div>
        <div className="h-10" />

        <div className="w-auto p-4 sm:p-8 mr-3 shadow-md rounded-xl bg-white">
          <div className="znc mt-10" dangerouslySetInnerHTML={{ __html: content.body }} />
        </div>
      </div>

      <div className="h-16" />
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
