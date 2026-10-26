"use client";

import type { Folder } from "@/lib/types";
import Modal from "./Modal";

type DeleteFolderModalProps = {
  folder: Folder;
  onConfirm: () => void;
  onClose: () => void;
};

export default function DeleteFolderModal({
  folder,
  onConfirm,
  onClose,
}: DeleteFolderModalProps) {
  return (
    <Modal title="폴더 삭제" onClose={onClose}>
      <p className="mt-3 text-sm leading-[1.6] text-[var(--text)]">
        <span className="font-semibold">{folder.name}</span> 폴더를 삭제할까요?
      </p>
      <p className="mt-1 text-sm leading-[1.4] text-[var(--text-sub)]">
        이 작업은 되돌릴 수 없습니다.
      </p>

      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="btn-secondary rounded-md border border-[var(--border)] bg-transparent px-4 py-2 text-sm font-medium leading-none text-[var(--text)]"
        >
          취소
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="btn-danger rounded-md bg-[var(--error)] px-4 py-2 text-sm font-medium leading-none text-white"
        >
          삭제
        </button>
      </div>
    </Modal>
  );
}
