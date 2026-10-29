import { Suspense } from "react";
import AllLinksView from "@/components/AllLinksView";
import AppShell from "@/components/AppShell";
import PageTitle from "@/components/PageTitle";

export default function Home() {
  return (
    <AppShell>
      <Suspense fallback={<PageTitle description="불러오는 중...">All</PageTitle>}>
        <AllLinksView />
      </Suspense>
    </AppShell>
  );
}
