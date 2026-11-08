import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * 현재 요청의 세션에 해당하는 사용자 id를 돌려준다. 로그인하지 않았으면 null.
 * 데이터 조회 시 user_id 필터에 쓴다.
 */
export async function getCurrentUserId(supabase: SupabaseClient): Promise<string | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}
