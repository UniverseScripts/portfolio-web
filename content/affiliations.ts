import { AffiliationSchema } from "./types";

/*
 * Truth file §11.25.1. Self-report: co-founder, from October 2026, three people, in
 * development and not incorporated. Never "startup", "company", or any customer, revenue
 * or funding claim. The description is Pyrium's own positioning, source-read from its site.
 */
export const pyrium = {
  name: "Pyrium",
  role: "Co-founder",
  period: "October 2026 – present",
  status: "Brand in development, not incorporated",
  description: "A three-person brand building private, cost-aware agentic AI.",
  url: "https://pyrium-private-ai.vercel.app",
  members: ["Long Quan (Bennedict) Ton", "Huynh Khanh Tuong"],
} satisfies AffiliationSchema;
