import type { Metadata } from "next";
import Image from "next/image";
import { allProjects } from "@/content/projects";
import { Mechanism } from "@/components/ui/Mechanism";
import { ProjectIndex } from "@/components/ui/ProjectIndex";
import { MetricTable, type MetricRow } from "@/components/ui/MetricTable";
import { CredentialTable } from "@/components/ui/CredentialTable";

export const metadata: Metadata = {
  title: { absolute: "Yoshio Nomura — AI and backend engineering" },
  description:
    "Backend and AI-infrastructure engineering: routing, retrieval, and gating expensive compute behind cheap fast paths.",
};

/**
 * Every figure on the site, read out of the project content modules — never retyped.
 * A retyped copy drifts (it already had once: "structured path" vs Roomie's own
 * "structured matching path only"), and it would sidestep the required `condition`.
 */
const measured: MetricRow[] = allProjects.flatMap((p) =>
  p.metrics.map((m) => ({ ...m, source: p.title })),
);

function SectionHead({ id, title, note }: { id: string; title: string; note?: string }) {
  return (
    <div className="mb-3.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-rule-strong pb-2">
      <h2 id={id} className="m-0 font-cond text-[24px] font-semibold">
        {title}
      </h2>
      {note && <p className="m-0 text-[15.5px] text-ink-2">{note}</p>}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Thesis first; identity beside it */}
      <div className="grid grid-cols-1 items-end gap-7 pb-8 pt-14 lg:grid-cols-[minmax(0,8fr)_minmax(0,3fr)] lg:gap-14">
        <div>
          <h1 className="mb-5 max-w-[17ch] text-[clamp(34px,5.4vw,64px)] font-medium leading-[1.06] tracking-[-0.02em]">
            A cheap decision, <span className="font-normal text-ink-2">deciding whether the expensive one runs.</span>
          </h1>
          <p className="m-0 max-w-[60ch] text-[18px] text-ink-2">
            Two of the projects below are the same idea twice. An XGBoost classifier scores an ICU stream event and
            only then pays for an LLM call. A local Qwen 2.5 3B model reads a task&rsquo;s difficulty and routes it
            before a cloud API is touched.
          </p>
        </div>
        <div className="grid grid-cols-[72px_1fr] gap-x-4 rounded-card border border-rule bg-sheet px-[18px] py-4 lg:block">
          <Image
            src="/static/operator.jpg"
            alt=""
            width={72}
            height={88}
            priority
            className="row-span-2 h-[88px] w-[72px] rounded-[3px] object-cover grayscale lg:mb-3"
          />
          <p className="m-0 text-[19px] font-semibold">Yoshio Nomura</p>
          <dl className="m-0 mt-2.5 grid gap-[7px]">
            {[
              ["Studying", "Bachelor of Artificial Intelligence, UTS"],
              ["Level", "Undergraduate / intern"],
              ["Based", "Ho Chi Minh City, Vietnam"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-cond text-[12.5px] text-ink-2">{k}</dt>
                <dd className="m-0 text-[14.5px] leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <Mechanism />

      <section aria-labelledby="experience-heading" className="mt-[76px]">
        <SectionHead id="experience-heading" title="Experience" />
        <div className="grid grid-cols-1 gap-1 rounded-card border border-rule bg-sheet px-6 py-5 md:grid-cols-[200px_1fr] md:gap-6">
          <div>
            <div className="fig text-[14px] font-normal">1 Jul – 16 Sep 2026</div>
            <div className="font-cond text-[14px] text-ink-2">Completed</div>
          </div>
          <div>
            <h3 className="m-0 mb-1 text-[19px] font-medium">FlyRank AI — Backend AI Engineer, Internship (Remote)</h3>
            <p className="m-0 text-ink-2">
              Completed both the Backend AI Engineering and AI Fluency tracks; certificates issued 16 September 2026.
            </p>
          </div>
        </div>
      </section>

      <section id="work" aria-labelledby="work-heading" className="mt-[76px] scroll-mt-6">
        <SectionHead
          id="work-heading"
          title="Work"
          note={`${allProjects.length} projects, grouped by what they do. Team or solo on every row.`}
        />
        <ProjectIndex />
      </section>

      <section id="measured" aria-labelledby="measured-heading" className="mt-[76px] scroll-mt-6">
        <SectionHead
          id="measured-heading"
          title="Measured"
          note="Every figure on this site, read with the conditions it was measured under."
        />
        <MetricTable rows={measured} caption="Every measured result on this site, with its test conditions" />
      </section>

      <section id="credentials" aria-labelledby="credentials-heading" className="mt-[76px] scroll-mt-6">
        <SectionHead
          id="credentials-heading"
          title="Credentials"
          note="Titles open the certificate and, where offered, the issuer's verifier."
        />
        <CredentialTable />
      </section>
    </>
  );
}
