/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";

const WorkList: NextPage = () => {
  return (
    <div className="grid grid-col-1 sm:grid-cols-3">
      <div>
        <img src="/top/top.jpg" alt="works" className=""></img>
        <div className="mt-3 mb-10 text-gray-700 text-sm">熱帯魚全自動育成システム</div>
      </div>
    </div>
  );
};

export default WorkList;
