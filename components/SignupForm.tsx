"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/app/actions/auth";
import Toast from "./Toast";

const fieldClass =
  "field w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)]";

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [mismatch, setMismatch] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const closeToast = useCallback(() => setToast(null), []);

  // 세 칸을 모두 채워야 버튼이 활성화되고, 가입 요청 중에는 다시 잠긴다
  const filled = email.trim() !== "" && password !== "" && passwordConfirm !== "";
  const canSubmit = filled && !isPending;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    if (password !== passwordConfirm) {
      setMismatch(true);
      setToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    startTransition(async () => {
      const { error } = await signUp(email, password);
      if (error) {
        setToast(error);
        return;
      }
      router.push("/");
    });
  };

  return (
    <>
      {toast && <Toast message={toast} onClose={closeToast} />}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="signup-email" className="text-sm font-medium text-[var(--text)]">
            이메일
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="signup-password" className="text-sm font-medium text-[var(--text)]">
            비밀번호
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호를 입력하세요"
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
            htmlFor="signup-password-confirm"
            className="text-sm font-medium text-[var(--text)]"
          >
            비밀번호 확인
          </label>
          <input
            id="signup-password-confirm"
            name="passwordConfirm"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호를 한 번 더 입력하세요"
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
          {isPending ? "가입 중..." : "회원가입"}
        </button>
      </form>
    </>
  );
}
