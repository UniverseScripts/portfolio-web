import { ProjectSchema } from "../types";

export const weatherise: ProjectSchema = {
  id: "weatherise",
  title: "Weatherise",
  domain: "Enterprise Weather Intelligence",
  tier: 1,
  metrics: [
    { label: "Data Resolution Latency", value: "<2000ms p99" },
    { label: "MCP Surrogate Throughput", value: "850 rps" },
    { label: "Stream Reconnect Time", value: "<400ms" },
  ],
  architecturePattern: "Circuit-Breaker Consensus Pipeline with AI Surrogacy Gating and Event-Driven Context Assembly",
  mcpIntegration: "MCP host decodes real-time meteorological telemetry channels directly into vertical mappers (Agriculture, Construction, Tourism) over non-blocking streams",
  contentFunnelRoute: "/projects/weatherise/",
  gumroadProductId: null,
  summary: "A low-latency weather intelligence engine developed for the NVIDIA AI Open Hackathon. Integrates real-time meteorological Model Context Protocol (MCP) data across multi-vertical logistics channels using an asynchronous consensus framework to preserve sub-2000ms p99 SLAs.",
  architectureDetail: "Ingest architecture utilizes a non-blocking asyncio fetching cluster that hits six concurrent REST endpoints, gaged by automated circuit breakers and real-time variance weights to prevent latency degradation. Downstream prediction uses high-fidelity neural surrogates linked to NVIDIA NIM targets for localized microclimate inference. Decoupled context mappers (Agriculture, Construction, Tourism) ingest raw data primitives concurrently over an NGINX-managed event loop, streaming structured payloads directly to clients via non-blocking WebSocket streams."
};
