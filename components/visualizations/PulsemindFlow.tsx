/**
 * PulsemindFlow — Inline SVG: Clinical Context Decision Flow
 *
 * Depicts the RAG + Guardrail + MCP Surrogate pipeline.
 * No external SVG dependencies. Font: Geist Mono (inherited from body).
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
          Five-stage pipeline: Clinical Query → Context Guardrail ({"<"}120ms) → RAG Retrieval
          (HNSW) → MCP Surrogate → Structured Clinical Response
        </desc>

        {/* ── Node definitions ── */}
        {/* Node 1: Clinical Query */}
        <rect x="8" y="88" width="110" height="44" rx="6" fill="#27272a" stroke="#71717a" strokeWidth="1" />
        <text x="63" y="108" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fafafa" fontWeight="600">CLINICAL</text>
        <text x="63" y="120" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fafafa" fontWeight="600">QUERY</text>

        {/* Arrow 1→2 */}
        <line x1="118" y1="110" x2="148" y2="110" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#arr)" />

        {/* Node 2: Context Guardrail */}
        <rect x="148" y="80" width="130" height="60" rx="6" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeWidth="1.5" />
        <text x="213" y="101" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#10b981" fontWeight="700" letterSpacing="1">CONTEXT</text>
        <text x="213" y="113" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#10b981" fontWeight="700" letterSpacing="1">GUARDRAIL</text>
        <text x="213" y="128" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#10b981" fillOpacity="0.7">{"<"}120ms • classifier</text>

        {/* Arrow 2→3 */}
        <line x1="278" y1="110" x2="308" y2="110" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#arr)" />

        {/* Node 3: RAG Retrieval */}
        <rect x="308" y="80" width="120" height="60" rx="6" fill="#27272a" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="4 2" />
        <text x="368" y="101" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#3b82f6" fontWeight="700" letterSpacing="1">RAG</text>
        <text x="368" y="113" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#3b82f6" fontWeight="700" letterSpacing="1">RETRIEVAL</text>
        <text x="368" y="128" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#3b82f6" fillOpacity="0.7">HNSW index</text>

        {/* Arrow 3→4 */}
        <line x1="428" y1="110" x2="458" y2="110" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#arr)" />

        {/* Node 4: MCP Surrogate */}
        <rect x="458" y="80" width="120" height="60" rx="6" fill="#27272a" stroke="#71717a" strokeWidth="1" />
        <text x="518" y="101" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fafafa" fontWeight="700" letterSpacing="1">MCP</text>
        <text x="518" y="113" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fafafa" fontWeight="700" letterSpacing="1">SURROGATE</text>
        <text x="518" y="128" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">340 rps</text>

        {/* Arrow 4→5 */}
        <line x1="578" y1="110" x2="608" y2="110" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#arr)" />

        {/* Node 5: Clinical Response */}
        <rect x="608" y="80" width="104" height="60" rx="6" fill="#10b981" fillOpacity="0.06" stroke="#10b981" strokeWidth="1" strokeDasharray="4 2" />
        <text x="660" y="101" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#10b981" fontWeight="700" letterSpacing="0.5">CLINICAL</text>
        <text x="660" y="113" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#10b981" fontWeight="700" letterSpacing="0.5">RESPONSE</text>
        <text x="660" y="128" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#10b981" fillOpacity="0.7">structured</text>

        {/* ── Stage labels below ── */}
        <text x="213" y="160" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#71717a" letterSpacing="0.5">SAFETY BOUNDARY</text>
        <text x="368" y="160" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#71717a" letterSpacing="0.5">DENSE VECTOR INDEX</text>
        <text x="518" y="160" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#71717a" letterSpacing="0.5">PROVIDER ABSTRACTION</text>

        {/* Arrowhead marker */}
        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#71717a" />
          </marker>
        </defs>
      </svg>
      <figcaption className="text-center text-[10px] font-mono text-[#71717a] mt-2 tracking-wider">
        PULSEMIND — CLINICAL CONTEXT PIPELINE
      </figcaption>
    </figure>
  );
}
