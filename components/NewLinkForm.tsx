"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLink } from "@/app/actions/links";
import type { Folder, OpenGraphData } from "@/lib/types";
import { hostnameOf } from "@/lib/url";

const fieldClass =
  "field w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)]";

async function fetchOpenGraph(url: string): Promise<OpenGraphData | null> {
  try {
    const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
    if (!res.ok) return null;
    return (await res.json()) as OpenGraphData;
  } catch {
    return null;
  }
}

type NewLinkFormProps = {
  /** folders 테이블에서 읽어 온 폴더 목록 */
  folders: Folder[];
};

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  // 사용자가 고르기 전까지는 첫 번째 폴더를 기본 선택
  const [selected, setSelected] = useState<string | null>(null);
  const folderId = selected ?? folders[0]?.id ?? "";
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const trimmedUrl = url.trim();
  // saving 동안은 false가 되어 저장 버튼이 잠기고, 중복 제출도 아래에서 무시된다
  const canSave = trimmedUrl !== "" && folderId !== "" && !saving;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSave) return;

    let targetUrl: URL;
    try {
      targetUrl = new URL(trimmedUrl);
      if (targetUrl.protocol !== "http:" && targetUrl.protocol !== "https:") throw new Error();
    } catch {
      setNotice("http:// 또는 https://로 시작하는 올바른 주소를 입력해 주세요.");
      return;
    }

    setSaving(true);
    setNotice(null);

    // 오픈그래프 정보를 수집하고, 실패하면 주소만으로 저장한다
    const og = await fetchOpenGraph(targetUrl.toString());
    const finalUrl = og?.url ?? targetUrl.toString();

    try {
      await createLink({
        url: finalUrl,
        title: og?.title ?? hostnameOf(finalUrl),
        description: og?.description ?? undefined,
        thumbnail: og?.image ?? undefined,
        folderId,
      });
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "링크를 저장하지 못했습니다.");
      setSaving(false);
      return;
    }

    router.push(`/folder/${folderId}`);
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
          disabled={saving}
          aria-invalid={notice !== null}
          className={fieldClass}
        />
        {notice && (
          <p className="text-sm leading-[1.4] text-[var(--error)]" aria-live="polite">
            {notice}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="link-folder" className="text-sm font-medium text-[var(--text)]">
          폴더
        </label>
        <select
          id="link-folder"
          value={folderId}
          onChange={(e) => setSelected(e.target.value)}
          disabled={saving}
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
          {saving ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
}
