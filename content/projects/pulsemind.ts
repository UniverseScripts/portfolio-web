import { ProjectSchema } from "../types";

export const pulsemind: ProjectSchema = {
  id: "pulsemind",
  title: "Pulsemind",
  domain: "Clinical Decision Support",
  tier: 1,
  metrics: [
    { label: "Context Guardrail Latency", value: "<120ms" },
    { label: "Inference Accuracy Delta", value: "+18%" },
    { label: "MCP Surrogate Calls/s", value: "340 rps" },
  ],
  architecturePattern: "RAG pipeline with context guardrails + MCP integration layer",
  mcpIntegration:
    "MCP surrogate intercepts model context windows to enforce clinical safety boundaries before inference",
  contentFunnelRoute: "/projects/pulsemind",
  gumroadProductId: null, // TODO: replace with gumroad.com/l/<id>
  summary:
    "A clinical decision support framework built on a retrieval-augmented generation pipeline. Context guardrails intercept and validate inference inputs against curated medical knowledge graphs before model execution, enforcing safety boundaries without latency penalty.",
  architectureDetail:
    "Retrieval layer uses a dense vector index with HNSW approximate nearest-neighbor search. Guardrail stage runs a lightweight classifier (<5ms overhead) that gates the retrieval context window before it reaches the language model. MCP surrogates abstract the model API surface, enabling hot-swappable backend inference providers without application-layer changes. Prompt engineering constraints are enforced at the infrastructure boundary rather than the application layer.",
};
