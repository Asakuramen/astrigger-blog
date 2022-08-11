/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import Header from "components/Header";
import Image from "next/image";
import SwiperSkills from "components/swiper/SwiperSkills";
import BlogList from "components/BlogList/BlogList";
import { getBlogsMetaData } from "lib/blogRead";
import { BlogMetaData } from "lib/blogRead";
import Button from "components/Parts/Button";
import WorkList from "components/WorkList/WorkList";

// ServerSideGeneration
export async function getStaticProps() {
  // Topページでは最新の４記事のみ表示する
  const allBlogsMetaData = getBlogsMetaData(0, 4);

  return {
    props: {
      allBlogsMetaData, // コンポーネントに渡すデータ
    },
  };
}

type Props = {
  allBlogsMetaData: BlogMetaData[] | undefined;
};

const Home: NextPage<Props> = ({ allBlogsMetaData }) => {
  return (
    <>
      <Head>
        <title>asTriggerのホームページ</title>
        <meta name="description" content="blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative h-screen">
        <Image src="/top/top.jpg" layout="fill" objectFit="cover" alt="top"></Image>
        <h1 className="absolute text-bold text-xl sm:text-5xl md:text-7xl text-gray-100 animate-tracking-in-expand">
          Lets get it show on the road
        </h1>
      </div>

      <Header pageKind="top" stickey={true} />

      <div className="max-w-screen-lg mx-auto px-3 sm:px-6 py-10">
        <div className="mt-20">
          <h1 id="top-aboutme" className="text-3xl mb-10 animate-tracking-in-expand">
            About me
          </h1>
          <div className="flex flex-row items-center">
            <div className="flex-none basis-1/4">
              <img
                src="/top/mypicture.png"
                width="128px"
                height="128px"
                alt="avator"
                className="rounded-full mx-auto"
              ></img>
            </div>
            <div className="w-1 h-32 border-l-2 border-gray-700 mx-5"></div>
            <div className="flex-auto text-gray-700">
              <p>ペンネーム：asTrigger</p>
              <p>　</p>
              <p>20代、東京在住。</p>
              <p>本業も休みの日も、いつも何か設計開発しているのが好きな人です。</p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h1 id="top-job" className="text-3xl mb-6">
            Job
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded overflow-hidden shadow-md hover:shadow-xl transition duration-500 hover:-translate-y-2">
              <div className="px-6 py-4 text-gray-700">
                <div className="inline-block bg-gray-700 text-gray-200 rounded-full px-3 py-1 font-semibold  mr-2 mb-2">
                  Main
                </div>
                <div className="inline-block font-bold text-xl ml-2">インフラ系SIer</div>
                <p>
                  システム要件定義から、基本・詳細設計、コーディング、単体・結合・SI試験、運用支援、まで開発工程全般に携わっています。
                </p>
                <p>
                  主に国土交通省、防衛省、海外政府機関向けのインフラシステムを担当しています。
                </p>
              </div>
            </div>

            <div className="bg-white rounded overflow-hidden shadow-md hover:shadow-xl transition duration-500 hover:-translate-y-2">
              <div className="px-6 py-4  text-gray-700">
                <div className="inline-block bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2 mb-2">
                  Sub
                </div>
                <div className="inline-block font-bold text-xl ml-2">何でも開発屋</div>
                <p>
                  フロントエンド、バックエンド、ハードウェア系ものづくりなど多種多様な技術領域を駆使して、様々なシステム・アプリの開発を行っています。50%以上趣味です。
                </p>
                <p>これが真のフルスタックエンジニア？</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h1 id="top-skills" className="text-3xl mb-6">
            Services / Skills
          </h1>
          <SwiperSkills />
        </div>

        <div className="mt-20">
          <h1 id="top-works" className="text-3xl mb-6">
            Works
          </h1>
          <WorkList />
          <div className="my-10 text-center">
            <Button text={"View more"} href={"/works"}></Button>
          </div>
        </div>

        <div className="mt-10">
          <h1 id="top-blog" className="text-3xl mb-10 animate-tracking-in-expand">
            Blog
          </h1>
          <BlogList allBlogsMetaData={allBlogsMetaData}></BlogList>
        </div>
        <div className="my-10 text-center">
          <Button text={"View more"} href={"/blogs"}></Button>
        </div>
      </div>
    </>
  );
};

export default Home;
