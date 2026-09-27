import Link from "next/link";
import { allCertifications, credentialNoun } from "@/content/certifications";

/**
 * Credentials, most recent first. "Kind" is load-bearing: a course completion, a
 * programme completion, an attendance certificate and a competitive placement must
 * never read as equivalent rows (truth file §7, §9.2).
 */
export function CredentialTable() {
  const rows = [...allCertifications].sort((a, b) => b.date.localeCompare(a.date));
  const cell = "px-[18px] py-3 max-sm:block max-sm:px-4 max-sm:py-0.5";
  return (
    <table className="w-full border-collapse border border-rule bg-sheet text-left max-sm:block">
      <caption className="sr-only">Credentials, most recent first</caption>
      <thead className="max-sm:sr-only">
        <tr className="bg-thead font-cond text-[13.5px] text-ink-2">
          <th scope="col" className="px-[18px] py-3 font-medium">Credential</th>
          <th scope="col" className="px-[18px] py-3 font-medium">Issuer</th>
          <th scope="col" className="px-[18px] py-3 font-medium">Kind</th>
          <th scope="col" className="px-[18px] py-3 font-medium">Issued</th>
        </tr>
      </thead>
      <tbody className="max-sm:block">
        {rows.map((cert) => {
          const kind = credentialNoun[cert.kind];
          return (
            <tr key={cert.id} className="border-t border-rule align-top max-sm:block max-sm:py-3">
              <th scope="row" className={`font-medium ${cell}`}>
                <Link href={`/certificates/${cert.id}/`}>{cert.title}</Link>
              </th>
              <td className={`text-[15.5px] text-ink-2 ${cell}`}>{cert.authority}</td>
              <td className={`font-cond text-[15px] ${cell}`}>{kind.charAt(0).toUpperCase() + kind.slice(1)}</td>
              <td className={`fig whitespace-nowrap text-[14px] font-normal text-ink-2 ${cell}`}>{cert.date}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
