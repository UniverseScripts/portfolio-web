export type ProjectIdentifier =
  | "pulsemind"
  | "weatherise"
  | "vora"
  | "roomie"
  | "develarper"
  | "architecturelab"
  | "agentrisk-daas"
  | "local-rag-api"
  | "llmops"
  | "ignis"
  | "lantern"
  | "alodi";
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
  /**
   * A placement announced by the organisers, copied from that announcement. Never a
   * self-assessment, and never a figure — figures belong in `metrics`, with conditions.
   */
  result?: string;
  /** Public source repository, checked to resolve before it is added. */
  repoUrl?: string;
  /** A working demo that loads in a browser today. Only projects with one may get a showcase. */
  demoUrl?: string;
  /** Built by the three people who are Pyrium (truth file §11.25.1). Renders the red dot. */
  pyriumTeam?: true;
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

/**
 * One line of a narrated showcase. A line that states a figure must name the `Metric` it
 * comes from (project + label). The film shows that metric's value AND condition on screen
 * from content, and the build fails if the spoken words do not say the same number
 * (`spokenNumbersMatch` in content/showcases/spoken.ts, enforced in ThesisShowcase) — so a
 * figure can never enter a video without its condition, or drift from the page (§11.25.7).
 */
export interface ShowcaseLine {
  scene: string;
  text: string;
  metric?: { project: ProjectIdentifier; label: string };
}

export interface ShowcaseSchema {
  id: string;
  title: string;
  /** Who wrote the words, and whether they have been approved for audio. */
  status: "draft" | "approved";
  lines: ShowcaseLine[];
}

/**
 * An affiliation that is not employment. `status` is REQUIRED for the same reason
 * `Metric.condition` is: Pyrium is "in development, not incorporated" (truth file §11.25.1),
 * and a qualifier that is optional is a qualifier that eventually goes missing.
 */
export interface AffiliationSchema {
  name: string;
  role: string;
  period: string;
  status: string;
  description: string;
  url: string;
  members: string[];
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
export type CredentialKind = "placement" | "attendance" | "completion" | "foundational" | "programme" | "honour";

export interface CertificationSchema {
  id: CertificationIdentifier;
  title: string;
  authority: string;
  date: string; // YYYY-MM-DD — enforces chronological sorting as a string
  kind: CredentialKind;
  /** The claimable substance, where the title alone under- or over-states it. */
  note?: string;
  verificationUrl?: string;
}
