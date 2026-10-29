import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type { LinkItem } from "./types";
import { hostnameOf } from "./url";

/** links 테이블의 한 행 */
type LinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
  created_at: string;
};

const LINK_COLUMNS = "id, url, title, description, thumbnail_url, folder_id, created_at";

/** timestamptz 문자열을 한국 시간 기준 YYYY-MM-DD로 바꾼다 */
function toDateString(iso: string): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Seoul" }).format(new Date(iso));
}

function toLinkItem(row: LinkRow): LinkItem {
  return {
    id: String(row.id),
    url: row.url,
    title: row.title ?? hostnameOf(row.url),
    description: row.description ?? undefined,
    thumbnail: row.thumbnail_url ?? undefined,
    folderId: row.folder_id === null ? null : String(row.folder_id),
    createdAt: toDateString(row.created_at),
  };
}

/** 전체 링크를 최신순으로 가져온다. 서버 컴포넌트에서만 호출한다. */
export async function getLinks(): Promise<LinkItem[]> {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("links")
    .select(LINK_COLUMNS)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });

  if (error) throw new Error(`링크 목록을 불러오지 못했습니다: ${error.message}`);

  return (data as LinkRow[]).map(toLinkItem);
}

/** 특정 폴더의 링크를 최신순으로 가져온다. 폴더 id가 숫자가 아니면 빈 배열을 돌려준다. */
export async function getLinksByFolder(folderId: string): Promise<LinkItem[]> {
  const id = Number(folderId);
  if (!Number.isInteger(id)) return [];

  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("links")
    .select(LINK_COLUMNS)
    .eq("folder_id", id)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });

  if (error) throw new Error(`링크 목록을 불러오지 못했습니다: ${error.message}`);

  return (data as LinkRow[]).map(toLinkItem);
}
