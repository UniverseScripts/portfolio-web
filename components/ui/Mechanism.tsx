import { projectsById } from "@/content/projects";
import type { ProjectIdentifier } from "@/content/types";

/**
 * The thesis drawn as the two pipelines that share it. HTML rather than SVG so it
 * reflows: a row per pipeline on wide screens, a vertical sequence on phones.
 *
 * The figure on each cheap step is read out of the project's content module by label,
 * never retyped, and is shown with its full condition. A renamed metric fails the build
 * here instead of silently dropping out of the diagram.
 *
 * §4: the ~15 s LLM step is "never foregrounded as a metric", so the expensive steps
 * are named by role only — no durations.
 */
interface Pipeline {
  id: ProjectIdentifier;
  input: string;
  gate: string;
  gateMetric: string;
  when: string;
  costly: string;
  otherwise?: string;
}

const PIPELINES: Pipeline[] = [
  {
    id: "pulsemind",
    input: "ICU stream event",
    gate: "XGBoost classifier",
    gateMetric: "Classifier forward pass",
    when: "only on a detected anomaly",
    costly: "LLM rationalisation",
  },
  {
    id: "develarper",
    input: "Task",
    gate: "Qwen 2.5 3B router",
    gateMetric: "Correct tier routing",
    when: "only if the task is hard",
    costly: "Cloud API",
    otherwise: "otherwise it stays on the local model",
  },
];

function Edge({ label }: { label?: string }) {
  return (
    <li className="flex min-w-16 flex-1 flex-col items-center px-1.5 max-lg:min-h-11 max-lg:py-1" aria-hidden={label ? undefined : true}>
      <span className="mb-1 text-center font-cond text-[13px] leading-tight text-ink-2">{label ?? " "}</span>
      <span className="relative h-[1.5px] w-full bg-ink-2 after:absolute after:-right-px after:-top-1 after:border-y-[5px] after:border-l-[7px] after:border-y-transparent after:border-l-ink-2 max-lg:h-5 max-lg:w-[1.5px] max-lg:after:-bottom-px max-lg:after:-right-1 max-lg:after:top-auto max-lg:after:border-x-[5px] max-lg:after:border-t-[7px] max-lg:after:border-b-0 max-lg:after:border-x-transparent max-lg:after:border-t-ink-2" aria-hidden="true" />
    </li>
  );
}

export function Mechanism() {
  return (
    <figure className="m-0 rounded-card border border-rule bg-sheet px-7 pb-4 pt-6 max-lg:p-4" aria-labelledby="mechanism-caption">
      {PIPELINES.map((p, i) => {
        const project = projectsById[p.id];
        const metric = project.metrics.find((m) => m.label === p.gateMetric);
        if (!metric) {
          throw new Error(`Mechanism: metric "${p.gateMetric}" no longer exists on "${p.id}".`);
        }
        const team = project.role.split(" — ")[0];
        return (
          <div
            key={p.id}
            className={`grid grid-cols-[170px_1fr] items-center gap-5 py-3.5 max-lg:grid-cols-1 max-lg:gap-2.5 ${i > 0 ? "border-t border-dashed border-rule" : ""}`}
          >
            <div className="font-cond text-[14px] text-ink-2">
              <a href={project.contentFunnelRoute} className="block font-serif text-[19px] font-medium text-ink no-underline hover:underline">
                {project.title}
              </a>
              {team}
            </div>
            <ol className="m-0 flex list-none items-center p-0 max-lg:flex-col max-lg:items-stretch" aria-label={`${project.title} pipeline`}>
              <li className="rounded-[3px] border border-rule-strong px-3.5 py-2.5 font-cond text-[15.5px] text-ink-2 max-lg:text-center">
                {p.input}
              </li>
              <Edge />
              <li className="max-w-[15rem] rounded-[3px] border-[1.5px] border-cond bg-cond-bg px-3.5 py-2.5 font-cond text-[15.5px] font-semibold max-lg:max-w-none max-lg:text-center">
                {p.gate}
                <span className="block text-[13px] font-normal leading-snug text-cond">
                  <span className="fig">{metric.value}</span> {metric.condition}
                </span>
              </li>
              <Edge label={p.when} />
              <li className="flex items-center max-lg:flex-col max-lg:items-stretch">
                <span className="rounded-[3px] border border-dashed border-rule-strong px-3.5 py-2.5 font-cond text-[15.5px] max-lg:text-center">
                  {p.costly}
                </span>
                {p.otherwise && (
                  <span className="ml-3.5 font-cond text-[13.5px] text-ink-2 max-lg:ml-0 max-lg:mt-2 max-lg:text-center">
                    {p.otherwise}
                  </span>
                )}
              </li>
            </ol>
          </div>
        );
      })}
      <figcaption id="mechanism-caption" className="mt-2 font-cond text-[14px] text-ink-2">
        Solid: runs on every input. Dashed: runs only when the cheap step asks for it. Every figure on the site is listed with its conditions under <a href="#measured">Measured</a>.
      </figcaption>
    </figure>
  );
}
