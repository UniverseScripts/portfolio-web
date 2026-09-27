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

  const noun = credentialNoun[cert.kind];
  const record: Array<[string, string]> = [
    ["Kind", noun.charAt(0).toUpperCase() + noun.slice(1)],
    ["Issued by", cert.authority],
    ["Date issued", cert.date],
    ...(cert.note ? [["Detail", cert.note] as [string, string]] : []),
  ];

  return (
    <article>
      <header className="pb-2 pt-9">
        <p className="m-0 mb-3 font-cond text-[15px] text-ink-2">
          <Link href="/#credentials">← All credentials</Link>
          {!titleStatesItsKind(cert.title, noun) && <> · {credentialLabel[cert.kind]}</>}
        </p>
        <h1 className="m-0 text-[clamp(32px,4.4vw,52px)] font-medium leading-[1.08] tracking-[-0.02em]">
          {cert.title}
        </h1>
        <p className="m-0 mt-1.5 text-[19px] text-ink-2">{cert.authority}</p>
      </header>

      <div className="mt-6 grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
        <aside aria-label="Credential record" className="flex flex-col gap-4 lg:sticky lg:top-5 lg:order-2">
          <dl className="m-0 rounded-card border border-rule bg-sheet px-5 py-1.5">
            {record.map(([k, val]) => (
              <div key={k} className="border-b border-rule py-[11px] last:border-b-0">
                <dt className="font-cond text-[13px] text-ink-2">{k}</dt>
                <dd className="m-0 mt-0.5 text-[15.5px] leading-[1.45]">{val}</dd>
              </div>
            ))}
          </dl>
          {/* Verification is the issuer's own link, or nothing at all (rule 7). */}
          {cert.verificationUrl && (
            <a
              href={cert.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-[3px] bg-ink px-4 py-2.5 text-center font-cond text-[15px] font-medium text-paper no-underline hover:bg-cond"
            >
              Verify with the issuer
            </a>
          )}
        </aside>

        <section aria-label="Certificate scan" className="lg:order-1">
          <CertificateViewer cert={cert} />
        </section>
      </div>
    </article>
  );
}
