import { projectsById } from "@/content/projects";

/**
 * Pulsemind's pipeline, drawn in inline SVG.
 *
 * The classifier's figure is read from content by label and shown with its condition,
 * never retyped (a hardcoded copy here once carried retracted architecture claims and an unscoped mTLS
 * claim that a grep of content/ could not see).
 *
 * The LLM step's duration is shown by Yoshio's decision (27 Sep 2026, truth file §11.22): the §4
 * outcome "roughly 15 seconds", with its condition — anomaly path only. It is labelled on the
 * expensive step in the diagram, not listed as a headline metric. It is not in content/ because
 * it is deliberately kept out of the "Measured" tables.
 *
 * The mTLS WebSocket ingest is real but scoped to the serving demo (truth file §11.12),
 * so the label says so.
 */
export function PulsemindFlow() {
  const metric = projectsById.pulsemind.metrics.find((m) => m.label === "Classifier forward pass");
  if (!metric) throw new Error('PulsemindFlow: metric "Classifier forward pass" no longer exists.');

  const font = "var(--font-plex-condensed), 'Arial Narrow', sans-serif";
  const mono = "var(--font-plex-mono), ui-monospace, monospace";
  const ink = "#15191e", ink2 = "#434c55", rule = "#8e99a3", cond = "#0b5566", condBg = "#e1ecee", sheet = "#f8fafb";

  return (
    <figure className="m-0">
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Pulsemind pipeline diagram (scrolls sideways on narrow screens)">
      <svg
        viewBox="0 0 760 200"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-auto w-full min-w-[640px]"
        role="img"
        aria-labelledby="pulsemind-flow-title pulsemind-flow-desc"
      >
        <title id="pulsemind-flow-title">Pulsemind pipeline</title>
        <desc id="pulsemind-flow-desc">
          Telemetry ingest over an mTLS WebSocket in the serving demo, then an XGBoost classifier ({metric.value}{" "}
          {metric.condition}), then a gate: only a detected anomaly continues to LLM rationalisation, which produces
          a structured rationale. The LLM step takes roughly 15 seconds, on the anomaly path only.
        </desc>
        <defs>
          <marker id="pf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={ink2} />
          </marker>
        </defs>
        <g fontFamily={font} fontSize="14" fill={ink}>
          <rect x="4" y="50" width="130" height="64" rx="3" fill={sheet} stroke={rule} />
          <text x="69" y="78" textAnchor="middle" fontWeight="600">Telemetry ingest</text>
          <text x="69" y="96" textAnchor="middle" fontSize="11.5" fill={ink2}>mTLS WebSocket</text>
          <text x="69" y="109" textAnchor="middle" fontSize="11.5" fill={ink2}>serving demo</text>

          <line x1="134" y1="82" x2="166" y2="82" stroke={ink2} strokeWidth="1.5" markerEnd="url(#pf-arrow)" />

          <rect x="168" y="46" width="170" height="72" rx="3" fill={condBg} stroke={cond} strokeWidth="1.5" />
          <text x="253" y="74" textAnchor="middle" fontWeight="600">XGBoost classifier</text>
          <text x="253" y="95" textAnchor="middle" fontSize="12.5" fill={cond}>
            <tspan fontFamily={mono} fontWeight="500">{metric.value}</tspan> {metric.condition}
          </text>

          <line x1="338" y1="82" x2="370" y2="82" stroke={ink2} strokeWidth="1.5" markerEnd="url(#pf-arrow)" />

          <rect x="372" y="50" width="120" height="64" rx="3" fill={sheet} stroke={rule} />
          <text x="432" y="78" textAnchor="middle" fontWeight="600">Anomaly?</text>
          <text x="432" y="97" textAnchor="middle" fontSize="12.5" fill={ink2}>no → stop here</text>

          <line x1="492" y1="82" x2="524" y2="82" stroke={ink2} strokeWidth="1.5" markerEnd="url(#pf-arrow)" />
          <text x="508" y="70" textAnchor="middle" fontSize="12" fill={ink2}>yes</text>

          <rect x="526" y="50" width="130" height="64" rx="3" fill="none" stroke={rule} strokeDasharray="5 4" />
          <text x="591" y="78" textAnchor="middle" fontWeight="600">LLM rationalisation</text>
          <text x="591" y="96" textAnchor="middle" fontSize="12.5" fill={ink2}>~15 s</text>
          <text x="591" y="109" textAnchor="middle" fontSize="12.5" fill={ink2}>anomaly path only</text>

          <line x1="656" y1="82" x2="680" y2="82" stroke={ink2} strokeWidth="1.5" markerEnd="url(#pf-arrow)" />
          <text x="720" y="78" textAnchor="middle" fontSize="13">Structured</text>
          <text x="720" y="95" textAnchor="middle" fontSize="13">rationale</text>

          <text x="253" y="150" textAnchor="middle" fontSize="12.5" fill={ink2}>runs on every event</text>
          <text x="591" y="150" textAnchor="middle" fontSize="12.5" fill={ink2}>runs only when asked for</text>
        </g>
      </svg>
      </div>
      <figcaption className="mt-2 font-cond text-[14px] text-ink-2">
        Solid: runs on every event. Dashed: runs only on the anomaly path.
      </figcaption>
    </figure>
  );
}
