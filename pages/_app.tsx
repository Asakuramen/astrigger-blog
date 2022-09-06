import "../styles/globals.css";
import "../styles/zennMarkdown.css";
import type { AppProps } from "next/app";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import GoogleAnalytics from "components/misc/GoogleAnalytics";
import usePagePreview from "lib/hooks/usePageView";

function MyApp({ Component, pageProps }: AppProps) {
  usePagePreview(); // ページ遷移時にGoogle Analyticsのpreviewイベントを発火させる。

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
      language="ja"
    >
      <GoogleAnalytics />
      <Component {...pageProps} />
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
