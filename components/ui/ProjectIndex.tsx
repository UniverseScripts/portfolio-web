import Link from "next/link";
import { allProjects } from "@/content/projects";
import { orderedGroups, projectGroups } from "@/content/projects/groups";

/**
 * Every project in one table, grouped by what it does. Attribution is a column, not a
 * footnote: team or solo is on every row (truth file §9.3). On narrow screens the rows
 * stack; a project with nothing measured simply shows no "Measured" line there.
 */
export function ProjectIndex() {
  const stack = "max-lg:block max-lg:border-0 max-lg:px-4 max-lg:py-0.5";
  return (
    <table className="w-full border-collapse border border-rule bg-sheet text-left max-lg:block">
      <caption className="sr-only">Projects, grouped by what they do</caption>
      <thead className="max-lg:sr-only">
        <tr className="bg-thead font-cond text-[13.5px] text-ink-2">
          <th scope="col" className="px-4 py-2.5 font-medium">Project</th>
          <th scope="col" className="w-[38%] px-4 py-2.5 font-medium">What it does</th>
          <th scope="col" className="w-[24%] px-4 py-2.5 font-medium">Attribution</th>
          <th scope="col" className="px-4 py-2.5 font-medium">When</th>
          <th scope="col" className="px-4 py-2.5 font-medium">Measured</th>
        </tr>
      </thead>
      {orderedGroups.map((group) => {
        const info = projectGroups[group];
        const projects = allProjects.filter((p) => p.group === group);
        return (
          <tbody key={group} className="max-lg:block">
            <tr className="max-lg:block">
              <th
                colSpan={5}
                scope="colgroup"
                id={`group-${group}`}
                className="border-t border-rule-strong bg-paper px-4 pb-3 pt-4 text-left font-normal max-lg:block"
              >
                <span className="font-serif text-[20px] font-medium">{info.heading}</span>
                <span className="ml-3 font-cond text-[14.5px] text-ink-2 max-lg:ml-0 max-lg:block">{info.description}</span>
              </th>
            </tr>
            {projects.map((p) => {
              const count = p.metrics.length;
              return (
                <tr key={p.id} className="border-t border-rule align-top max-lg:block max-lg:py-3">
                  <th scope="row" className={`whitespace-nowrap px-4 py-3.5 text-[19px] font-medium ${stack}`}>
                    <Link href={p.contentFunnelRoute} className="text-ink no-underline hover:text-cond hover:underline">
                      {p.title}
                    </Link>
                  </th>
                  <td className={`px-4 py-3.5 text-[15.5px] leading-normal text-ink-2 ${stack}`}>{p.oneLine}</td>
                  <td className={`px-4 py-3.5 font-cond text-[15px] leading-snug ${stack}`}>{p.role}</td>
                  <td className={`whitespace-nowrap px-4 py-3.5 font-cond text-[14.5px] text-ink-2 ${stack} max-lg:inline-block`}>{p.period}</td>
                  <td className={`whitespace-nowrap px-4 py-3.5 font-cond text-[14.5px] ${stack} max-lg:ml-2 max-lg:inline-block ${count === 0 ? "max-lg:hidden" : ""}`}>
                    {count === 0 ? (
                      <span aria-label="Nothing measured">—</span>
                    ) : (
                      <Link href={`${p.contentFunnelRoute}#evaluation`}>
                        {count} {count === 1 ? "result" : "results"}
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        );
      })}
    </table>
  );
}
