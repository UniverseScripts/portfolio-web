import type { Metadata } from "next";
import { allProjects } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";

export const metadata: Metadata = {
  title: "Systems Engineering Portfolio",
  description:
    "High-stakes systems engineering: RAG pipelines, MCP integration layers, CQRS/DDD patterns, and low-latency realtime architecture.",
};

const tier1Projects = allProjects.filter((p) => p.tier === 1);
const tier2Projects = allProjects.filter((p) => p.tier === 2);

/** Telemetry targets derived from content — no runtime fetch, static at build time */
const telemetryTargets = [
  { label: "Guardrail Latency Floor", value: "<120ms", source: "Pulsemind" },
  { label: "Stream Resolution SLA p99", value: "<2000ms", source: "Weatherise" },
  { label: "Command Throughput Target", value: "2400 evt/s", source: "Roomie" },
  { label: "Agent Coordination Ceiling", value: "<35ms", source: "Vora" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-16 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* ── Header ── */}
      <header className="mb-16">
        <p className="text-[10px] font-mono text-[#3b82f6] tracking-[0.2em] uppercase mb-3">
          Systems Engineering
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#fafafa] leading-tight mb-4 tracking-tight">
          High-Stakes Architecture,
          <br />
          <span className="text-[#71717a]">deployed at latency boundaries.</span>
        </h1>
        <p className="text-sm text-[#71717a] leading-relaxed max-w-xl">
          RAG pipelines with clinical safety guardrails. MCP surrogate patterns for zero-downtime
          provider rotation. CQRS/DDD at 2400 events/s. Each project is a structural tradeoff
          decision, documented.
        </p>
      </header>

      {/* ── Core Pillars Matrix ── */}
      <section aria-labelledby="matrix-heading" className="mb-16">
        <h2
          id="matrix-heading"
          className="text-[10px] font-mono text-[#71717a] tracking-[0.2em] uppercase mb-6"
        >
          Core Pillars Matrix
        </h2>

        {/* Tier 1 row */}
        <div className="mb-3">
          <p className="text-[9px] font-mono text-[#10b981] tracking-[0.15em] uppercase mb-3 flex items-center gap-2">
            <span className="inline-block w-1 h-1 rounded-full bg-[#10b981]" aria-hidden="true" />
            Tier 1 — High-Stakes Systems Engineering
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tier1Projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Tier 2 row */}
        <div className="mt-6">
          <p className="text-[9px] font-mono text-[#71717a] tracking-[0.15em] uppercase mb-3 flex items-center gap-2">
            <span className="inline-block w-1 h-1 rounded-full bg-[#71717a]" aria-hidden="true" />
            Tier 2 — Decoupled Patterns &amp; Tooling
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tier2Projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Telemetry Status Dashboard ── */}
      <section
        aria-labelledby="telemetry-heading"
        className="border border-[#27272a] rounded-lg p-6"
      >
        <h2
          id="telemetry-heading"
          className="text-[10px] font-mono text-[#71717a] tracking-[0.2em] uppercase mb-5"
        >
          System Performance Targets
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {telemetryTargets.map((t) => (
            <div key={t.label} className="flex flex-col gap-1">
              <span className="text-[9px] font-mono text-[#71717a]/70 tracking-wider uppercase leading-none">
                {t.label}
              </span>
              <span className="text-lg font-mono font-semibold text-[#fafafa]">{t.value}</span>
              <span className="text-[9px] font-mono text-[#3b82f6]/70 tracking-wider">
                {t.source}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
