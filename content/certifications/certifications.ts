import { CertificationSchema } from "../types";

export const certifications: CertificationSchema[] = [
  {
    id: "vercel-nextjs-approuter",
    title: "Next.js App Router Fundamentals",
    authority: "Vercel",
    date: "2026-02-20",
    badgeHex: "#3b82f6"
  },
  {
    id: "deeplearning-ai-genai-llm",
    title: "Generative AI with Large Language Models",
    authority: "DeepLearning.AI // AWS",
    date: "2026-01-02",
    verificationUrl: "https://coursera.org/verify/YADAK43947Y7",
    badgeHex: "#10b981"
  },
  {
    id: "google-hackathon-top30",
    title: "Top 30 Finalist Award",
    authority: "Google Hackathon",
    date: "2026-01-01",
    badgeHex: "#10b981"
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Cloud Practitioner Essentials",
    authority: "Amazon Web Services (AWS)",
    date: "2025-12-03",
    badgeHex: "#71717a"
  },
  {
    id: "uts-dean-list-2026",
    title: "Dean's List",
    authority: "University of Technology Sydney",
    date: "2026-07-09",
    badgeHex: "#71717a"
  },
  {
    id: "nvidia-ai-open-hackathon-top10",
    title: "Top 10 Finalist Award",
    authority: "NVIDIA AI Open Hackathon",
    date: "2026-06-09",
    badgeHex: "#10b981"
  }
];

export const verifiedCertifications = Object.fromEntries(certifications.map(cert => [cert.id, cert]))