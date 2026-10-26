"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

/** 화면 가운데 뜨는 모달 껍데기. Esc 키와 바깥 영역 클릭으로 닫힌다. */
export default function Modal({ title, onClose, children }: ModalProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // 헤더의 backdrop-filter가 fixed 요소의 기준점을 바꾸므로 body에 포털로 렌더링
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-[400px] rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="modal-title"
          className="text-[20px] font-semibold leading-[1.3] text-[var(--text)]"
        >
          {title}
        </h2>
        {children}
      </div>
    </div>,
    document.body,
  );
}
