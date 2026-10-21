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
  const record: Array<[string, React.ReactNode]> = [
    ["Contribution", project.role],
    ["When", project.period],
    ...(project.venue ? [["Built at", project.venue] as [string, React.ReactNode]] : []),
    ["Stack", project.stack.join(" · ")],
    ...(project.demoUrl
      ? [["Demo", <a key="demo" href={project.demoUrl}>{project.demoUrl.replace("https://", "")}</a>] as [string, React.ReactNode]]
      : []),
    ...(project.repoUrl
      ? [["Source", <a key="repo" href={project.repoUrl}>{project.repoUrl.replace("https://github.com/", "")}</a>] as [string, React.ReactNode]]
      : []),
  ];

  const h2 = "m-0 mb-3 text-[clamp(24px,2.2vw,30px)] leading-tight tracking-[-0.01em]";

  return (
    <article>
      <header className="lattice pb-14 pt-[132px]">
        <div className="page">
          <p className="m-0 mb-3 text-[14px] text-ink-2">
            <Link href="/#work">All work</Link> · {projectGroups[project.group].heading}
          </p>
          <h1 className="m-0 text-[clamp(44px,6vw,80px)] leading-[1.05] tracking-[-0.02em]">{project.title}</h1>
          <p className="m-0 mt-3 max-w-[60ch] text-[clamp(16px,1.4vw,19px)] text-ink-2">{project.domain}</p>
          <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0 text-[12.5px] font-medium text-ink-2">
            {project.pyriumTeam && (
              <li className="card rounded-pill px-3 py-1">
                <span aria-hidden="true" className="mr-1.5 inline-block size-[7px] rounded-full bg-pyrium align-middle" />
                Built with the Pyrium team
              </li>
            )}
            <li className="card rounded-pill px-3 py-1">{project.role.split(" — ")[0]}</li>
            <li className="card rounded-pill px-3 py-1">{project.period}</li>
            {project.venue && <li className="card rounded-pill px-3 py-1">{project.venue}</li>}
          </ul>
        </div>
      </header>

      <div className="page mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
        <aside aria-label="Project record" className="card px-6 py-2 lg:sticky lg:top-24 lg:order-2">
          <dl className="m-0">
            {record.map(([k, v]) => (
              <div key={k} className="border-b border-rule py-3 last:border-b-0">
                <dt className="text-[12.5px] text-ink-2">{k}</dt>
                <dd className="m-0 mt-0.5 text-[15px] leading-[1.45] [overflow-wrap:anywhere]">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="space-y-12 lg:order-1">
          <section aria-labelledby="what-heading">
            <h2 id="what-heading" className={h2}>What it is</h2>
            <p className="m-0 max-w-[66ch] text-[17px]">{project.summary}</p>
          </section>

          {/*
            "Evaluation" holds measurements only — never targets (truth file §9.6). The
            section is absent, not empty, when nothing was measured.
          */}
          {project.metrics.length > 0 && (
            <section id="evaluation" aria-labelledby="evaluation-heading" className="scroll-mt-24">
              <h2 id="evaluation-heading" className={h2}>Evaluation</h2>
              <div className="card px-4 pb-2 pt-1">
                <MetricTable rows={project.metrics} caption={`${project.title}: measured results with test conditions`} />
              </div>
            </section>
          )}

          {slug === "pulsemind" && (
            <section aria-labelledby="flow-heading">
              <h2 id="flow-heading" className={h2}>Pipeline</h2>
              <div className="card p-5">
                <PulsemindFlow />
              </div>
            </section>
          )}

          <section aria-labelledby="how-heading">
            <h2 id="how-heading" className={h2}>How it works</h2>
            <p className="m-0 mb-3 text-[16px] font-medium text-ink-2">{project.architecturePattern}</p>
            <p className="m-0 max-w-[66ch] text-[17px]">{project.architectureDetail}</p>
          </section>

          {project.mcpIntegration && (
            <section aria-labelledby="mcp-heading">
              <h2 id="mcp-heading" className={h2}>MCP integration</h2>
              <p className="m-0 max-w-[66ch] text-[17px]">{project.mcpIntegration}</p>
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
