"use client";

import { useState } from "react";
import { useFolders } from "@/lib/folderStore";
import { updateLink } from "@/lib/linkStore";
import type { LinkItem } from "@/lib/types";
import Modal from "./Modal";

type EditLinkModalProps = {
  link: LinkItem;
  onClose: () => void;
};

const fieldClass =
  "field w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)]";

/** 링크의 폴더, 제목, 설명을 수정하는 모달 */
export default function EditLinkModal({ link, onClose }: EditLinkModalProps) {
  const folders = useFolders();
  const [folderId, setFolderId] = useState(link.folderId);
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description ?? "");

  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();
  const changed =
    folderId !== link.folderId ||
    trimmedTitle !== link.title ||
    trimmedDescription !== (link.description ?? "");
  const canSave = trimmedTitle !== "" && changed;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSave) return;
    updateLink(link.id, {
      folderId,
      title: trimmedTitle,
      description: trimmedDescription === "" ? undefined : trimmedDescription,
    });
    onClose();
  };

  return (
    <Modal title="링크 수정" onClose={onClose}>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="edit-link-folder" className="text-sm font-medium text-[var(--text)]">
            폴더
          </label>
          <select
            id="edit-link-folder"
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
            className={`${fieldClass} select-field`}
          >
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="edit-link-title" className="text-sm font-medium text-[var(--text)]">
            제목
          </label>
          <input
            id="edit-link-title"
            type="text"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={trimmedTitle === ""}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="edit-link-description"
            className="text-sm font-medium text-[var(--text)]"
          >
            설명
          </label>
          <textarea
            id="edit-link-description"
            rows={3}
            placeholder="링크에 대한 짧은 설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${fieldClass} resize-none`}
          />
        </div>

        <p className="truncate text-[13px] leading-[1.4] text-[var(--text-sub)]">{link.url}</p>

        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary rounded-md border border-[var(--border)] bg-transparent px-4 py-2 text-sm font-medium leading-none text-[var(--text)]"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!canSave}
            className="btn-primary rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium leading-none text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            저장
          </button>
        </div>
      </form>
    </Modal>
  );
}
