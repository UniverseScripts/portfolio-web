import { Metric } from "@/content/types";

interface MetricBadgeProps {
  metric: Metric;
}

export function MetricBadge({ metric }: MetricBadgeProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-xs text-[#71717a] uppercase tracking-wider leading-none">
        {metric.label}
      </span>
      <span className="font-mono text-sm font-semibold text-[#fafafa] leading-tight">
        {metric.value}
      </span>
    </div>
  );
}

interface MetricGridProps {
  metrics: Metric[];
}

export function MetricGrid({ metrics }: MetricGridProps) {
  return (
    <div className="grid grid-cols-3 gap-4 pt-3 border-t border-[#27272a]">
      {metrics.map((metric) => (
        <MetricBadge key={metric.label} metric={metric} />
      ))}
    </div>
  );
}
