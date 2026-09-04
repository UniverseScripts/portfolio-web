import { ProductSchema } from "../types";

/*
 * Weatherise has no publishable latency figure (demo only, concurrency 1) and no
 * productised data layer, so nothing here may lean on it.
 */
export const globalTechIntelligence: ProductSchema = {
  id: "global-tech-intelligence",
  title: "Global Tech Intelligence Node",
  url: "https://galacticgamer62.gumroad.com/l/job-weekly",
  targetCaseStudyId: "weatherise",
  description:
    "A curated weekly feed of technology and infrastructure signals, delivered as a digest.",
};
