import Link from "next/link";
import { ProjectSchema } from "@/content/types";
import { TierLabel } from "./TierLabel";
import { MetricGrid } from "./MetricBadge";

interface ProjectCardProps {
  project: ProjectSchema;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isTier1 = project.tier === 1;

  return (
    <Link
      href={project.contentFunnelRoute}
      id={`project-card-${project.id}`}
      className={`group relative block rounded-lg border p-5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b82f6] ${
        isTier1
          ? "tier1-card border-[#10b981]/20 bg-[#10b981]/3 hover:border-[#10b981]/40 hover:bg-[#10b981]/6"
          : "border-[#27272a] bg-[#27272a]/30 hover:border-[#71717a]/40 hover:bg-[#27272a]/50"
      }`}
    >
      {/* Tier 1 pulse border — signature element */}
      {isTier1 && <span className="tier1-pulse" aria-hidden="true" />}

      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <TierLabel tier={project.tier} />
          </div>
          <h2 className="text-base font-semibold text-[#fafafa] leading-tight group-hover:text-white transition-colors">
            {project.title}
          </h2>
          <p className="text-[11px] font-mono text-[#71717a] mt-0.5 tracking-wide">
            {project.domain}
          </p>
        </div>
        <span
          className={`text-xs font-mono transition-transform duration-150 group-hover:translate-x-0.5 ${
            isTier1 ? "text-[#10b981]" : "text-[#71717a]"
          }`}
          aria-hidden="true"
        >
          →
        </span>
      </div>

      <p className="text-xs text-[#71717a] leading-relaxed mb-4 line-clamp-2">
        {project.summary}
      </p>

      <div className="text-[10px] font-mono text-[#71717a]/70 mb-3 tracking-wide">
        {project.architecturePattern}
      </div>

      <MetricGrid metrics={project.metrics} />
    </Link>
  );
}
