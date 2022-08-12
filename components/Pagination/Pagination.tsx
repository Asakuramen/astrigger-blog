/* eslint-disable @next/next/no-img-element */
import ButtonLink from "components/UIparts/ButtonLink";
import { NextPage } from "next";

type Props = {
  currentPage: number;
  totalPage: number;
  currentUrl: string;
};

const Pagination: NextPage<Props> = ({ currentPage, totalPage, currentUrl }) => {
  const urlPrevious = new URL(currentUrl);
  const urlNext = new URL(currentUrl);

  // 現在表示中のページが最新ページ(0ページ目)の場合、Previousボタンを非表示にする
  let previousVisibility = "";
  if (currentPage === 0) {
    previousVisibility = "invisible";
  }
  urlPrevious.searchParams.set("page", (currentPage - 1).toString());

  // 現在表示中のページが最古ページの場合、Nextボタンを非表示にする
  let nextVisibility = "";
  if (currentPage === totalPage) {
    nextVisibility = "invisible";
  }
  urlNext.searchParams.set("page", (currentPage + 1).toString());

  return (
    <>
      <div className="flex justify-between">
        <div className={previousVisibility}>
          <ButtonLink text={"Previous"} href={urlPrevious.href}></ButtonLink>
        </div>
        <div className={nextVisibility}>
          <ButtonLink text={"Next"} href={urlNext.href}></ButtonLink>
        </div>
      </div>
    </>
  );
};

export default Pagination;
