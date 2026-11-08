import type { Metadata } from "next";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "회원가입",
  description: "한입 링크 계정을 새로 만드세요",
};

export default function SignupPage() {
  return (
    <AuthCard
      description="새 계정을 만드세요"
      footer={
        <>
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="link-accent font-medium text-[var(--accent)]">
            로그인
          </Link>
        </>
      }
    >
      <SignupForm />
      <p className="mt-4 text-center text-[13px] leading-[1.4] text-[var(--text-sub)]">
        가입 시{" "}
        <Link href="/privacy" className="link-muted underline text-[var(--text-sub)]">
          개인정보 처리방침
        </Link>
        에 동의하게 됩니다.
      </p>
    </AuthCard>
  );
}
