"use client";

import Link from "next/link";
import { useFolder } from "@/lib/folderStore";
import { getLinksByFolderId } from "@/lib/mockData";
import LinkGrid from "./LinkGrid";
import PageTitle from "./PageTitle";

type FolderViewProps = {
  id: string;
};

/** 폴더 하나의 제목과 링크 그리드. 폴더 저장소를 구독하므로 새로 추가된 폴더도 표시된다. */
export default function FolderView({ id }: FolderViewProps) {
  const folder = useFolder(id);

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

  const links = getLinksByFolderId(folder.id);

  return (
    <>
      <PageTitle description={`저장된 링크 ${links.length}개`}>{folder.name}</PageTitle>
      <LinkGrid links={links} />
    </>
  );
}
