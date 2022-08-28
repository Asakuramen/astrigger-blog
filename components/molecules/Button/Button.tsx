import { ReactNode } from "react";
import styles from "./Button.module.css";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  styleType?: "primary" | "secondary" | "danger" | "disabled";
  onclick?: () => void;
};

/**
 * 共通Buttonコンポーネント
 * @param children コンポーネントで内包している子要素
 */
const Button = (props: Props) => {
  const { onclick, children, disabled, styleType } = props;

  // カラー切替
  let style = styles.primary;
  if (styleType === "secondary") {
    style = styles.secondary;
  } else if (styleType === "danger") {
    style = styles.danger;
  } else if (styleType === "disabled") {
    style = styles.disabled;
  }
  if (disabled) {
    style = styles.disabled;
  }

  return (
    <button className={style} onClick={onclick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
