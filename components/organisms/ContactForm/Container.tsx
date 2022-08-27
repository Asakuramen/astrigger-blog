import axios, { AxiosResponse } from "axios";
import { Api_Responce_ToClient_Comment } from "pages/api/comment";
import { Api_Post_ToServer_Contact } from "pages/api/contact";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ContactForm_Presentation from "./Presentation";

const ContactForm = () => {
  // input要素のhtmlidを定義
  const inputName_htmlId = "contact-input-name";
  const inputEmail_htmlId = "contact-input-email";
  const inputTitle_htmlId = "contact-input-title";
  const inputBody_htmlId = "contact-input-body";
  // input要素のエラーメッセージを保持
  const [inputName_errormsg, setInputName_errormsg] = useState("");
  const [inputEmail_errormsg, setInputEmail_errormsg] = useState("");
  const [inputTitle_errormsg, setInputTitle_errormsg] = useState("");
  const [inputBody_errormsg, setInputBody_errormsg] = useState("");
  // 送信中状態管理
  const [isSending, setIsSending] = useState(false);

  // reCAPTCHAからtokenを取得する
  const { executeRecaptcha } = useGoogleReCaptcha();

  // サーバー経由でmicroCMSにコメント情報をPOSTする、サーバーでreCPATCHA認証あり
  const onSubmit = async () => {
    // 各inputから入力値を取得する
    const inputName_doc: HTMLInputElement = document.getElementById(
      inputName_htmlId
    ) as HTMLInputElement;
    const inputEmail_doc: HTMLInputElement = document.getElementById(
      inputEmail_htmlId
    ) as HTMLInputElement;
    const inputTitle_doc: HTMLInputElement = document.getElementById(
      inputTitle_htmlId
    ) as HTMLInputElement;
    const inputBody_doc = document.getElementById(
      inputBody_htmlId
    ) as HTMLTextAreaElement;
    const inputName = inputName_doc.value;
    const inputEmail = inputEmail_doc.value;
    const inputTitle = inputTitle_doc.value;
    const inputBody = inputBody_doc.value;

    // 各input項目のバリデーションを行う
    // inputのエラーメッセージ解除
    setInputName_errormsg("");
    setInputEmail_errormsg("");
    setInputTitle_errormsg("");
    setInputBody_errormsg("");
    let errorFlag = false;
    // name 1~20文字
    if (inputName.length < 1 || inputName.length > 20) {
      setInputName_errormsg("1~20文字で入力してください");
      errorFlag = true;
    }
    // email メールアドレス形式チェック
    const pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
    if (!pattern.test(inputEmail)) {
      setInputEmail_errormsg("メールアドレスの入力形式が不正です");
      errorFlag = true;
    }
    // title 1~50文字
    if (inputTitle.length < 1 || inputTitle.length > 50) {
      setInputTitle_errormsg("1~50文字で入力してください");
      errorFlag = true;
    }
    // message 1~400文字
    if (inputBody.length < 1 || inputBody.length > 400) {
      setInputBody_errormsg("1~400文字で入力してください");
      errorFlag = true;
    }
    // １つ以上の不正入力値を検出した場合は、以下の送信処理を実施しない。
    if (errorFlag) {
      alert("入力内容の形式が正しくない項目があります。\nコメントは送信されていません。");
      return;
    }

    setIsSending(true); // 送信ボタンdisabled

    // サーバーにreCAPTCHA認証のtokenとコメント情報をPOSTする。
    if (executeRecaptcha) {
      // reCAPTCHA認証のtokenを取得する
      const token = await executeRecaptcha("postComment");
      const postBody: Api_Post_ToServer_Contact = {
        name: inputName,
        email: inputEmail,
        title: inputTitle,
        body: inputBody,
        token: token,
      };
      const serverEndpoint = "/api/contact";
      const res: AxiosResponse<Api_Responce_ToClient_Comment> = await axios.post(
        serverEndpoint,
        JSON.stringify(postBody),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("/api/contact POST responce data ");
      console.log(res.data);
      alert(res.data.clinetMessage);

      // フォームの入力値を消去する
      inputName_doc.value = "";
      inputEmail_doc.value = "";
      inputTitle_doc.value = "";
      inputBody_doc.value = "";
    }
    // reCAPTCHA認証サーバーからtokenの取得に失敗
    else {
      alert(
        "recaptcha認証サーバーとの通信に失敗しました。コメントは送信されていません。"
      );
    }

    setIsSending(false); // 送信ボタンdisabled解除
  };

  return (
    <ContactForm_Presentation
      inputName_htmlId={inputName_htmlId}
      inputEmail_htmlId={inputEmail_htmlId}
      inputTitle_htmlId={inputTitle_htmlId}
      inputBody_htmlId={inputBody_htmlId}
      inputName_errormsg={inputName_errormsg}
      inputEmail_errormsg={inputEmail_errormsg}
      inputTitle_errormsg={inputTitle_errormsg}
      inputBody_errormsg={inputBody_errormsg}
      isSending={isSending}
      onSubmit={onSubmit}
    />
  );
};

export default ContactForm;
