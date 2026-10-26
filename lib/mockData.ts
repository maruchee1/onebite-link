import type { Folder, LinkItem } from "./types";

export const folders: Folder[] = [
  { id: "dev", name: "개발", linkCount: 3 },
  { id: "design", name: "디자인", linkCount: 2 },
  { id: "reading", name: "읽을거리", linkCount: 1 },
];

export const links: LinkItem[] = [
  {
    id: "1",
    title: "Next.js 공식 문서",
    url: "https://nextjs.org/docs",
    description: "App Router, 데이터 패칭, 캐싱 등 Next.js 전반을 다루는 공식 가이드",
    folderId: "dev",
    createdAt: "2026-10-20",
  },
  {
    id: "2",
    title: "React 공식 문서",
    url: "https://react.dev",
    description: "훅, 서버 컴포넌트 등 최신 React 레퍼런스",
    folderId: "dev",
    createdAt: "2026-10-19",
  },
  {
    id: "3",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com/docs",
    description: "유틸리티 클래스 레퍼런스",
    folderId: "dev",
    createdAt: "2026-10-18",
  },
  {
    id: "4",
    title: "Figma",
    url: "https://www.figma.com",
    description: "협업 디자인 도구",
    folderId: "design",
    createdAt: "2026-10-15",
  },
  {
    id: "5",
    title: "Dribbble",
    url: "https://dribbble.com",
    description: "UI 디자인 영감 모음",
    folderId: "design",
    createdAt: "2026-10-12",
  },
  {
    id: "6",
    title: "Hacker News",
    url: "https://news.ycombinator.com",
    description: "기술 뉴스와 토론",
    folderId: "reading",
    createdAt: "2026-10-10",
  },
];

export function getLinksByFolderId(folderId: string): LinkItem[] {
  return links.filter((link) => link.folderId === folderId);
}
