import { NextPage } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./ButtonCommon.module.css";

type Props = {
  children: ReactNode;
};

/**
 * 共通Buttonコンポーネント
 * @param children コンポーネントで内包している子要素
 */
const ButtonCommon: NextPage<Props> = ({ children }) => {
  return <div className={styles.buttonPrimary}>{children}</div>;
};

export default ButtonCommon;
