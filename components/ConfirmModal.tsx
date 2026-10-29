"use client";

import { useState, useTransition } from "react";
import Modal from "./Modal";

type ConfirmModalProps = {
  title: string;
  /** 확인 질문. 강조할 대상 이름은 <strong>으로 감싸 넘긴다. */
  message: React.ReactNode;
  confirmLabel?: string;
  /** 비동기(Server Action)여도 된다. 완료될 때까지 버튼이 잠기고, 성공하면 모달이 닫힌다. */
  onConfirm: () => void | Promise<void>;
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
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    // 처리 중에 다시 눌리면(중복 클릭) 무시한다
    if (isPending) return;

    startTransition(async () => {
      try {
        await onConfirm();
        onClose();
      } catch (err) {
        setError(err instanceof Error ? err.message : "처리에 실패했습니다.");
      }
    });
  };

  return (
    <Modal title={title} onClose={onClose}>
      <p className="mt-3 text-sm leading-[1.6] text-[var(--text)]">{message}</p>
      <p className="mt-1 text-sm leading-[1.4] text-[var(--text-sub)]">
        이 작업은 되돌릴 수 없습니다.
      </p>
      {error && <p className="mt-2 text-sm text-[var(--error)]">{error}</p>}

      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          autoFocus
          disabled={isPending}
          className="btn-secondary rounded-md border border-[var(--border)] bg-transparent px-4 py-2 text-sm font-medium leading-none text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isPending}
          className="btn-danger rounded-md bg-[var(--error)] px-4 py-2 text-sm font-medium leading-none text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPending ? `${confirmLabel} 중...` : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
