/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";

const Job: NextPage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="bg-white rounded overflow-hidden shadow-md ">
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

      <div className="bg-white rounded overflow-hidden shadow-md ">
        <div className="px-6 py-4  text-gray-700">
          <div className="inline-block bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2 mb-2">
            Sub
          </div>
          <div className="inline-block font-bold text-xl ml-2">何でも開発屋</div>
          <p>
            フロントエンド、バックエンド、ハードウェア系ものづくりなど多種多様な技術領域を駆使して、様々なシステム・アプリの開発を行っています。
          </p>
          <p>
            もともとは趣味でしたが、この力を世の中の問題解決に役立てられればと思っています。
          </p>
        </div>
      </div>
    </div>
  );
};

export default Job;
