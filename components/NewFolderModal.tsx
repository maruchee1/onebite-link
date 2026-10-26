"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { addFolder } from "@/lib/folderStore";

type NewFolderModalProps = {
  onClose: () => void;
};

export default function NewFolderModal({ onClose }: NewFolderModalProps) {
  const [name, setName] = useState("");
  const canSave = name.trim() !== "";

  // Esc 키로 닫기
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSave) return;
    addFolder(name);
    onClose();
  };

  // 헤더의 backdrop-filter가 fixed 요소의 기준점을 바꾸므로 body에 포털로 렌더링
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-folder-title"
        className="w-full max-w-[400px] rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="new-folder-title"
          className="text-[20px] font-semibold leading-[1.3] text-[var(--text)]"
        >
          새 폴더
        </h2>

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
      </div>
    </div>,
    document.body,
  );
}
