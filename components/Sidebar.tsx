"use client";

import Link from "next/link";
import { useFolders } from "@/lib/folderStore";

type SidebarProps = {
  totalCount: number;
  selectedFolderId?: string; // undefined면 All 선택
};

const itemBase =
  "nav-item-hover flex w-full items-center justify-between rounded-md px-3 py-2 text-sm";
const itemIdle = "text-[var(--text)]";
const itemActive = "bg-[var(--hover-bg)] font-semibold text-[var(--text)]";

function CountBadge({ count }: { count: number }) {
  return (
    <span className="rounded bg-[var(--hover-bg)] px-2 py-0.5 text-[13px] leading-[1.4] text-[var(--text-sub)]">
      {count}
    </span>
  );
}

export default function Sidebar({ totalCount, selectedFolderId }: SidebarProps) {
  const folders = useFolders();
  const isAll = selectedFolderId === undefined;

  return (
    <aside className="w-60 shrink-0 border-r border-[var(--border)] bg-[var(--bg)] px-3 py-6">
      <Link
        href="/"
        aria-current={isAll ? "page" : undefined}
        className={`${itemBase} ${isAll ? itemActive : itemIdle}`}
      >
        <span>All</span>
        <CountBadge count={totalCount} />
      </Link>

      <h2 className="mt-8 mb-2 px-3 text-[13px] font-semibold uppercase tracking-wide text-[var(--text-sub)]">
        폴더
      </h2>
      <ul className="flex flex-col gap-0.5">
        {folders.map((folder) => {
          const active = folder.id === selectedFolderId;
          return (
            <li key={folder.id}>
              <Link
                href={`/folder/${folder.id}`}
                aria-current={active ? "page" : undefined}
                className={`${itemBase} ${active ? itemActive : itemIdle}`}
              >
                <span className="truncate">{folder.name}</span>
                <CountBadge count={folder.linkCount} />
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
