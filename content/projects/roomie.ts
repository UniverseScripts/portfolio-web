import { ProjectSchema } from "../types";

export const roomie: ProjectSchema = {
  id: "roomie",
  title: "Roomie",
  domain: "Roommate and apartment matching",
  group: "services-data",
  role: "Contributor, team of 4 — DevOps & Backend Engineering",
  period: "April 2026",
  venue: "GDGoC National Hackathon 2026 (Hanoi) — team Hackaphobia",
  stack: ["Python", "FastAPI", "Firestore", "Vertex AI embeddings", "React 19", "Vite", "Google Cloud Run"],
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
  oneLine: "Roommate matching by cosine similarity over survey vectors, with WebSocket chat.",
  summary: "A student roommate and apartment matcher built at the GDGoC National Hackathon 2026 in Hanoi with team Hackaphobia. An onboarding survey and swipe interface match on structured fields — location, budget — with an optional free-text bio path using Vertex AI embeddings and cosine similarity.",
  architectureDetail: "A FastAPI service on Google Cloud Run, with Cloud Firestore as the primary database. Chat runs over WebSockets: an in-memory connection manager (chat_manager.py) maps each user to their active sockets, so a user signed in on several tabs receives each message on all of them. Messages persist to Firestore. Matching (vector_logic.py, matching.py) encodes the structured survey answers, including district and budget, into a numeric vector and scores candidates against it by cosine similarity; an optional free-text bio path uses Vertex AI text-embedding-004 embeddings. An MCP-plus-n8n agentic pipeline was designed and then rejected as over-scoped for a four-person team with no operational runway."
};
