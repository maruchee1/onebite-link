import AppShell from "@/components/AppShell";
import NewLinkForm from "@/components/NewLinkForm";
import { folders } from "@/lib/mockData";

export default function NewLinkPage() {
  return (
    <AppShell>
      <h1 className="mb-4 text-xl font-semibold">새 링크</h1>
      <NewLinkForm folders={folders} />
    </AppShell>
  );
}
