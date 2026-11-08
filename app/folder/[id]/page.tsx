import type { Metadata } from "next";
import { Suspense } from "react";
import AppShell from "@/components/AppShell";
import FolderView from "@/components/FolderView";
import PageTitle from "@/components/PageTitle";
import { getFolder } from "@/lib/folders";

type FolderPageProps = {
  params: Promise<{ id: string }>;
};

/** 폴더 이름을 제목으로 쓴다. params와 세션을 읽으므로 페이지의 다른 동적 부분과 함께 요청 시점에 만들어진다. */
export async function generateMetadata({ params }: FolderPageProps): Promise<Metadata> {
  const { id } = await params;
  const folder = await getFolder(id);

  const title = folder ? folder.name : "폴더를 찾을 수 없습니다";
  const description = folder
    ? `${folder.name} 폴더에 저장한 링크`
    : "삭제되었거나 존재하지 않는 폴더입니다";

  return { title, description };
}

export default function FolderPage({ params }: FolderPageProps) {
  // params는 요청 시점 데이터라 여기서 await하지 않고, Suspense 안의 컴포넌트에서 기다린다
  const id = params.then((p) => p.id);

  return (
    <AppShell selectedFolderId={id}>
      <Suspense fallback={<PageTitle description="불러오는 중...">폴더</PageTitle>}>
        <FolderView id={id} />
      </Suspense>
    </AppShell>
  );
}
