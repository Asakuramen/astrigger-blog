/* eslint-disable @next/next/no-img-element */
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import ServiceList from "components/organisms/ServiceList/ServiceList";
import BlogList, { BlogMetaData } from "components/organisms/BlogList/BlogList";
import WorkList from "components/organisms/WorkList/WorkList";
import Aboutme from "components/organisms/Aboutme/Aboutme";
import Job from "components/organisms/Job/Job";
import H1anchor from "components/molecules/H1anchor";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Footer from "components/organisms/Footer/Footer";
import { ContentMetadata, getContentMetadatasByTag } from "lib/microcms/api";
import Button from "components/molecules/Button/Button";
import styles from "./index.module.css";
import { BsGlobe } from "react-icons/bs";
import { FaLaptopCode } from "react-icons/fa";
import { IoHardwareChipSharp } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";
import SvgTypographyEnginner from "components/molecules/SVGs/SvgTypographyEnginner";
import SvgTypographyGramy from "components/molecules/SVGs/SvgTypographyGramy";

// ServerSideGeneration
export const getStaticProps: GetStaticProps<Props> = async () => {
  // 最新の3作品のみmicroCMSから取得して整形し、propsとしてコンポーネントに渡す
  const workContentsMetaDatas = await getContentMetadatasByTag("work", 3, "all");
  // 最新の4記事のみmicroCMSから取得して整形し、propsとしてコンポーネントに渡す
  const blogMetaDatas = await getContentMetadatasByTag("blog", 4, "all");

  return {
    // コンポーネントに渡すデータ
    props: {
      blogMetaDatas,
      workContentsMetaDatas,
    },
  };
};

type Props = {
  blogMetaDatas: BlogMetaData[];
  workContentsMetaDatas: ContentMetadata[];
};

const Home: NextPage<Props> = (props) => {
  const { blogMetaDatas, workContentsMetaDatas } = props;

  let intersectionObserverH1: IntersectionObserver | null = null;
  // DOM要素の交差を監視する
  // 各コンポーネント
  useEffect(() => {
    if (typeof window !== "undefined") {
      const observeElements = document.querySelectorAll(".intersection-observed");

      const options = {
        root: null, // 今回はビューポートをルート要素とする
        rootMargin: "9999px 0% -25% 0%", // ビューポートの中心を判定基準にする
        threshold: 0, // thresholdを跨いだときにhandler関数が実行される
      };
      const intersectionObserverH1 = new IntersectionObserver(
        handlerIntersection,
        options
      );
      observeElements.forEach((element) => {
        intersectionObserverH1.observe(element);
      });
    }
    // クリーンアップ関数で全ての交差監視を削除
    return intersectionObserverH1?.disconnect();
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
        <meta
          name="description"
          content="Gourami Engineering は、フロントエンド開発から、バックエンド開発、ものづくりまで、幅広い技術を駆使したサービス・システムの開発を行っております。"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.top_upper_div}>
        <Image
          src="/top/sky.jpg"
          alt="thumbnail"
          layout="fill"
          objectFit="cover"
          priority={true}
          loading="eager"
        />
        <Image
          className="animate-blink-sun-opacity"
          src="/top/LensFlare.png"
          alt="thumbnail"
          layout="fill"
          objectFit="cover"
          priority={true}
          loading="eager"
        />
        <div className={styles.container_borderpattern} />

        <div className="absolute right-24 md:right-56 bottom-20 md:bottom-28 origin-right scale-[1] md:scale-[2] ">
          <SvgTypographyGramy />
        </div>
        <div className="absolute right-4 md:right-12 bottom-12 md:bottom-12 origin-right scale-[1] md:scale-[2] ">
          <SvgTypographyEnginner />
        </div>
      </div>

      <div className="h-2 bg-gray-800" />

      <div className={styles.top_lower_div}>
        <div className={styles.container_tile}>
          <p className="text-lg font-bold text-gray-800">Life is what you make it.</p>
          <div className="flex justify-between mt-1">
            <div className="flex items-center w-16 h-10 bg-sky-400">
              <div className="mx-auto text-2xl text-white">
                <BsGlobe />
              </div>
            </div>
            <div className="flex items-center w-16 h-10 bg-sky-400">
              <div className="mx-auto text-2xl text-white">
                <FaLaptopCode />
              </div>
            </div>
            <div className="flex items-center w-16 h-10 bg-sky-400">
              <div className="mx-auto text-2xl text-white">
                <IoHardwareChipSharp />
              </div>
            </div>
            <div className="flex items-center w-16 h-10 bg-sky-400">
              <div className="mx-auto text-2xl text-white">
                <BiMoviePlay />
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-0.5">
            <div className="w-16 h-1 bg-gray-800"></div>
            <div className="w-16 h-1 bg-gray-800"></div>
            <div className="w-16 h-1 bg-gray-800"></div>
            <div className="w-16 h-1 bg-gray-800"></div>
          </div>
          <div className="flex justify-end mt-0.5">
            <div className="w-4 h-1 bg-gray-800 animate-flicker-fast"></div>
          </div>
          <p className="text-sm text-gray-800 leading-4">
            Helping people make the world a better place through Software and Hardware
            technorogy.
          </p>
        </div>

        <div className={styles.container_lightmode}>
          <p className="text-xl text-right font-extrabold text-gray-400">LIGHT MODE</p>
          <div className="absolute -top-1 -left-4 w-2 h-2 bg-gray-800 animate-flicker-fast" />
          <div className="absolute -top-1 -right-4 w-2 h-2 bg-gray-800 animate-flicker-fast" />
          <div className="absolute -bottom-1 -left-4 w-2 h-2 bg-gray-800 animate-flicker-fast" />
          <div className="absolute -bottom-1 -right-4 w-2 h-2 bg-gray-800 animate-flicker-fast" />
        </div>

        <div className="absolute top-[24vh] w-full text-center">
          <a href="#top-aboutme">
            <p className={styles.text_start}>VIEW NEXT</p>
          </a>
        </div>
      </div>

      <div className="relative">
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
            <WorkList workContentsMetaDatas={workContentsMetaDatas} />
            <div className="my-10 text-center">
              <Link href={"/works/all/1"}>
                <a>
                  <Button>View more</Button>
                </a>
              </Link>
            </div>
          </div>

          <div className="intersection-observed mb-24 invisible">
            <div className="text-center">
              <H1anchor text="BLOG" />
              <p className="text-xs text-gray-400">
                Technical articles and ideas is here.
              </p>
              <div className="h-8" />
            </div>
            <BlogList blogMetaDatas={blogMetaDatas} showThumbnail={true} />
            <div className="my-10 text-center">
              <Link href={"/blogs/all/1"}>
                <a>
                  <Button>View more</Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
