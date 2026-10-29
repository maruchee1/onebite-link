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

/** 폴더 이름을 folders 테이블에서 수정한다 */
export async function renameFolder(id: string, name: string): Promise<void> {
  const trimmed = name.trim();
  if (trimmed === "") throw new Error("폴더 이름을 입력해 주세요.");

  const folderId = Number(id);
  if (!Number.isInteger(folderId)) throw new Error("잘못된 폴더입니다.");

  const supabase = createClient(await cookies());
  const { error } = await supabase.from("folders").update({ name: trimmed }).eq("id", folderId);

  if (error) throw new Error(`폴더 이름을 수정하지 못했습니다: ${error.message}`);

  revalidatePath("/", "layout");
}

/** 폴더를 folders 테이블에서 삭제한다. 연결된 링크의 folder_id는 FK(on delete set null)로 비워진다. */
export async function deleteFolder(id: string): Promise<void> {
  const folderId = Number(id);
  if (!Number.isInteger(folderId)) throw new Error("잘못된 폴더입니다.");

  const supabase = createClient(await cookies());
  const { error } = await supabase.from("folders").delete().eq("id", folderId);

  if (error) throw new Error(`폴더를 삭제하지 못했습니다: ${error.message}`);

  revalidatePath("/", "layout");
}
