"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeFolder } from "@/lib/folderStore";
import type { Folder } from "@/lib/types";
import DeleteFolderModal from "./DeleteFolderModal";
import TrashIcon from "./TrashIcon";

type SidebarFolderItemProps = {
  folder: Folder;
  active: boolean;
};

export default function SidebarFolderItem({ folder, active }: SidebarFolderItemProps) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  const handleDelete = () => {
    removeFolder(folder.id);
    setConfirming(false);
    // 보고 있던 폴더를 지웠으면 전체 목록으로 이동
    if (active) router.push("/");
  };

  return (
    <li className="folder-item relative">
      <Link
        href={`/folder/${folder.id}`}
        aria-current={active ? "page" : undefined}
        className={`nav-item-hover flex w-full items-center justify-between rounded-md py-2 pl-3 pr-10 text-sm ${
          active ? "bg-[var(--hover-bg)] font-semibold" : ""
        } text-[var(--text)]`}
      >
        <span className="truncate">{folder.name}</span>
        <span className="folder-count rounded bg-[var(--hover-bg)] px-2 py-0.5 text-[13px] leading-[1.4] text-[var(--text-sub)]">
          {folder.linkCount}
        </span>
      </Link>

      <button
        type="button"
        onClick={() => setConfirming(true)}
        aria-label={`${folder.name} 폴더 삭제`}
        title="폴더 삭제"
        className="folder-delete absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded text-[var(--text-sub)]"
      >
        <TrashIcon />
      </button>

      {confirming && (
        <DeleteFolderModal
          folder={folder}
          onConfirm={handleDelete}
          onClose={() => setConfirming(false)}
        />
      )}
    </li>
  );
}
