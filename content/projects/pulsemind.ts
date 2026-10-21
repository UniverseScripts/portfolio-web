import { ProjectSchema } from "../types";

export const pulsemind: ProjectSchema = {
  id: "pulsemind",
  title: "Pulsemind",
  domain: "Critical-care telemetry — research prototype",
  group: "gated-inference",
  role: "Team — full-stack AI engineer",
  period: "May 2026 — ongoing",
  stack: ["Python", "XGBoost", "PyTorch", "scikit-learn", "React"],
  metrics: [
    {
      label: "Score per reading",
      value: "~43 ms",
      condition: "including its TreeSHAP explanation — demo service, 7 readings, 31.6–64.7 ms",
    },
    // §11.26: the earlier sub-5-millisecond per-event figure was a 200k-row GPU batch average,
    // not a per-event time, and is withdrawn. "<50 ms end-to-end" is unusable for the
    // same reason. §4 forbids foregrounding the ~15 s LLM step as a metric; it belongs
    // in the architecture prose and the diagram, which is where it lives.
  ],
  architecturePattern: "Asynchronous inference pipeline with conditional explainability gating",
  contentFunnelRoute: "/projects/pulsemind/",
  gumroadProductId: null,
  oneLine: "ICU telemetry: an XGBoost classifier gates LLM rationalisation to detected anomalies.",
  summary: "An asynchronous ICU telemetry processor. An XGBoost classifier scores incoming stream events and gates higher-cost LLM rationalisation calls so they fire only on detected anomalies.",
  architectureDetail: "Stream events are scored by an XGBoost classifier, selected in a bake-off against LightGBM and CatBoost, trained on the credentialed MIMIC-IV (PhysioNet) de-identified ICU dataset under its data use agreement; demonstrations run on a synthetic derivative built from that dataset. The feature set is 109 columns: eleven frozen ventilator time-series parameters — PEEP, PIP and FiO2 among them — each expanded into observation, staleness and imputation columns, plus static comorbidity, demographic and drug-exposure features. In the serving demo, telemetry reaches the classifier over an mTLS WebSocket. Events scoring below the risk threshold complete on the fast path alone; only those flagged as anomalous trigger the downstream LLM rationalisation call, the expensive step the gate exists to avoid paying for. No identifiable patient data is used, and there is no clinical deployment."
};
