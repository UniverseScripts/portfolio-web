interface ProductCTAProps {
  title: string;
  description: string;
  /** gumroad.com/l/<id> or stub #gumroad-<id> */
  url: string;
}

export function ProductCTA({ title, description, url }: ProductCTAProps) {
  const isStub = url.startsWith("#gumroad-");

  return (
    <aside
      aria-label={`Related product: ${title}`}
      className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-rule bg-sheet px-[18px] py-4"
    >
      <div className="min-w-0 flex-1 basis-72">
        <p className="m-0 font-cond text-[13.5px] text-ink-2">Related product</p>
        <h3 className="m-0 mb-1 text-[17px] font-medium">{title}</h3>
        <p className="m-0 text-[15px] leading-normal text-ink-2">{description}</p>
      </div>
      {/*
        A stub is not a link: an unavailable product must not be focusable or announced
        as a purchase.
      */}
      {isStub ? (
        <span className="shrink-0 rounded-[3px] border border-rule-strong px-3 py-1.5 font-cond text-[15px] text-ink-2">
          Coming soon
        </span>
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-[3px] bg-ink px-3.5 py-2 font-cond text-[15px] font-medium text-paper no-underline hover:bg-cond"
        >
          {/* No aria-label: the accessible name is the visible text (2.5.3). */}
          Get {title}
        </a>
      )}
    </aside>
  );
}
