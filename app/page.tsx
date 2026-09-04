import type { Metadata } from "next";
import Image from "next/image";
import { allProjects } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { VerificationGrid } from "@/components/ui/VerificationGrid";

export const metadata: Metadata = {
  title: "Systems Engineering Portfolio",
  description:
    "Backend and AI-infrastructure engineering: routing, retrieval, and gating expensive compute behind cheap fast paths.",
};

const tier1Projects = allProjects.filter((p) => p.tier === 1);
const tier2Projects = allProjects.filter((p) => p.tier === 2);

/**
 * Measurements, not targets.
 *
 * Entries here must be instrumented figures shown with the conditions they were
 * measured under (truth file §9.1). A design target, a KPI, or a number from a
 * single-user demo does not qualify. Two entries is the honest count — do not pad it.
 */
const measurements = [
  {
    label: "Classifier forward pass",
    value: "<5 ms",
    condition: "per stream event",
    source: "Pulsemind",
  },
  {
    label: "Average request latency",
    value: "~12 ms",
    condition: "structured path — excludes embedding generation",
    source: "Roomie",
  },
];

/** Operator profile — v2 implementation plan */
const operatorProfile = {
  name: "Yoshio Nomura",
  title: "AI & Backend Engineering — undergraduate / intern",
  institution: "University of Technology Sydney (UTS)",
  discipline: "Bachelor of Artificial Intelligence, Faculty of Engineering & IT",
  location: "Ho Chi Minh City, VN // Global Routing",
  avatarSrc: "/static/operator.jpg",
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
                A cheap fast path,
                <br />
                <span className="text-[#71717a] font-semibold">
                  deciding whether the expensive one runs.
                </span>
              </h1>
              <p className="text-base text-[#71717a] leading-relaxed max-w-2xl mb-8">
                Two of the projects below are the same idea twice. An XGBoost classifier
                scores ICU stream events in under 5&nbsp;ms and only then pays for an LLM
                call. A local Qwen-3B model reads a task&rsquo;s difficulty and routes it
                before a cloud API is touched. Put a cheap decision in front of an
                expensive one and the expensive one stops setting the pace.
              </p>
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
                    Backend AI Engineer — Internship (Remote)
                  </span>
                  <p className="text-[11px] font-mono text-[#71717a] leading-relaxed max-w-xl">
                    Model integration and API design. Work in progress.
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

        {/* Measurement strip — between header and matrix */}
        <div
          aria-label="Measured figures, with the conditions they were measured under"
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-5 border-b border-[#27272a] mb-12 animate-boot"
          style={{ "--boot-delay": "150ms" } as React.CSSProperties}
        >
          {measurements.map((m) => (
            <div key={m.label} className="flex flex-col gap-0.5">
              <span className="text-[9px] font-mono text-[#71717a]/60 tracking-wider uppercase leading-none">
                {m.label}
              </span>
              <span className="text-base font-mono font-semibold text-[#fafafa] leading-snug animate-data-flicker">
                {m.value}
              </span>
              {/* The condition is half the claim — it renders, it is not a tooltip */}
              <span className="text-[9px] font-mono text-[#52525b] leading-snug">
                {m.condition}
              </span>
              <span className="text-[9px] font-mono text-[#3b82f6]/60 tracking-wider">
                {m.source}
              </span>
            </div>
          ))}
        </div>
      </header>

      {/* ── Credentials ── */}
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
            Tier 1 — Featured work
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
            Tier 2 — Further work
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
