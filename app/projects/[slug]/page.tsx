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
  vora: localRagApi,
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
  const isTier1 = project.tier === 1;

  return (
    <main className="min-h-screen px-4 py-16 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      {/* Back navigation */}
      <nav aria-label="Breadcrumb" className="mb-10">
        <Link
          href="/"
          className="text-[10px] font-mono text-[#71717a] hover:text-[#fafafa] tracking-[0.15em] uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3b82f6]"
        >
          ← Core Pillars Matrix
        </Link>
      </nav>

      {/* Project header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <TierLabel tier={project.tier} />
          <span className="text-[10px] font-mono text-[#71717a] tracking-wider">
            {project.domain}
          </span>
        </div>
        <h1
          className={`text-3xl sm:text-4xl font-semibold leading-tight tracking-tight mb-4 ${
            isTier1 ? "text-[#fafafa]" : "text-[#fafafa]"
          }`}
        >
          {project.title}
        </h1>
        <p className="text-sm text-[#71717a] leading-relaxed">{project.summary}</p>
      </header>

      {/* Metrics */}
      <section aria-labelledby="metrics-heading" className="mb-10">
        <h2
          id="metrics-heading"
          className="text-[10px] font-mono text-[#71717a] tracking-[0.2em] uppercase mb-4"
        >
          Performance Targets
        </h2>
        <MetricGrid metrics={project.metrics} />
      </section>

      {/* SVG Visualization — Pulsemind only */}
      {slug === "pulsemind" && (
        <section aria-labelledby="viz-heading" className="mb-10">
          <h2
            id="viz-heading"
            className="text-[10px] font-mono text-[#71717a] tracking-[0.2em] uppercase mb-2"
          >
            Architecture Flow
          </h2>
          <PulsemindFlow />
        </section>
      )}

      {/* Architecture pattern */}
      <section aria-labelledby="arch-heading" className="mb-10">
        <h2
          id="arch-heading"
          className="text-[10px] font-mono text-[#71717a] tracking-[0.2em] uppercase mb-3"
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
        <section aria-labelledby="mcp-heading" className="mb-10">
          <h2
            id="mcp-heading"
            className="text-[10px] font-mono text-[#71717a] tracking-[0.2em] uppercase mb-3"
          >
            MCP Integration
          </h2>
          <p className="text-sm text-[#71717a] leading-relaxed border-l-2 border-[#10b981]/40 pl-4">
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
    </main>
  );
}
