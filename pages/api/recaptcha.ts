import type { NextApiRequest, NextApiResponse } from "next";

// クライアントへのresponce
export type ResponceServer = {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponceServer>
) {
  // reCAPTCHA認証サーバーに認証リクエストをPOSTし、認証結果を受け取る
  const serverSecretKey = `secret=${process.env.RECAPTCHA_SERVER_SECRET_KEY}&response=${req.body.token}`;
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
    const sendText = `[recaptcha success] ${responceJson_recaptcha.success} \n [recaptcha hostname] ${responceJson_recaptcha.hostname} \n [recaptcha score] ${responceJson_recaptcha.score} \n [name] ${req.body.name} \n [email] ${req.body.email} \n [title] ${req.body.title} \n [message] \n ${req.body.message}`;
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
        clinetMessage: "問い合わせの送信に成功しました。内容を確認し後日返信いたします。",
      });
    }
    // Slack通知に失敗
    else {
      res.status(400).json({
        recaptcha: responceJson_recaptcha,
        slack: responceText_slack,
        clinetMessage:
          "reCAPTCHA認証は成功しましたが、サーバの内部エラーで問い合わせの送信に失敗しました。",
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
