import type { Metadata } from "next";
import Link from "next/link";
import { DM_Sans, IBM_Plex_Mono, Inter } from "next/font/google";
import { sources } from "@/content/sources";
import "./globals.css";

// Pyrium's live type: DM Sans for display (opsz axis), Inter for text. Plex Mono, from the
// brand board, sets figures only.
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const description =
  "Undergraduate AI student at UTS working on backends and AI inference: routing, retrieval, and gating expensive compute behind cheap fast paths.";

export const metadata: Metadata = {
  title: {
    default: "Yoshio Nomura",
    template: "%s · Yoshio Nomura",
  },
  description,
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Yoshio Nomura",
    description,
  },
};

const nav = [
  { label: "Work", href: "/#work" },
  { label: "Measured", href: "/#measured" },
  { label: "Experience", href: "/#experience" },
  { label: "Credentials", href: "/#credentials" },
];

const EMAIL = "yoshio.nomura@student.uts.edu.au";

const channels = [
  { label: "GitHub", href: "https://github.com/UniverseScripts" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yoshio-nomura-b3219438b/" },
  { label: "X", href: "https://x.com/Asterios07" },
  { label: "Gumroad", href: "https://asteriostech.gumroad.com" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[60] rounded-pill bg-sheet px-5 py-2.5 text-[15px] text-ink shadow"
        >
          Skip to content
        </a>

        {/* Floating pill nav (Pyrium's pattern). It sits over the hero, so the hero leaves room. */}
        <div className="pointer-events-none fixed inset-x-0 top-3 z-50 px-4">
          <header className="pointer-events-auto mx-auto flex h-[58px] max-w-[1200px] items-center justify-between rounded-pill bg-sheet/95 pl-6 pr-2 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_4px_16px_rgb(0_0_0/0.06)] backdrop-blur">
            <Link href="/" className="font-display text-[17px] text-ink no-underline">
              Yoshio Nomura
            </Link>
            <nav aria-label="Sections" className="hidden gap-6 text-[14.5px] md:flex">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="text-ink-2 no-underline hover:text-cond">
                  {item.label}
                </Link>
              ))}
            </nav>
            <span className="flex items-center gap-4 text-[14.5px]">
              <a href="https://github.com/UniverseScripts" className="hidden text-ink-2 no-underline hover:text-cond sm:inline">
                GitHub
              </a>
              <a href="/cv.pdf" className="hidden text-ink-2 no-underline hover:text-cond sm:inline">
                CV
              </a>
              <a href="#contact" className="rounded-pill bg-ink px-[18px] py-[9px] text-[14px] text-sheet no-underline hover:bg-cond">
                Contact
              </a>
            </span>
          </header>
        </div>

        <main id="main">{children}</main>

        <footer id="contact" className="mt-24 bg-sheet">
          <div className="page grid gap-10 py-16">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div>
                <p className="m-0 font-display text-[28px] leading-tight">Yoshio Nomura</p>
                <p className="m-0 mt-1 text-ink-2">
                  Ho Chi Minh City ·{" "}
                  {channels.map((c, i) => (
                    <span key={c.href}>
                      <a href={c.href} rel="me noopener noreferrer" target="_blank">
                        {c.label}
                      </a>
                      {i < channels.length - 1 && <span aria-hidden="true"> · </span>}
                    </span>
                  ))}
                </p>
              </div>
              <a
                href={`mailto:${EMAIL}`}
                className="rounded-pill bg-ink px-6 py-3 text-[15px] text-sheet no-underline hover:bg-cond"
              >
                Email me
              </a>
            </div>
            <div>
              <h2 className="m-0 mb-3 font-serif text-[14px] font-medium">Sources</h2>
              <ol className="m-0 grid list-none gap-1.5 p-0 text-[13.5px] text-ink-2">
                {sources.map((s, i) => (
                  <li key={`${s.label}-${i}`}>
                    <span className="text-ink">[{i + 1}]</span> {s.label} — {s.url ? <a href={s.url}>{s.detail}</a> : s.detail}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
