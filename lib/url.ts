/** 주소에서 www.를 뗀 호스트명을 돌려준다. 파싱에 실패하면 원문을 그대로 돌려준다. */
export function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
