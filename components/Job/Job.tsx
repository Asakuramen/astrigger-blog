/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";

const Job: NextPage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="bg-white rounded overflow-hidden shadow-md ">
        <div className="p-3 sm:px-6 sm:py-4 text-gray-700">
          <div className="inline-block bg-gray-700 text-gray-200 rounded-full px-3 py-1 font-semibold  mr-2 mb-2">
            Main
          </div>
          <div className="inline-block font-bold text-xl ml-2">インフラ系SIer</div>
          <p>
            受注営業活動からシステム要件定義、基本・詳細設計、コーディング、単体・結合・SI試験、運用支援、まで開発工程全般に携わっています。
          </p>
          <p>
            主に国土交通省、防衛省、海外政府機関向けのインフラシステムのプロジェクトを担当しています。
          </p>
        </div>
      </div>

      <div className="bg-white rounded overflow-hidden shadow-md ">
        <div className="p-3 sm:px-6 sm:py-4 text-gray-700">
          <div className="inline-block bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2 mb-2">
            Sub
          </div>
          <div className="inline-block font-bold text-xl ml-2">
            フルスタックエンジニア
          </div>
          <p>
            フロントエンド、バックエンド、ハードウェア、電子回路など様々な技術領域を駆使して、システム・アプリの開発を行っています。
          </p>
          <p>
            業務委託のフルスタックエンジニアをご希望でありましたら、ご連絡いただけると幸いです。
          </p>
        </div>
      </div>
    </div>
  );
};

export default Job;
