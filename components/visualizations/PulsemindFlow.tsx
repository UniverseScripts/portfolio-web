/**
 * PulsemindFlow — Inline SVG: Clinical Context Decision Flow
 *
 * Depicts the CNN-First Asynchronous Inference Pipeline with Conditional Explainability Gating.
 * No external SVG dependencies. Font: inherited from body.
 */
export function PulsemindFlow() {
  return (
    <figure className="my-8" aria-label="Pulsemind clinical context decision flow diagram">
      <svg
        viewBox="0 0 720 240"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-2xl mx-auto"
        role="img"
        aria-describedby="pulsemind-flow-desc"
      >
        <desc id="pulsemind-flow-desc">
          Five-stage pipeline: Ingest Layer (mTLS WebSocket) → Risk Classifier (CNN / PyTorch, {"<"}5ms) → Decision Gate (risk_prob {">"} 0.70) → vLLM Explainer (Decoupled vLLM) → Clinical Alert (Structured Rationale)
        </desc>

        {/* ── Node definitions ── */}
        {/* Node 1: Ingest Layer */}
        <rect x="8" y="80" width="110" height="60" rx="6" fill="#27272a" stroke="#71717a" strokeWidth="1" />
        <text x="63" y="101" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fafafa" fontWeight="600">INGEST LAYER</text>
        <text x="63" y="113" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fafafa" fontWeight="600">PHYSIOLOGY</text>
        <text x="63" y="128" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">mTLS WebSocket</text>

        {/* Arrow 1→2 */}
        <line x1="118" y1="110" x2="148" y2="110" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#arr)" />

        {/* Node 2: Risk Classifier */}
        <rect x="148" y="80" width="130" height="60" rx="6" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeWidth="1.5" />
        <text x="213" y="101" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#10b981" fontWeight="700" letterSpacing="1">RISK CLASSIFIER</text>
        <text x="213" y="113" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#10b981" fontWeight="700" letterSpacing="1">ADVANCED CNN</text>
        <text x="213" y="128" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#10b981" fillOpacity="0.7">{"<"}5ms • PyTorch</text>

        {/* Arrow 2→3 */}
        <line x1="278" y1="110" x2="308" y2="110" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#arr)" />

        {/* Node 3: Decision Gate */}
        <rect x="308" y="80" width="120" height="60" rx="6" fill="#27272a" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="4 2" />
        <text x="368" y="101" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#3b82f6" fontWeight="700" letterSpacing="1">DECISION GATE</text>
        <text x="368" y="113" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#3b82f6" fontWeight="700" letterSpacing="1">THRESHOLD check</text>
        <text x="368" y="128" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#3b82f6" fillOpacity="0.7">risk_prob &gt; 0.70</text>

        {/* Arrow 3→4 */}
        <line x1="428" y1="110" x2="458" y2="110" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#arr)" />

        {/* Node 4: vLLM Explainer */}
        <rect x="458" y="80" width="120" height="60" rx="6" fill="#27272a" stroke="#71717a" strokeWidth="1" />
        <text x="518" y="101" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fafafa" fontWeight="700" letterSpacing="1">vLLM EXPLAINER</text>
        <text x="518" y="113" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fafafa" fontWeight="700" letterSpacing="1">DOWNSTREAM SYNTHESIS</text>
        <text x="518" y="128" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">zero-shot rationale</text>

        {/* Arrow 4→5 */}
        <line x1="578" y1="110" x2="608" y2="110" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#arr)" />

        {/* Node 5: Clinical Response */}
        <rect x="608" y="80" width="104" height="60" rx="6" fill="#10b981" fillOpacity="0.06" stroke="#10b981" strokeWidth="1" strokeDasharray="4 2" />
        <text x="660" y="101" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#10b981" fontWeight="700" letterSpacing="0.5">CLINICAL ALERT</text>
        <text x="660" y="113" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#10b981" fontWeight="700" letterSpacing="0.5">RATIONALE</text>
        <text x="660" y="128" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#10b981" fillOpacity="0.7">structured alert</text>

        {/* ── Stage labels below ── */}
        <text x="213" y="160" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#71717a" letterSpacing="0.5">CUDA INFERENCE LOOP</text>
        <text x="368" y="160" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#71717a" letterSpacing="0.5">CONDITIONAL LLM GATING</text>
        <text x="518" y="160" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#71717a" letterSpacing="0.5">EXPLAINABILITY SYNTHESIS</text>

        {/* Arrowhead marker */}
        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#71717a" />
          </marker>
        </defs>
      </svg>
      <figcaption className="text-center text-[10px] font-mono text-[#71717a] mt-2 tracking-wider">
        PULSEMIND — TELEMETRY RISK PIPELINE &amp; EXPLAINER
      </figcaption>
    </figure>
  );
}
