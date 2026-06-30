import { Metric } from "@/content/types";

interface MetricBadgeProps {
  metric: Metric;
}

export function MetricBadge({ metric }: MetricBadgeProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[8px] text-[#71717a] uppercase tracking-normal leading-tight line-clamp-2">
        {metric.label}
      </span>
      <span className="font-mono text-xs font-semibold text-[#fafafa] leading-none">
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
    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#27272a]">
      {metrics.map((metric) => (
        <MetricBadge key={metric.label} metric={metric} />
      ))}
    </div>
  );
}
