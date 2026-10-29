import { Suspense } from "react";
import AppShell from "@/components/AppShell";
import FolderView from "@/components/FolderView";
import PageTitle from "@/components/PageTitle";

type FolderPageProps = {
  params: Promise<{ id: string }>;
};

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
