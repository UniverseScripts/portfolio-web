import { ProjectSchema } from "../types";

/*
 * Truth file §11.25.4. Every figure is from docs/BENCHMARKS.md, measured 16–17 Oct 2026 on the
 * event's AMD API with one shared key, single runs on small synthetic sets — the report calls them
 * preliminary, so the conditions say so. Both OCR figures always travel together.
 * Never claimed: GPU, throughput, cost or savings, real-factory accuracy, or any of the
 * proposed-only parts (sensors, dispatch, fine-tuning).
 */
export const ignis: ProjectSchema = {
  id: "ignis",
  title: "Ignis",
  domain: "Maintenance intelligence for power plants",
  group: "services-data",
  role: "Team of 3 — backend AI engineering, benchmarking and system verification",
  period: "October 2026",
  venue: "AMD Developer Hackathon, Act III · lablab.ai",
  repoUrl: "https://github.com/khanhtuongnakitomo/IGNIS",
  demoUrl: "https://ignis-amd-developer-hackathon-act-i.vercel.app/#/app",
  pyriumTeam: true,
  stack: ["Python", "SQLite", "MinerU OCR", "DeepSeek-V4-Flash (AMD-hosted)", "React 19", "Vite"],
  metrics: [
    {
      label: "Final valid explanation, prompt v3",
      value: "21 of 24",
      condition: "against 14 of 24 for v2 — 12 synthetic scenarios, two runs each, DeepSeek-V4-Flash on the event's AMD API; preliminary",
    },
    {
      label: "Model time, median, prompt v3",
      value: "10.3 s",
      condition: "against 21.3 s for v2 — the same runs, concurrency 1",
    },
    {
      label: "OCR mean character error, text and tables",
      value: "0.000",
      condition: "MinerU, four synthetic document families and a held-out table image",
    },
    {
      label: "OCR mean character error, diagrams",
      value: "0.617",
      condition: "MinerU, the held-out synthetic diagram family",
    },
  ],
  architecturePattern: "Deterministic facts and a person's review around a hosted model that drafts the explanation",
  contentFunnelRoute: "/projects/ignis/",
  gumroadProductId: null,
  oneLine: "Work orders reviewed by a person, then issued as evidence-linked reports.",
  summary: "Maintenance intelligence for power plants, built by a team of three at AMD's Developer Hackathon, Act III. Historical work orders are imported, reviewed by a person and issued as evidence-linked reports; the facts are computed deterministically and a hosted model drafts only the explanation.",
  architectureDetail: "Work-order exports (CSV or XLSX) are imported with explicit column mapping, and a person accepts or corrects the suggested annotations. Exact facts and priority alerts are computed deterministically, and an evidence pack scoped to what applies is handed to a hosted model on AMD's inference API, which drafts the explanation. A person approves the draft before it is issued as a PDF that links each claim to its evidence. Documents are read natively or through MinerU OCR, and runs persist in SQLite. Yoshio developed the work-order pipeline, the hosted-inference layer, document ingestion and the benchmark harness behind every figure on this page; the frontend and deployment are teammates' work.",
};
