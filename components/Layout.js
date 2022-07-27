import Head from "next/head";
import { Children } from "react";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Yuya Asakura";
export const siteTitle = "Next.js Blog";

function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/profile.png"
              className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
            ></img>
            <h1>{name}</h1>
          </>
        ) : (
          <>
            <img src="/images/profile.png" className={utilStyles.borderCircle}></img>
            <h1>{name}</h1>
          </>
        )}
      </header>
      {/* index.jsのLayoutタグで囲んだ子要素をここで展開する */}
      <main>{children}</main>

      {!home && <Link href="/">← ホームへ戻る</Link>}
    </div>
  );
}

export default Layout;
