import { TableOfContent } from "pages/blogs/[id]";
import styles from "./Presentation.module.css";

type Props_TableOfContent_Presentation = {
  tableOfContent: TableOfContent[];
};

const TableOfContent_Presentation = (props: Props_TableOfContent_Presentation) => {
  const { tableOfContent } = props;

  return (
    <div className="p-6 shadow-sm rounded-xl mb-6 bg-white ">
      <p className="mb-4 text-xl text-sky-900 ">目次</p>
      <ul className={`${styles.ul_h1} ${styles.ul_h2}`}>
        {tableOfContent.map((anchor: TableOfContent) => {
          if (anchor.level === "H1") {
            return (
              <li className={styles.li_h1} key={anchor.href}>
                <a href={anchor.href}>{anchor.title}</a>
              </li>
            );
          } else {
            return (
              <li className={styles.li_h2} key={anchor.href}>
                <a href={anchor.href}>{anchor.title}</a>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default TableOfContent_Presentation;
