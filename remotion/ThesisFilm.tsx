import { AbsoluteFill, Audio, interpolate, Sequence, spring, useCurrentFrame } from "remotion";
import { type Cue, cueAt, FPS } from "./timeline";

/**
 * The homepage film: the two gated pipelines, drawn one step at a time as the narration
 * reaches them. Rendered by @remotion/player inside the page, so it uses the page's own
 * fonts (CSS variables) and tokens — not a separate brand.
 *
 * Every figure on screen arrives as `FilmFigure` from content (value AND condition), never
 * typed here: the composition has no numbers of its own.
 */
export interface FilmFigure {
  key: string;
  value: string;
  label: string;
  condition: string;
}

export interface ThesisFilmProps {
  cues: Cue[];
  figures: Record<string, FilmFigure>;
  pipelines: {
    scene: string;
    kicker: string;
    input: string;
    gate: string;
    figureKey: string;
    when: string;
    costly: string;
  }[];
  closing: { kicker: string; line: string; muted: string };
  portrait?: boolean;
}

const C = {
  paper: "#f7f7f7",
  sheet: "#ffffff",
  ink: "#15191e",
  ink2: "#434c55",
  rule: "#c9ced3",
  cond: "#0b5566",
  condBg: "#e4eff1",
  display: "var(--font-dm-sans), var(--font-inter), system-ui, sans-serif",
  body: "var(--font-inter), system-ui, sans-serif",
  mono: "var(--font-plex-mono), ui-monospace, monospace",
};

/** 0 → 1 settle, starting at `at` seconds. spring() is pure, so this is safe in loops. */
const rise = (frame: number, at: number) => spring({ frame: frame - at * FPS, fps: FPS, config: { damping: 200, mass: 0.6 } });

function Node({ children, at, kind = "plain" }: { children: React.ReactNode; at: number; kind?: "plain" | "gate" | "costly" }) {
  const p = rise(useCurrentFrame(), at);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * 14}px)`,
        border: kind === "gate" ? `2px solid ${C.cond}` : `1.5px ${kind === "costly" ? "dashed" : "solid"} ${C.rule}`,
        background: kind === "gate" ? C.condBg : C.sheet,
        color: kind === "plain" ? C.ink2 : C.ink,
        borderRadius: 14,
        padding: "18px 22px",
        fontFamily: C.body,
        fontSize: 26,
        fontWeight: kind === "gate" ? 500 : 400,
        lineHeight: 1.25,
      }}
    >
      {children}
    </div>
  );
}

function Edge({ at, vertical }: { at: number; vertical?: boolean }) {
  const p = rise(useCurrentFrame(), at);
  return (
    <div
      style={{
        flex: vertical ? "none" : 1,
        minWidth: vertical ? 0 : 44,
        width: vertical ? 2 : undefined,
        height: vertical ? 36 : 2,
        alignSelf: "center",
        background: C.ink2,
        transform: vertical ? `scaleY(${p})` : `scaleX(${p})`,
        transformOrigin: vertical ? "top" : "left",
      }}
    />
  );
}

export function ThesisFilm({ cues, figures, pipelines, closing, portrait }: ThesisFilmProps) {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const cue = cueAt(cues, t);
  const sceneStart = (scene: string) => cues.find((c) => c.scene === scene)?.start ?? 0;
  const figureLine = (key: string) => cues.find((c) => c.metricKey === key);

  const sceneOpacity = (scene: string) => {
    const start = sceneStart(scene);
    // The last scene has no successor; hold it well past the end (interpolate needs finite input).
    const next = cues.find((c) => c.start > start && c.scene !== scene)?.start ?? start + 3600;
    return interpolate(t, [start - 0.3, start, next - 0.35, next], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  };

  return (
    <AbsoluteFill style={{ background: C.paper, color: C.ink }}>
      {/* Opening */}
      <AbsoluteFill style={{ opacity: sceneOpacity("open"), padding: portrait ? "90px 64px" : "50px 64px", justifyContent: "center" }}>
        <div style={{ fontFamily: C.body, fontSize: 26, color: C.ink2 }}>Two projects, one idea</div>
        <div style={{ fontFamily: C.display, fontSize: portrait ? 76 : 66, lineHeight: 1.05, letterSpacing: "-0.02em", maxWidth: "14ch", marginTop: 14 }}>
          A cheap decision <span style={{ color: C.ink2 }}>before an expensive one.</span>
        </div>
      </AbsoluteFill>

      {/* The two pipelines */}
      {pipelines.map((p) => {
        const s = sceneStart(p.scene);
        const fig = figures[p.figureKey];
        const figAt = figureLine(p.figureKey)?.start ?? s + 2;
        const condP = interpolate(t, [figAt, figAt + 0.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <AbsoluteFill
            key={p.scene}
            style={{ opacity: sceneOpacity(p.scene), padding: portrait ? "80px 56px 210px" : "40px 56px 120px", justifyContent: "center" }}
          >
            <div style={{ fontFamily: C.body, fontSize: 26, color: C.ink2, marginBottom: 34 }}>{p.kicker}</div>
            <div style={{ display: "flex", flexDirection: portrait ? "column" : "row", alignItems: portrait ? "stretch" : "center" }}>
              <Node at={s + 0.2}>{p.input}</Node>
              <Edge at={s + 0.6} vertical={portrait} />
              <Node at={s + 0.9} kind="gate">
                {p.gate}
                <div style={{ marginTop: 8, fontSize: 22, fontWeight: 400, color: C.cond, opacity: condP }}>
                  <span style={{ fontFamily: C.mono, fontWeight: 500, color: C.ink }}>{fig.value}</span> {fig.label.toLowerCase()}
                </div>
              </Node>
              <Edge at={s + 1.4} vertical={portrait} />
              <Node at={s + 1.7} kind="costly">{p.costly}</Node>
            </div>
            <div style={{ fontFamily: C.body, fontSize: 22, color: C.ink2, marginTop: 20, textAlign: "center", opacity: rise(frame, s + 1.9) }}>{p.when}</div>
            {/* The condition travels with the figure, on screen, the moment it is spoken. */}
            <div
              style={{
                marginTop: 26,
                alignSelf: "center",
                maxWidth: portrait ? "100%" : "80%",
                background: C.condBg,
                color: C.cond,
                borderRadius: 10,
                padding: "10px 16px",
                fontFamily: C.body,
                fontSize: 21,
                lineHeight: 1.35,
                opacity: condP,
              }}
            >
              <span style={{ fontFamily: C.mono, fontWeight: 500, color: C.ink }}>{fig.value}</span> — {fig.condition}
            </div>
          </AbsoluteFill>
        );
      })}

      {/* Closing */}
      <AbsoluteFill style={{ opacity: sceneOpacity("close"), padding: portrait ? "90px 64px" : "50px 64px", justifyContent: "center" }}>
        <div style={{ fontFamily: C.body, fontSize: 26, color: C.ink2 }}>{closing.kicker}</div>
        <div style={{ fontFamily: C.display, fontSize: portrait ? 70 : 62, lineHeight: 1.06, letterSpacing: "-0.02em", maxWidth: "15ch", marginTop: 14 }}>
          {closing.line} <span style={{ color: C.ink2 }}>{closing.muted}</span>
        </div>
      </AbsoluteFill>

      {/* Narration: one clip per line, placed at its cue. */}
      {cues.map((c) =>
        c.audio ? (
          <Sequence key={c.index} from={Math.round(c.start * FPS)} durationInFrames={Math.ceil((c.end - c.start) * FPS) + 6}>
            <Audio src={c.audio} />
          </Sequence>
        ) : null,
      )}

      {/* Burned-in captions, from the same script as the transcript. */}
      <div
        style={{
          position: "absolute",
          left: portrait ? 48 : 56,
          right: portrait ? 48 : 56,
          bottom: portrait ? 56 : 28,
          background: "rgb(255 255 255 / 0.95)",
          borderLeft: `3px solid ${C.ink}`,
          padding: "12px 18px",
          fontFamily: C.body,
          fontSize: portrait ? 28 : 26,
          lineHeight: 1.35,
          opacity: t >= cue.start - 0.1 && t <= cue.end + 0.4 ? 1 : 0,
        }}
      >
        {cue.text}
      </div>
    </AbsoluteFill>
  );
}
