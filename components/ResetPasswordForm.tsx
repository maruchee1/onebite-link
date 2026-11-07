"use client";

import { useCallback, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updatePassword } from "@/app/actions/auth";
import Toast from "./Toast";

const fieldClass =
  "field w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)]";

type ResetPasswordFormProps = {
  /** 리셋 링크가 만료됐거나 잘못돼 세션을 만들지 못한 경우 */
  invalidLink?: boolean;
};

export default function ResetPasswordForm({ invalidLink = false }: ResetPasswordFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [mismatch, setMismatch] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const closeToast = useCallback(() => setToast(null), []);

  const canSubmit = password !== "" && passwordConfirm !== "" && !isPending;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    if (password !== passwordConfirm) {
      setMismatch(true);
      setToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    startTransition(async () => {
      const { error } = await updatePassword(password);
      if (error) {
        setToast(error);
        return;
      }
      router.push("/");
    });
  };

  if (invalidLink) {
    return (
      <p className="text-center text-sm leading-[1.4] text-[var(--error)]">
        리셋 링크가 만료되었거나 올바르지 않습니다.{" "}
        <Link href="/forgot-password" className="link-accent font-medium text-[var(--accent)]">
          다시 요청하기
        </Link>
      </p>
    );
  }

  return (
    <>
      {toast && <Toast message={toast} onClose={closeToast} />}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="reset-password" className="text-sm font-medium text-[var(--text)]">
            새 비밀번호
          </label>
          <input
            id="reset-password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="새 비밀번호를 입력하세요"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setMismatch(false);
            }}
            disabled={isPending}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="reset-password-confirm"
            className="text-sm font-medium text-[var(--text)]"
          >
            새 비밀번호 확인
          </label>
          <input
            id="reset-password-confirm"
            name="passwordConfirm"
            type="password"
            autoComplete="new-password"
            placeholder="새 비밀번호를 한 번 더 입력하세요"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              setMismatch(false);
            }}
            disabled={isPending}
            aria-invalid={mismatch}
            className={fieldClass}
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary mt-2 w-full rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium leading-none text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPending ? "재설정 중..." : "비밀번호 재설정"}
        </button>
      </form>
    </>
  );
}
