import Head from "next/head";
import Header from "components/Header/Header";
import { NextPage } from "next";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ButtonLink from "components/UIparts/ButtonLink";
import { useState } from "react";

const Contact: NextPage = () => {
  const [arrowSend, setArrowSend] = useState(true);

  // googleからtokenを取得する
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = async () => {
    // 送信禁止制御　簡易的なロボット攻撃対策
    if (!arrowSend) {
      alert(
        "短期間で連続の問い合わせはご遠慮いただいております。\n大変お手数ですが時間を置いて再度お試しください。"
      );
      return;
    }

    let token = "";
    if (executeRecaptcha) {
      token = await executeRecaptcha("Contact");
      // サーバーにtokenと問い合わせ内容をPOSTする
      const serverEndpoint = "api/recaptcha";
      const postResult = await fetch(serverEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          name: "Jonn",
          email: "asakura.wad3@gmail.com",
          title: "お仕事",
          message: "テストメッセージです。",
        }),
      });

      // recaptcha認証およびSlack通知が成功
      if (postResult.status == 200) {
        alert("問い合わせ内容の送信を完了しました。");
        setArrowSend(false); // リロードするまで再送信を禁止する
      } else {
        const result = await postResult.json();
        alert(`問い合わせ内容の送信に失敗しました。${result}`);
      }
    } else {
      alert(
        "recaptcha認証機能との通信に失敗しました。問い合わせ内容は送信されていません。"
      );
    }
  };

  return (
    <>
      <Head>
        <title>asTriggerへの問い合わせページ</title>
        <meta name="description" content="blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header pageKind="contact" stickey={false} />

      <div className="max-w-screen-md mx-auto px-6 py-6">
        <h1 className="text-center text-bold text-3xl mb-10">Contact</h1>

        <p className="text-center text-gray-700 mb-10">
          本サイトの内容に関するご質問やご意見、依頼事項は下記問い合わせフォームよりお願い致します。
        </p>
        <form>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                NAME
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="email"
              />
              <p className="invisible text-red-600 text-xs italic">
                この必須項目を入力してください
              </p>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                E-MAIL
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="email"
              />
              <p className="invisible text-red-600 text-xs italic">
                この必須項目を入力してください
              </p>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                TITLE
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="email"
              />
              <p className="invisible text-red-600 text-xs italic">
                この必須項目を入力してください
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Message
              </label>
              <textarea
                className="resize-y appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48"
                id="message"
                placeholder="500文字以内"
              ></textarea>
              <p className="invisible text-red-600 text-xs italic">
                この必須項目を入力してください
              </p>
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <div onClick={handleReCaptchaVerify}>
                <button
                  className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                >
                  Send
                </button>
              </div>
            </div>
            <div className="md:w-2/3"></div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
