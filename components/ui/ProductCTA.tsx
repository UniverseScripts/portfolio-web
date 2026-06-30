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
          <p className="text-xs text-[#71717a] leading-relaxed">{description}</p>
        </div>
        <a
          id={`cta-${url.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
          href={url}
          target={isStub ? undefined : "_blank"}
          rel={isStub ? undefined : "noopener noreferrer"}
          aria-label={`Purchase ${title} on Gumroad`}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-semibold text-[#09090b] bg-[#3b82f6] hover:bg-[#2563eb] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b82f6]"
        >
          {isStub ? "Coming Soon" : "Get it →"}
        </a>
      </div>
    </div>
  );
}
