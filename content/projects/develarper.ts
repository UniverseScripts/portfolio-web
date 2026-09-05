import { ProjectSchema } from "../types";

export const develarper: ProjectSchema = {
  id: "develarper",
  title: "Develarper",
  domain: "LLM task routing",
  tier: 2,
  role: "Solo — LLMOps",
  period: "July 2026",
  venue: "AMD Developer Hackathon, Act II",
  stack: ["Python", "Qwen 2.5 3B via Ollama", "FastAPI", "Fireworks"],
  metrics: [
    {
      label: "Correct tier routing",
      value: "18 of 19",
      condition: "tasks, scored against self-defined labels",
    },
    {
      label: "Ran on the local model",
      value: "~80%",
      condition: "a TASK count, not tokens — the cloud-routed fifth were the hard tasks, carrying longer prompts and longer completions",
    },
  ],
  architecturePattern: "Two-tier router with a local difficulty classifier",
  contentFunnelRoute: "/projects/develarper/",
  gumroadProductId: null,
  summary: "A two-tier LLM router built solo for the AMD Developer Hackathon (Act II). A local Qwen 2.5 3B classifier scores each task's difficulty and dispatches the hard ones to a cloud API while the easy ones stay on the local model. Tested against a 19-task harness.",
  architectureDetail: "A local Qwen 2.5 3B Instruct model served through Ollama classifies incoming task difficulty and emits its routing decision as structured JSON; the service layer is FastAPI, and the cloud tier is Fireworks, with per-call usage telemetry. A dedicated BERT encoder classifier was considered and rejected: holding a second resident model would not fit under the harness's memory ceiling, so the router reuses the generative model already loaded rather than paying for a specialist one."
};
