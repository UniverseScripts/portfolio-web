import { ProjectSchema } from "../types";

/*
 * Truth file §11.25.5. The first three figures are team results for the current version (V2).
 * The last is Yoshio's own fix, measured on V1, which has since been replaced — its condition
 * must say so, because it is not a property of the system that exists today.
 * Never claimed: live-microphone or noisy-room accuracy, languages beyond English and Spanish,
 * a deployment.
 */
export const lantern: ProjectSchema = {
  id: "lantern",
  title: "The Lantern",
  domain: "Voice ordering for restaurants",
  group: "retrieval-agents",
  role: "Team of 3 — dialogue logic and reliability",
  period: "September 2026",
  venue: "AssemblyAI Voice Agent Hackathon · lablab.ai",
  repoUrl: "https://github.com/BennedictQuanTon/The-Lantern-AssemblyAI-Voice-Agent-Hackathon",
  stack: ["Python", "FastAPI", "WebSockets", "AssemblyAI streaming", "Qwen3 4B via Ollama", "Kokoro TTS", "SQLite"],
  metrics: [
    {
      label: "Correct orders",
      value: "10 of 10",
      condition: "team result — six-turn ordering scenario, direct runs, qwen3:4b on an RTX 3060",
    },
    {
      label: "Full voice sessions with the correct basket",
      value: "5 of 5",
      condition: "team result — synthetic 16 kHz speech streamed in real time, five sessions on one machine",
    },
    {
      label: "Model time after the final transcript, median",
      value: "1,341 ms",
      condition: "team result — the same five sessions",
    },
    {
      label: "Time to first audio",
      value: "42.9 s → 5.8 s",
      condition: "average over a six-turn conversation with real AssemblyAI, Gemini and Cartesia — the first version, since replaced; Yoshio's rate-limiter fix",
    },
  ],
  architecturePattern: "A small model proposes one intent per turn; code owns the order and the conversation state",
  contentFunnelRoute: "/projects/lantern/",
  gumroadProductId: null,
  oneLine: "A voice maître d' that checks every order change against the live menu before the kitchen sees it.",
  summary: "A voice maître d' for restaurants, built by a team of three at the AssemblyAI Voice Agent Hackathon. It takes a whole table's order by voice, checks every change against the live menu, and sends nothing to the kitchen until the guest places the order — on local models. The order flow is tested end to end in English and Spanish.",
  architectureDetail: "Speech is transcribed by AssemblyAI's streaming model. A local Qwen3 4B model on Ollama returns one intent per turn in a fixed JSON format; code then resolves references such as \"those two\" or \"that instead\", applies the change to the order, and builds the reply from templates, which Kokoro speaks locally. Conversation state lives in SQLite rather than in the prompt, so the prompt stays about the same size every turn. Most of the code is a teammate's; Yoshio's part is the dialogue logic and reliability — the intent schema, reference resolution in code, explicit order placement, and the first version's rate-limiter fix.",
};
