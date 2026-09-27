import { ProductSchema } from "../types";

/*
 * A paid product carries more risk than a resume bullet, so this description stands
 * on its own rather than borrowing another project's credibility. Its only case study
 * is its own repository (projects/local-rag-api) — the button belongs there and nowhere
 * else. Pulsemind is a research prototype and Vora has no RAG layer; neither supports it.
 */
export const localRagApi: ProductSchema = {
  id: "local-rag-api",
  title: "Local RAG API",
  url: "https://asteriostech.gumroad.com/l/local-rag-api",
  targetCaseStudyId: "local-rag-api",
  description:
    "A local-first RAG backend on FastAPI, ChromaDB and Ollama. Upload PDF or TXT, then query it — every answer comes back with its sources and the time it took.",
};
