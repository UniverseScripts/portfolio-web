import { ProjectSchema } from "../types";

export const localRagApiProject: ProjectSchema = {
  id: "local-rag-api",
  title: "Local RAG API",
  domain: "Local-first retrieval-augmented generation",
  group: "retrieval-agents",
  role: "Solo",
  period: "February 2026",
  stack: ["Python", "FastAPI", "ChromaDB", "sentence-transformers", "Ollama"],
  metrics: [],
  architecturePattern: "Ingest–retrieve–generate pipeline on local models, with cited answers",
  contentFunnelRoute: "/projects/local-rag-api/",
  gumroadProductId: "local-rag-api",
  summary: "A local-first RAG backend: upload a PDF or text file, then ask questions of it. Every answer comes back with the source chunks it was drawn from and the time it took.",
  architectureDetail: "Three FastAPI endpoints: a health check, a multipart ingest for PDF and TXT, and chat. Ingested text is split recursively into 1000-character chunks with 200 characters of overlap, embedded with all-MiniLM-L6-v2 and stored in an embedded ChromaDB. A question retrieves the three nearest chunks and generation runs through Ollama, with an optional OpenAI path. The chat response returns the answer together with its sources and inference time, so a caller can check where an answer came from."
};
