export type Folder = {
  id: string;
  name: string;
};

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description?: string;
  thumbnail?: string;
  /** 폴더가 삭제되면 null이 된다 */
  folderId: string | null;
  createdAt: string; // YYYY-MM-DD
};

/** /api/og 응답 */
export type OpenGraphData = {
  title: string | null;
  description: string | null;
  image: string | null;
  url: string;
};
