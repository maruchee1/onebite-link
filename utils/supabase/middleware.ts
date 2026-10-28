import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/**
 * 요청마다 Supabase 세션 쿠키를 갱신한다. proxy.ts에서 호출한다.
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
  await supabase.auth.getUser();

  return supabaseResponse;
};
