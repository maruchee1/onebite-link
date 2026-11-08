import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { getCurrentUserId } from "./auth";
import type { Folder } from "./types";

/** folders 테이블의 한 행 (id, name 컬럼만 사용) */
type FolderRow = {
  id: number;
  name: string;
};

/**
 * 현재 로그인한 사용자의 폴더를 생성 순서대로 가져온다. 로그인하지 않았으면 빈 배열.
 * 서버 컴포넌트에서만 호출한다.
 */
export async function getFolders(): Promise<Folder[]> {
  const supabase = createClient(await cookies());
  const userId = await getCurrentUserId(supabase);
  if (!userId) return [];

  const { data, error } = await supabase
    .from("folders")
    .select("id, name")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })
    .order("id", { ascending: true });

  if (error) throw new Error(`폴더 목록을 불러오지 못했습니다: ${error.message}`);

  return (data as FolderRow[]).map((row) => ({ id: String(row.id), name: row.name }));
}

/** 현재 사용자의 폴더 하나를 id로 가져온다. 없거나, 남의 폴더거나, id가 숫자가 아니면 null. */
export async function getFolder(id: string): Promise<Folder | null> {
  const folderId = Number(id);
  if (!Number.isInteger(folderId)) return null;

  const supabase = createClient(await cookies());
  const userId = await getCurrentUserId(supabase);
  if (!userId) return null;

  const { data, error } = await supabase
    .from("folders")
    .select("id, name")
    .eq("id", folderId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw new Error(`폴더를 불러오지 못했습니다: ${error.message}`);
  if (!data) return null;

  const row = data as FolderRow;
  return { id: String(row.id), name: row.name };
}
