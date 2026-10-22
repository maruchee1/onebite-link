import AppShell from "@/components/AppShell";
import LinkGrid from "@/components/LinkGrid";
import { links } from "@/lib/mockData";

export default function Home() {
  return (
    <AppShell>
      <h1 className="mb-4 text-xl font-semibold">All</h1>
      <LinkGrid links={links} />
    </AppShell>
  );
}
