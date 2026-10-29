import Link from "next/link";
import { getFolder } from "@/lib/folders";
import { getLinksByFolder } from "@/lib/links";
import LinkGrid from "./LinkGrid";
import PageTitle from "./PageTitle";

type FolderViewProps = {
  /** 폴더 id. 페이지의 params에서 오는 Promise를 그대로 받아 여기서 기다린다. */
  id: string | Promise<string>;
};

/** 폴더 하나의 제목과 링크 그리드. folders·links 테이블을 읽으므로 Suspense 안에서 렌더링한다. */
export default async function FolderView({ id }: FolderViewProps) {
  const folderId = await id;
  const [folder, links] = await Promise.all([getFolder(folderId), getLinksByFolder(folderId)]);

  if (!folder) {
    return (
      <>
        <PageTitle description="삭제되었거나 존재하지 않는 폴더입니다">
          폴더를 찾을 수 없습니다
        </PageTitle>
        <Link href="/" className="link-accent text-sm text-[var(--accent)]">
          모든 링크 보기
        </Link>
      </>
    );
  }

  return (
    <>
      <PageTitle description={`저장된 링크 ${links.length}개`}>{folder.name}</PageTitle>
      <LinkGrid links={links} />
    </>
  );
}
