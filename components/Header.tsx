import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-12 items-center justify-between border-b border-[var(--border)] bg-[var(--header-bg)] px-4 backdrop-blur-[8px]">
      <Link href="/" className="text-base font-semibold text-[var(--text)]">
        한입 링크
      </Link>
      <Link
        href="/new"
        className="btn-primary rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium leading-none text-white"
      >
        + 새 링크
      </Link>
    </header>
  );
}
