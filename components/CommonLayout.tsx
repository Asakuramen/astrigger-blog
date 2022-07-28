import Header from "./Header";
import Head from "next/head";

type Props = {
  children?: React.ReactNode;
};

const CommonLayout: React.FC<Props> = (props) => {
  return (
    <div>
      <Head>
        <title>asTriggerのブログ</title>
        <meta name="description" content="blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header pageKind="home" />
      <main className="mx-6 my-6">{props.children}</main>
    </div>
  );
};

export default CommonLayout;
