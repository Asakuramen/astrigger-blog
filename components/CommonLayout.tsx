import Header from "./Header/Header";
import Head from "next/head";
import { BlogMetaData } from "../lib/getBlogContent";

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

      <Header pageKind="top" stickey={false} />
      <main className="max-w-screen-lg mx-auto px-6 py-6">{props.children}</main>
    </div>
  );
};

export default CommonLayout;
