import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";

/**
 * 이메일의 비밀번호 리셋 링크가 돌아오는 곳.
 * 링크에 담긴 코드를 세션으로 바꾼 뒤 비밀번호 재설정 페이지로 보낸다.
 * 코드가 없거나 만료됐으면 재설정 페이지에 오류 표시를 요청한다.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  const supabase = createClient(await cookies());
  let failed = true;

  if (code) {
    // PKCE 흐름: 기본 이메일 템플릿({{ .ConfirmationURL }})은 ?code=로 돌아온다
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    failed = error !== null;
  } else if (tokenHash && type) {
    // 이메일 템플릿을 {{ .TokenHash }} 방식으로 바꾼 경우
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    failed = error !== null;
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/reset-password";
  redirectUrl.search = failed ? "?error=link" : "";
  return NextResponse.redirect(redirectUrl);
}
