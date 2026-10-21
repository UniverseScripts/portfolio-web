import { projectsById } from "@/content/projects";
import { thesisFilm } from "@/content/showcases/thesis";
import { metricKey } from "@/components/ui/MetricTable";
import { Mechanism } from "@/components/ui/Mechanism";
import { buildTimeline } from "@/remotion/timeline";
import type { FilmFigure } from "@/remotion/ThesisFilm";
import { Showcase, type TranscriptLine } from "@/components/ui/Showcase";

/**
 * Server side of the homepage film: resolves every figure the script names from the
 * project content (value and condition), so the client and the composition receive data,
 * never typed numbers. A script line naming a metric that no longer exists fails the build.
 */
export function ThesisShowcase() {
  const figures: Record<string, FilmFigure> = {};
  const lines = thesisFilm.lines.map((line) => {
    if (!("metric" in line) || !line.metric) return { scene: line.scene, text: line.text };
    const project = projectsById[line.metric.project];
    const m = project.metrics.find((x) => x.label === line.metric!.label);
    if (!m) throw new Error(`thesis film: metric "${line.metric.label}" no longer exists on "${line.metric.project}".`);
    const key = metricKey({ source: project.title, label: m.label });
    figures[key] = { key, value: m.value, label: m.label, condition: m.condition };
    return { scene: line.scene, text: line.text, metricKey: key };
  });

  const { cues, total } = buildTimeline(lines);
  const keyFor = (project: "pulsemind" | "develarper", label: string) => metricKey({ source: projectsById[project].title, label });

  const transcript: TranscriptLine[] = lines.map((l) => ({
    text: l.text,
    figure: "metricKey" in l && l.metricKey ? { value: figures[l.metricKey].value, condition: figures[l.metricKey].condition } : undefined,
  }));

  return (
    <Showcase
      total={total}
      transcript={transcript}
      hasAudio={false}
      film={{
        cues,
        figures,
        pipelines: [
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
        ],
        closing: { kicker: "The point", line: "The expensive step runs", muted: "only when the cheap one asks for it." },
      }}
    >
      <Mechanism />
    </Showcase>
  );
}
