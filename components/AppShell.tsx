import { Suspense } from "react";
import { getFolders } from "@/lib/folders";
import Header from "./Header";
import Sidebar from "./Sidebar";

type AppShellProps = {
  selectedFolderId?: string;
  children: React.ReactNode;
};

type FolderSidebarProps = Pick<AppShellProps, "selectedFolderId">;

/** folders 테이블을 읽어 사이드바에 넘긴다. Suspense 안에서 스트리밍된다. */
async function FolderSidebar({ selectedFolderId }: FolderSidebarProps) {
  const folders = await getFolders();
  return <Sidebar folders={folders} selectedFolderId={selectedFolderId} />;
}

/** 상단 헤더 + 좌측 사이드바 + 메인 섹션 공통 레이아웃 */
export default function AppShell({ selectedFolderId, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)]">
      <Header />
      <div className="flex flex-1">
        <Suspense fallback={<Sidebar folders={[]} selectedFolderId={selectedFolderId} />}>
          <FolderSidebar selectedFolderId={selectedFolderId} />
        </Suspense>
        <main className="flex-1 px-6 pt-10 pb-16">
          <div className="mx-auto w-full max-w-[960px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
