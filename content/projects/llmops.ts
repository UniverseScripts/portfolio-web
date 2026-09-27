import { ProjectSchema } from "../types";

export const llmops: ProjectSchema = {
  id: "llmops",
  title: "llmops",
  domain: "Self-hosted inference",
  group: "services-data",
  role: "Solo",
  period: "March 2026",
  stack: ["Python", "FastAPI", "flan-t5-base (8-bit) + LoRA", "PostgreSQL", "Redis", "Traefik", "Prometheus", "Grafana", "Docker Compose"],
  metrics: [],
  architecturePattern: "Single-machine inference node with rate limiting and metrics",
  contentFunnelRoute: "/projects/llmops/",
  gumroadProductId: null,
  oneLine: "A self-hosted inference node with rate limiting, a reverse proxy and metrics.",
  summary: "A self-hosted inference node on a single machine: a small model with a LoRA adapter behind an API, with rate limiting, a reverse proxy and a metrics dashboard.",
  architectureDetail: "google/flan-t5-base is loaded in 8-bit with a LoRA adapter and served by FastAPI, with PostgreSQL 16 over asyncpg for persistence. Each client is rate-limited per IP through Redis, using MULTI/EXEC transactions. Traefik sits in front, a cloudflared tunnel exposes it, and Prometheus scrapes metrics into a provisioned Grafana dashboard. The whole stack runs under Docker Compose."
};
