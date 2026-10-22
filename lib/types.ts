export type Folder = {
  id: string;
  name: string;
  linkCount: number;
};

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description?: string;
  folderId: string;
  createdAt: string; // ISO 날짜 문자열
};
