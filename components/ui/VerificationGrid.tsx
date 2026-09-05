import { allCertifications, credentialLabel } from "@/content/certifications";
import Link from "next/link";

export function VerificationGrid() {
  const sortedCertifications = [...allCertifications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section aria-labelledby="certs-heading" className="mt-14">
      <h2
        id="certs-heading"
        className="text-[10px] font-mono text-[#a1a1aa] tracking-[0.2em] uppercase mb-6"
      >
        Credentials
      </h2>
      <div className="border border-[#27272a] rounded-md overflow-hidden bg-[#111113]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <caption className="sr-only">Credentials, most recent first</caption>
            <thead>
              <tr className="border-b border-[#27272a] bg-[#0d0d0f] text-[9px] font-mono text-[#a1a1aa] tracking-wider uppercase select-none">
                <th scope="col" className="p-4 font-medium">Credential</th>
                <th scope="col" className="p-4 font-medium">Issuer</th>
                {/* Type is load-bearing: without it a course completion, an attendance
                    certificate and a competitive placement read as equivalent rows. */}
                <th scope="col" className="p-4 font-medium">Type</th>
                <th scope="col" className="p-4 font-medium">Issued</th>
                <th scope="col" className="p-4 font-medium text-right">Record</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272a]/60 text-xs font-mono">
              {sortedCertifications.map((cert) => (
                <tr
                  key={cert.id}
                  className="transition-colors duration-100 hover:bg-[#161619] text-[#a1a1aa] hover:text-[#fafafa] focus-within:bg-[#161619]"
                >
                  <td className="p-4 font-sans text-sm font-semibold text-[#fafafa]">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: cert.badgeHex || "#27272a" }}
                        aria-hidden="true"
                      />
                      {cert.title}
                    </div>
                  </td>
                  <td className="p-4">{cert.authority}</td>
                  <td className="p-4">{credentialLabel[cert.kind]}</td>
                  <td className="p-4">{cert.date}</td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/certificates/${cert.id}`}
                      className="group/link inline-flex items-center text-[#3b82f6] hover:text-[#fafafa] select-none"
                      aria-label={`View the ${cert.title} record`}
                    >
                      [VIEW_CRED_
                      <span className="group-hover/link:hidden">_</span>
                      <span className="hidden group-hover/link:inline">→</span>]
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
