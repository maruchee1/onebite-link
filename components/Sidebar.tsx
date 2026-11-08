"use client";

import Link from "next/link";
import type { Folder, LinkItem } from "@/lib/types";
import LogoutButton from "./LogoutButton";
import SidebarFolderItem from "./SidebarFolderItem";

type SidebarProps = {
  folders: Folder[];
  /** 전체 링크. All 개수와 폴더별 개수를 세는 데 쓴다. */
  links: LinkItem[];
  selectedFolderId?: string; // undefined면 All 선택
};

export default function Sidebar({ folders, links, selectedFolderId }: SidebarProps) {
  const isAll = selectedFolderId === undefined;

  const countByFolder = new Map<string, number>();
  for (const link of links) {
    if (link.folderId === null) continue;
    countByFolder.set(link.folderId, (countByFolder.get(link.folderId) ?? 0) + 1);
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--bg)] px-3 py-6">
      <Link
        href="/"
        aria-current={isAll ? "page" : undefined}
        className={`nav-item-hover flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-[var(--text)] ${
          isAll ? "bg-[var(--hover-bg)] font-semibold" : ""
        }`}
      >
        <span>All</span>
        <span className="rounded bg-[var(--hover-bg)] px-2 py-0.5 text-[13px] leading-[1.4] text-[var(--text-sub)]">
          {links.length}
        </span>
      </Link>

      <h2 className="mt-8 mb-2 px-3 text-[13px] font-semibold uppercase tracking-wide text-[var(--text-sub)]">
        폴더
      </h2>
      <ul className="flex flex-col gap-0.5">
        {folders.map((folder) => (
          <SidebarFolderItem
            key={folder.id}
            folder={folder}
            linkCount={countByFolder.get(folder.id) ?? 0}
            active={folder.id === selectedFolderId}
          />
        ))}
      </ul>

      {/* 남는 공간을 밀어내고 사이드바 최하단에 고정 */}
      <div className="mt-auto pt-8">
        <LogoutButton />
        <Link
          href="/privacy"
          className="link-muted mt-3 block text-center text-[13px] leading-[1.4] text-[var(--text-sub)]"
        >
          개인정보 처리방침
        </Link>
      </div>
    </aside>
  );
}
