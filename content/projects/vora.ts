import { ProjectSchema } from "../types";

export const vora: ProjectSchema = {
  id: "vora",
  title: "Vora",
  domain: "Quiz-verified learning roadmap",
  tier: 1,
  role: "Team — backend engineer",
  period: "April 2026",
  venue: "GDGoC DevCamp, HCMUT",
  // Established 5 Sep 2026 from PTAxHVA/devcamp2-{frontend,backend}, where Yoshio has
  // 30 backend and 17 frontend commits. Truth file §11.11.
  stack: ["Express 5", "MongoDB", "Zod", "React 19", "React Flow", "Vite"],
  // Empty by design. Nothing on this project was instrumented, and a design target
  // is not a measurement (truth file §9.6).
  metrics: [],
  architecturePattern: "Generative model output resolved into a validated dependency graph",
  contentFunnelRoute: "/projects/vora/",
  gumroadProductId: "local-rag-api",
  summary: "A deployed learning-roadmap application with quiz-gated progression, built at the GDGoC DevCamp at HCMUT — a separate programme from the national hackathon. The backend resolver converts unstructured model output into validated, dependency-mapped directed acyclic graphs.",
  // NOTE: this previously said the resolver checks "for cycles". It does not — there is
  // no topological sort and no cycle detection in the source. What exists is an ordering
  // constraint: a prerequisite may not be ordered after the topic depending on it. Truth
  // file §11.11. Do not reintroduce the stronger wording.
  architectureDetail: "The resolver validates generative model output before any of it becomes a roadmap: the response is stripped of markdown fencing, JSON-parsed and schema-validated with Zod, then rejected outright if any topic is ordered ahead of a prerequisite it depends on. The graph builder emits prerequisite-to-dependent edges scoped to the current roadmap, and quiz gating governs progression between resolved nodes, so a learner cannot advance past a dependency they have not demonstrated."
};
