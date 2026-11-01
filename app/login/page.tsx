import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
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
      <LoginForm />
    </AuthCard>
  );
}
