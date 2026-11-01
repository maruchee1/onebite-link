import Link from "next/link";

type AuthCardProps = {
  /** 로고 아래에 표시할 짧은 안내 문구 */
  description: string;
  children: React.ReactNode;
  /** 버튼 아래에 놓이는 다른 페이지로의 안내 (예: 회원가입 링크) */
  footer: React.ReactNode;
};

/** 로그인·회원가입 페이지 공통 레이아웃. 헤더·사이드바 없이 화면 가운데 카드 하나만 보여준다. */
export default function AuthCard({ description, children, footer }: AuthCardProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 py-10">
      <div className="w-full max-w-[400px] rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <Link href="/" className="text-[20px] font-semibold leading-[1.3] text-[var(--text)]">
            한입 링크
          </Link>
          <p className="text-sm leading-[1.4] text-[var(--text-sub)]">{description}</p>
        </div>

        {children}

        <p className="mt-6 text-center text-sm leading-[1.4] text-[var(--text-sub)]">{footer}</p>
      </div>
    </main>
  );
}
