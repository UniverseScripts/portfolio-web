import { ProjectSchema } from "../types";

export const weatherise: ProjectSchema = {
  id: "weatherise",
  title: "Weatherise",
  domain: "Low-Latency Realtime Integration",
  tier: 1,
  metrics: [
    { label: "Data Resolution Latency", value: "<2000ms p99" },
    { label: "MCP Surrogate Throughput", value: "850 rps" },
    { label: "Stream Reconnect Time", value: "<400ms" },
  ],
  architecturePattern: "Event-driven streaming ingest + MCP surrogate abstraction layer",
  mcpIntegration:
    "MCP surrogates decouple the data provider API surface from the processing pipeline, enabling zero-downtime provider rotation",
  contentFunnelRoute: "/projects/weatherise",
  gumroadProductId: null, // TODO: replace with gumroad.com/l/<id>
  summary:
    "A low-latency realtime integration system ingesting high-frequency environmental data streams. The MCP surrogate pattern abstracts upstream provider contracts, enabling live provider rotation without downstream pipeline disruption.",
  architectureDetail:
    "The ingest layer maintains persistent SSE connections with automated reconnect logic capped at 400ms recovery time. A surrogate dispatch layer maps provider-specific payloads to a normalized domain schema, eliminating tight coupling between data sources and the processing graph. Downstream consumers subscribe to a typed event bus, decoupled from transport semantics. End-to-end data resolution is validated against a sub-2000ms SLA at the 99th percentile.",
};
