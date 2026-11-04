"use client";

import { useTransition } from "react";
import { signOut } from "@/app/actions/auth";

/** 사이드바 최하단의 로그아웃 버튼. 요청 중에는 중복 클릭을 막는다. */
export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await signOut();
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="btn-secondary w-full rounded-md border border-[var(--border)] bg-transparent px-4 py-2 text-sm font-medium leading-none text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {isPending ? "로그아웃 중..." : "로그아웃"}
    </button>
  );
}
