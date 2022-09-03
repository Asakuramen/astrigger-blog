/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { BsGithub, BsTwitter } from "react-icons/bs";
import { SiZenn } from "react-icons/si";

const AboutMeBox: NextPage = () => {
  return (
    <div className="shadow-sm rounded-xl bg-white ">
      <h1 className="pl-4 pt-3 pb-3 border-b text-xl  text-sky-900">プロフィール</h1>
      <div className="p-6">
        <div className="flex">
          <div className="relative w-20 h-20 ml-4 ">
            <Image
              className="rounded-full"
              src="/top/mypicture.png"
              alt="Portrait"
              layout="fill"
              objectFit="cover"
              priority={true}
            />
          </div>
          <div className="ml-6">
            <p className="pt-2 pb-4 text-sm font-bold">あさくらーめん</p>
            <div className="flex">
              <Link href="https://github.com/TAPStar">
                <a className="text-2xl text-gray-900 hover:text-indigo-700">
                  <div className="mr-4">
                    <BsGithub />
                  </div>
                </a>
              </Link>
              <Link href="https://twitter.com/asakuramen_17">
                <a className="text-2xl text-gray-900 hover:text-indigo-800">
                  <div className="mr-4">
                    <BsTwitter />
                  </div>
                </a>
              </Link>
              <Link href="https://zenn.dev/angelecho">
                <a className="text-2xl text-gray-900 hover:text-indigo-800">
                  <div className="mr-4">
                    <SiZenn />
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="my-6 w-48 mx-auto border-b" />

        <p className="text-sm leading-6">
          東京在住のフルスタックエンジニアです。WEBサイト・サービス開発を主軸に活動しています。本業ではインフラ系SIer
          兼 SW開発ベンダで仕事をしています。好奇心旺盛です。
        </p>
        <p className="text-sm leading-6">熱帯魚🐠をたくさん飼っています。</p>
      </div>
    </div>
  );
};

export default AboutMeBox;
