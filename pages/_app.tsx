import "../styles/globals.css";
import "../styles/zennMarkdown.css";
import type { AppProps } from "next/app";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
      language="ja"
    >
      <Component {...pageProps} />
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
