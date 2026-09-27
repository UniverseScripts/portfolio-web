import { ProductSchema } from "../types";

/*
 * Weatherise has no publishable latency figure (demo only, concurrency 1) and no
 * productised data layer, so nothing here may lean on it.
 */
export const globalTechIntelligence: ProductSchema = {
  id: "global-tech-intelligence",
  title: "Global Tech Intelligence Node",
  url: "https://asteriostech.gumroad.com/l/job-weekly",
  targetCaseStudyId: "weatherise",
  description:
    "Structured listings from Hacker News \"Who is Hiring\" threads — nine extracted fields, six filters and two charts in a hosted dashboard.",
};
