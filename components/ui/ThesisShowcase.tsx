import { projectsById } from "@/content/projects";
import { thesisFilm } from "@/content/showcases/thesis";
import { metricKey } from "@/components/ui/MetricTable";
import { Mechanism } from "@/components/ui/Mechanism";
import { buildTimeline } from "@/remotion/timeline";
import narration from "@/content/showcases/thesis.timeline.json";
import type { FilmFigure, ThesisFilmProps } from "@/remotion/ThesisFilm";
import { Showcase, type TranscriptLine } from "@/components/ui/Showcase";
import { spokenNumbersMatch } from "@/content/showcases/spoken";

/**
 * Server side of the homepage film: resolves every figure the script names from the
 * project content (value and condition), so the client and the composition receive data,
 * never typed numbers. A script line naming a metric that no longer exists fails the build.
 */
export function ThesisShowcase() {
  const figures: Record<string, FilmFigure> = {};
  const lines = thesisFilm.lines.map((line, i) => {
    if (!("metric" in line) || !line.metric) return { scene: line.scene, text: line.text };
    const project = projectsById[line.metric.project];
    const m = project.metrics.find((x) => x.label === line.metric!.label);
    if (!m) throw new Error(`thesis film: metric "${line.metric.label}" no longer exists on "${line.metric.project}".`);
    // Rule 12: the narration must say the number the page shows.
    const spoken = spokenNumbersMatch(line.text, m.value);
    if (!spoken.ok) {
      throw new Error(`thesis film: line ${i} does not say "${m.value}" (${spoken.missing.join("; ")}) — "${line.text}"`);
    }
    const key = metricKey({ source: project.title, label: m.label });
    figures[key] = { key, value: m.value, label: m.label, condition: m.condition };
    return { scene: line.scene, text: line.text, metricKey: key };
  });

  // An approved script ships with audio generated from these exact lines. Any mismatch — a line
  // added, removed or reworded — fails the build; it never quietly falls back to captions only.
  // Only a draft plays without audio.
  const hasAudio = thesisFilm.status === "approved";
  if (hasAudio) {
    if (narration.lines.length !== lines.length) {
      throw new Error(`thesis film: the approved script has ${lines.length} lines but the narration has ${narration.lines.length} — re-run scripts/tts/speak.py`);
    }
    narration.lines.forEach((n, i) => {
      if (n.text !== lines[i].text) throw new Error(`thesis film: narration line ${i} is stale — re-run scripts/tts/speak.py`);
    });
  }
  const voiced = lines.map((l, i) => ({ ...l, audio: hasAudio ? narration.lines[i].file : undefined }));
  const { cues, total } = buildTimeline(voiced, hasAudio ? narration.lines.map((n) => n.duration) : undefined);
  const keyFor = (project: "pulsemind" | "develarper", label: string) => metricKey({ source: projectsById[project].title, label });

  const transcript: TranscriptLine[] = lines.map((l) => ({
    text: l.text,
    figure: "metricKey" in l && l.metricKey ? { value: figures[l.metricKey].value, condition: figures[l.metricKey].condition } : undefined,
  }));

  const pipelines: ThesisFilmProps["pipelines"] = [
    {
      scene: "pulsemind",
      kicker: "Pulsemind · team",
      input: "ICU stream reading",
      gate: "XGBoost classifier",
      figureKey: keyFor("pulsemind", "Score per reading"),
      when: "the LLM runs only on a detected anomaly",
      costly: "LLM rationalisation",
    },
    {
      scene: "develarper",
      kicker: "Develarper · team of 4",
      input: "Task",
      gate: "Qwen 2.5 3B router",
      figureKey: keyFor("develarper", "Correct tier routing"),
      when: "the cloud is called only if the task is hard",
      costly: "Cloud API",
    },
  ];
  // The film may only show a figure the narration names (that is what times its condition on
  // screen). A drifted label would otherwise crash on the visitor's device when they press Play.
  for (const p of pipelines) {
    if (!figures[p.figureKey]) {
      throw new Error(`thesis film: the "${p.scene}" pipeline shows "${p.figureKey}", which no script line names`);
    }
  }

  return (
    <Showcase
      total={total}
      transcript={transcript}
      hasAudio={hasAudio}
      film={{
        cues,
        figures,
        pipelines,
        closing: { kicker: "The point", line: "The expensive step runs", muted: "only when the cheap one asks for it." },
      }}
    >
      <Mechanism />
    </Showcase>
  );
}
