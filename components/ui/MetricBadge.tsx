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
    /* A <dl>, so the condition is programmatically bound to the value it qualifies.
       As flat sibling <span>s a screen reader read "Classifier forward pass", "<5 ms",
       "per stream event" as three unrelated strings — the pairing existed only in the
       visual layout, which is no use to the reader who most needs it spelled out. */
    <dl className={`space-y-2.5 ${flush ? "" : "pt-3 mt-3 border-t border-[#27272a]"}`}>
      {metrics.map((metric) => (
        <div key={metric.label}>
          <dt className="font-mono text-[9px] text-[#a1a1aa] uppercase tracking-wide leading-tight">
            {metric.label}
          </dt>
          <dd className="flex items-baseline justify-between gap-3 mt-0.5">
            <span className="font-mono text-[10px] text-[#a1a1aa] leading-snug order-2 min-w-0">
              {metric.condition}
            </span>
            <span className="font-mono text-xs font-semibold text-[#fafafa] leading-none shrink-0 order-1">
              {metric.value}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
