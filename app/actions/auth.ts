"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export type AuthResult = {
  /** 실패했을 때 화면에 그대로 보여줄 한국어 메시지. 성공이면 null. */
  error: string | null;
};

/**
 * 로그인한 계정이 바뀌었으니(로그인·로그아웃·비밀번호 재설정) 캐시된 화면을 모두 버리고
 * 다음 화면부터 현재 계정의 데이터를 처음부터 다시 불러오게 한다.
 */
function refreshUserData() {
  revalidatePath("/", "layout");
}

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

  refreshUserData();
  return { error: null };
}

const SIGNIN_ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "이메일 또는 비밀번호가 올바르지 않습니다.",
  email_not_confirmed: "이메일 인증이 완료되지 않았습니다. 메일함을 확인해 주세요.",
  user_banned: "이용이 제한된 계정입니다.",
  user_not_found: "이메일 또는 비밀번호가 올바르지 않습니다.",
  email_address_invalid: "올바른 이메일 주소를 입력해 주세요.",
  validation_failed: "입력한 정보를 다시 확인해 주세요.",
  email_provider_disabled: "현재 이메일 로그인이 비활성화되어 있습니다.",
  over_request_rate_limit: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
};

const SIGNIN_DEFAULT_ERROR = "로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.";

/**
 * 이메일·비밀번호로 로그인한다.
 * 성공하면 @supabase/ssr가 세션 쿠키를 응답에 실어 준다.
 */
export async function signIn(email: string, password: string): Promise<AuthResult> {
  const trimmedEmail = email.trim();
  if (trimmedEmail === "" || password === "") {
    return { error: "이메일과 비밀번호를 모두 입력해 주세요." };
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password });

  if (error) {
    return { error: SIGNIN_ERROR_MESSAGES[error.code ?? ""] ?? SIGNIN_DEFAULT_ERROR };
  }

  refreshUserData();
  return { error: null };
}

/** 현재 세션을 끝내고 로그인 페이지로 보낸다. */
export async function signOut(): Promise<void> {
  const supabase = createClient(await cookies());
  await supabase.auth.signOut();
  refreshUserData();
  redirect("/login");
}

const RESET_REQUEST_ERROR_MESSAGES: Record<string, string> = {
  email_address_invalid: "올바른 이메일 주소를 입력해 주세요.",
  validation_failed: "입력한 정보를 다시 확인해 주세요.",
  user_not_found: "가입되지 않은 이메일입니다.",
  over_email_send_rate_limit: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
  over_request_rate_limit: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
};

const RESET_REQUEST_DEFAULT_ERROR = "리셋 링크 발송에 실패했습니다. 잠시 후 다시 시도해 주세요.";

/** 현재 요청의 origin (예: http://localhost:3000). 리셋 링크가 돌아올 주소를 만드는 데 쓴다. */
async function getRequestOrigin(): Promise<string> {
  const h = await headers();
  const origin = h.get("origin");
  if (origin) return origin;
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${h.get("host")}`;
}

/** 입력한 이메일로 비밀번호 리셋 링크를 보낸다. 링크를 누르면 /auth/confirm을 거쳐 재설정 페이지로 간다. */
export async function requestPasswordReset(email: string): Promise<AuthResult> {
  const trimmedEmail = email.trim();
  if (trimmedEmail === "") {
    return { error: "이메일을 입력해 주세요." };
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
    redirectTo: `${await getRequestOrigin()}/auth/confirm`,
  });

  if (error) {
    return { error: RESET_REQUEST_ERROR_MESSAGES[error.code ?? ""] ?? RESET_REQUEST_DEFAULT_ERROR };
  }

  return { error: null };
}

const UPDATE_PASSWORD_ERROR_MESSAGES: Record<string, string> = {
  weak_password: "비밀번호는 6자 이상이어야 합니다.",
  same_password: "이전과 다른 비밀번호를 입력해 주세요.",
  validation_failed: "입력한 정보를 다시 확인해 주세요.",
  over_request_rate_limit: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
};

const UPDATE_PASSWORD_DEFAULT_ERROR = "비밀번호 재설정에 실패했습니다. 잠시 후 다시 시도해 주세요.";
const RESET_LINK_INVALID_ERROR =
  "리셋 링크가 만료되었거나 올바르지 않습니다. 비밀번호 찾기를 다시 진행해 주세요.";

/** 리셋 링크로 만들어진 세션으로 새 비밀번호를 저장한다. */
export async function updatePassword(password: string): Promise<AuthResult> {
  if (password === "") {
    return { error: "새 비밀번호를 입력해 주세요." };
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    if (error.name === "AuthSessionMissingError") {
      return { error: RESET_LINK_INVALID_ERROR };
    }
    return { error: UPDATE_PASSWORD_ERROR_MESSAGES[error.code ?? ""] ?? UPDATE_PASSWORD_DEFAULT_ERROR };
  }

  refreshUserData();
  return { error: null };
}

/**
 * 카카오 로그인을 시작한다. Supabase가 만든 카카오 인증 URL로 이동시키고,
 * 인증이 끝나면 /auth/callback으로 돌아와 세션을 만든다.
 */
export async function signInWithKakao(): Promise<AuthResult> {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: { redirectTo: `${await getRequestOrigin()}/auth/callback` },
  });

  if (error || !data.url) {
    return { error: "카카오 로그인을 시작하지 못했습니다. 잠시 후 다시 시도해 주세요." };
  }

  redirect(data.url);
}
