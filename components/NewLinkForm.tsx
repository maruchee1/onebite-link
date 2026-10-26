"use client";

import { useState } from "react";
import { useFolders } from "@/lib/folderStore";

const fieldClass =
  "field w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)]";

export default function NewLinkForm() {
  const folders = useFolders();
  const [url, setUrl] = useState("");
  // 사용자가 고르기 전까지는 첫 번째 폴더를 기본 선택
  const [selected, setSelected] = useState<string | null>(null);
  const folderId = selected ?? folders[0]?.id ?? "";

  const canSave = url.trim() !== "" && folderId !== "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 저장 로직 연결
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-[560px] flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="link-url" className="text-sm font-medium text-[var(--text)]">
          링크
        </label>
        <input
          id="link-url"
          type="url"
          inputMode="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="link-folder" className="text-sm font-medium text-[var(--text)]">
          폴더
        </label>
        <select
          id="link-folder"
          value={folderId}
          onChange={(e) => setSelected(e.target.value)}
          className={`${fieldClass} select-field`}
        >
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-2 flex justify-end">
        <button
          type="submit"
          disabled={!canSave}
          className="btn-primary rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium leading-none text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          저장
        </button>
      </div>
    </form>
  );
}
