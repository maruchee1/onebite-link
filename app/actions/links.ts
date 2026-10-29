"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export type NewLinkInput = {
  url: string;
  title: string;
  description?: string;
  thumbnail?: string;
  folderId: string;
};

/** 새 링크를 links 테이블에 추가한다 */
export async function createLink(input: NewLinkInput): Promise<void> {
  const url = input.url.trim();
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") throw new Error();
  } catch {
    throw new Error("http:// 또는 https://로 시작하는 올바른 주소를 입력해 주세요.");
  }

  const folderId = Number(input.folderId);
  if (!Number.isInteger(folderId)) throw new Error("폴더를 선택해 주세요.");

  const title = input.title.trim();
  const description = input.description?.trim() || null;
  const thumbnailUrl = input.thumbnail?.trim() || null;

  const supabase = createClient(await cookies());
  const { error } = await supabase.from("links").insert({
    url,
    title: title === "" ? null : title,
    description,
    thumbnail_url: thumbnailUrl,
    folder_id: folderId,
  });

  if (error) throw new Error(`링크를 저장하지 못했습니다: ${error.message}`);

  // 링크 목록과 사이드바 개수가 모든 페이지에 걸쳐 있으므로 레이아웃 전체를 다시 그린다
  revalidatePath("/", "layout");
}
