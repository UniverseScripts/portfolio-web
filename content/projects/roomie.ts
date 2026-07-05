import { ProjectSchema } from "../types";

export const roomie: ProjectSchema = {
  id: "roomie",
  title: "Roomie",
  domain: "Real-Time Matching Infrastructure",
  tier: 2,
  metrics: [
    { label: "Vector Matching Latency", value: "<12ms" },
    { label: "WebSocket Sync Rate", value: "3500 updates/s" },
    { label: "p95 Routing Latency", value: "<15ms" },
  ],
  architecturePattern: "Asynchronous Layered Monolith with In-Memory WebSocket Orchestration and Vector Embedding Matching",
  contentFunnelRoute: "/projects/roomie/",
  gumroadProductId: "nextjs-starter-kit",
  summary: "A high-performance polyglot matching platform built for GDGOC Hackaphobia. Combines a Python FastAPI backend gateway with a decoupled React/Vite frontend to handle real-time tenant-landlord telemetry and sub-15ms bidirectional vector matching queries.",
  architectureDetail: "The backend engine utilizes FastAPI asynchronous routing to isolate incoming I/O operations from intensive matching procedures. Real-time chat tracking is handled via an in-memory connection manager (`chat_manager.py`) holding stateful WebSocket maps to minimize database overhead. Matching operations invoke an isolated vector execution block (`vector_logic.py`) that computes tokenized user personas against apartment feature matrices using lightweight spatial calculations, generating deterministic accommodation scoring arrays with minimal execution lag."
};
