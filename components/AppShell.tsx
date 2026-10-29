import { Suspense } from "react";
import { getFolders } from "@/lib/folders";
import { getLinks } from "@/lib/links";
import Header from "./Header";
import Sidebar from "./Sidebar";

type AppShellProps = {
  /** 선택된 폴더 id. 폴더 페이지에서는 params에서 오는 Promise라 Suspense 안에서 기다린다. */
  selectedFolderId?: string | Promise<string>;
  children: React.ReactNode;
};

type FolderSidebarProps = Pick<AppShellProps, "selectedFolderId">;

/** folders·links 테이블을 읽어 사이드바에 넘긴다. Suspense 안에서 스트리밍된다. */
async function FolderSidebar({ selectedFolderId }: FolderSidebarProps) {
  const [folders, links, selected] = await Promise.all([
    getFolders(),
    getLinks(),
    selectedFolderId,
  ]);
  return <Sidebar folders={folders} links={links} selectedFolderId={selected} />;
}

/** 상단 헤더 + 좌측 사이드바 + 메인 섹션 공통 레이아웃 */
export default function AppShell({ selectedFolderId, children }: AppShellProps) {
  // 아직 어떤 폴더인지 모를 때(Promise)는 All도 폴더도 강조하지 않도록 빈 문자열을 넘긴다
  const fallbackSelected = typeof selectedFolderId === "string" ? selectedFolderId : "";

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)]">
      <Header />
      <div className="flex flex-1">
        <Suspense
          fallback={
            <Sidebar
              folders={[]}
              links={[]}
              selectedFolderId={selectedFolderId === undefined ? undefined : fallbackSelected}
            />
          }
        >
          <FolderSidebar selectedFolderId={selectedFolderId} />
        </Suspense>
        <main className="flex-1 px-6 pt-10 pb-16">
          <div className="mx-auto w-full max-w-[960px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
