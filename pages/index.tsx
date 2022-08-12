/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import Header from "components/Header/Header";
import Image from "next/image";
import ServiceList from "components/ServiceList/ServiceList";
import BlogList from "components/BlogList/BlogList";
import { getBlogsMetaData, BlogMetaData } from "lib/getBlogContent";
import { getWorksMetaData, WorkContentMetadata } from "lib/getWorkContent";
import Button from "components/UIparts/Button";
import WorkList from "components/WorkList/WorkList";
import Aboutme from "components/Aboutme/Aboutme";
import Job from "components/Job/Job";

// ServerSideGeneration
export async function getStaticProps() {
  // 最新の3作品のみ表示する
  const allWorkContentsMetaData = getWorksMetaData(0, 3);
  // 最新の４記事のみ表示する
  const allBlogsMetaData = getBlogsMetaData(0, 4);

  return {
    // コンポーネントに渡すデータ
    props: {
      allBlogsMetaData,
      allWorkContentsMetaData,
    },
  };
}

type Props = {
  allBlogsMetaData: BlogMetaData[] | undefined;
  allWorkContentsMetaData: WorkContentMetadata[] | undefined;
};

const Home: NextPage<Props> = ({ allBlogsMetaData, allWorkContentsMetaData }) => {
  // DOM要素の交差を監視する
  if (typeof window !== "undefined") {
    const observeElements = document.querySelectorAll(".intersection-observed");

    const options = {
      root: null, // 今回はビューポートをルート要素とする
      rootMargin: "9999px 0% -25% 0%", // ビューポートの中心を判定基準にする
      threshold: 0, // thresholdを跨いだときにhandler関数が実行される
    };
    const observer = new IntersectionObserver(handlerIntersection, options);
    // 監視対象のDOM要素を登録する
    // 注意：npm run dev環境ではreactが２回レンダリングする影響でDOMが２重登録される
    observeElements.forEach((element) => {
      observer.observe(element);
    });
  }

  /**
   * DOM要素が交差の条件を満たしたときに呼び出す関数
   */
  function handlerIntersection(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) {
    // 交差検知をしたもののなかで、isIntersectingがtrueのDOMを色を変える関数に渡す
    entries.forEach((entry: IntersectionObserverEntry) => {
      const element = entry.target as HTMLElement;

      // 交差を検知したDOM要素の小要素である<h1>と<div>のアニメーションを変化させる
      const element_h1 = element.childNodes.item(0) as HTMLHeadElement;
      const element_div = element.childNodes.item(1) as HTMLDivElement;

      if (entry.isIntersecting) {
        element_h1.classList.add("animate-swing-in-top-fwd");
        element_h1.classList.remove("invisible");
        element_div.classList.add("animate-swing-in-top-fwd");
        element_div.classList.remove("invisible");
      } else {
        element_h1.classList.remove("animate-swing-in-top-fwd");
        element_h1.classList.add("invisible");
        element_div.classList.remove("animate-swing-in-top-fwd");
        element_div.classList.add("invisible");
      }
    });
  }

  return (
    <>
      <Head>
        <title>asTriggerのホームページ</title>
        <meta name="description" content="blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative h-screen">
        <Image src="/top/top.jpg" layout="fill" objectFit="cover" alt="top"></Image>
        <h1 className="absolute font-black text-xl sm:text-5xl md:text-7xl text-gray-300 animate-tracking-in-expand">
          Lets get it show on the road
        </h1>
      </div>

      <Header pageKind="top" stickey={true} />

      <div className="max-w-screen-lg mx-auto py-10 px-3 sm:px-6 ">
        <div className="intersection-observed mb-20 ">
          <h1 className="text-3xl font-extrabold mb-10">About me</h1>
          <div>
            <Aboutme />
          </div>
        </div>

        <div className="intersection-observed mb-20">
          <h1 className="text-3xl mb-6">Job</h1>
          <div>
            <Job />
          </div>
        </div>

        <div className="intersection-observed mb-20">
          <h1 className="text-3xl mb-6">Services / Skills</h1>
          <div>
            <ServiceList />
          </div>
        </div>

        <div className="intersection-observed mb-20">
          <h1 className="text-3xl mb-6">Works</h1>
          <div>
            <WorkList allWorkContentsMetaData={allWorkContentsMetaData} />
          </div>
          <div className="my-10 text-center">
            <Button text={"View more"} href={"/works"} />
          </div>
        </div>

        <div className="intersection-observed mb-10">
          <h1 className="text-3xl mb-10 animate-tracking-in-expand">Blog</h1>
          <div>
            <BlogList allBlogsMetaData={allBlogsMetaData} showThumbnail={true} />
          </div>
        </div>
        <div className="my-10 text-center">
          <Button text={"View more"} href={"/blogs"} />
        </div>
      </div>
    </>
  );
};

export default Home;
