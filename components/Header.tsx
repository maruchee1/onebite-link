import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-black/10 bg-background px-6 dark:border-white/15">
      <Link href="/" className="text-lg font-bold tracking-tight">
        한입 링크
      </Link>
      <Link
        href="/new"
        className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
      >
        + 새 링크
      </Link>
    </header>
  );
}
