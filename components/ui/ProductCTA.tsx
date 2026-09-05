interface ProductCTAProps {
  title: string;
  description: string;
  /** gumroad.com/l/<id> or stub #gumroad-<id> */
  url: string;
}

export function ProductCTA({ title, description, url }: ProductCTAProps) {
  const isStub = url.startsWith("#gumroad-");

  return (
    <div className="mt-8 p-5 rounded-lg border border-[#3b82f6]/25 bg-[#3b82f6]/5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-mono text-[#3b82f6] tracking-widest uppercase mb-1">
            Available Product
          </p>
          <h3 className="text-sm font-semibold text-[#fafafa] mb-1">{title}</h3>
          <p className="text-xs text-[#a1a1aa] leading-relaxed">{description}</p>
        </div>
        {/*
          A stub is not a link. It previously rendered an <a href="#gumroad-…"> whose
          accessible name said "Purchase … on Gumroad" while it read "Coming Soon" and
          pointed at a fragment matching no element — announced as a purchase, doing
          nothing when activated. Unavailable things should not be focusable.
        */}
        {isStub ? (
          <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-semibold text-[#a1a1aa] border border-[#616161]">
            Coming soon
          </span>
        ) : (
          <a
            id={`cta-${url.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-semibold text-[#09090b] bg-[#3b82f6] hover:bg-[#60a5fa] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b82f6]"
          >
            {/* No aria-label: the name comes from the content, so what a voice-control
                user says is what they can see (2.5.3). */}
            Get {title}
            <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </div>
  );
}
