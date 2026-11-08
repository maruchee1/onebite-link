import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_THUMBNAIL, SITE_URL } from "@/lib/site";
import "./globals.css";

/**
 * 사이트 공통 메타 태그. 각 페이지는 title·description만 덮어쓰고,
 * 오픈그래프 이미지·사이트명 등은 여기 값을 그대로 물려받는다.
 * 파비콘은 app/favicon.ico 파일 규칙으로 자동 연결된다.
 */
export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "ko_KR",
    images: [SITE_THUMBNAIL],
  },
  twitter: {
    card: "summary_large_image",
    images: [SITE_THUMBNAIL],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
