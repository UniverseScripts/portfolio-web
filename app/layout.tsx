import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Systems Engineering Portfolio",
    template: "%s · Systems Engineering Portfolio",
  },
  description:
    "High-stakes systems engineering: RAG pipelines, MCP integration layers, CQRS/DDD patterns, and low-latency realtime architecture.",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Systems Engineering Portfolio",
    description:
      "High-stakes systems engineering: RAG pipelines, MCP integration layers, CQRS/DDD patterns, and low-latency realtime architecture.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
