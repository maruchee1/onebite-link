"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeFolder, renameFolder } from "@/lib/folderStore";
import type { Folder } from "@/lib/types";
import DeleteFolderModal from "./DeleteFolderModal";
import FolderFormModal from "./FolderFormModal";
import PencilIcon from "./PencilIcon";
import TrashIcon from "./TrashIcon";

type SidebarFolderItemProps = {
  folder: Folder;
  linkCount: number;
  active: boolean;
};

type ModalKind = "edit" | "delete" | null;

const actionClass =
  "folder-action flex h-7 w-7 items-center justify-center rounded text-[var(--text-sub)]";

export default function SidebarFolderItem({
  folder,
  linkCount,
  active,
}: SidebarFolderItemProps) {
  const router = useRouter();
  const [modal, setModal] = useState<ModalKind>(null);
  const closeModal = () => setModal(null);

  const handleRename = (name: string) => {
    renameFolder(folder.id, name);
  };

  const handleDelete = () => {
    removeFolder(folder.id);
    closeModal();
    // 보고 있던 폴더를 지웠으면 전체 목록으로 이동
    if (active) router.push("/");
  };

  return (
    <li className="folder-item relative">
      <Link
        href={`/folder/${folder.id}`}
        aria-current={active ? "page" : undefined}
        className={`nav-item-hover flex w-full items-center justify-between rounded-md py-2 pl-3 pr-[72px] text-sm ${
          active ? "bg-[var(--hover-bg)] font-semibold" : ""
        } text-[var(--text)]`}
      >
        <span className="truncate">{folder.name}</span>
        <span className="folder-count absolute right-3 rounded bg-[var(--hover-bg)] px-2 py-0.5 text-[13px] leading-[1.4] text-[var(--text-sub)]">
          {linkCount}
        </span>
      </Link>

      <div className="folder-actions absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-0.5">
        <button
          type="button"
          onClick={() => setModal("edit")}
          aria-label={`${folder.name} 폴더 이름 수정`}
          title="이름 수정"
          className={actionClass}
        >
          <PencilIcon />
        </button>
        <button
          type="button"
          onClick={() => setModal("delete")}
          aria-label={`${folder.name} 폴더 삭제`}
          title="폴더 삭제"
          className={`${actionClass} folder-action-danger`}
        >
          <TrashIcon />
        </button>
      </div>

      {modal === "edit" && (
        <FolderFormModal
          title="폴더 이름 수정"
          submitLabel="저장"
          initialName={folder.name}
          onSubmit={handleRename}
          onClose={closeModal}
        />
      )}
      {modal === "delete" && (
        <DeleteFolderModal folder={folder} onConfirm={handleDelete} onClose={closeModal} />
      )}
    </li>
  );
}
