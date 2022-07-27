import CommonLayout from "components/CommonLayout";
import Head from "next/head";

const blog = () => {
  return (
    <CommonLayout>
      <Head>
        <title>asTrigger Blog</title>
      </Head>
      <div>
        <h1>Blog</h1>
      </div>
    </CommonLayout>
  );
};

export default blog;
