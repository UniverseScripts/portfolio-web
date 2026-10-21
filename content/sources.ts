/**
 * Where each published figure comes from — the footer's numbered list (Pyrium's pattern,
 * and the portfolio's whole method). Every `url` was checked to resolve on 21 Oct 2026.
 *
 * Pulsemind has no link on purpose: its repositories are not linked anywhere (truth file
 * §11.10 / Q6), and the demo repository now redirects to another person's account.
 * Roomie's figures are Yoshio's own account (§11.26), and the entry says so.
 */
export interface Source {
  label: string;
  detail: string;
  url?: string;
}

export const sources: Source[] = [
  {
    label: "Pulsemind",
    detail: "demo service timing, 7 readings — team repository, not linked",
  },
  {
    label: "Develarper",
    detail: "800-task routing evaluation, 10 Jul 2026",
    url: "https://github.com/UniverseScripts/develarper/blob/e305b2a/output/classifier_eval_results.csv",
  },
  {
    label: "Develarper",
    detail: "200-task answer evaluation",
    url: "https://github.com/UniverseScripts/develarper/blob/main/tests/eval_results.json",
  },
  {
    label: "Ignis",
    detail: "benchmark report, 16–17 Oct 2026",
    url: "https://github.com/khanhtuongnakitomo/IGNIS/blob/main/docs/BENCHMARKS.md",
  },
  {
    label: "The Lantern",
    detail: "evaluation tables in the project README",
    url: "https://github.com/BennedictQuanTon/The-Lantern-AssemblyAI-Voice-Agent-Hackathon",
  },
  {
    label: "Roomie",
    detail: "users and latency are Yoshio's own account; the repository records neither",
    url: "https://github.com/UniverseScripts/gdgoc-hackaphobia-roomie",
  },
  {
    label: "FlyRank AI",
    detail: "certificate verifier",
    url: "https://internship.flyrank.ai/verify",
  },
];
