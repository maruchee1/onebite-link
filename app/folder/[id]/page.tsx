import { notFound } from "next/navigation";
import AppShell from "@/components/AppShell";
import LinkGrid from "@/components/LinkGrid";
import { getFolderById, getLinksByFolderId } from "@/lib/mockData";

type FolderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function FolderPage({ params }: FolderPageProps) {
  const { id } = await params;
  const folder = getFolderById(id);
  if (!folder) notFound();

  const links = getLinksByFolderId(folder.id);

  return (
    <AppShell selectedFolderId={folder.id}>
      <h1 className="mb-4 text-xl font-semibold">{folder.name}</h1>
      <LinkGrid links={links} />
    </AppShell>
  );
}
