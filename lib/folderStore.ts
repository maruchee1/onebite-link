import { createId, createLocalStore } from "./localStore";
import { folders as initialFolders } from "./mockData";
import type { Folder } from "./types";

function isFolder(value: unknown): value is Folder {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.id === "string" && typeof v.name === "string";
}

function isFolderList(value: unknown): value is Folder[] {
  return Array.isArray(value) && value.every(isFolder);
}

const store = createLocalStore<Folder[]>("onebite-link:folders", initialFolders, isFolderList);

/** 새 폴더를 추가하고 추가된 폴더를 반환한다 */
export function addFolder(name: string): Folder {
  const folder: Folder = { id: createId("folder"), name: name.trim() };
  store.update((prev) => [...prev, folder]);
  return folder;
}

/** 폴더 이름을 바꾼다 */
export function renameFolder(id: string, name: string): void {
  store.update((prev) =>
    prev.map((folder) => (folder.id === id ? { ...folder, name: name.trim() } : folder)),
  );
}

/** 폴더를 삭제한다 */
export function removeFolder(id: string): void {
  store.update((prev) => prev.filter((folder) => folder.id !== id));
}

/** 폴더 목록을 구독하는 훅 */
export function useFolders(): Folder[] {
  return store.useValue();
}

/** id로 폴더 하나를 구독하는 훅 */
export function useFolder(id: string): Folder | undefined {
  return useFolders().find((folder) => folder.id === id);
}
