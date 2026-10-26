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
  folderId: string;
  createdAt: string; // YYYY-MM-DD
};

/** /api/og 응답 */
export type OpenGraphData = {
  title: string | null;
  description: string | null;
  image: string | null;
  url: string;
};
