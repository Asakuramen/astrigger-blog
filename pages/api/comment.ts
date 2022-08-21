import axios from "axios";
import { Comment, getCommentsById } from "lib/microcms/api";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * サーバーからクライアントへのresponceの型
 */
export type Api_Responce_ToClient_Comment = {
  // reCAPTCHA認証サーバからのレスポンス
  recaptcha: {
    success: string;
    challenge_ts: string;
    hostname: string;
    score: number;
    action: string;
  };
  // クライアント側で表示するメッセージ
  clinetMessage: string;
};

/**
 * クライアントからサーバーへPOSTするコメント情報の型
 */
export interface Api_Post_ToServer_CommentBody {
  commentName: string;
  commentBody: string;
  contentId: string;
  token: string;
}

/**
 * サーバーからmicroCMSへPOSTするコメント情報の型
 */
interface Api_Post_ToMicrocms_Comment {
  name: string;
  body: string;
  contentId: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`Server API is called "api/comment" ${req.method}`);
  switch (req.method) {
    case "GET":
      // GETリクエスト　指定のcontentIdのコメントをmicroCMSからGETしてrespondする
      const contentId = req.query.contentId;
      if (typeof contentId === "string") {
        const comments = await getCommentsById(contentId);
        console.log(comments);
        res.status(200).json(comments);
      } else {
        res.status(500).json({
          clinetMessage: "Internal server error, endpoint:api/comment GET",
        });
      }
      break;

    case "POST":
      // POSTリクエスト　コメント情報をmicroCMSへPOSTする。POST結果をrespondする
      const reqBody: Api_Post_ToServer_CommentBody = {
        commentName: req.body.commentName,
        commentBody: req.body.commentBody,
        contentId: req.body.contentId,
        token: req.body.token,
      };

      // reCAPTCHA認証サーバーに認証リクエストをPOSTし、認証結果を受け取る
      const serverSecretKey = `secret=${process.env.RECAPTCHA_SERVER_SECRET_KEY}&response=${reqBody.token}`;
      const res_recaptcha = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: serverSecretKey,
        }
      );
      const resJson_recaptcha = await res_recaptcha.json();

      // rechptcha認証に成功
      if (resJson_recaptcha.success) {
        // microCMSにコメント情報をPOSTする
        const postBody: Api_Post_ToMicrocms_Comment = {
          name: reqBody.commentName,
          body: reqBody.commentBody,
          contentId: reqBody.contentId,
        };
        const res_microcms = await axios.post(
          process.env.MICROCMS_ENDPOINT_COMMENT!,
          postBody,
          { headers: { "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY! } }
        );

        // microCMSにコメント情報の追加成功
        if (res_microcms.status === 201) {
          res.status(200).json({
            recaptcha: resJson_recaptcha,
            clinetMessage: "コメントを送信しました。",
          });
        }
        // microCMSにコメント情報の追加失敗
        else {
          res.status(500).json({
            recaptcha: resJson_recaptcha,
            clinetMessage:
              "reCAPTCHA認証は成功しましたが、サーバの内部エラーでコメントの送信に失敗しました",
          });
        }
      }

      // rechptcha認証に失敗
      else {
        res.status(400).json({
          recaptcha: resJson_recaptcha,
          clinetMessage:
            "reCAPTCHA認証が拒否されたためコメントは送信されませんでした。大変お手数ですが、別のPCやモバイル端末からお試しください。",
        });
      }

      break;
  }
}
