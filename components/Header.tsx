import Link from "next/link";
import NewFolderButton from "./NewFolderButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-12 items-center justify-between border-b border-[var(--border)] bg-[var(--header-bg)] px-4 backdrop-blur-[8px]">
      <Link href="/" className="text-base font-semibold text-[var(--text)]">
        한입 링크
      </Link>
      <div className="flex items-center gap-2">
        <NewFolderButton />
        <Link
          href="/new"
          className="btn-primary rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium leading-none text-white"
        >
          + 새 링크
        </Link>
      </div>
    </header>
  );
}
