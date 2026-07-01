export interface Metric {
  label: string;
  value: string;
}

export interface ProjectSchema {
  id: string;
  title: string;
  domain: string;
  tier: 1 | 2;
  metrics: Metric[];
  architecturePattern: string;
  mcpIntegration?: string;
  contentFunnelRoute: string;
  gumroadProductId: string | null;
  summary: string;
  architectureDetail: string;
}

export interface ProductSchema {
  id: string;
  title: string;
  url: string;
  targetCaseStudyId: string;
  description: string;
}
