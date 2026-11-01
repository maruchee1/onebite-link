"use client";

const fieldClass =
  "field w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)]";

/** 로그인 폼 UI. 로그인 기능은 아직 연결하지 않았으므로 제출만 막는다. */
export default function LoginForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
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
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        className="btn-primary mt-2 w-full rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium leading-none text-white"
      >
        로그인
      </button>
    </form>
  );
}
