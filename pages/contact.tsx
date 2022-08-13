import Head from "next/head";
import Header from "components/Header/Header";
import { NextPage } from "next";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ButtonLink from "components/UIparts/ButtonLink";
import { useRef, useState } from "react";

const Contact: NextPage = () => {
  const [arrowSend, setArrowSend] = useState(true);

  const inputName = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputTitle = useRef<HTMLInputElement>(null);
  const inputMessage = useRef<HTMLTextAreaElement>(null);

  // googleからtokenを取得する
  const { executeRecaptcha } = useGoogleReCaptcha();

  // 送信ボタン押下
  const submitForm = async () => {
    // 簡易的なスパム対策　連続送信を禁止する
    if (!arrowSend) {
      alert(
        "短期間で連続の問い合わせはご遠慮いただいております。\n大変お手数ですが、しばらく時間を置いてページをリロードしてから送信してください。"
      );
      return;
    }

    // フォーム入力値を取得する
    const name = inputName.current!.value;
    const email = inputEmail.current!.value;
    const title = inputTitle.current!.value;
    const message = inputMessage.current!.value;

    // input要素のエラー表示を初期化する
    document.getElementById("contact-errormessage-name")!.innerText = "";
    document.getElementById("contact-input-name")!.classList.remove("border-red-400");
    document.getElementById("contact-errormessage-email")!.innerText = "";
    document.getElementById("contact-input-email")!.classList.remove("border-red-400");
    document.getElementById("contact-errormessage-title")!.innerText = "";
    document.getElementById("contact-input-title")!.classList.remove("border-red-400");
    document.getElementById("contact-errormessage-message")!.innerText = "";
    document.getElementById("contact-input-message")!.classList.remove("border-red-400");

    // 各input項目の簡易バリデーションを行う（サーバー側でもバリデーションは実施する）
    let errorFlag = false;
    // name 1~20文字
    if (name.length < 1 || name.length > 20) {
      document.getElementById("contact-errormessage-name")!.innerText =
        "1~20文字で入力してください";
      document.getElementById("contact-input-name")!.classList.add("border-red-400");
      errorFlag = true;
    }
    // email メールアドレス形式チェック
    const pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]{1}@[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
    if (!pattern.test(email)) {
      document.getElementById("contact-errormessage-email")!.innerText =
        "E-mailアドレスの入力形式が不正です";
      document.getElementById("contact-input-email")!.classList.add("border-red-400");
      errorFlag = true;
    }
    // title 1~50文字
    if (title.length < 1 || title.length > 50) {
      document.getElementById("contact-errormessage-title")!.innerText =
        "1~50文字で入力してください";
      document.getElementById("contact-input-title")!.classList.add("border-red-400");
      errorFlag = true;
    }
    // message 1~400文字
    if (message.length < 1 || message.length > 400) {
      document.getElementById("contact-errormessage-message")!.innerText =
        "1~400文字で入力してください";
      document.getElementById("contact-input-message")!.classList.add("border-red-400");
      errorFlag = true;
    }
    // １つ以上の不正入力値を検出した場合は、以下の送信処理を実施しない。
    if (errorFlag) {
      alert(
        "入力内容の形式が正しくない項目があります。\n問い合わせ内容は送信されていません。"
      );
      return;
    }

    // recaptcha認証およびサーバーへの問い合わせ内容を送信する処理
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
          name: name,
          email: email,
          title: title,
          message: message,
        }),
      });

      // recaptcha認証およびSlack通知が成功
      if (postResult.status == 200) {
        alert("問い合わせ内容を送信しました。");
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
          本サイトの内容に関するご質問やご依頼等は下記問い合わせフォームよりお願い致します。
        </p>
        <form>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                NAME
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2  focus:outline-none focus:bg-white focus:border-gray-500"
                type="email"
                id="contact-input-name"
                ref={inputName}
              />
              <p
                id="contact-errormessage-name"
                className=" text-red-600 text-xs italic"
              ></p>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                E-MAIL
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 focus:outline-none focus:bg-white focus:border-gray-500"
                type="email"
                id="contact-input-email"
                ref={inputEmail}
              />
              <p
                id="contact-errormessage-email"
                className=" text-red-600 text-xs italic"
              ></p>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                TITLE
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white focus:border-gray-500"
                type="email"
                id="contact-input-title"
                ref={inputTitle}
              />
              <p
                id="contact-errormessage-title"
                className=" text-red-600 text-xs italic"
              ></p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Message
              </label>
              <textarea
                className="resize-y appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48"
                placeholder="500文字以内"
                id="contact-input-message"
                ref={inputMessage}
              ></textarea>
              <p
                id="contact-errormessage-message"
                className=" text-red-600 text-xs italic"
              ></p>
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <div onClick={submitForm}>
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
