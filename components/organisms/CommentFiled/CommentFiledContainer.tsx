import axios, { AxiosResponse } from "axios";
import { Comment } from "lib/microcms/api";
import {
  Api_Post_ToServer_CommentBody,
  Api_Responce_ToClient_Comment,
} from "pages/api/comment";
import { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import CommentFiledPresentation from "./CommentFiledPresentation";

interface Props_CommentFiledContainer {
  contentId: string;
}

const CommentFiledContainer = (props: Props_CommentFiledContainer) => {
  const { contentId } = props;
  const [inputNameErrormsg, setInputNameErrormsg] = useState<string>("");
  const [inputBodyErrormsg, setInputBodyErrormsg] = useState<string>("");

  const inputName_id = "input-comment-name";
  const inputBody_id = "input-comment-body";

  // microCMSからサーバー経由でcontentIdに紐づくコメントを取得する
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    (async () => {
      const res: AxiosResponse<Comment[]> = await axios.get("/api/comment", {
        params: {
          contentId: contentId,
        },
      });
      console.log("/api/comment GET responce data ");
      console.log(res.data);
      setComments(res.data);
    })();
  }, []);

  // reCAPTCHAからtokenを取得する
  const { executeRecaptcha } = useGoogleReCaptcha();

  // サーバー経由でmicroCMSにコメント情報をPOSTする、サーバーでreCPATCHA認証あり
  const sendComment = async () => {
    // inputからお名前とコメント本文を取得する
    const commentName_Document = document.getElementById(
      inputName_id
    ) as HTMLInputElement;
    const commentBody_Document = document.getElementById(
      inputBody_id
    ) as HTMLTextAreaElement;
    const commentName = commentName_Document.value;
    const commentBody = commentBody_Document.value;

    // 各input項目の簡易バリデーションを行う（サーバー側でもバリデーションは実施する）
    let errorFlag = false;
    // name 1~20文字
    if (commentName.length < 1 || commentName.length > 20) {
      setInputNameErrormsg("1~20文字で入力してください");
      errorFlag = true;
    }
    if (commentBody.length < 1 || commentBody.length > 400) {
      setInputBodyErrormsg("1~400文字で入力してください");
      errorFlag = true;
    }
    // １つ以上の不正入力値を検出した場合は、コメント送信処理を実施しない。
    if (errorFlag) {
      alert(
        "入力内容の形式が正しくない項目があります。\n問い合わせ内容は送信されていません。"
      );
      return;
    }

    // サーバーにreCAPTCHA認証のtokenとコメント情報をPOSTする。
    if (executeRecaptcha) {
      // reCAPTCHA認証のtokenを取得する
      const token = await executeRecaptcha("postComment");
      const postBody: Api_Post_ToServer_CommentBody = {
        token: token,
        commentName: commentName,
        commentBody: commentBody,
        contentId: contentId,
      };
      const serverEndpoint = "/api/comment";
      const res: AxiosResponse<Api_Responce_ToClient_Comment> = await axios.post(
        serverEndpoint,
        JSON.stringify(postBody),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("/api/comment POST responce data ");
      console.log(res.data);
      alert(res.data.clinetMessage);

      // フォームの入力値とエラーメッセージを消去する
      commentName_Document.value = "";
      commentBody_Document.value = "";
      setInputNameErrormsg("");
      setInputBodyErrormsg("");
    }
    // reCAPTCHA認証サーバーからtokenの取得に失敗
    else {
      alert(
        "recaptcha認証サーバーとの通信に失敗しました。コメントは送信されていません。"
      );
    }
  };

  return (
    <CommentFiledPresentation
      comments={comments}
      inputName_id={inputName_id}
      inputBody_id={inputBody_id}
      inputNameErrormsg={inputNameErrormsg}
      inputBodyErrormsg={inputBodyErrormsg}
      onsubmit={sendComment}
    />
  );
};

export default CommentFiledContainer;
