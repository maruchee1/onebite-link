import { NextRequest } from "next/server";
import type { OpenGraphData } from "@/lib/types";

const FETCH_TIMEOUT_MS = 8000;
const MAX_HTML_BYTES = 512 * 1024;

/** 내부망 주소는 서버가 대신 요청하지 않도록 막는다 */
function isBlockedHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".localhost") || host === "::1") return true;
  if (host === "0.0.0.0" || host === "[::1]") return true;
  const m = host.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (!m) return false;
  const [a, b] = [Number(m[1]), Number(m[2])];
  return (
    a === 10 ||
    a === 127 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168)
  );
}

function parseTargetUrl(raw: string | null): URL | null {
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (isBlockedHost(url.hostname)) return null;
    return url;
  } catch {
    return null;
  }
}

function decodeEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function clean(text: string | undefined): string | null {
  if (!text) return null;
  const value = decodeEntities(text).replace(/\s+/g, " ").trim();
  return value === "" ? null : value;
}

/** <meta property|name="key" content="..."> 값을 찾는다 (속성 순서 무관) */
function findMeta(html: string, key: string): string | undefined {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const keyMatch = tag.match(/\b(?:property|name)\s*=\s*["']([^"']+)["']/i);
    if (!keyMatch || keyMatch[1].toLowerCase() !== key.toLowerCase()) continue;
    const content = tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i);
    if (content) return content[1];
  }
  return undefined;
}

function findTitleTag(html: string): string | undefined {
  return html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
}

function resolveUrl(value: string | null, base: string): string | null {
  if (!value) return null;
  try {
    return new URL(value, base).toString();
  } catch {
    return null;
  }
}

/** 응답 본문을 최대 MAX_HTML_BYTES까지만 읽는다 */
async function readLimited(res: Response): Promise<string> {
  const reader = res.body?.getReader();
  if (!reader) return "";
  const decoder = new TextDecoder();
  let html = "";
  let received = 0;
  while (received < MAX_HTML_BYTES) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    html += decoder.decode(value, { stream: true });
  }
  await reader.cancel().catch(() => undefined);
  return html;
}

export async function GET(request: NextRequest) {
  const target = parseTargetUrl(request.nextUrl.searchParams.get("url"));
  if (!target) {
    return Response.json(
      { error: "유효한 http(s) 주소를 url 쿼리로 전달해 주세요." },
      { status: 400 },
    );
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(target, {
      signal: controller.signal,
      redirect: "follow",
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OnebiteLinkBot/1.0; +https://example.com)",
        Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "ko,en;q=0.8",
      },
    });

    const finalUrl = res.url || target.toString();
    const contentType = res.headers.get("content-type") ?? "";
    const html = contentType.includes("html") ? await readLimited(res) : "";

    const data: OpenGraphData = {
      title: clean(findMeta(html, "og:title")) ?? clean(findTitleTag(html)),
      description:
        clean(findMeta(html, "og:description")) ?? clean(findMeta(html, "description")),
      image: resolveUrl(clean(findMeta(html, "og:image")), finalUrl),
      url: resolveUrl(clean(findMeta(html, "og:url")), finalUrl) ?? finalUrl,
    };

    return Response.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";
    return Response.json(
      { error: aborted ? "페이지 응답이 너무 늦어 중단했습니다." : "페이지를 불러오지 못했습니다." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timer);
  }
}
