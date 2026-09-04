import type { Metadata } from "next";
import {
  allCertifications,
  certificateRegistry,
  credentialNoun,
  credentialLabel,
} from "@/content/certifications";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CertificateViewer } from "@/components/ui/CertificateViewer";

export function generateStaticParams() {
  return allCertifications.map((cert) => ({
    slug: cert.id,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cert = certificateRegistry[slug];
  if (!cert) return {};
  const noun = credentialNoun[cert.kind];
  // Some titles already are the noun ("Certificate of Attendance"). Adding it again
  // stutters, so it is only appended when it tells the reader something new.
  const suffix = titleStatesItsKind(cert.title, noun) ? "" : ` — ${noun}`;
  return {
    title: `${cert.title} — ${cert.authority}`,
    description: `${cert.title}${suffix}, from ${cert.authority}, ${cert.date}.`,
  };
}

function titleStatesItsKind(title: string, noun: string): boolean {
  return title.toLowerCase().includes(noun.toLowerCase());
}

export default async function CertificatePage({ params }: PageProps) {
  const { slug } = await params;
  const cert = certificateRegistry[slug];

  if (!cert) {
    notFound();
  }

  const accentColor = cert.badgeHex || "#3b82f6";

  return (
    <main className="min-h-screen px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

        {/* Left Column (col-span-4): Sticky Certificate Metadata */}
        <aside className="lg:col-span-4 lg:sticky lg:top-16 space-y-8 animate-boot" style={{ "--boot-delay": "50ms" } as React.CSSProperties}>

          {/* Back navigation */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-xs font-mono text-[#71717a] hover:text-[#fafafa] transition-colors duration-150 select-none group"
              aria-label="Back to home page credentials list"
            >
              <span className="mr-1.5 transition-transform duration-150 group-hover:-translate-x-1">←</span>
              Credentials
            </Link>
          </div>

          {/* Certificate Title & Kind */}
          <div className="space-y-4">
            <div>
              {!titleStatesItsKind(cert.title, credentialNoun[cert.kind]) && (
                <p className="text-[10px] font-mono tracking-[0.2em] text-[#71717a] uppercase mb-1 select-none">
                  {credentialNoun[cert.kind]}
                </p>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-[#fafafa] leading-tight tracking-tight">
                {cert.title}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <span
                className="text-[9px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider select-none bg-[#18181b]/50"
                style={{
                  borderColor: `${accentColor}40`,
                  color: accentColor
                }}
              >
                {cert.authority}
              </span>
            </div>
          </div>

          {/* What this credential actually is */}
          <div className="border-t border-[#27272a]/30 pt-6 space-y-4">
            <h2 className="text-[10px] font-mono text-[#71717a] tracking-[0.15em] uppercase select-none">
              Record
            </h2>
            <dl className="grid grid-cols-1 gap-4 font-mono text-xs">
              <div className="border-b border-[#27272a]/10 pb-3">
                <dt className="text-[#71717a] text-[10px] uppercase select-none mb-0.5">Issued by</dt>
                <dd className="font-semibold text-[#e4e4e7]">{cert.authority}</dd>
              </div>
              <div className="border-b border-[#27272a]/10 pb-3">
                <dt className="text-[#71717a] text-[10px] uppercase select-none mb-0.5">Date issued</dt>
                <dd className="font-semibold text-[#e4e4e7]">{cert.date}</dd>
              </div>
              <div className={cert.note ? "border-b border-[#27272a]/10 pb-3" : ""}>
                <dt className="text-[#71717a] text-[10px] uppercase select-none mb-0.5">Type</dt>
                <dd className="font-semibold text-[#e4e4e7]">{credentialLabel[cert.kind]}</dd>
              </div>
              {cert.note && (
                <div>
                  <dt className="text-[#71717a] text-[10px] uppercase select-none mb-0.5">Detail</dt>
                  <dd className="text-[#a1a1aa] leading-relaxed font-normal">{cert.note}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Verification is the issuer's link, or nothing at all */}
          {cert.verificationUrl && (
            <div className="pt-2">
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-[#27272a] rounded-md text-xs font-mono text-[#fafafa] bg-[#111113]/90 hover:bg-[#18181b] hover:border-[#3f3f46] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-200 select-none group"
              >
                <span>VERIFY WITH ISSUER</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          )}
        </aside>

        {/* Right Column (col-span-8): Certificate Visual frame */}
        <section className="lg:col-span-8 space-y-6">
          <div className="border border-[#27272a]/60 rounded-md bg-[#111113]/40 p-4 sm:p-8 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-full max-w-2xl">
              <CertificateViewer cert={cert} />
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
