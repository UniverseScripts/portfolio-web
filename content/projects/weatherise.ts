import { ProjectSchema } from "../types";

export const weatherise: ProjectSchema = {
  id: "weatherise",
  title: "Weatherise",
  domain: "Weather-intelligence pipeline",
  tier: 1,
  role: "Team — LLMOps & Backend AI Engineering",
  period: "9–11 June 2026",
  venue: "Vietnam AI Open Hackathon (NVIDIA / OpenACC)",
  stack: ["Python", "Qdrant", "NVIDIA Earth-2 surrogates", "Nemotron Ultra", "MCP", "REST sources"],
  // Empty by design. Every figure this project produced was measured at a concurrency
  // of one under demonstration conditions, which yields no distribution and therefore
  // no publishable latency or throughput number. Truth file §4.
  metrics: [],
  architecturePattern: "Multi-agent routing chain over surrogate models with vector retrieval",
  mcpIntegration: "An MCP host feeds ingested meteorological data forward into the agent chain",
  contentFunnelRoute: "/projects/weatherise/",
  gumroadProductId: null,
  summary: "A weather-intelligence pipeline built at the Vietnam AI Open Hackathon (NVIDIA / OpenACC). REST data sources and NVIDIA Earth-2 surrogate models feed a multi-agent chain running on Nemotron Ultra, with a Qdrant vector database supporting retrieval-augmented generation over the ingested data.",
  architectureDetail: "Ingestion combines REST meteorological sources with NVIDIA Earth-2 surrogate models, and an MCP host carries the ingested data forward. Retrieved context is held in a Qdrant vector database and supplied to a multi-agent routing chain on Nemotron Ultra, which composes the response. Built and demonstrated across the three days of the hackathon, where the team was selected as one of ten from roughly a hundred registrants to compete."
};
