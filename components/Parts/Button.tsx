import { NextPage } from "next";
import styles from "./Button.module.css";

type Props = {
  text: string;
  href?: string;
};

const Button: NextPage<Props> = ({ text, href }) => {
  return (
    <a className={styles.buttonNormal} href={href}>
      {text}
    </a>
  );
};

export default Button;
