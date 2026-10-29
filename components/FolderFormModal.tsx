"use client";

import { useState, useTransition } from "react";
import Modal from "./Modal";

type FolderFormModalProps = {
  title: string;
  submitLabel: string;
  initialName?: string;
  /** 비동기(Server Action)여도 된다. 완료될 때까지 저장 버튼이 잠긴다. */
  onSubmit: (name: string) => void | Promise<void>;
  onClose: () => void;
};

/** 폴더 이름을 입력받는 모달. 새 폴더 만들기와 이름 수정에 함께 쓴다. */
export default function FolderFormModal({
  title,
  submitLabel,
  initialName = "",
  onSubmit,
  onClose,
}: FolderFormModalProps) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const trimmed = name.trim();
  const canSave = trimmed !== "" && trimmed !== initialName.trim();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 저장 중에 다시 제출(중복 클릭, Enter 연타)되면 무시한다
    if (!canSave || isPending) return;

    startTransition(async () => {
      try {
        await onSubmit(trimmed);
        onClose();
      } catch (err) {
        setError(err instanceof Error ? err.message : "저장에 실패했습니다.");
      }
    });
  };

  return (
    <Modal title={title} onClose={onClose}>
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
            onFocus={(e) => e.target.select()}
            disabled={isPending}
            className="field w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)]"
          />
          {error && <p className="text-sm text-[var(--error)]">{error}</p>}
        </div>

        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="btn-secondary rounded-md border border-[var(--border)] bg-transparent px-4 py-2 text-sm font-medium leading-none text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!canSave || isPending}
            className="btn-primary rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium leading-none text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending ? "저장 중..." : submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
}
