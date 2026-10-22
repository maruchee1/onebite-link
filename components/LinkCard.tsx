import type { LinkItem } from "@/lib/types";

type LinkCardProps = {
  link: LinkItem;
};

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function LinkCard({ link }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-2 rounded-lg border border-black/10 p-4 transition-colors hover:border-black/30 hover:bg-black/[.02] dark:border-white/15 dark:hover:border-white/40 dark:hover:bg-white/5"
    >
      <h3 className="truncate text-base font-semibold">{link.title}</h3>
      {link.description && (
        <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
          {link.description}
        </p>
      )}
      <div className="mt-auto flex items-center justify-between pt-2 text-xs text-zinc-500">
        <span className="truncate">{hostnameOf(link.url)}</span>
        <time dateTime={link.createdAt}>{link.createdAt}</time>
      </div>
    </a>
  );
}
