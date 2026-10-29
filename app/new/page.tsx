import { Suspense } from "react";
import AppShell from "@/components/AppShell";
import NewLinkForm from "@/components/NewLinkForm";
import PageTitle from "@/components/PageTitle";
import { getFolders } from "@/lib/folders";

/** folders 테이블을 읽어 폼의 폴더 선택 목록에 넘긴다 */
async function NewLinkFormLoader() {
  const folders = await getFolders();
  return <NewLinkForm folders={folders} />;
}

export default function NewLinkPage() {
  return (
    <AppShell>
      <PageTitle description="저장할 링크 주소와 폴더를 선택하세요">새 링크</PageTitle>
      <Suspense fallback={null}>
        <NewLinkFormLoader />
      </Suspense>
    </AppShell>
  );
}
