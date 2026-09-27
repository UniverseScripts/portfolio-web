import type { Metadata } from "next";
import { allProjects, projectsRegistry } from "@/content/projects";
import type { ProductSchema } from "@/content/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projectGroups } from "@/content/projects/groups";
import { MetricTable } from "@/components/ui/MetricTable";
import { ProductCTA } from "@/components/ui/ProductCTA";
import { PulsemindFlow } from "@/components/visualizations/PulsemindFlow";

// Product CTA data — co-located with routing to keep slug-to-product mapping explicit
import { localRagApi } from "@/content/products/local-rag-api";
import { nextjsStarterKit } from "@/content/products/nextjs-starter-kit";
import { globalTechIntelligence } from "@/content/products/global-tech-intelligence";

/**
 * Products keyed by their own id, resolved through each project's
 * `gumroadProductId`. This replaced a hardcoded slug→product map that ignored that
 * field, and the two disagreed on three of five routes: Pulsemind and Weatherise
 * both set `null` yet rendered a CTA, and Vora declared one yet rendered none.
 *
 * The consequence was not a missing button. The map anchored the Local RAG API CTA
 * to the Pulsemind case study and the Global Tech Intelligence CTA to Weatherise —
 * placing each paid product on precisely the project its own file comment says it
 * may not lean on. One live mapping, declared in the content, is the fix.
 */
const productsById: Record<string, ProductSchema> = {
  [localRagApi.id]: localRagApi,
  [nextjsStarterKit.id]: nextjsStarterKit,
  [globalTechIntelligence.id]: globalTechIntelligence,
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
    openGraph: { title: `${project.title} · Yoshio Nomura`, description: project.summary },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsRegistry[slug];

  if (!project) {
    notFound();
  }

  const product = project.gumroadProductId
    ? productsById[project.gumroadProductId] ?? null
    : null;

  // The project record. Attribution travels with the role (truth file §9.3 / §11.6),
  // so "Contribution" comes first and is never abbreviated.
  const record: Array<[string, string]> = [
    ["Contribution", project.role],
    ["When", project.period],
    ...(project.venue ? [["Built at", project.venue] as [string, string]] : []),
    ["Stack", project.stack.join(" · ")],
  ];

  const h2 = "m-0 mb-2 font-cond text-[20px] font-semibold";

  return (
    <article>
      <header className="pb-2 pt-9">
        <p className="m-0 mb-3 font-cond text-[15px] text-ink-2">
          <Link href="/#work">← All work</Link> · {projectGroups[project.group].heading}
        </p>
        <h1 className="m-0 text-[clamp(36px,5vw,58px)] font-medium leading-[1.05] tracking-[-0.02em]">
          {project.title}
        </h1>
        <p className="m-0 mt-1.5 text-[19px] text-ink-2">{project.domain}</p>
      </header>

      <div className="mt-6 grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
        <aside
          aria-label="Project record"
          className="rounded-card border border-rule bg-sheet px-5 py-1.5 lg:sticky lg:top-5 lg:order-2"
        >
          <dl className="m-0">
            {record.map(([k, v]) => (
              <div key={k} className="border-b border-rule py-[11px] last:border-b-0">
                <dt className="font-cond text-[13px] text-ink-2">{k}</dt>
                <dd className="m-0 mt-0.5 text-[15.5px] leading-[1.45]">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="space-y-9 lg:order-1">
          <section aria-labelledby="what-heading">
            <h2 id="what-heading" className={h2}>What it is</h2>
            <p className="m-0 max-w-[66ch]">{project.summary}</p>
          </section>

          {/*
            "Evaluation" holds measurements only — never targets (truth file §9.6). The
            section is absent, not empty, when nothing was measured.
          */}
          {project.metrics.length > 0 && (
            <section id="evaluation" aria-labelledby="evaluation-heading" className="scroll-mt-6">
              <h2 id="evaluation-heading" className={h2}>Evaluation</h2>
              <MetricTable rows={project.metrics} caption={`${project.title}: measured results with test conditions`} />
            </section>
          )}

          {slug === "pulsemind" && (
            <section aria-labelledby="flow-heading">
              <h2 id="flow-heading" className={h2}>Pipeline</h2>
              <PulsemindFlow />
            </section>
          )}

          <section aria-labelledby="how-heading">
            <h2 id="how-heading" className={h2}>How it works</h2>
            <p className="m-0 mb-3 font-cond text-[16px] text-cond">{project.architecturePattern}</p>
            <p className="m-0 max-w-[66ch]">{project.architectureDetail}</p>
          </section>

          {project.mcpIntegration && (
            <section aria-labelledby="mcp-heading">
              <h2 id="mcp-heading" className={h2}>MCP integration</h2>
              <p className="m-0 max-w-[66ch]">{project.mcpIntegration}</p>
            </section>
          )}

          {product && (
            <ProductCTA title={product.title} description={product.description} url={product.url} />
          )}
        </div>
      </div>
    </article>
  );
}
