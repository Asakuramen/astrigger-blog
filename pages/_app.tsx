import { useEffect } from "react";
import "../styles/globals.css";
import "../styles/zennMarkdown.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
