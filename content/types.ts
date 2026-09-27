export type ProjectIdentifier =
  | "pulsemind"
  | "weatherise"
  | "vora"
  | "roomie"
  | "develarper"
  | "architecturelab"
  | "agentrisk-daas"
  | "local-rag-api"
  | "llmops";
export type CertificationIdentifier =
  | "nvidia-ai-open-hackathon"
  | "vercel-nextjs-approuter"
  | "deeplearning-ai-genai-llm"
  | "aws-cloud-practitioner"
  | "uts-dean-list-2026"
  | "gdgoc-national-hackathon-2026"
  | "flyrank-backend-ai-engineering"
  | "flyrank-ai-fluency";

/**
 * A published measurement.
 *
 * `condition` is REQUIRED, and stays required. Truth file rule 9.1: a number without
 * its measurement conditions is not a number. Keeping this non-optional is what makes
 * an unconditioned figure a compile error rather than something a reviewer has to catch.
 */
export interface Metric {
  label: string;
  value: string;
  condition: string;
}

/**
 * What a project does, not how good it is. The old "Tier 1 / Tier 2" split was a
 * self-assessment; groups are neutral descriptions, and the first one is the thesis.
 * Every group needs a heading in `projectGroups` (content/projects/groups.ts) — a group
 * without one is a compile error.
 */
export type ProjectGroup = "gated-inference" | "retrieval-agents" | "services-data";

export interface ProjectGroupInfo {
  heading: string;
  description: string;
  order: number;
}

export interface ProjectSchema {
  id: ProjectIdentifier;
  title: string;
  domain: string;
  group: ProjectGroup;
  /** Attribution and role together — they are not separable. Truth file 9.3 / 11.6. */
  role: string;
  period: string;
  /** The hackathon or programme this was built for, where there is one. */
  venue?: string;
  stack: string[];
  /** Zero entries is a correct state: it means nothing on this project was measured. */
  metrics: Metric[];
  architecturePattern: string;
  mcpIntegration?: string;
  contentFunnelRoute: `/projects/${ProjectIdentifier}/`;
  gumroadProductId: string | null;
  /** One sentence for the homepage index. A condensation of `summary` — never a new claim. */
  oneLine: string;
  summary: string;
  architectureDetail: string;
}

export interface ProductSchema {
  id: string;
  title: string;
  url: string;
  targetCaseStudyId: ProjectIdentifier;
  description: string;
}

/**
 * What a credential actually is. A course completion, a programme completion, a
 * competitive placement, an attendance certificate and an academic honour are five
 * different things and must never render identically. Attending an event is not a result
 * from it, and finishing an internship programme is not finishing a course. Truth file
 * 7 / 9.2 / 11.19.
 */
export type CredentialKind = "placement" | "attendance" | "completion" | "programme" | "honour";

export interface CertificationSchema {
  id: CertificationIdentifier;
  title: string;
  authority: string;
  date: string; // YYYY-MM-DD — enforces chronological sorting as a string
  kind: CredentialKind;
  /** The claimable substance, where the title alone under- or over-states it. */
  note?: string;
  verificationUrl?: string;
  badgeHex?: string;
}
