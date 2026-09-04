import { ProductSchema } from "../types";

/*
 * Product copy is held to the same standard as project copy. Do not attribute a
 * pattern or an architecture to a project unless that project actually used it —
 * Roomie's frontend is React/Vite, so no Next.js claim may point at it.
 */
export const nextjsStarterKit: ProductSchema = {
  id: "nextjs-starter-kit",
  title: "Next.js Mobile Starter Kit",
  url: "https://galacticgamer62.gumroad.com/l/nextjs-mobile-marketplace",
  targetCaseStudyId: "roomie",
  description:
    "A Next.js starter configured for mobile-first static export: decoupled data fetching and no server runtime required.",
};
