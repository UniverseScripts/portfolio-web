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
  const [started, setStarted] = useState(false);
  const [autoplayFallback, setAutoplayFallback] = useState(false);
  const [failed, setFailed] = useState(false);
  const figure = useRef<HTMLElement>(null);
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

  // Resolves false instead of throwing: a chunk can fail to load on a flaky network or after a
  // redeploy, and the visitor must get a working retry rather than a dead button (see play()).
  const load = useCallback(async () => {
    try {
      const [{ Player }, { ThesisFilm }] = await Promise.all([import("@remotion/player"), import("@/remotion/ThesisFilm")]);
      setLoaded((current) => current ?? { Player, Film: ThesisFilm });
      return true;
    } catch {
      return false;
    }
  }, []);

  // Fetch the player once the film is near the viewport, so pressing Play can start it inside
  // the click itself — browsers only allow sound from a direct user gesture, and a player that
  // mounts after an await has lost it (Remotion then mutes itself).
  useEffect(() => {
    const el = figure.current;
    if (reduce || loaded || !el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        void load();
      }
    }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, loaded, load]);

  const play = async (e: React.MouseEvent) => {
    // The bundler caches a failed chunk load for the life of the page, so a second import()
    // fails instantly (measured). A reload is the retry that works: it refetches after a network
    // blip, and after a redeploy it fetches HTML that points at the new chunk names.
    if (failed) {
      window.location.reload();
      return;
    }
    if (loaded && player.current) {
      setStarted(true);
      player.current.play(e);
      return;
    }
    // Pressed before the player arrived (or after a failed prefetch): load it, then autoplay.
    // It may start muted; the player's own controls can unmute it.
    setLoading(true);
    setFailed(false);
    try {
      if (await load()) {
        setAutoplayFallback(true);
        setStarted(true);
      } else {
        setFailed(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const Player = loaded?.Player;

  return (
    <figure ref={figure} className="m-0" aria-label="Narrated film: a cheap decision first">
      {/* Controls first: the figure can be taller than the window while pinned, so the
          Play button must never sit below the diagram. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-3 pb-3 pt-2 text-[13px] text-ink-2">
        {!started && !reduce && (
          <button
            type="button"
            onClick={play}
            disabled={loading}
            className="rounded-pill bg-ink px-4 py-1.5 text-[13.5px] font-medium text-sheet hover:bg-cond disabled:cursor-wait"
          >
            {loading ? "Loading the film…" : failed ? "Couldn’t load the film — reload to try again" : `Play the film · ${fmt(total)}`}
          </button>
        )}
        <span role="status" className="sr-only">
          {failed ? "The film couldn’t load. Press the button to reload the page and try again." : ""}
        </span>
        <span>
          {hasAudio ? "Narration: synthetic voice (Kokoro)." : "Captions only — narration to follow."}
          {reduce && " Motion is off on this device; the diagram and the transcript carry the same content."}
        </span>
      </div>
      {Player && loaded && (
        <div data-film-player className="overflow-hidden rounded-[14px] bg-sheet" hidden={!started}>
          <Player
            ref={player}
            component={loaded.Film}
            inputProps={{ ...film, portrait }}
            durationInFrames={Math.ceil(total * FPS)}
            fps={FPS}
            compositionWidth={portrait ? 720 : 960}
            compositionHeight={portrait ? 900 : 540}
            controls
            autoPlay={autoplayFallback}
            clickToPlay
            acknowledgeRemotionLicense
            style={{ width: "100%" }}
          />
        </div>
      )}
      {!started && children}

      <figcaption className="px-3 pb-2 pt-3 text-[13px] text-ink-2">
        <details>
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
