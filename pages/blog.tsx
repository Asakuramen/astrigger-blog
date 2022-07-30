import { getBlogsMetaData } from "lib/blogRead";
import Head from "next/head";
import Header from "components/Header";
import Image from "next/image";
import { BlogMetaData } from "lib/blogRead";

// ServerSideGeneration
export async function getStaticProps() {
  //外部からデータを取得
  const allBlogsMetaData = getBlogsMetaData();

  return {
    props: {
      allBlogsMetaData, // コンポーネントに渡すデータ
    },
  };
}

type Props = {
  allBlogsMetaData: BlogMetaData[];
};

const Blog: React.FC<Props> = ({ allBlogsMetaData }) => {
  return (
    <>
      <Head>
        <title>asTriggerのブログ</title>
        <meta name="description" content="blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header pageKind="blog" />

      <div className="max-w-screen-lg mx-auto px-6 py-6">
        <h1 className="text-5xl mb-4">Blog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {allBlogsMetaData.map((blogMetaData: BlogMetaData) => {
            return (
              <div className="rounded overflow-hidden shadow-lg" key={blogMetaData.id}>
                <Image
                  className="w-full"
                  src={blogMetaData.thumbnail}
                  alt="thumbnail"
                  layout={"responsive"}
                  width="200px"
                  height="100px"
                />
                <div className="px-6 py-4">
                  <p className="text-gray-400 text-base">{blogMetaData.date}</p>
                  <div className="font-bold text-xl mt-1 mb-1">{blogMetaData.title}</div>
                </div>
                <div className="px-6 pt-2 pb-2">
                  {blogMetaData.tags.map((tag) => {
                    return (
                      <span
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        key={tag}
                      >
                        {`#${tag}`}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Blog;
