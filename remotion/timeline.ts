/**
 * Script → timing. Ignis's film pattern (script → TTS → timeline → cue()): once narration
 * audio exists, each line's duration comes from its audio file. Until then a line's duration
 * is estimated from its word count, so the film and the page's row-sync can be built and
 * checked before any audio is made.
 */
export const FPS = 30;
export const LEAD = 0.6; // seconds of silence before the first line
export const GAP = 0.45; // seconds between lines
export const TAIL = 1.4; // seconds held after the last line

export interface Cue {
  index: number;
  scene: string;
  text: string;
  start: number; // seconds
  end: number; // seconds
  metricKey?: string;
  /** Narration for this line, once audio has been generated from the approved script. */
  audio?: string;
}

export interface FilmLine {
  scene: string;
  text: string;
  metricKey?: string;
  audio?: string;
}

const WORDS_PER_SECOND = 2.6;

export function buildTimeline(lines: FilmLine[], durations?: number[]): { cues: Cue[]; total: number } {
  let t = LEAD;
  const cues = lines.map((line, index) => {
    const words = line.text.split(/\s+/).length;
    const d = durations?.[index] ?? Math.max(1.6, words / WORDS_PER_SECOND);
    const cue = { index, scene: line.scene, text: line.text, start: t, end: t + d, metricKey: line.metricKey, audio: line.audio };
    t += d + GAP;
    return cue;
  });
  return { cues, total: t - GAP + TAIL };
}

export const cueAt = (cues: Cue[], seconds: number) => {
  let current = cues[0];
  for (const c of cues) if (c.start <= seconds) current = c;
  return current;
};
