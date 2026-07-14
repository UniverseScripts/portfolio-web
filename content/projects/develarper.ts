import { ProjectSchema } from "../types";

export const develarper: ProjectSchema = {
  id: "develarper",
  title: "Develarper",
  domain: "Token-Efficient AI",
  tier: 2,
  metrics: [
    { label: "Classifier Latency", value: "<10ms" },
    { label: "Inference Accuracy Delta", value: "+18%" },
    { label: "LLM Tokens Saved", value: "80%" },
  ],
  architecturePattern: "Token-Efficient AI Routing System with Specialized Prompt Engineering",
  contentFunnelRoute: "/projects/develarper/",
  gumroadProductId: null,
  summary: "Develarper is an AI routing system that uses specialized prompt engineering to efficiently route requests to the most appropriate AI model, optimizing for cost and performance.",
  architectureDetail: "Develarper uses a local SML to classify and route requests to the most appropriate AI agent, optimizing for cost and performance. The prompt engineering gracefully outputs a standard JSON for task evaluation."
};
