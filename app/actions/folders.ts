"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

/** 새 폴더를 folders 테이블에 추가한다 */
export async function createFolder(name: string): Promise<void> {
  const trimmed = name.trim();
  if (trimmed === "") throw new Error("폴더 이름을 입력해 주세요.");

  const supabase = createClient(await cookies());
  const { error } = await supabase.from("folders").insert({ name: trimmed });

  if (error) throw new Error(`폴더를 추가하지 못했습니다: ${error.message}`);

  // 사이드바는 모든 페이지에 있으므로 레이아웃 전체를 다시 그린다
  revalidatePath("/", "layout");
}
