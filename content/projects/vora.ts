import { ProjectSchema } from "../types";

export const vora: ProjectSchema = {
  id: "vora",
  title: "Vora",
  domain: "Quiz-verified learning roadmap",
  tier: 1,
  role: "Team — backend engineer",
  period: "April 2026",
  venue: "GDGoC DevCamp, HCMUT",
  // Thin because the truth file gives Vora no stack line. Open question Q3.
  stack: ["React Flow"],
  // Empty by design. Nothing on this project was instrumented, and a design target
  // is not a measurement (truth file §9.6).
  metrics: [],
  architecturePattern: "Generative model output resolved into a validated dependency graph",
  contentFunnelRoute: "/projects/vora/",
  gumroadProductId: "local-rag-api",
  summary: "A deployed learning-roadmap application with quiz-gated progression, built at the GDGoC DevCamp at HCMUT — a separate programme from the national hackathon. The backend resolver converts unstructured model output into validated, dependency-mapped directed acyclic graphs.",
  architectureDetail: "The resolver validates generative model output before any of it becomes a roadmap: candidate nodes and their declared dependencies are checked for cycles and for unreachable prerequisites, and output that fails validation never reaches the graph. Cycle detection is O(V+E) — an algorithmic property of the traversal, not a measured latency. Quiz gating then governs progression between resolved nodes, so a learner cannot advance past a dependency they have not demonstrated."
};
