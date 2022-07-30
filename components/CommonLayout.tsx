import Header from "./Header";
import Head from "next/head";
import { BlogMetaData } from "./../lib/blogRead";

type Props = {
  children?: React.ReactNode;
  allBlogsMetaData: BlogMetaData[];
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
      <main className="max-w-screen-lg mx-auto px-6 py-6">{props.children}</main>
    </div>
  );
};

export default CommonLayout;
