import AppShell from "@/components/AppShell";
import LinkGrid from "@/components/LinkGrid";
import PageTitle from "@/components/PageTitle";
import { links } from "@/lib/mockData";

export default function Home() {
  return (
    <AppShell>
      <PageTitle description={`저장된 링크 ${links.length}개`}>All</PageTitle>
      <LinkGrid links={links} />
    </AppShell>
  );
}
