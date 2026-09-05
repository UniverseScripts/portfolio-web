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
    "A local-first RAG backend on FastAPI, ChromaDB and Ollama. Upload PDF or TXT, then query it — every answer comes back with the source chunks it was drawn from and the time it took.",
};
