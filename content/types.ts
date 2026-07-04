export type ProjectIdentifier = "pulsemind" | "weatherise" | "vora" | "roomie";

export interface Metric {
  label: string;
  value: string;
}

export interface ProjectSchema {
  id: ProjectIdentifier;
  title: string;
  domain: string;
  tier: 1 | 2;
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

export interface CertificationSchema {
  id: string;
  title: string;
  authority: string;
  date: string; // Enforces YYYY-MM-DD chronological sorting strings
  verificationUrl?: string;
  badgeHex?: string; // Selective system tier identifier mapping
}
