import Link from "next/link";
import type { Folder } from "@/lib/types";

type SidebarProps = {
  folders: Folder[];
  totalCount: number;
  selectedFolderId?: string; // undefined면 All 선택
};

const itemBase =
  "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors";
const itemIdle = "hover:bg-black/5 dark:hover:bg-white/10";
const itemActive = "bg-black/10 font-semibold dark:bg-white/15";

export default function Sidebar({
  folders,
  totalCount,
  selectedFolderId,
}: SidebarProps) {
  const isAll = selectedFolderId === undefined;

  return (
    <aside className="w-56 shrink-0 border-r border-black/10 p-4 dark:border-white/15">
      <Link
        href="/"
        aria-current={isAll ? "page" : undefined}
        className={`${itemBase} ${isAll ? itemActive : itemIdle}`}
      >
        <span>All</span>
        <span className="text-xs text-zinc-500">{totalCount}</span>
      </Link>

      <h2 className="mt-6 mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        폴더
      </h2>
      <ul className="flex flex-col gap-1">
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
                <span className="text-xs text-zinc-500">{folder.linkCount}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
