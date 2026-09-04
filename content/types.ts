export type ProjectIdentifier = "pulsemind" | "weatherise" | "vora" | "roomie" | "develarper";
export type CertificationIdentifier =
  | "nvidia-ai-open-hackathon"
  | "vercel-nextjs-approuter"
  | "deeplearning-ai-genai-llm"
  | "aws-cloud-practitioner"
  | "uts-dean-list-2026"
  | "gdgoc-national-hackathon-2026";

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

export interface ProjectSchema {
  id: ProjectIdentifier;
  title: string;
  domain: string;
  tier: 1 | 2;
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
 * What a credential actually is. A course completion, a competitive placement, an
 * attendance certificate and an academic honour are four different things and must
 * never render identically. Attending an event is not a result from it. Truth file 7 / 9.2.
 */
export type CredentialKind = "placement" | "attendance" | "completion" | "honour";

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
