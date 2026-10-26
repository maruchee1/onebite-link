import { useSyncExternalStore } from "react";
import { folders as initialFolders } from "./mockData";
import type { Folder } from "./types";

const STORAGE_KEY = "onebite-link:folders";

let folders: Folder[] = initialFolders;
let hydrated = false;
const listeners = new Set<() => void>();

function isFolder(value: unknown): value is Folder {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    typeof v.linkCount === "number"
  );
}

/** 최초 클라이언트 접근 시 로컬스토리지의 값을 한 번 불러온다 */
function hydrate(): void {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return;
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every(isFolder)) {
      folders = parsed;
    }
  } catch {
    // 손상된 데이터는 무시하고 기본값 사용
  }
}

function persist(): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(folders));
  } catch {
    // 저장 실패(프라이빗 모드 등)는 무시
  }
}

function emit(): void {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  hydrate();
  listeners.add(listener);

  // 다른 탭에서 바뀐 경우 다시 불러옴
  const onStorage = (e: StorageEvent) => {
    if (e.key !== null && e.key !== STORAGE_KEY) return;
    hydrated = false;
    hydrate();
    emit();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Folder[] {
  hydrate();
  return folders;
}

function getServerSnapshot(): Folder[] {
  return initialFolders;
}

function createId(): string {
  return `folder-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

/** 새 폴더를 추가하고 추가된 폴더를 반환한다 */
export function addFolder(name: string): Folder {
  const folder: Folder = { id: createId(), name: name.trim(), linkCount: 0 };
  folders = [...folders, folder];
  persist();
  emit();
  return folder;
}

/** 폴더 이름을 바꾼다 */
export function renameFolder(id: string, name: string): void {
  folders = folders.map((folder) =>
    folder.id === id ? { ...folder, name: name.trim() } : folder,
  );
  persist();
  emit();
}

/** 폴더를 삭제한다 */
export function removeFolder(id: string): void {
  folders = folders.filter((folder) => folder.id !== id);
  persist();
  emit();
}

/** 폴더 목록을 구독하는 훅 */
export function useFolders(): Folder[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** id로 폴더 하나를 구독하는 훅 */
export function useFolder(id: string): Folder | undefined {
  return useFolders().find((folder) => folder.id === id);
}
