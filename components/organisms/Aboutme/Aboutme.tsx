/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import Link from "next/link";

import { BsGithub, BsTwitter } from "react-icons/bs";
import { SiZenn } from "react-icons/si";

const Aboutme: NextPage = () => {
  return (
    <div className="text-center">
      <img
        src="/top/mypicture.png"
        width="128px"
        height="128px"
        alt="avator"
        className="rounded-full mx-auto"
      ></img>
      <div className="h-8" />
      <div className="flex flex-row justify-center">
        <Link href="https://github.com/TAPStar">
          <a className="text-3xl text-gray-900 hover:text-purple-800">
            <div className="mx-4">
              <BsGithub />
            </div>
          </a>
        </Link>
        <Link href="https://twitter.com/asakuramen_17">
          <a className="text-3xl text-gray-900 hover:text-purple-800">
            <div className="mx-4">
              <BsTwitter />
            </div>
          </a>
        </Link>
        <Link href="https://zenn.dev/angelecho">
          <a className="text-3xl text-gray-900 hover:text-purple-800">
            <div className="mx-4">
              <SiZenn />
            </div>
          </a>
        </Link>
      </div>

      <div className="h-8" />

      <div className="flex-auto text-gray-700">
        <p>ペンネーム：あさくらーめん</p>
        <p>仕事でも休日でも、いつも手を動かして何か作るのが好きな人です。</p>
        <p>20代、東京在住。</p>
      </div>
    </div>
  );
};

export default Aboutme;