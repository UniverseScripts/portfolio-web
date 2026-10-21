import { ShowcaseSchema } from "../types";

/*
 * The homepage film: the thesis, told through the two projects that share it.
 * APPROVED by Yoshio, 21 Oct 2026 — written from truth-file wording (§4, §11.25, §11.26).
 * Narration audio is generated from these exact lines (scripts/tts/speak.py).
 *
 * Rules: every number is spoken in words and tied to its content Metric; the ~15 s LLM step
 * is never stated here (§11.22 keeps it to the Pulsemind page's diagram).
 */
export const thesisFilm = {
  id: "thesis",
  title: "A cheap decision first",
  status: "approved",
  lines: [
    { scene: "open", text: "Two of my projects are the same idea, twice." },
    { scene: "pulsemind", text: "In Pulsemind, an XGBoost classifier scores every reading from an ICU stream." },
    {
      scene: "pulsemind",
      text: "In the demo, scoring a reading and explaining it takes about forty-three milliseconds.",
      metric: { project: "pulsemind", label: "Score per reading" },
    },
    { scene: "pulsemind", text: "Only when it flags an anomaly does the system pay for a language model." },
    { scene: "develarper", text: "In Develarper, a small local model reads each task's difficulty first." },
    {
      scene: "develarper",
      text: "On the team's routing evaluation, it sent seven hundred and eleven of eight hundred tasks to the right tier.",
      metric: { project: "develarper", label: "Correct tier routing" },
    },
    { scene: "develarper", text: "Hard tasks go to the cloud. The rest stay on the local model." },
    { scene: "close", text: "The expensive step runs only when the cheap one asks for it." },
  ],
} satisfies ShowcaseSchema;
