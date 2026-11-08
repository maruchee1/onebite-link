import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

/**
 * 소셜 로그인(카카오)이 끝나고 Supabase가 돌려보내는 곳.
 * 링크의 code를 세션으로 바꾼 뒤 인덱스 페이지로 보낸다. 실패하면 로그인 페이지에 오류 표시를 요청한다.
 */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const redirectUrl = request.nextUrl.clone();

  if (code) {
    const supabase = createClient(await cookies());
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      redirectUrl.pathname = "/";
      redirectUrl.search = "";
      return NextResponse.redirect(redirectUrl);
    }
  }

  redirectUrl.pathname = "/login";
  redirectUrl.search = "?error=kakao";
  return NextResponse.redirect(redirectUrl);
}
