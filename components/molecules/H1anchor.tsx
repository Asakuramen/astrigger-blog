import { NextPage } from "next";
import Link from "next/link";
import { ParsedUrlQueryInput } from "querystring";
import styles from "./ButtonLink.module.css";

type Props = {
  text?: string;
  id?: string;
  adjustJumpPosition?: boolean;
  children?: React.ReactNode;
};

/**
 * 共通h1タグ
 * @param text テキスト
 * @param id id属性
 * @param shiftAnchor aタグでジャンプした先の位置をヘッダー高さ分調整するか
 * @param children children
 *
 */

const H1anchor: NextPage<Props> = (props) => {
  const { text, id, adjustJumpPosition, children } = props;
  return (
    <h1
      id={id}
      className={`text-sky-800 text-3xl ${adjustJumpPosition && "pt-24 -mt-24 "} `}
    >
      {text}
      {children}
    </h1>
  );
};

export default H1anchor;
