import { request } from "https";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const serverSecretKey = `secret=${process.env.RECAPTCHA_SERVER_SECRET_KEY}&response=${req.body.token}`;
  const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: serverSecretKey,
  });

  // recaptchaのチェック結果が代入される
  const recaptchaResult = await recaptchaRes.json();
  console.log("recaptchaResult");
  console.log(recaptchaResult);

  // Slackに問い合わせ内容を通知する (現時点ではrecaptcha認証に失敗しても通知することとする。スパム頻度の調査のため。)
  const sendText = `[recaptcha success] ${recaptchaResult.success} \n [recaptcha hostname] ${recaptchaResult.hostname} \n [recaptcha score] ${recaptchaResult.score} \n [name] ${req.body.name} \n [email] ${req.body.email} \n [title] ${req.body.title} \n [message] \n ${req.body.message}`;

  const _postResult = await fetch(process.env.SLACK_WEBHOOK_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: sendText }),
  });

  // rechptcha認証に成功
  if (recaptchaResult.success) {
    res.status(200).json({ result: "success" });
  }
  // rechptcha認証に失敗
  else {
    res
      .status(400)
      .json({ result: "rechptcha認証に失敗しました。メッセージは送信されていません。" });
  }
}
