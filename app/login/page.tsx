import { Suspense } from "react";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import LoginForm from "@/components/LoginForm";

type LoginPageProps = PageProps<"/login">;

const CALLBACK_ERROR_MESSAGES: Record<string, string> = {
  kakao: "카카오 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.",
};

/** /auth/callback이 넘긴 ?error= 값을 읽는다. searchParams는 Suspense 안에서만 기다릴 수 있다. */
async function LoginFormLoader({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;
  const message = typeof error === "string" ? (CALLBACK_ERROR_MESSAGES[error] ?? null) : null;
  return <LoginForm initialError={message} />;
}

export default function LoginPage(props: LoginPageProps) {
  return (
    <AuthCard
      description="계정에 로그인하세요"
      footer={
        <>
          계정이 없으신가요?{" "}
          <Link href="/signup" className="link-accent font-medium text-[var(--accent)]">
            회원가입
          </Link>
        </>
      }
    >
      <Suspense fallback={<LoginForm />}>
        <LoginFormLoader {...props} />
      </Suspense>
    </AuthCard>
  );
}
