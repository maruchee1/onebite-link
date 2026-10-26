import AppShell from "@/components/AppShell";
import FolderView from "@/components/FolderView";

type FolderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function FolderPage({ params }: FolderPageProps) {
  const { id } = await params;

  return (
    <AppShell selectedFolderId={id}>
      <FolderView id={id} />
    </AppShell>
  );
}
