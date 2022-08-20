/* eslint-disable @next/next/no-img-element */
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import ServiceList from "components/ServiceList/ServiceList";
import BlogList, { BlogMetaData } from "components/BlogList/BlogList";
import { getWorksMetaData, WorkContentMetadata } from "lib/getWorkContent";
import WorkList from "components/WorkList/WorkList";
import Aboutme from "components/Aboutme/Aboutme";
import Job from "components/Job/Job";
import Header2 from "components/Header/Header2";
import H1anchor from "components/UIparts/H1anchor";
import Image from "next/image";
import ButtonCommon from "components/UIparts/ButtonCommon";
import { IoFish } from "react-icons/io5";
import Link from "next/link";
import { useEffect } from "react";
import Footer from "components/Footer/Footer";
import { getContentsByTag } from "lib/microcms/api";

// ServerSideGeneration
export const getStaticProps: GetStaticProps<Props> = async () => {
  // 最新の3作品のみ表示する
  const allWorkContentsMetaData = getWorksMetaData(0, 3);
  // 最新の４記事のみmicroCMSから取得して整形し、propsとしてコンポーネントに渡す
  const blogMetaDatas = await getContentsByTag("blog", 4, "all");

  return {
    // コンポーネントに渡すデータ
    props: {
      blogMetaDatas,
      allWorkContentsMetaData,
    },
  };
};

type Props = {
  blogMetaDatas: BlogMetaData[];
  allWorkContentsMetaData: WorkContentMetadata[] | undefined;
};

const Home: NextPage<Props> = ({ blogMetaDatas, allWorkContentsMetaData }) => {
  // DOM要素の交差を監視する
  useEffect(() => {
    if (typeof window !== "undefined") {
      const observeElements = document.querySelectorAll(".intersection-observed");

      const options = {
        root: null, // 今回はビューポートをルート要素とする
        rootMargin: "9999px 0% -25% 0%", // ビューポートの中心を判定基準にする
        threshold: 0, // thresholdを跨いだときにhandler関数が実行される
      };
      const observer = new IntersectionObserver(handlerIntersection, options);
      // 監視対象のDOM要素を登録する
      observeElements.forEach((element) => {
        observer.observe(element);
      });
    }
  }, []);

  /**
   * DOM要素が交差の条件を満たしたときに呼び出す関数
   */
  function handlerIntersection(
    entries: IntersectionObserverEntry[],
    _: IntersectionObserver
  ) {
    // 交差を検知したDOM要素のアニメーションを変化させる
    entries.forEach((entry: IntersectionObserverEntry) => {
      const element = entry.target as HTMLElement;
      if (entry.intersectionRatio) {
        element.classList.remove("animate-slide-out-bottom");
        element.classList.add("animate-slide-in-bottom");
        element.classList.remove("invisible");
      } else {
        element.classList.remove("animate-slide-in-bottom");
        element.classList.add("animate-slide-out-bottom");
        // element.classList.add("invisible");
      }
    });
  }

  return (
    <>
      <Head>
        <title>Gourami Engineering - Top</title>
        <meta name="description" content="blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative h-screen">
        <Image
          src="/top/top.jpg"
          alt="thumbnail"
          layout="fill"
          objectFit="cover"
          priority={true}
          loading="eager"
        />
        <div className="absolute w-full h-screen bg-black opacity-40"></div>
        <div className="absolute grid grid-cols-12 h-screen">
          <div className="col-span-1"></div>
          <div className="col-span-8 sm:col-span-6">
            <div className="h-1/6 sm:h-1/3"></div>
            <div className="flex flex-row items-center text-4xl sm:text-5xl text-white font-extrabold">
              <IoFish />
              <div className="ml-4">Gourami Engineering</div>
            </div>

            <div className="h-12"></div>
            <h1 className="text-xl text-white">
              Helping people make the world a better place through Software and Hardware
              technorogy.
            </h1>
            <div className="h-12"></div>
          </div>
        </div>
      </div>

      <Header2 sticky={true} />

      <div className="max-w-screen-lg mx-auto py-24 px-3">
        <div className="intersection-observed mb-20 invisible">
          <div className="text-center">
            <H1anchor text="ABOUT ME" id="top-aboutme" adjustJumpPosition={true} />
            <p className="text-xs text-gray-400">
              Get you know me before you dive into my content.
            </p>
            <div className="h-8" />
          </div>
          <Aboutme />
        </div>

        <div className="intersection-observed mb-24 invisible">
          <div className="text-center">
            <H1anchor text="SERVICES" />
            <p className="text-xs text-gray-400">What I offer.</p>
            <div className="h-8" />
          </div>
          <ServiceList />
        </div>

        <div className="intersection-observed mb-24 invisible">
          <div className="text-center">
            <H1anchor text="JOB" />
            <p className="text-xs text-gray-400">Contribution to society.</p>
            <div className="h-8" />
          </div>
          <Job />
        </div>

        <div className="intersection-observed mb-24 invisible">
          <div className="text-center">
            <H1anchor text="WORKS" />
            <p className="text-xs text-gray-400">My Portforio.</p>
            <div className="h-8" />
          </div>
          <WorkList allWorkContentsMetaData={allWorkContentsMetaData} />
          <div className="my-10 text-center">
            <Link href={"/works"}>
              <a>
                <ButtonCommon>View more</ButtonCommon>
              </a>
            </Link>
          </div>
        </div>

        <div className="intersection-observed mb-24 invisible">
          <div className="text-center">
            <H1anchor text="BLOG" />
            <p className="text-xs text-gray-400">Technical articles and ideas is here.</p>
            <div className="h-8" />
          </div>
          <BlogList blogMetaDatas={blogMetaDatas} showThumbnail={true} />
          <div className="my-10 text-center">
            <Link href={"/blogs/all/1"}>
              <a>
                <ButtonCommon>View more</ButtonCommon>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
