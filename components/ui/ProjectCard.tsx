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
      className={`group relative block rounded-md border p-5 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b82f6] ${
        isTier1
          ? "tier1-card border-[#10b981]/20 bg-[#111113] hover:border-[#10b981]/40"
          : "border-[#27272a] bg-[#111113] hover:border-[#71717a]/50"
      }`}
    >
      {/* Tier 1 pulse border — signature element */}
      {isTier1 && <span className="tier1-pulse" aria-hidden="true" />}

      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <TierLabel tier={project.tier} />
          </div>
          <h2 className="text-base font-semibold text-[#fafafa] leading-snug group-hover:text-white transition-colors">
            {project.title}
          </h2>
          <p className="text-[11px] font-mono text-[#71717a] mt-0.5 tracking-wide">
            {project.domain}
          </p>
        </div>
        <span
          className={`text-sm font-mono flex-shrink-0 mt-0.5 transition-transform duration-150 group-hover:translate-x-0.5 ${
            isTier1 ? "text-[#10b981]" : "text-[#71717a]"
          }`}
          aria-hidden="true"
        >
          →
        </span>
      </div>

      <p className="text-xs text-[#71717a] leading-relaxed mb-4 line-clamp-3">
        {project.summary}
      </p>

      <MetricGrid metrics={project.metrics} />
    </Link>
  );
}
