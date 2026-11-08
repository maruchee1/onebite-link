"use client";

import { useCallback, useState, useTransition } from "react";
import Image from "next/image";
import { signInWithKakao } from "@/app/actions/auth";
import Toast from "./Toast";

type KakaoLoginButtonProps = {
  /** 이메일 로그인이 진행 중일 때 함께 잠근다 */
  disabled?: boolean;
};

/** public 폴더의 카카오 공식 버튼 이미지를 그대로 쓰는 로그인 버튼. 카드 너비에 맞춰 늘어난다. */
export default function KakaoLoginButton({ disabled = false }: KakaoLoginButtonProps) {
  const [toast, setToast] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const closeToast = useCallback(() => setToast(null), []);

  const handleClick = () => {
    startTransition(async () => {
      // 성공하면 서버에서 카카오 인증 페이지로 리다이렉트되므로 여기로 돌아오지 않는다
      const { error } = await signInWithKakao();
      if (error) setToast(error);
    });
  };

  return (
    <>
      {toast && <Toast message={toast} onClose={closeToast} />}
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || isPending}
        aria-label="카카오 로그인"
        className="kakao-login block w-full overflow-hidden rounded-md disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Image
          src="/kakao_login_large_wide.png"
          alt="카카오 로그인"
          width={600}
          height={90}
          className="h-auto w-full"
          priority
        />
      </button>
    </>
  );
}
