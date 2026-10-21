import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { allProjects } from "@/content/projects";
import { pyrium } from "@/content/affiliations";
import { ThesisShowcase } from "@/components/ui/ThesisShowcase";
import { ProjectIndex } from "@/components/ui/ProjectIndex";
import { MetricTable, type MetricRow } from "@/components/ui/MetricTable";
import { CredentialTable } from "@/components/ui/CredentialTable";

export const metadata: Metadata = {
  title: { absolute: "Yoshio Nomura — AI and backend engineering" },
  description:
    "Undergraduate AI student at UTS working on backends and AI inference: routing, retrieval, and gating expensive compute behind cheap fast paths.",
};

/**
 * Every figure on the site, read out of the project content modules — never retyped.
 * A retyped copy drifts, and it would sidestep the required `condition`. Grouped by the
 * project that produced it, with that project's attribution beside its name.
 */
const measured: MetricRow[] = allProjects.flatMap((p) =>
  p.metrics.map((m) => ({ ...m, source: p.title, attribution: p.role.split(" — ")[0] })),
);

/** Hackathons the work on this site was built at (truth file §4, §7, §11.25). */
const hackathons = ["NVIDIA · OpenACC", "Viettel", "AssemblyAI", "lablab.ai", "OpenAI · Devpost", "AMD", "GDGoC"];

/** Only projects with a demo that loads in a browser today (§11.25 showcase rule). */
const demos = allProjects.filter((p) => p.demoUrl);

function SectionHead({ id, title, lead }: { id: string; title: string; lead?: string }) {
  return (
    <div className="mb-9">
      <h2 id={id} className="m-0 max-w-[22ch] text-[clamp(32px,4vw,50px)] leading-[1.2] tracking-[-0.01em]">
        {title}
      </h2>
      {lead && <p className="m-0 mt-4 max-w-[60ch] text-[clamp(16px,1.4vw,19px)] text-ink-2">{lead}</p>}
    </div>
  );
}

function PyriumDot() {
  return <span aria-hidden="true" className="mr-1.5 inline-block size-[7px] rounded-full bg-pyrium align-middle" />;
}

export default function HomePage() {
  return (
    <>
      {/* Hero: who first, then the idea. Pyrium's radial glow, in teal-ink. */}
      <section aria-labelledby="hero-heading" className="hero-glow text-center">
        <div className="page flex flex-col items-center gap-[22px] pb-[88px] pt-[140px]">
          <p className="m-0 flex flex-wrap justify-center gap-y-1.5 text-[14px] font-medium text-glow-ink-2 [&>*+*]:border-l [&>*+*]:border-white/30 [&>*]:px-3">
            <b className="font-semibold text-white">Yoshio Nomura</b>
            <span>Undergraduate AI student, UTS</span>
            <span>Backend and AI inference</span>
            <span>
              <PyriumDot />
              Co-founder, Pyrium
            </span>
          </p>
          <h1
            id="hero-heading"
            className="m-0 max-w-[16ch] text-[clamp(42px,6.4vw,80px)] leading-[1.08] tracking-[-0.02em] text-white"
          >
            A cheap decision, <span className="text-glow-ink-2">deciding whether the expensive one runs.</span>
          </h1>
          <p className="m-0 max-w-[56ch] text-[clamp(16px,1.5vw,19px)] font-medium text-glow-ink-2">
            Two of my projects are the same idea twice. In Pulsemind, an XGBoost classifier decides when an ICU
            event deserves an LLM call. In Develarper, a local Qwen model decides when a task deserves the cloud.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#idea" className="rounded-pill bg-white px-6 py-3 text-[15px] font-medium text-ink no-underline hover:bg-paper">
              See the idea
            </a>
            <a href="/cv.pdf" className="rounded-pill px-6 py-3 text-[15px] font-medium text-white no-underline shadow-[inset_0_0_0_1px_rgb(255_255_255/0.55)] hover:bg-white/10">
              CV (PDF)
            </a>
            <a href="https://github.com/UniverseScripts" className="rounded-pill px-6 py-3 text-[15px] font-medium text-white no-underline shadow-[inset_0_0_0_1px_rgb(255_255_255/0.55)] hover:bg-white/10">
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Portrait band: the photo's own black is the band, so there is no frame. */}
      <section aria-labelledby="me-heading" className="measure-frame relative overflow-hidden bg-night text-night-ink">
        <div className="page grid grid-cols-1 items-end gap-0 md:grid-cols-[minmax(0,400px)_minmax(0,1fr)] md:gap-[clamp(32px,6vw,88px)]">
          <figure className="relative m-0 mt-16 max-w-[420px] self-end md:mt-0">
            <Image
              src="/static/portrait-576.webp"
              alt="Yoshio Nomura"
              width={576}
              height={768}
              priority
              sizes="(max-width: 768px) 420px, 400px"
              className="portrait-feather block h-auto w-full max-md:aspect-[4/5] max-md:object-cover max-md:object-[50%_20%]"
            />
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-b from-transparent to-night" />
          </figure>
          <div className="pb-[72px] pt-2 md:pb-24 md:pt-[88px]">
            <h2 id="me-heading" className="m-0 max-w-[16ch] text-[clamp(34px,4.2vw,54px)] leading-[1.1] tracking-[-0.015em]">
              Hi, I&rsquo;m Yoshio. <span className="text-night-ink-2">I build the cheap decision first.</span>
            </h2>
            <p className="m-0 mt-5 max-w-[54ch] text-[17px] text-night-ink-2">
              I study Artificial Intelligence at UTS and work from Ho Chi Minh City, on backends and inference: routing,
              retrieval, and the small model that decides whether a big one is needed. Most of my projects are team work,
              and every page says which part was mine.
            </p>
            <dl className="m-0 mt-8 grid max-w-[540px] grid-cols-[auto_1fr] gap-x-7 gap-y-2.5 border-t border-white/10 pt-6">
              {[
                ["Studying", "Bachelor of Artificial Intelligence, UTS"],
                ["Level", "Undergraduate / intern"],
                ["Co-founder", <><PyriumDot />Pyrium, in development</>],
                ["Experience", "FlyRank AI, backend AI internship · Jul–Sep 2026, completed"],
                ["Based", "Ho Chi Minh City, Vietnam"],
              ].map(([k, v]) => (
                <div key={String(k)} className="contents">
                  <dt className="pt-0.5 text-[13px] text-night-ink-2">{k}</dt>
                  <dd className="m-0 text-[15px]">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="m-0 mt-7 flex flex-wrap gap-5 text-[14.5px]">
              <a href="https://github.com/UniverseScripts" className="text-night-ink">GitHub</a>
              <a href="https://www.linkedin.com/in/yoshio-nomura-b3219438b/" className="text-night-ink">LinkedIn</a>
              <a href="/cv.pdf" className="text-night-ink">CV</a>
              <a href="#contact" className="text-night-ink">Contact</a>
            </p>
          </div>
        </div>
      </section>

      {/* The idea, then the figures — film slot and Measured share one card. */}
      <section id="idea" aria-labelledby="measured-heading" className="measure-frame scroll-mt-24 pt-6">
        <div className="page">
          <div className="card grid grid-cols-1 items-start gap-3.5 p-3.5 min-[1100px]:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div className="rounded-[16px] bg-paper p-1 min-[1100px]:sticky min-[1100px]:top-24">
              <ThesisShowcase />
            </div>
            <div id="measured" className="scroll-mt-24 px-[18px] pb-2.5 pt-[18px]">
              <h2 id="measured-heading" className="m-0 text-[22px] leading-tight tracking-[-0.01em]">Measured</h2>
              <p className="m-0 mb-1 mt-1 text-[13.5px] text-ink-2">
                Each result travels with the conditions it was measured under. Sources are listed at the foot of the page.
              </p>
              <MetricTable rows={measured} caption="Every measured result on this site, with its test conditions" />
            </div>
          </div>
        </div>
        <div className="pb-20 pt-9 text-center">
          <p className="m-0 mb-[18px] text-[12px] font-medium uppercase tracking-[0.14em] text-ink-2">Hackathons I&rsquo;ve built at</p>
          <div className="marquee-mask">
            {/* Every item carries the same trailing padding and there is no gap, so the two halves
                are exactly equal and translateX(-50%) lands on the copy without a jump. */}
            <ul className="marquee-track m-0 list-none p-0 font-display text-[19px] text-ink-2">
              {[...hackathons, ...hackathons].map((h, i) => {
                const dup = i >= hackathons.length;
                return (
                  <li key={`${h}-${i}`} aria-hidden={dup ? true : undefined} className={`pr-14${dup ? " marquee-dup" : ""}`}>
                    {h}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Working demos — only what runs in a browser today. Bleeds off the right edge.
          Shown once two or more qualify; a single demo is linked from its own project page. */}
      {demos.length >= 2 && (
      <section aria-labelledby="demos-heading" className="bg-sheet py-24">
        <div className="page">
          <SectionHead
            id="demos-heading"
            title="Working demos."
            lead="Only projects with a demo that runs today. Ignis and The Lantern run on free servers that take about a minute to wake on a first visit."
          />
        </div>
        <ul className="bleed-rail m-0 list-none">
          {demos.map((p) => (
            <li key={p.id} className="card flex w-[min(78vw,400px)] shrink-0 flex-col overflow-hidden bg-paper">
              <div className="grid aspect-[16/10] place-items-center bg-[radial-gradient(90%_90%_at_30%_0%,#0b4654,#11606f_55%,#cfe0e3)] px-6 text-center font-display text-[22px] text-white">
                {p.title}
              </div>
              <div className="flex flex-1 flex-col px-5 pb-6 pt-[18px]">
                <span className="text-[12.5px] text-ink-2">{p.period}</span>
                <h3 className="m-0 mb-0.5 mt-1 text-[24px] leading-tight">{p.title}</h3>
                {p.venue && <p className="m-0 mb-2.5 text-[13px] text-ink-2">{p.venue}</p>}
                <p className="m-0 mb-4 text-[14.5px] text-ink-2">{p.oneLine}</p>
                <p className="m-0 mt-auto flex flex-wrap items-center gap-3 text-[14px]">
                  <a href={p.demoUrl} className="rounded-pill bg-ink px-[18px] py-2 text-sheet no-underline hover:bg-cond">
                    Open the demo
                  </a>
                  <Link href={p.contentFunnelRoute}>Project page</Link>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      )}

      <section id="work" aria-labelledby="work-heading" className="lattice scroll-mt-24 py-24">
        <div className="page">
          <SectionHead
            id="work-heading"
            title={`${allProjects.length} projects, grouped by what they do.`}
            lead="Team or solo on every row. The red dot marks work built with the Pyrium team."
          />
          <div className="card overflow-hidden">
            <ProjectIndex />
          </div>
        </div>
      </section>

      {/* Pyrium: its own red glow, used exactly once on the site. */}
      <section aria-labelledby="pyrium-heading" className="pyrium-glow pyrium-frame relative overflow-hidden text-center text-white">
        <div className="page flex flex-col items-center gap-4 pb-[190px] pt-24">
          <span className="rounded-pill bg-sheet px-[22px] py-2.5 shadow">
            <Image src="/brand/pyrium/pyrium-primary.png" alt="Pyrium" width={640} height={150} className="block h-[30px] w-auto" />
          </span>
          <h2 id="pyrium-heading" className="m-0 max-w-[18ch] text-[clamp(34px,4.4vw,56px)] leading-[1.12] tracking-[-0.015em]">
            {pyrium.role}, {pyrium.name}.
          </h2>
          <p className="m-0 max-w-[52ch] text-[17px] font-medium">
            {pyrium.description} With {pyrium.members.join(" and ")}. Since {pyrium.period.split(" – ")[0]}.
          </p>
          <span className="rounded-pill bg-[rgb(120_10_14/0.28)] px-3 py-1 text-[13px] font-medium">{pyrium.status}</span>
          <a href={pyrium.url} className="rounded-pill bg-sheet px-6 py-3 text-[15px] font-medium text-ink no-underline hover:bg-paper">
            Visit Pyrium
          </a>
        </div>
      </section>

      <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-24 pt-10">
        <div className="page">
          <SectionHead id="experience-heading" title="Experience" />
          <div className="card grid grid-cols-1 gap-1.5 px-7 py-6 md:grid-cols-[200px_1fr] md:gap-6">
            <div>
              <div className="fig text-[13.5px] font-normal text-ink-2">1 Jul – 16 Sep 2026</div>
              <div className="text-[14px] text-ink-2">Completed</div>
            </div>
            <div>
              <h3 className="m-0 mb-1 text-[22px] leading-tight">FlyRank AI — Backend AI Engineer, Internship (Remote)</h3>
              <p className="m-0 text-ink-2">
                Completed both the Backend AI Engineering and AI Fluency tracks; certificates issued 16 September 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="credentials" aria-labelledby="credentials-heading" className="scroll-mt-24 pt-24">
        <div className="page">
          <SectionHead
            id="credentials-heading"
            title="Credentials"
            lead="Titles open the certificate and, where offered, the issuer's verifier."
          />
          <div className="card overflow-hidden">
            <CredentialTable />
          </div>
        </div>
      </section>

    </>
  );
}
