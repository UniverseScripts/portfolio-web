import { ProjectSchema } from "@/content/types";

interface ProvenanceRowProps {
  project: ProjectSchema;
  /** Drop the top rule when this already sits beneath a section heading. */
  flush?: boolean;
}

/**
 * Who built it, when, where, and with what.
 *
 * This carries the card. Every project has provenance, truth file §9.3 requires stating
 * the role and attribution anyway, and unlike a benchmark it does not decay or need
 * re-measuring. Measurements are a bonus on top (MetricList), not the card's backbone.
 */
export function ProvenanceRow({ project, flush = false }: ProvenanceRowProps) {
  const rows: Array<[string, string]> = [
    ["Role", project.role],
    ["Period", project.period],
  ];
  if (project.venue) rows.push(["Built at", project.venue]);
  rows.push(["Stack", project.stack.join(" · ")]);

  return (
    <dl className={`space-y-1.5 ${flush ? "" : "pt-3 border-t border-[#27272a]"}`}>
      {rows.map(([label, value]) => (
        <div key={label} className="flex gap-3 items-baseline">
          <dt className="font-mono text-[10px] text-[#a1a1aa] uppercase tracking-wider w-[52px] shrink-0">
            {label}
          </dt>
          <dd className="font-mono text-[10px] text-[#a1a1aa] leading-snug min-w-0">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
