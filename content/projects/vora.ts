import { ProjectSchema } from "../types";

export const vora: ProjectSchema = {
  id: "vora",
  title: "Vora",
  domain: "Dynamic Educational Architecture",
  tier: 1,
  metrics: [
    { label: "DAG Path Latency", value: "<1.5ms" },
    { label: "Gemini Schema Enforcements", value: "100%" },
    { label: "Cycle Detection Complexity", value: "O(V+E)" },
  ],
  architecturePattern: "Hybrid Graph-Generative Engine with Prompt Isolation and In-Memory DAG Resolution",
  contentFunnelRoute: "/projects/vora/",
  gumroadProductId: "local-rag-api",
  summary: "A high-performance educational pipeline orchestrating cloud-inference LLMs and deterministic graph theory. Dynamically maps out personalized learning pathways by processing unstructured AI tokens into valid, dependency-mapped Directed Acyclic Graphs (DAGs) in under 1.5ms.",
  architectureDetail: "The ingestion architecture isolates generative boundaries by routing onboarding telemetry through a dedicated prompt configuration layer (`ai-prompts.ts`), enforcing strict JSON schema structures on remote cloud models via the Google Gemini SDK. The raw output is intercepted by a localized TypeScript graph resolver (`roadmap-graph.ts`) that programmatically instantiates node matrices, executing cycle-detection algorithms and topological sorting arrays. This ensures error-free dependency paths, localized progress validation, and streak-tracking loops with zero runtime database or node-server overhead."
};
