"use client";

import { useLinks } from "@/lib/linkStore";
import LinkGrid from "./LinkGrid";
import PageTitle from "./PageTitle";

/** 인덱스 페이지 본문: 전체 링크 그리드 */
export default function AllLinksView() {
  const links = useLinks();

  return (
    <>
      <PageTitle description={`저장된 링크 ${links.length}개`}>All</PageTitle>
      <LinkGrid links={links} />
    </>
  );
}
