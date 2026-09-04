import { ProjectSchema } from "../types";

export const roomie: ProjectSchema = {
  id: "roomie",
  title: "Roomie",
  domain: "Roommate and apartment matching",
  tier: 2,
  role: "Contributor, team of 4 — DevOps & Backend Engineering",
  period: "April 2026",
  venue: "GDGoC National Hackathon 2026 (Hanoi) — team Hackaphobia",
  stack: ["Python", "FastAPI", "React", "PostgreSQL", "SQL", "Vertex AI embeddings"],
  metrics: [
    {
      label: "Users onboarded",
      value: "~50",
      condition: "real users who onboarded and swiped at demo day",
    },
    {
      label: "Average request latency",
      value: "~12 ms",
      condition: "structured matching path only — excludes embedding generation",
    },
  ],
  architecturePattern: "Asynchronous FastAPI service with a stateful in-memory WebSocket layer and structured matching",
  contentFunnelRoute: "/projects/roomie/",
  gumroadProductId: "nextjs-starter-kit",
  summary: "A student roommate and apartment matcher built at the GDGoC National Hackathon 2026 in Hanoi with team Hackaphobia. An onboarding survey and swipe interface match on structured fields — location, budget — with an optional free-text bio path using Vertex AI embeddings and cosine similarity.",
  architectureDetail: "A FastAPI backend isolates incoming I/O from the matching work. Chat is handled by an in-memory connection manager (chat_manager.py) holding stateful WebSocket maps rather than round-tripping every message through PostgreSQL. Matching runs in an isolated block (vector_logic.py): structured fields resolve directly, and the optional free-text bio path computes cosine similarity over Vertex AI embeddings. An MCP-plus-n8n agentic pipeline was designed and then rejected as over-scoped for a four-person team with no operational runway."
};
