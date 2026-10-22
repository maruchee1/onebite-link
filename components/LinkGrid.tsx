import type { LinkItem } from "@/lib/types";
import LinkCard from "./LinkCard";

type LinkGridProps = {
  links: LinkItem[];
};

export default function LinkGrid({ links }: LinkGridProps) {
  if (links.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] py-16 text-center">
        <p className="text-sm text-[var(--text-sub)]">등록된 링크가 없습니다.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <li key={link.id} className="flex">
          <LinkCard link={link} />
        </li>
      ))}
    </ul>
  );
}
