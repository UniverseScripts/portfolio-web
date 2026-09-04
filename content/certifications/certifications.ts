import { CertificationSchema } from "../types";

// Colour signals what the credential is, not how impressive it sounds:
//   #10b981 — a competitive placement or an academic honour
//   #3b82f6 — a course completion
//   #71717a — attendance, or a foundational-level completion

export const certifications: CertificationSchema[] = [
  {
    id: "vercel-nextjs-approuter",
    title: "Next.js App Router Fundamentals",
    authority: "Vercel",
    date: "2026-02-20",
    kind: "completion",
    badgeHex: "#3b82f6"
  },
  {
    id: "deeplearning-ai-genai-llm",
    title: "Generative AI with Large Language Models",
    authority: "DeepLearning.AI & AWS — via Coursera",
    date: "2026-01-02",
    kind: "completion",
    verificationUrl: "https://coursera.org/verify/YADAK43947Y7",
    badgeHex: "#3b82f6"
  },
  {
    id: "gdgoc-national-hackathon-2026",
    title: "Top 30 Finalist Award",
    authority: "GDGoC National Hackathon 2026 (Hanoi)",
    date: "2026-05-20",
    kind: "placement",
    note: "Team Hackaphobia. The nationwide programme — a separate event from the GDGoC DevCamp at HCMUT that produced Vora.",
    badgeHex: "#10b981"
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Cloud Practitioner Essentials",
    authority: "Amazon Web Services (AWS)",
    date: "2025-12-03",
    kind: "completion",
    note: "Foundational-level completion.",
    badgeHex: "#71717a"
  },
  {
    id: "uts-dean-list-2026",
    title: "Dean's List 2026",
    authority: "University of Technology Sydney",
    date: "2026-07-09",
    kind: "honour",
    badgeHex: "#10b981"
  },
  {
    id: "nvidia-ai-open-hackathon",
    title: "Certificate of Attendance",
    authority: "Vietnam AI Open Hackathon (NVIDIA / OpenACC)",
    date: "2026-06-09",
    kind: "attendance",
    note: "Selected as one of 10 teams from ~100 registrants to compete.",
    badgeHex: "#71717a"
  }
];

export const verifiedCertifications = Object.fromEntries(certifications.map(cert => [cert.id, cert]))
