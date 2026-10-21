import { ProjectSchema } from "../types";

export const develarper: ProjectSchema = {
  id: "develarper",
  title: "Develarper",
  domain: "LLM task routing",
  group: "gated-inference",
  role: "Team of 4 — LLMOps",
  period: "July 2026",
  venue: "AMD Developer Hackathon, Act II",
  stack: ["Python", "Qwen 2.5 3B via Ollama", "FastAPI", "Fireworks"],
  metrics: [
    // §11.26: the earlier 19-task routing figure and the local-share figure had no source
    // in the repository and are withdrawn. Both figures below are source-read; the routing one is a team result.
    {
      label: "Correct tier routing",
      value: "711 of 800",
      condition: "tasks (88.9%), team-labelled routing evaluation, 10 Jul 2026",
    },
    {
      label: "Answer accuracy",
      value: "186 of 200",
      condition: "100 factual and 100 summarisation tasks, scored by similarity and Jaccard overlap — not human review, not an LLM judge; 505.1 ms mean, run sequentially",
    },
  ],
  architecturePattern: "Two-tier router with a local difficulty classifier",
  contentFunnelRoute: "/projects/develarper/",
  gumroadProductId: null,
  oneLine: "A local Qwen 2.5 3B classifier routes hard tasks to a cloud API; easy ones stay local.",
  summary: "A two-tier LLM router built by team Develarper, four people, for the AMD Developer Hackathon (Act II). A local Qwen 2.5 3B classifier scores each task's difficulty and dispatches the hard ones to a cloud API while the easy ones stay on the local model.",
  architectureDetail: "A local Qwen 2.5 3B Instruct model served through Ollama classifies incoming task difficulty; the service layer is FastAPI, and the cloud tier is Fireworks, with per-call usage telemetry. A dedicated BERT encoder classifier was considered and rejected: holding a second resident model would not fit under the harness's memory ceiling, so the router reuses the generative model already loaded rather than paying for a specialist one."
};
