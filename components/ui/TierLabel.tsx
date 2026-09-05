interface TierLabelProps {
  tier: 1 | 2;
}

// Sublabels describe a display ordering, which is all the tiers are. Keep them
// neutral: these strings reach screen readers, so a self-assessment here lands as
// a claim. Whether the split should be re-cut at all is open question Q4.
const tierConfig = {
  1: {
    label: "TIER 1",
    sublabel: "Featured work",
    color: "text-[#10b981]",
    border: "border-[#10b981]/30",
    bg: "bg-[#10b981]/5",
  },
  2: {
    label: "TIER 2",
    sublabel: "Further work",
    color: "text-[#a1a1aa]",
    border: "border-[#71717a]/30",
    bg: "bg-[#71717a]/5",
  },
} as const;

export function TierLabel({ tier }: TierLabelProps) {
  const config = tierConfig[tier];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-mono tracking-widest ${config.color} ${config.border} ${config.bg}`}
      aria-label={`${config.label}: ${config.sublabel}`}
    >
      {config.label}
    </span>
  );
}
