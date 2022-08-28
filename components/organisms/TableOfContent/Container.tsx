import { TableOfContent } from "pages/blogs/[id]";
import TableOfContent_Presentation from "./Presentation";

type Props_TableOfContent = {
  tableOfContent: TableOfContent[];
};

const TableOfContent = (props: Props_TableOfContent) => {
  const { tableOfContent } = props;
  return <TableOfContent_Presentation tableOfContent={tableOfContent} />;
};

export default TableOfContent;
