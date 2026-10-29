import { getLinks } from "@/lib/links";
import LinkGrid from "./LinkGrid";
import PageTitle from "./PageTitle";

/** 인덱스 페이지 본문: links 테이블의 전체 링크 그리드. Suspense 안에서 렌더링한다. */
export default async function AllLinksView() {
  const links = await getLinks();

  return (
    <>
      <PageTitle description={`저장된 링크 ${links.length}개`}>All</PageTitle>
      <LinkGrid links={links} />
    </>
  );
}
