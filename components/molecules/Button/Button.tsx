import { NextPage } from "next";
import { ReactNode } from "react";
import styles from "./Button.module.css";

type Props = {
  children: ReactNode;
  onclick?: () => void;
};

/**
 * 共通Buttonコンポーネント
 * @param children コンポーネントで内包している子要素
 */
const Button = (props: Props) => {
  const { onclick, children } = props;
  return (
    <button className={styles.buttonPrimary} onClick={onclick}>
      {children}
    </button>
  );
};

export default Button;
