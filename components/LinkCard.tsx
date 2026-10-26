import type { LinkItem } from "@/lib/types";
import LinkCardActions from "./LinkCardActions";

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
    <div className="link-card relative flex w-full">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-hover flex w-full flex-col gap-2 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
      >
        {link.thumbnail && (
          <div className="-mx-4 -mt-4 mb-1 aspect-[1.91/1] overflow-hidden border-b border-[var(--border)] bg-[var(--hover-bg)]">
            {/* 외부 임의 도메인의 이미지라 next/image 대신 일반 img 사용 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={link.thumbnail}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <h3 className="truncate text-base font-semibold leading-[1.4] text-[var(--text)]">
          {link.title}
        </h3>
        {link.description && (
          <p className="line-clamp-2 text-sm leading-[1.4] text-[var(--text-sub)]">
            {link.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="truncate rounded bg-[var(--hover-bg)] px-2 py-0.5 text-[13px] leading-[1.4] text-[var(--text)]">
            {hostnameOf(link.url)}
          </span>
          <time
            dateTime={link.createdAt}
            className="shrink-0 text-[13px] text-[var(--text-sub)]"
          >
            {link.createdAt}
          </time>
        </div>
      </a>

      <LinkCardActions link={link} />
    </div>
  );
}
