import { NextPage } from "next";
import Link from "next/link";
import { ParsedUrlQueryInput } from "querystring";
import styles from "./ButtonLink.module.css";

type Props = {
  text: string;
  href: string;
};

/**
 * Link付きのButtonコンポーネント
 * @param text buttonに表示するテキスト
 * @param href Linkタグ(aタグ)のhref属性
 */
// const ButtonLink: NextPage<Props> = ({ text, href }) => {
//   return (
//     <Link href={{ pathname: href.pathname, query: href.query }}>
//       <a className={styles.buttonPrimary}>{text}</a>
//     </Link>
//   );
// };

const ButtonLink: NextPage<Props> = ({ text, href }) => {
  return (
    <a className={styles.buttonPrimary} href={href}>
      {text}
    </a>
  );
};

export default ButtonLink;
