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
  const name_id = "input-comment-name";
  const body_id = "input-comment-body";

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
    const sendCommentName = document.getElementById(name_id) as HTMLInputElement;
    const sendCommentBody = document.getElementById(body_id) as HTMLTextAreaElement;

    // サーバーにreCAPTCHA認証のtokenとコメント情報をPOSTする。
    if (executeRecaptcha) {
      // reCAPTCHA認証のtokenを取得する
      const token = await executeRecaptcha("postComment");
      const postBody: Api_Post_ToServer_CommentBody = {
        token: token,
        commentName: sendCommentName.value!,
        commentBody: sendCommentBody.value!,
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
      // フォームの入力値を消去する
      sendCommentName.value = "";
      sendCommentBody.value = "";

      // reCAPTCHA認証サーバーからtokenの取得に失敗
    } else {
      alert(
        "recaptcha認証サーバーとの通信に失敗しました。コメントは送信されていません。"
      );
    }
  };

  return (
    <CommentFiledPresentation
      comments={comments}
      name_id={name_id}
      body_id={body_id}
      onsubmit={sendComment}
    />
  );
};

export default CommentFiledContainer;
