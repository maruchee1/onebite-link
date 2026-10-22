"use client";

import { useState } from "react";
import type { Folder } from "@/lib/types";

type NewLinkFormProps = {
  folders: Folder[];
};

const fieldClass =
  "w-full rounded-md border border-black/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/40 dark:border-white/20 dark:focus:border-white/60";

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState(folders[0]?.id ?? "");

  const canSave = url.trim() !== "" && folderId !== "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 저장 로직 연결
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="link-url" className="text-sm font-medium">
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

      <div className="flex flex-col gap-1.5">
        <label htmlFor="link-folder" className="text-sm font-medium">
          폴더
        </label>
        <select
          id="link-folder"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
          className={`${fieldClass} bg-background`}
        >
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button
          type="submit"
          disabled={!canSave}
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
        >
          저장
        </button>
      </div>
    </form>
  );
}
