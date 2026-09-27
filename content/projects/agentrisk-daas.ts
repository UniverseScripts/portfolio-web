import { ProjectSchema } from "../types";

export const agentriskDaas: ProjectSchema = {
  id: "agentrisk-daas",
  title: "AgentRisk DaaS",
  domain: "Supply-chain risk data for AI-agent packages",
  group: "services-data",
  role: "Solo",
  period: "March – August 2026",
  stack: ["Python", "FastAPI", "SQLAlchemy", "Alembic", "PostgreSQL", "Redis", "Next.js", "GitHub Actions", "Render"],
  metrics: [],
  architecturePattern: "Scheduled scraper feeding a keyed risk-data API",
  contentFunnelRoute: "/projects/agentrisk-daas/",
  gumroadProductId: null,
  summary: "A risk-data API for the MCP servers, npm and PyPI packages that AI agents depend on, built from public registry and GitHub metadata.",
  architectureDetail: "A scraper on a six-hourly GitHub Actions schedule pulls registry and GitHub metadata into PostgreSQL through SQLAlchemy and Alembic, and a FastAPI service behind API keys and Redis rate limiting serves it. Two composite indices are computed from that data — maintainer concentration and dormancy reactivation — and each returns \"insufficient data\" rather than a number when its inputs are missing, instead of filling the gap. A static Next.js frontend documents the API; the service is deployed on Render."
};
