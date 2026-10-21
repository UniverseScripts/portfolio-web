"""Narration for a showcase film, with Kokoro (local ONNX). Adapted from the Ignis film's tts/speak.py.

Reads the APPROVED lines straight out of content/showcases/<film>.ts, so the audio can never say
something the transcript does not. Writes one loudness-matched MP3 per line to
public/showcase/<film>/ and the measured durations to content/showcases/<film>.timeline.json,
which the film and the page's row-sync use for timing.

The model files are read in place and never copied into this repository:
  KOKORO_MODELS (default: the Ignis film's models/ folder on this machine)

Run from code/web:
  uv run --no-project --with kokoro-onnx==0.4.9 --with soundfile==0.12.1 python scripts/tts/speak.py thesis
"""

import json
import os
import re
import sys
from pathlib import Path

import numpy
import soundfile
from kokoro_onnx import Kokoro

WEB = Path(__file__).resolve().parents[2]
MODELS = Path(os.environ.get("KOKORO_MODELS", r"D:\Dev\Projects\Develarper - AMD Act III\video\ignis-film\models"))
VOICE = "af_heart"
SPEED = 0.97
TARGET_RMS_DB = -18.0
PEAK_DB = -1.0
# Pronunciation only — the caption and transcript keep the written form.
SPOKEN = {"XGBoost": "X G Boost", "ICU": "I C U"}


def normalized(samples: numpy.ndarray) -> numpy.ndarray:
    """Scales speech to a common loudness (RMS over voiced samples), then caps the peak."""
    voiced = samples[numpy.abs(samples) > 0.02]
    rms = numpy.sqrt((voiced ** 2).mean()) if voiced.size else 1e-6
    scaled = samples * (10 ** (TARGET_RMS_DB / 20) / rms)
    peak = numpy.abs(scaled).max()
    ceiling = 10 ** (PEAK_DB / 20)
    return scaled * (ceiling / peak) if peak > ceiling else scaled


def main() -> int:
    film = sys.argv[1] if len(sys.argv) > 1 else "thesis"
    source = (WEB / "content" / "showcases" / f"{film}.ts").read_text(encoding="utf-8")
    if not re.search(r'status:\s*"approved"', source):
        print(f"{film}: script is not approved; no audio generated.")
        return 1
    lines = re.findall(r'scene:\s*"([^"]+)",\s*text:\s*"([^"]+)"', source)
    if not lines:
        print(f"{film}: no lines found")
        return 1

    kokoro = Kokoro(str(MODELS / "kokoro-v1.0.onnx"), str(MODELS / "voices-v1.0.bin"))
    out = WEB / "public" / "showcase" / film
    out.mkdir(parents=True, exist_ok=True)
    for old in out.glob("*.mp3"):
        old.unlink()

    entries = []
    for index, (scene, text) in enumerate(lines):
        spoken = text
        for written, said in SPOKEN.items():
            spoken = spoken.replace(written, said)
        samples, rate = kokoro.create(spoken, voice=VOICE, speed=SPEED, lang="en-us")
        name = f"line-{index:02}.mp3"
        soundfile.write(out / name, normalized(numpy.asarray(samples)), rate, format="MP3")
        entries.append({"index": index, "scene": scene, "text": text, "file": f"/showcase/{film}/{name}",
                        "duration": round(len(samples) / rate, 3)})

    timeline = {"film": film, "voice": f"Kokoro-82M {VOICE}", "speed": SPEED, "lines": entries}
    (WEB / "content" / "showcases" / f"{film}.timeline.json").write_text(
        json.dumps(timeline, indent=2) + "\n", encoding="utf-8", newline="\n")
    total = sum(e["duration"] for e in entries)
    print(f"{film}: {len(entries)} lines, {total:.1f} s of speech, voice {VOICE}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
