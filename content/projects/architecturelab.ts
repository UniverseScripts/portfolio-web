import { ProjectSchema } from "../types";

export const architecturelab: ProjectSchema = {
  id: "architecturelab",
  title: "ArchitectureLab",
  domain: "Human–agent system modelling",
  group: "retrieval-agents",
  role: "Team of 3 — scaffold, WebMCP adapter and deployment: design, direction and review; implemented with a coding agent",
  period: "September 2026",
  stack: ["React 19", "Vite 8", "TypeScript 6", "WebMCP", "Vitest", "Playwright"],
  metrics: [],
  architecturePattern: "Shared live system model driven through page-registered agent tools",
  mcpIntegration: "The page registers structured tools through WebMCP; the agent calls them to inspect the model, run failure simulations and propose patches",
  contentFunnelRoute: "/projects/architecturelab/",
  gumroadProductId: null,
  oneLine: "A person and an agent share one live system model; the agent acts only through WebMCP tools.",
  summary: "A shared live system model in the browser, where a person and an agent inspect the same request flow. Built by a team of three.",
  architectureDetail: "The agent never touches the page directly: it works only through the structured tools the page registers over WebMCP. Through them it can inspect the system model, run failure simulations and propose patches — and only the person can apply a patch. The studio UI is a teammate's work; the scaffold, the WebMCP adapter and the deployment were designed, directed and reviewed by Yoshio and implemented with a coding agent."
};
