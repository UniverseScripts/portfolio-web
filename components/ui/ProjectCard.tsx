import Link from "next/link";
import { ProjectSchema } from "@/content/types";
import { MetricList } from "./MetricList";
import { ProvenanceRow } from "./ProvenanceRow";

interface ProjectCardProps {
  project: ProjectSchema;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={project.contentFunnelRoute}
      id={`project-card-${project.id}`}
      className="group relative block rounded-md border p-5 border-[#616161] bg-[#111113] hover:border-[#a1a1aa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b82f6]"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-semibold text-[#fafafa] leading-snug group-hover:text-white">
            {project.title}
          </h4>
          <p className="text-[11px] font-mono text-[#a1a1aa] mt-0.5 tracking-wide group-hover:text-[#fafafa]">
            {project.domain}
          </p>
        </div>
        <div
          className={`text-sm font-mono flex-shrink-0 mt-0.5 select-none ${
            "text-[#a1a1aa] group-hover:text-[#fafafa]"
          }`}
          aria-hidden="true"
        >
          {/* Brutalist character swap instead of translation */}
          <span className="group-hover:hidden">_</span>
          <span className="hidden group-hover:inline">→</span>
        </div>
      </div>

      <p className="text-xs text-[#a1a1aa] leading-relaxed mb-4 line-clamp-3 group-hover:text-[#fafafa]">
        {project.summary}
      </p>

      <ProvenanceRow project={project} />
      <MetricList metrics={project.metrics} />
    </Link>
  );
}
