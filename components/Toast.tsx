"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  onClose: () => void;
  /** 자동으로 닫히기까지의 시간(ms) */
  duration?: number;
};

/** 화면 상단 가운데에 뜨는 오류 토스트. 일정 시간이 지나거나 닫기 버튼을 누르면 사라진다. */
export default function Toast({ message, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  return (
    <div
      role="alert"
      className="fixed left-1/2 top-4 z-50 flex max-w-[calc(100%-32px)] -translate-x-1/2 items-center gap-3 rounded-md border border-[var(--error)] bg-[var(--surface)] px-4 py-3 text-sm leading-[1.4] text-[var(--error)]"
    >
      <span>{message}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        className="toast-close flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--text-sub)]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  );
}
