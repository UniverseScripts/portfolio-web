"use client";

import { useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import type { PlayerRef } from "@remotion/player";
import type { ThesisFilmProps } from "@/remotion/ThesisFilm";
import { cueAt, FPS } from "@/remotion/timeline";

export interface TranscriptLine {
  text: string;
  figure?: { value: string; condition: string };
}

interface ShowcaseProps {
  /** The film's props, resolved from content on the server. */
  film: Omit<ThesisFilmProps, "portrait">;
  total: number;
  transcript: TranscriptLine[];
  /** Whether narration audio exists yet. Until then the film plays with captions only. */
  hasAudio: boolean;
  /** Shown until the film is played, and instead of it under reduced motion or without JS. */
  children: ReactNode;
}

type Loaded = {
  Player: typeof import("@remotion/player").Player;
  Film: ComponentType<ThesisFilmProps>;
};

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;

/**
 * A narrated film whose figures light up the page's own Measured rows as they are spoken —
 * the figure and its condition stay in HTML, never only inside the video.
 *
 * Nothing heavy loads until the visitor presses Play: the Remotion player and the
 * composition are imported on demand, so the homepage ships the static diagram first.
 * Under prefers-reduced-motion the film is not offered; the diagram and the transcript
 * carry everything it says.
 */
export function Showcase({ film, total, transcript, hasAudio, children }: ShowcaseProps) {
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [loading, setLoading] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [portrait, setPortrait] = useState(false);
  const player = useRef<PlayerRef>(null);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ph = window.matchMedia("(max-width: 640px)");
    const sync = () => {
      setReduce(rm.matches);
      setPortrait(ph.matches);
    };
    sync();
    rm.addEventListener("change", sync);
    ph.addEventListener("change", sync);
    return () => {
      rm.removeEventListener("change", sync);
      ph.removeEventListener("change", sync);
    };
  }, []);

  const light = useCallback((key: string | undefined) => {
    document.querySelectorAll<HTMLElement>("[data-metric]").forEach((el) => {
      el.setAttribute("aria-current", String(Boolean(key) && el.dataset.metric === key));
    });
  }, []);

  // Wire the player's frame events to the page's rows once it exists.
  useEffect(() => {
    const p = player.current;
    if (!loaded || !p) return;
    const onFrame = (e: { detail: { frame: number } }) => light(cueAt(film.cues, e.detail.frame / FPS).metricKey);
    const onStop = () => light(undefined);
    p.addEventListener("frameupdate", onFrame);
    p.addEventListener("pause", onStop);
    p.addEventListener("ended", onStop);
    return () => {
      p.removeEventListener("frameupdate", onFrame);
      p.removeEventListener("pause", onStop);
      p.removeEventListener("ended", onStop);
      onStop();
    };
  }, [loaded, film.cues, light]);

  const play = async () => {
    setLoading(true);
    const [{ Player }, { ThesisFilm }] = await Promise.all([import("@remotion/player"), import("@/remotion/ThesisFilm")]);
    setLoaded({ Player, Film: ThesisFilm });
    setLoading(false);
  };

  const Player = loaded?.Player;

  return (
    <figure className="m-0" aria-label="Narrated film: a cheap decision first">
      {Player && loaded ? (
        <div className="overflow-hidden rounded-[14px] bg-sheet">
          <Player
            ref={player}
            component={loaded.Film}
            inputProps={{ ...film, portrait }}
            durationInFrames={Math.ceil(total * FPS)}
            fps={FPS}
            compositionWidth={portrait ? 720 : 960}
            compositionHeight={portrait ? 900 : 540}
            controls
            autoPlay
            clickToPlay
            acknowledgeRemotionLicense
            style={{ width: "100%" }}
          />
        </div>
      ) : (
        children
      )}

      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-3 pb-2 pt-3 text-[13px] text-ink-2">
        {!loaded && !reduce && (
          <button
            type="button"
            onClick={play}
            disabled={loading}
            className="rounded-pill bg-ink px-4 py-1.5 text-[13.5px] font-medium text-sheet hover:bg-cond disabled:cursor-wait"
          >
            {loading ? "Loading the film…" : `Play the film · ${fmt(total)}`}
          </button>
        )}
        <span>
          {hasAudio ? "Narration: synthetic voice (Kokoro)." : "Captions only — narration to follow."}
          {reduce && " Motion is off on this device; the diagram and the transcript carry the same content."}
        </span>
        <details className="w-full">
          <summary className="cursor-pointer text-cond">Transcript</summary>
          <ol className="m-0 mt-2 grid gap-1.5 pl-5 text-[14px] text-ink">
            {transcript.map((l, i) => (
              <li key={i}>
                {l.text}
                {l.figure && (
                  <span className="mt-1 block w-fit rounded-[8px] bg-cond-bg px-2 py-0.5 text-[13px] text-cond">
                    <span className="fig text-ink">{l.figure.value}</span> — {l.figure.condition}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </details>
      </figcaption>
    </figure>
  );
}
