import { Metric } from "@/content/types";

interface MetricListProps {
  metrics: Metric[];
  /** Drop the top rule when this already sits beneath a section heading. */
  flush?: boolean;
}

/**
 * Measurements, each carrying the conditions it was measured under.
 *
 * The condition is not fine print — it is the half of the claim that makes the number
 * mean anything (truth file §9.1). It is never truncated or hidden behind a hover, and
 * it must stay legible: do not drop its colour below #71717a or its size below 10px.
 * Setting it dimmer than the label turns a required disclosure into decoration.
 *
 * Returns null on an empty array rather than an empty bordered box: two of the five
 * projects legitimately have nothing measured, and that should look deliberate.
 */
export function MetricList({ metrics, flush = false }: MetricListProps) {
  if (metrics.length === 0) return null;

  return (
    <div className={`space-y-2.5 ${flush ? "" : "pt-3 mt-3 border-t border-[#27272a]"}`}>
      {metrics.map((metric) => (
        <div key={metric.label}>
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-mono text-[9px] text-[#71717a] uppercase tracking-wide leading-tight">
              {metric.label}
            </span>
            <span className="font-mono text-xs font-semibold text-[#fafafa] leading-none shrink-0">
              {metric.value}
            </span>
          </div>
          <p className="font-mono text-[10px] text-[#71717a] leading-snug mt-1">
            {metric.condition}
          </p>
        </div>
      ))}
    </div>
  );
}
