import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Mono, IBM_Plex_Sans_Condensed, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const plexSerif = IBM_Plex_Serif({
  variable: "--font-plex-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexCondensed = IBM_Plex_Sans_Condensed({
  variable: "--font-plex-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const description =
  "Backend and AI-infrastructure engineering: routing, retrieval, and gating expensive compute behind cheap fast paths.";

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
  { label: "Credentials", href: "/#credentials" },
  { label: "Contact", href: "/#contact" },
];

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
    <html lang="en">
      <body className={`${plexSerif.variable} ${plexCondensed.variable} ${plexMono.variable}`}>
        <a
          href="#main"
          className="sr-only-focusable absolute left-5 top-3 z-50 bg-sheet px-3 py-1.5 font-cond text-[15px]"
        >
          Skip to content
        </a>
        <div className="mx-auto max-w-[1160px] px-5">
          <header className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule py-5">
            <Link href="/" className="font-cond text-[17px] font-semibold text-ink no-underline">
              Yoshio Nomura
            </Link>
            <nav aria-label="Sections" className="flex flex-wrap gap-x-5 gap-y-1 font-cond text-[15px]">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="text-ink no-underline hover:text-cond">
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>

          <main id="main">{children}</main>

          <footer
            id="contact"
            className="mt-20 flex flex-wrap justify-between gap-4 border-t border-rule pb-10 pt-6 font-cond text-[15px] text-ink-2"
          >
            <span>Yoshio Nomura · Ho Chi Minh City</span>
            <span className="flex flex-wrap gap-x-3">
              {channels.map((c, i) => (
                <span key={c.href}>
                  <a href={c.href} rel="me noopener noreferrer" target="_blank">
                    {c.label}
                  </a>
                  {i < channels.length - 1 && <span aria-hidden="true"> ·</span>}
                </span>
              ))}
            </span>
          </footer>
        </div>
      </body>
    </html>
  );
}
