import { ProjectSchema } from "../types";

export const pulsemind: ProjectSchema = {
  id: "pulsemind",
  title: "Pulsemind",
  domain: "Clinical Decision Support",
  tier: 1,
  metrics: [
    { label: "Classifier Latency", value: "<5ms" },
    { label: "Inference Accuracy Delta", value: "+18%" },
    { label: "Telemetry Ingest", value: "2400 evt/s" },
  ],
  architecturePattern: "CNN-First Asynchronous Inference Pipeline with Conditional Explainability Gating",
  contentFunnelRoute: "/projects/pulsemind/",
  gumroadProductId: null,
  summary: "An asynchronous critical-care telemetry processor. A lightweight, edge-connected PyTorch neural network evaluates incoming ICU data streams within <5ms, executing high-cost LLM rationalization queries only upon detecting critical anomaly bounds.",
  architectureDetail: "Ingest layer processes incoming physiological vectors (PEEP, PIP, FiO2, HRV, Procalcitonin) over secure mTLS WebSocket connections. Classification occurs via a dual-stage linear extractor tracking risk boundaries on CUDA execution threads. Downstream explainability utilizes a conditional execution loop gaged to trigger zero-shot inference pipelines via a decoupled vLLM orchestration endpoint."
};
