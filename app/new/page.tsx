import AppShell from "@/components/AppShell";
import NewLinkForm from "@/components/NewLinkForm";
import PageTitle from "@/components/PageTitle";
import { folders } from "@/lib/mockData";

export default function NewLinkPage() {
  return (
    <AppShell>
      <PageTitle description="저장할 링크 주소와 폴더를 선택하세요">새 링크</PageTitle>
      <NewLinkForm folders={folders} />
    </AppShell>
  );
}
