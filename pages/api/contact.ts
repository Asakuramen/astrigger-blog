import type { NextApiRequest, NextApiResponse } from "next";

// クライアントへのresponce
export type Api_Responce_ToClient_Contact = {
  // reCAPTCHA認証サーバからのレスポンス
  recaptcha: {
    success: string;
    challenge_ts: string;
    hostname: string;
    score: number;
    action: string;
  };
  // Slackからのレスポンス
  slack?: string;
  // クライアント側で表示するメッセージ
  clinetMessage: string;
};

/**
 * クライアントからサーバーへPOSTするコメント情報の型
 */
export interface Api_Post_ToServer_Contact {
  name: string;
  email: string;
  title: string;
  body: string;
  token: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Api_Responce_ToClient_Contact>
) {
  // reCAPTCHA認証サーバーに認証リクエストをPOSTし、認証結果を受け取る
  const reqBody = req.body as Api_Post_ToServer_Contact;
  const serverSecretKey = `secret=${process.env.RECAPTCHA_SERVER_SECRET_KEY}&response=${reqBody.token}`;
  const responce_recaptcha = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: serverSecretKey,
    }
  );
  const responceJson_recaptcha = await responce_recaptcha.json();
  console.log("responce_recaptcha");
  console.log(responceJson_recaptcha);

  // rechptcha認証に成功
  if (responceJson_recaptcha.success) {
    // Slackに問い合わせ内容をPOSTする
    const sendText = `[recaptcha success] ${responceJson_recaptcha.success} \n [recaptcha hostname] ${responceJson_recaptcha.hostname} \n [recaptcha score] ${responceJson_recaptcha.score} \n [name] ${reqBody.name} \n [email] ${reqBody.email} \n [title] ${reqBody.title} \n [message] \n ${reqBody.body}`;
    const responce_slack = await fetch(process.env.SLACK_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: sendText }),
    });
    const responceText_slack = await responce_slack.text();
    console.log("responce_slack");
    console.log(responceText_slack);

    // Slack通知に成功
    if (responceText_slack === "ok") {
      res.status(200).json({
        recaptcha: responceJson_recaptcha,
        slack: responceText_slack,
        clinetMessage: "問い合わせを送信しました。内容を確認し、後日返信いたします。",
      });
    }
    // Slack通知に失敗
    else {
      res.status(400).json({
        recaptcha: responceJson_recaptcha,
        slack: responceText_slack,
        clinetMessage: "サーバの内部エラーで問い合わせの送信に失敗しました。",
      });
    }
  }

  // rechptcha認証に失敗
  else {
    res.status(400).json({
      recaptcha: responceJson_recaptcha,
      clinetMessage:
        "reCAPTCHA認証から拒否されたため問い合わせの送信を中止しました。大変お手数ですが、別のPCやモバイル端末からお試しください。",
    });
  }
}
