/** 사이트 공통 메타 정보. 메타 태그(제목, 설명, 오픈그래프)에서 함께 쓴다. */
export const SITE_NAME = "한입 링크";
export const SITE_DESCRIPTION = "북마크를 모아두는 한입 링크";

/**
 * 오픈그래프 이미지처럼 절대 URL이 필요한 메타 필드의 기준 주소.
 * 배포 환경에서는 NEXT_PUBLIC_SITE_URL(예: https://example.com)을 설정한다.
 */
export const SITE_URL = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

/** public/thumbnail.png (2400×1260) */
export const SITE_THUMBNAIL = {
  url: "/thumbnail.png",
  width: 2400,
  height: 1260,
  alt: `${SITE_NAME} 썸네일`,
};
