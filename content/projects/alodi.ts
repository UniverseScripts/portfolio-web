import { ProjectSchema } from "../types";

/*
 * Truth file §11.27. The result is the organisers' announcement (2 Nov 2026), prizes worded as
 * there. Nothing on this project was measured: the README's loss and savings figures are
 * modelled, and its F1 / time-to-context / error rates are targets — none of them appear here.
 * Yoshio led the team and presented; the technical build is teammates' work, so no component
 * is attributed to him.
 */
export const alodi: ProjectSchema = {
  id: "alodi",
  title: "Alodi",
  domain: "Rescuing failed deliveries for Vietnamese e-commerce",
  group: "retrieval-agents",
  role: "Team of 4 — team lead and presenter: scope, demo script and pitch",
  period: "October 2026",
  venue: "Sea × OpenAI Regional Codex Hackathon – Vietnam · Shopee, Ho Chi Minh City",
  result: "3rd Place — USD 5,000 in OpenAI API credits (shared team pool) and 1 year of ChatGPT Pro (the USD 200/month plan) per member",
  repoUrl: "https://github.com/khanhtuongnakitomo/TeamDevelarper_Alodi_RegionalCodexHackathon",
  demoUrl: "https://alodi-ai-system.vercel.app/demo",
  pyriumTeam: true,
  stack: ["Python", "FastAPI", "SQLAlchemy", "SQLite", "OpenAI GPT-Live-1", "GPT-6.1 Terra", "GPT Transcribe", "Next.js", "React 19"],
  metrics: [],
  architecturePattern: "A model proposes the delivery details; backend rules decide whether they apply",
  contentFunnelRoute: "/projects/alodi/",
  gumroadProductId: null,
  oneLine: "One tap from the shipper, and the next delivery attempt knows when, where and who.",
  summary: "An AI agent that rescues failed deliveries, built by a team of four at the Sea × OpenAI Regional Codex Hackathon in Vietnam, where it placed third. When a delivery fails, the shipper taps once; Alodi reaches the buyer by chat and then an AI voice call, and the next attempt arrives with a time window, a drop-off point and a stand-in receiver.",
  architectureDetail: "The shipper picks No answer, Rescheduled or Refused. A chat goes to the buyer at once; after 60 minutes of silence an AI voice call follows, and a second two hours later, only within permitted hours and after a consent disclosure. The answer is extracted into typed fields with Structured Outputs, and rules in the FastAPI backend — not the prompt — decide whether it applies: each field needs a confidence of at least 0.85, clear answers update the order, and the rest are confirmed in chat or sent to a person. The backend, scheduler, rules and audit trail run locally on made-up orders; the public demo is scripted. Yoshio led the team, wrote the demo script and presented the pitch; the build is his teammates' work.",
};
