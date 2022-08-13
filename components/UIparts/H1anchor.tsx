import { NextPage } from "next";
import Link from "next/link";
import { ParsedUrlQueryInput } from "querystring";
import styles from "./ButtonLink.module.css";

type Props = {
  text: string;
  id?: string;
  adjustJumpPosition?: boolean;
};

/**
 * h1タグをカスタマイズしたもの
 * @param text テキスト
 * @param id id属性
 * @param shiftAnchor aタグでジャンプした先の位置をヘッダー高さ分調整するか
 *
 */

const H1anchor: NextPage<Props> = ({ text, id, adjustJumpPosition }) => {
  return (
    <h1
      id={id}
      className={`text-gray-800 text-3xl ${adjustJumpPosition && "pt-20 -mt-20 "} `}
    >
      {text}
    </h1>
  );
};

export default H1anchor;
