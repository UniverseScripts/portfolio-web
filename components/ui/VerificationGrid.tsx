import { verifiedCertifications } from "@/content/certifications";

export function VerificationGrid() {
  const sortedCertifications = [...verifiedCertifications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section aria-labelledby="certs-heading" className="mt-14">
      <h2
        id="certs-heading"
        className="text-[10px] font-mono text-[#71717a] tracking-[0.2em] uppercase mb-6"
      >
        Institutional Verification Grid // Credentials
      </h2>
      <div className="border border-[#27272a] rounded-md overflow-hidden bg-[#111113]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse group/table">
            <thead>
              <tr className="border-b border-[#27272a] bg-[#0d0d0f] text-[9px] font-mono text-[#71717a]/80 tracking-wider uppercase select-none">
                <th className="p-4 font-medium">Verification Registry</th>
                <th className="p-4 font-medium">Issuing Node</th>
                <th className="p-4 font-medium">Timestamp</th>
                <th className="p-4 font-medium text-right">Secure Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272a]/60 text-xs font-mono">
              {sortedCertifications.map((cert) => (
                <tr 
                  key={cert.id} 
                  className="transition-opacity duration-100 group-hover/table:opacity-40 hover:!opacity-100 hover:bg-[#161619] text-[#71717a] hover:text-[#fafafa]"
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
                  <td className="p-4">{cert.date}</td>
                  <td className="p-4 text-right">
                    {cert.verificationUrl ? (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center text-[#3b82f6] hover:text-[#fafafa] select-none"
                        aria-label={`Verify authenticity for ${cert.title}`}
                      >
                        [AUTH_LOG_
                        <span className="group-hover/link:hidden">_</span>
                        <span className="hidden group-hover/link:inline">→</span>]
                      </a>
                    ) : (
                      <span className="text-[#71717a]/40 select-none">[SYSTEM_RECORD]</span>
                    )}
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
