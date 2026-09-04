import { ProductSchema } from "../types";

/*
 * A paid product carries more risk than a resume bullet, so this description stands
 * on its own rather than borrowing a project's credibility. Pulsemind is a research
 * prototype and the site's RAG provenance is Weatherise — neither supports a claim here.
 */
export const localRagApi: ProductSchema = {
  id: "local-rag-api",
  title: "Local RAG API",
  url: "https://galacticgamer62.gumroad.com/l/local-rag-api",
  targetCaseStudyId: "pulsemind",
  description:
    "A self-hosted retrieval-augmented generation API layer that runs on your own hardware — no vendor lock-in, no managed-service costs.",
};
