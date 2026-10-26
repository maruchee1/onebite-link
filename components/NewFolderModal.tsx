"use client";

import { useState } from "react";
import { addFolder } from "@/lib/folderStore";
import Modal from "./Modal";

type NewFolderModalProps = {
  onClose: () => void;
};

export default function NewFolderModal({ onClose }: NewFolderModalProps) {
  const [name, setName] = useState("");
  const canSave = name.trim() !== "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSave) return;
    addFolder(name);
    onClose();
  };

  return (
    <Modal title="새 폴더" onClose={onClose}>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="folder-name" className="text-sm font-medium text-[var(--text)]">
            폴더 이름
          </label>
          <input
            id="folder-name"
            type="text"
            autoFocus
            placeholder="예: 공부, 쇼핑"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="field w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)]"
          />
        </div>

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
