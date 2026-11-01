"use client";

const fieldClass =
  "field w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)]";

/** 회원가입 폼 UI. 회원가입 기능은 아직 연결하지 않았으므로 제출만 막는다. */
export default function SignupForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
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
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        className="btn-primary mt-2 w-full rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium leading-none text-white"
      >
        회원가입
      </button>
    </form>
  );
}
