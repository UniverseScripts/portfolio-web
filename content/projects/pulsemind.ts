import { ProjectSchema } from "../types";

export const pulsemind: ProjectSchema = {
  id: "pulsemind",
  title: "Pulsemind",
  domain: "Critical-care telemetry — research prototype",
  tier: 1,
  role: "Team — full-stack AI engineer",
  period: "May 2026 — ongoing",
  stack: ["Python", "XGBoost", "PyTorch", "scikit-learn", "React"],
  metrics: [
    {
      label: "Classifier forward pass",
      value: "<5 ms",
      condition: "per stream event",
    },
    // §4 gives the "<50 ms end-to-end" figure no measurement conditions of its own,
    // so §9.1 does not permit publishing it — the ~15 s caveat that sat here was a
    // note about a different path, which satisfied the type gate without satisfying
    // the rule. §4 also forbids foregrounding the ~15 s step as a metric; it belongs
    // in the architecture prose and the diagram, which is where it now lives.
  ],
  architecturePattern: "Asynchronous inference pipeline with conditional explainability gating",
  contentFunnelRoute: "/projects/pulsemind/",
  gumroadProductId: null,
  summary: "An asynchronous ICU telemetry processor. An XGBoost classifier scores incoming stream events and gates higher-cost LLM rationalisation calls so they fire only on detected anomalies.",
  architectureDetail: "Stream events are scored by an XGBoost classifier trained on the credentialed MIMIC-IV (PhysioNet) de-identified ICU dataset under its data use agreement; demonstrations run on a synthetic derivative built from that dataset. Events scoring below the risk threshold complete on the fast path alone. Only events the classifier flags as anomalous trigger the downstream LLM rationalisation call — the expensive step the gate exists to avoid paying for. No identifiable patient data is used, and there is no clinical deployment."
};
