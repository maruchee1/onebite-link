"use client";

import Modal from "./Modal";

type ConfirmModalProps = {
  title: string;
  /** 확인 질문. 강조할 대상 이름은 <strong>으로 감싸 넘긴다. */
  message: React.ReactNode;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
};

/** 되돌릴 수 없는 작업(삭제 등) 전에 한 번 더 묻는 모달 */
export default function ConfirmModal({
  title,
  message,
  confirmLabel = "삭제",
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  return (
    <Modal title={title} onClose={onClose}>
      <p className="mt-3 text-sm leading-[1.6] text-[var(--text)]">{message}</p>
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
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
