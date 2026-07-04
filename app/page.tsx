import type { Metadata } from "next";
import Image from "next/image";
import { allProjects } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { GitHubGrid } from "@/components/visualizations/GitHubGrid";
import { VerificationGrid } from "@/components/ui/VerificationGrid";

export const metadata: Metadata = {
  title: "Systems Engineering Portfolio",
  description:
    "High-stakes systems engineering: RAG pipelines, MCP integration layers, CQRS/DDD patterns, and low-latency realtime architecture.",
};

const tier1Projects = allProjects.filter((p) => p.tier === 1);
const tier2Projects = allProjects.filter((p) => p.tier === 2);

/** Telemetry targets — static at build time, no runtime fetch */
const telemetryTargets = [
  { label: "Guardrail Latency", value: "<120ms", source: "Pulsemind" },
  { label: "Stream SLA p99", value: "<2000ms", source: "Weatherise" },
  { label: "Command Throughput", value: "2400 evt/s", source: "Roomie" },
  { label: "Agent Coordination", value: "<35ms", source: "Vora" },
];

/** Operator profile — v2 implementation plan */
const operatorProfile = {
  name: "Yoshio Nomura",
  title: "Full-Stack & AI Infrastructure Engineer",
  institution: "University of Technology Sydney (UTS)",
  discipline: "Computer Science & Artificial Intelligence Major",
  location: "Ho Chi Minh City, VN // Global Routing",
  avatarSrc: "/operator.jpg",
  networks: [
    { label: "GitHub", href: "https://github.com/UniverseScripts" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yoshio-nomura-b3219438b/" },
    { label: "X", href: "https://x.com/Asterios07" },
    { label: "Gumroad", href: "https://galacticgamer62.gumroad.com" },
  ],
};

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-14 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">

      {/* ── Header & Identity Matrix (12-column grid split) ── */}
      <header className="mb-0">
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-8 animate-boot"
          style={{ "--boot-delay": "50ms" } as React.CSSProperties}
        >
          {/* Left Column (lg:col-span-8): Thesis Statement & Current Experience */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-6">
            <div>
              <p className="text-[10px] font-mono text-[#3b82f6] tracking-[0.2em] uppercase mb-4 select-none">
                Systems Engineering // Core Engine
              </p>
              <h1 className="text-3xl sm:text-5xl font-bold text-[#fafafa] leading-tight mb-5 tracking-tight">
                High-Stakes Architecture,
                <br />
                <span className="text-[#71717a] font-semibold">
                  deployed at latency boundaries.
                </span>
              </h1>
              <p className="text-base text-[#71717a] leading-relaxed max-w-2xl mb-8">
                RAG pipelines with clinical safety guardrails. MCP surrogate
                patterns for zero-downtime provider rotation. CQRS/DDD at 2400
                events/s. Each project is a structural tradeoff decision,
                documented.
              </p>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#27272a]/30 max-w-xl">
                <div>
                  <p className="text-[9px] font-mono text-[#71717a] uppercase tracking-wider select-none">Metrics Ingest</p>
                  <p className="text-sm font-mono font-semibold text-[#fafafa] mt-0.5">2.4K ev/s</p>
                </div>
                <div>
                  <p className="text-[9px] font-mono text-[#71717a] uppercase tracking-wider select-none">Clinically Safe</p>
                  <p className="text-sm font-mono font-semibold text-[#fafafa] mt-0.5">RAG Gate</p>
                </div>
                <div>
                  <p className="text-[9px] font-mono text-[#71717a] uppercase tracking-wider select-none">Scale Pattern</p>
                  <p className="text-sm font-mono font-semibold text-[#fafafa] mt-0.5">CQRS / DDD</p>
                </div>
              </div>
            </div>

            {/* Current Experience — FlyRank AI */}
            <div className="pt-4">
              <p className="text-[9px] font-mono text-[#71717a] tracking-[0.15em] uppercase mb-3">
                Current Experience
              </p>
              <div className="border border-[#27272a] rounded-md p-4 bg-[#111113] flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-[#3b82f6] uppercase tracking-wider">
                      FlyRank AI
                    </span>
                    <span className="text-[8px] font-mono text-[#10b981] px-1.5 py-0.5 rounded bg-[#10b981]/10 border border-[#10b981]/20 uppercase tracking-wider">
                      Ongoing
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-[#fafafa]">
                    AI Engineering Intern
                  </span>
                  <p className="text-[11px] font-mono text-[#71717a] leading-relaxed max-w-xl">
                    Building AI-powered ranking and search infrastructure. Working across model integration, API design, and production deployment pipelines.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (lg:col-span-4): Operator Identity Node */}
          <div className="lg:col-span-4 border border-[#27272a] rounded-md p-5 bg-[#111113]">
            {/* Node header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#27272a]">
              <p className="text-[9px] font-mono text-[#71717a] tracking-[0.15em] uppercase">
                [Operator Profile]
              </p>
              <span className="text-[8px] font-mono text-[#10b981] px-1.5 py-0.5 rounded bg-[#10b981]/10 border border-[#10b981]/20 uppercase tracking-wider">
                Online
              </span>
            </div>

            {/* Photo block — grayscale, hover reveals color */}
            <div className="relative w-full aspect-square mb-4 rounded border border-[#27272a] bg-[#0d0d0f] overflow-hidden group">
              <Image
                src={operatorProfile.avatarSrc}
                alt="Operator portrait"
                width={300}
                height={300}
                priority
                className="w-full h-full object-cover object-center grayscale contrast-[1.15] brightness-90 group-hover:grayscale-0 transition-all duration-500 ease-in-out"
              />
              {/* Fade vignette — bottom only */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent opacity-50 pointer-events-none" />
            </div>

            {/* Parameter grid */}
            <div className="space-y-3 mb-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-mono text-[#71717a] uppercase tracking-wider">
                  Identity
                </span>
                <span className="text-xs font-mono font-medium text-[#fafafa]">
                  {operatorProfile.name}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-mono text-[#71717a] uppercase tracking-wider">
                  Role
                </span>
                <span className="text-xs font-mono font-medium text-[#fafafa]">
                  {operatorProfile.title}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-mono text-[#71717a] uppercase tracking-wider">
                  Affiliation
                </span>
                <span className="text-xs font-mono text-[#fafafa]">
                  {operatorProfile.institution}
                </span>
                <span className="text-[9px] font-mono text-[#71717a]/80 mt-0.5">
                  {operatorProfile.discipline}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-mono text-[#71717a] uppercase tracking-wider">
                  Base Context
                </span>
                <span className="text-xs font-mono text-[#fafafa]">
                  {operatorProfile.location}
                </span>
              </div>
            </div>

            {/* Network channel array */}
            <div className="border-t border-[#27272a] pt-3">
              <p className="text-[8px] font-mono text-[#71717a] uppercase tracking-widest mb-2">
                Active Channels
              </p>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                {operatorProfile.networks.map((net) => (
                  <a
                    key={net.label}
                    href={net.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-[11px] font-mono text-[#3b82f6] hover:text-[#fafafa] transition-colors duration-150 flex items-center gap-1 min-w-0"
                  >
                    <span className="text-[#27272a] group-hover:text-[#71717a] transition-colors duration-150" aria-hidden="true">↳</span>
                    <span className="truncate">{net.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Signature element: signal-decay rule */}
        <hr className="signal-rule animate-signal-crawl mb-0" aria-hidden="true" />

        {/* Telemetry strip — between header and matrix */}
        <div
          aria-label="System performance targets"
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-5 border-b border-[#27272a] mb-12 animate-boot"
          style={{ "--boot-delay": "150ms" } as React.CSSProperties}
        >
          {telemetryTargets.map((t) => (
            <div key={t.label} className="flex flex-col gap-0.5">
              <span className="text-[9px] font-mono text-[#71717a]/60 tracking-wider uppercase leading-none">
                {t.label}
              </span>
              <span className="text-base font-mono font-semibold text-[#fafafa] leading-snug animate-data-flicker">
                {t.value}
              </span>
              <span className="text-[9px] font-mono text-[#3b82f6]/60 tracking-wider">
                {t.source}
              </span>
            </div>
          ))}
        </div>
      </header>

      {/* ── GitHub Commit Grid ── */}
      <div className="animate-boot" style={{ "--boot-delay": "250ms" } as React.CSSProperties}>
        <GitHubGrid username="UniverseScripts" />
      </div>

      {/* ── Institutional Verification Grid ── */}
      <div className="animate-boot" style={{ "--boot-delay": "350ms" } as React.CSSProperties}>
        <VerificationGrid />
      </div>

      {/* ── Core Pillars Matrix ── */}
      <section 
        aria-labelledby="matrix-heading" 
        className="animate-boot" 
        style={{ "--boot-delay": "450ms" } as React.CSSProperties}
      >
        <h2
          id="matrix-heading"
          className="text-[10px] font-mono text-[#71717a] tracking-[0.2em] uppercase mt-8 mb-6"
        >
          Core Pillars Matrix
        </h2>

        {/* Tier 1 row */}
        <div className="mb-8">
          <p className="text-[9px] font-mono text-[#10b981] tracking-[0.15em] uppercase mb-3 flex items-center gap-2">
            <span
              className="inline-block w-1 h-1 rounded-full bg-[#10b981]"
              aria-hidden="true"
            />
            Tier 1 — High-Stakes Systems Engineering
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tier1Projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Tier 2 row */}
        <div>
          <p className="text-[9px] font-mono text-[#71717a] tracking-[0.15em] uppercase mb-3 flex items-center gap-2">
            <span
              className="inline-block w-1 h-1 rounded-full bg-[#71717a]"
              aria-hidden="true"
            />
            Tier 2 — Decoupled Patterns &amp; Tooling
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tier2Projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
