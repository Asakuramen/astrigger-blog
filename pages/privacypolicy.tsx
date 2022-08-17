import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import "zenn-content-css";
import Header2 from "components/Header/Header2";
import H1anchor from "components/UIparts/H1anchor";
import Footer from "components/Footer/Footer";
import { getContent, PrivacyPolicyContent } from "lib/getContent";

/**
 * 静的ページ生成に必要なデータを生成し、コンポーネントにpropsとして渡す
 */
export const getStaticProps: GetStaticProps = async (context: any) => {
  // ブログ記事markdownをHTML(string)に変換する
  const content: PrivacyPolicyContent = await getContent("contents/privacypolicy/p1.md");

  return {
    props: { content: content },
  };
};

type Props = {
  content: PrivacyPolicyContent;
};

const PrivacyPolicy: NextPage<Props> = ({ content }) => {
  return (
    <>
      <Head>
        <title>Gourami Engineering - Praivacy Policy</title>
        <meta name="description" content="Praivacy Policy" />
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
          <div
            className="znc mt-10"
            dangerouslySetInnerHTML={{ __html: content.bodyHtml }}
          />
        </div>
      </div>

      <div className="h-16" />
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
