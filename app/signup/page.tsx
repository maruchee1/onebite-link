import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import SignupForm from "@/components/SignupForm";

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
    </AuthCard>
  );
}
