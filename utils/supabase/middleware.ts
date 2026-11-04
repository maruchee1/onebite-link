import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** 로그인한 사용자만 접근할 수 있는 경로인지 판단한다. (인덱스, 폴더별 페이지, 새 링크 페이지) */
const isProtectedPath = (pathname: string) =>
  pathname === "/" ||
  pathname === "/new" ||
  pathname === "/folder" ||
  pathname.startsWith("/folder/");

/**
 * 요청마다 Supabase 세션 쿠키를 갱신하고, 보호된 경로에 로그인하지 않은 채 접근하면
 * 로그인 페이지로 보낸다. proxy.ts에서 호출한다.
 * 갱신된 쿠키가 담긴 응답을 반환하므로 호출한 쪽은 이 응답을 그대로 돌려줘야 한다.
 */
export const updateSession = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // 토큰이 만료됐으면 여기서 갱신되고, setAll을 통해 새 쿠키가 응답에 실린다.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && isProtectedPath(request.nextUrl.pathname)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
};
