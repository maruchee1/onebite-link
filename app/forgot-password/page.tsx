import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      description="가입한 이메일로 비밀번호 리셋 링크를 보내드립니다"
      footer={
        <>
          비밀번호가 기억나셨나요?{" "}
          <Link href="/login" className="link-accent font-medium text-[var(--accent)]">
            로그인
          </Link>
        </>
      }
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
