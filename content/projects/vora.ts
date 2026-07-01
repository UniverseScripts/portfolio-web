import { ProjectSchema } from "../types";

export const vora: ProjectSchema = {
  id: "vora",
  title: "Vora",
  domain: "Multi-Agent Orchestration",
  tier: 2,
  metrics: [
    { label: "Agent Coordination Overhead", value: "<35ms" },
    { label: "Task Decomposition Depth", value: "4 layers" },
    { label: "Concurrent Agent Threads", value: "12" },
  ],
  architecturePattern: "Multi-agent framework with DDD influenced configuration graph",
  mcpIntegration: "Agent-to-agent communication routed through MCP channels with typed message schemas",
  contentFunnelRoute: "/projects/vora",
  gumroadProductId: null,
  summary:
    "A multi-agent orchestration framework configuring independent reasoning agents via a Domain-Driven Design configuration graph. Agents operate on isolated bounded contexts, communicating through typed MCP channels with guaranteed message ordering.",
  architectureDetail:
    "The orchestration layer maps user intent to a task decomposition tree up to 4 layers deep. Each leaf task is dispatched to a specialized agent bounded context. Agent configuration is encoded as a graph of domain entities, allowing runtime reconfiguration without framework restarts. Inter-agent messaging uses MCP-typed channels, ensuring schema validation at every hop and preventing context pollution across agent boundaries.",
};
