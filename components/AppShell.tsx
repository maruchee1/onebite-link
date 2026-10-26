import Header from "./Header";
import Sidebar from "./Sidebar";
import { links } from "@/lib/mockData";

type AppShellProps = {
  selectedFolderId?: string;
  children: React.ReactNode;
};

/** 상단 헤더 + 좌측 사이드바 + 메인 섹션 공통 레이아웃 */
export default function AppShell({ selectedFolderId, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)]">
      <Header />
      <div className="flex flex-1">
        <Sidebar totalCount={links.length} selectedFolderId={selectedFolderId} />
        <main className="flex-1 px-6 pt-10 pb-16">
          <div className="mx-auto w-full max-w-[960px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
