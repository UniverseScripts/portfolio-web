import type { Metadata } from "next";
import { allProjects, projectsRegistry } from "@/content/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TierLabel } from "@/components/ui/TierLabel";
import { MetricGrid } from "@/components/ui/MetricBadge";
import { ProductCTA } from "@/components/ui/ProductCTA";
import { PulsemindFlow } from "@/components/visualizations/PulsemindFlow";

// Product CTA data — co-located with routing to keep slug-to-product mapping explicit
import { localRagApi } from "@/content/products/local-rag-api";
import { nextjsStarterKit } from "@/content/products/nextjs-starter-kit";
import { globalTechIntelligence } from "@/content/products/global-tech-intelligence";

const productByProject: Record<
  string,
  { title: string; description: string; url: string }
> = {
  pulsemind: localRagApi,
  roomie: nextjsStarterKit,
  weatherise: globalTechIntelligence,
};

export function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.id,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsRegistry[slug];
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsRegistry[slug];

  if (!project) {
    notFound();
  }

  const product = productByProject[slug] ?? null;

  return (
    <main className="min-h-screen px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column (lg:col-span-4): Sticky Meta & Context Sidebar */}
        <aside className="lg:col-span-4 lg:sticky lg:top-16 space-y-8 animate-boot" style={{ "--boot-delay": "50ms" } as React.CSSProperties}>
          {/* Back navigation */}
          <nav aria-label="Breadcrumb">
            <Link
              href="/"
              className="text-[10px] font-mono text-[#71717a] hover:text-[#fafafa] tracking-[0.15em] uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3b82f6]"
            >
              ← Core Pillars Matrix
            </Link>
          </nav>

          {/* Project header */}
          <header className="pb-6 border-b border-[#27272a]/60">
            <div className="flex items-center gap-3 mb-3">
              <TierLabel tier={project.tier} />
              <span className="text-[10px] font-mono text-[#71717a] tracking-wider select-none">
                {project.domain}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-4 text-[#fafafa]">
              {project.title}
            </h1>
            <p className="text-sm text-[#71717a] leading-relaxed">{project.summary}</p>
          </header>

          {/* Metrics */}
          <section aria-labelledby="metrics-heading">
            <h2
              id="metrics-heading"
              className="text-[10px] font-mono text-[#71717a] tracking-[0.2em] uppercase mb-4 select-none"
            >
              Performance Targets
            </h2>
            <MetricGrid metrics={project.metrics} />
          </section>
        </aside>

        {/* Right Column (lg:col-span-8): Deep Dive & Architecture Sheet */}
        <div className="lg:col-span-8 space-y-10 animate-boot" style={{ "--boot-delay": "150ms" } as React.CSSProperties}>
          
          {/* SVG Visualization — Pulsemind only */}
          {slug === "pulsemind" && (
            <section aria-labelledby="viz-heading" className="border border-[#27272a] rounded-md p-6 bg-[#111113]">
              <h2
                id="viz-heading"
                className="text-[10px] font-mono text-[#71717a] tracking-[0.2em] uppercase mb-4 select-none"
              >
                Architecture Flow
              </h2>
              <PulsemindFlow />
            </section>
          )}

          {/* Architecture pattern */}
          <section aria-labelledby="arch-heading" className="border border-[#27272a] rounded-md p-6 bg-[#111113]">
            <h2
              id="arch-heading"
              className="text-[10px] font-mono text-[#71717a] tracking-[0.2em] uppercase mb-3 select-none"
            >
              Architecture Pattern
            </h2>
            <p className="text-[11px] font-mono text-[#3b82f6] mb-4 tracking-wide">
              {project.architecturePattern}
            </p>
            <p className="text-sm text-[#71717a] leading-relaxed">{project.architectureDetail}</p>
          </section>

          {/* MCP Integration note */}
          {project.mcpIntegration && (
            <section aria-labelledby="mcp-heading" className="border border-[#27272a] rounded-md p-6 bg-[#111113]">
              <h2
                id="mcp-heading"
                className="text-[10px] font-mono text-[#71717a] tracking-[0.2em] uppercase mb-3 select-none"
              >
                MCP Integration
              </h2>
              <p className="text-sm text-[#a1a1aa] leading-relaxed border-l-2 border-[#10b981] pl-4 font-mono text-xs">
                {project.mcpIntegration}
              </p>
            </section>
          )}

          {/* Product CTA — anchored at bottom of post-mortem per guidelines */}
          {product && (
            <ProductCTA
              title={product.title}
              description={product.description}
              url={product.url}
            />
          )}
        </div>

      </div>
    </main>
  );
}
