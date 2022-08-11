/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";

const Aboutme: NextPage = () => {
  return (
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
  );
};

export default Aboutme;
