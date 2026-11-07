import { Suspense } from "react";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import ResetPasswordForm from "@/components/ResetPasswordForm";

type ResetPasswordPageProps = PageProps<"/reset-password">;

/** /auth/confirm이 넘긴 ?error=link 여부를 읽는다. searchParams는 Suspense 안에서만 기다릴 수 있다. */
async function ResetPasswordFormLoader({ searchParams }: ResetPasswordPageProps) {
  const { error } = await searchParams;
  return <ResetPasswordForm invalidLink={error === "link"} />;
}

export default function ResetPasswordPage(props: ResetPasswordPageProps) {
  return (
    <AuthCard
      description="새로 사용할 비밀번호를 입력하세요"
      footer={
        <Link href="/login" className="link-accent font-medium text-[var(--accent)]">
          로그인으로 돌아가기
        </Link>
      }
    >
      <Suspense fallback={<ResetPasswordForm />}>
        <ResetPasswordFormLoader {...props} />
      </Suspense>
    </AuthCard>
  );
}
