"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export type AuthResult = {
  /** 실패했을 때 화면에 그대로 보여줄 한국어 메시지. 성공이면 null. */
  error: string | null;
};

const SIGNUP_ERROR_MESSAGES: Record<string, string> = {
  user_already_exists: "이미 가입된 이메일입니다.",
  email_exists: "이미 가입된 이메일입니다.",
  weak_password: "비밀번호는 6자 이상이어야 합니다.",
  email_address_invalid: "올바른 이메일 주소를 입력해 주세요.",
  email_address_not_authorized: "사용할 수 없는 이메일 주소입니다.",
  validation_failed: "입력한 정보를 다시 확인해 주세요.",
  signup_disabled: "현재 회원가입이 비활성화되어 있습니다.",
  email_provider_disabled: "현재 이메일 회원가입이 비활성화되어 있습니다.",
  over_email_send_rate_limit: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
  over_request_rate_limit: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
};

const SIGNUP_DEFAULT_ERROR = "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.";

/**
 * 이메일·비밀번호로 회원가입한다.
 * Server Action에서 throw한 메시지는 프로덕션에서 가려지므로, 오류는 값으로 돌려준다.
 */
export async function signUp(email: string, password: string): Promise<AuthResult> {
  const trimmedEmail = email.trim();
  if (trimmedEmail === "" || password === "") {
    return { error: "이메일과 비밀번호를 모두 입력해 주세요." };
  }

  const supabase = createClient(await cookies());
  const { data, error } = await supabase.auth.signUp({ email: trimmedEmail, password });

  if (error) {
    return { error: SIGNUP_ERROR_MESSAGES[error.code ?? ""] ?? SIGNUP_DEFAULT_ERROR };
  }

  // 이메일 확인이 켜진 프로젝트에서는 이미 가입된 이메일이어도 오류 대신
  // identities가 빈 사용자 객체를 돌려주므로 여기서 따로 걸러 준다.
  if (data.user && data.user.identities?.length === 0) {
    return { error: "이미 가입된 이메일입니다." };
  }

  return { error: null };
}
