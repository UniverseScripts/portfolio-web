interface TierLabelProps {
  tier: 1 | 2;
}

const tierConfig = {
  1: {
    label: "TIER 1",
    sublabel: "High-Stakes Systems Engineering",
    color: "text-[#10b981]",
    border: "border-[#10b981]/30",
    bg: "bg-[#10b981]/5",
  },
  2: {
    label: "TIER 2",
    sublabel: "Decoupled Patterns & Tooling",
    color: "text-[#71717a]",
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
