import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type { Folder } from "./types";

/** folders 테이블의 한 행 (id, name 컬럼만 사용) */
type FolderRow = {
  id: number;
  name: string;
};

/**
 * folders 테이블의 폴더를 생성 순서대로 가져온다.
 * 서버 컴포넌트에서만 호출한다.
 */
export async function getFolders(): Promise<Folder[]> {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("folders")
    .select("id, name")
    .order("created_at", { ascending: true })
    .order("id", { ascending: true });

  if (error) throw new Error(`폴더 목록을 불러오지 못했습니다: ${error.message}`);

  return (data as FolderRow[]).map((row) => ({ id: String(row.id), name: row.name }));
}
