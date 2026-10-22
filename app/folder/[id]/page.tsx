import { notFound } from "next/navigation";
import AppShell from "@/components/AppShell";
import LinkGrid from "@/components/LinkGrid";
import PageTitle from "@/components/PageTitle";
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
      <PageTitle description={`저장된 링크 ${links.length}개`}>{folder.name}</PageTitle>
      <LinkGrid links={links} />
    </AppShell>
  );
}
