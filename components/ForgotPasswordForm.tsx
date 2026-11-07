"use client";

import { useCallback, useState, useTransition } from "react";
import { requestPasswordReset } from "@/app/actions/auth";
import Toast from "./Toast";

const fieldClass =
  "field w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)]";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const closeToast = useCallback(() => setToast(null), []);

  const canSubmit = email.trim() !== "" && !isPending;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    startTransition(async () => {
      const { error } = await requestPasswordReset(email);
      if (error) {
        setToast(error);
        return;
      }
      setSent(true);
    });
  };

  return (
    <>
      {toast && <Toast message={toast} onClose={closeToast} />}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="forgot-email" className="text-sm font-medium text-[var(--text)]">
            이메일
          </label>
          <input
            id="forgot-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSent(false);
            }}
            disabled={isPending}
            className={fieldClass}
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary mt-2 w-full rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium leading-none text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPending ? "발송 중..." : "비밀번호 리셋 링크 발송"}
        </button>

        {sent && (
          <p role="status" className="text-center text-sm leading-[1.4] text-[var(--success)]">
            비밀번호 리셋 링크를 보냈습니다. 메일함을 확인해 주세요.
          </p>
        )}
      </form>
    </>
  );
}
