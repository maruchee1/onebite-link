"use client";

import { useCallback, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/app/actions/auth";
import Toast from "./Toast";

const fieldClass =
  "field w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)]";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const closeToast = useCallback(() => setToast(null), []);

  // 두 칸을 모두 채워야 버튼이 활성화되고, 로그인 요청 중에는 다시 잠긴다
  const filled = email.trim() !== "" && password !== "";
  const canSubmit = filled && !isPending;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    startTransition(async () => {
      const { error } = await signIn(email, password);
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
          <label htmlFor="login-email" className="text-sm font-medium text-[var(--text)]">
            이메일
          </label>
          <input
            id="login-email"
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
          <label htmlFor="login-password" className="text-sm font-medium text-[var(--text)]">
            비밀번호
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
            className={fieldClass}
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary mt-2 w-full rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium leading-none text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPending ? "로그인 중..." : "로그인"}
        </button>

        <p className="text-center text-sm leading-[1.4]">
          <Link href="/forgot-password" className="link-accent text-[var(--text-sub)]">
            비밀번호를 잊으셨나요?
          </Link>
        </p>
      </form>
    </>
  );
}
