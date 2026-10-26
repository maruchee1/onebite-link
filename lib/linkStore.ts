import { createId, createLocalStore } from "./localStore";
import { links as initialLinks } from "./mockData";
import type { LinkItem } from "./types";

function isLink(value: unknown): value is LinkItem {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.title === "string" &&
    typeof v.url === "string" &&
    typeof v.folderId === "string" &&
    typeof v.createdAt === "string" &&
    (v.description === undefined || typeof v.description === "string") &&
    (v.thumbnail === undefined || typeof v.thumbnail === "string")
  );
}

function isLinkList(value: unknown): value is LinkItem[] {
  return Array.isArray(value) && value.every(isLink);
}

const store = createLocalStore<LinkItem[]>("onebite-link:links", initialLinks, isLinkList);

export type NewLinkInput = Omit<LinkItem, "id" | "createdAt">;

function todayString(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** 새 링크를 맨 앞에 추가하고 추가된 링크를 반환한다 */
export function addLink(input: NewLinkInput): LinkItem {
  const link: LinkItem = { ...input, id: createId("link"), createdAt: todayString() };
  store.update((prev) => [link, ...prev]);
  return link;
}

/** 전체 링크 목록을 구독하는 훅 */
export function useLinks(): LinkItem[] {
  return store.useValue();
}

/** 특정 폴더의 링크만 구독하는 훅 */
export function useLinksByFolder(folderId: string): LinkItem[] {
  return useLinks().filter((link) => link.folderId === folderId);
}
