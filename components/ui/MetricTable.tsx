import { Metric } from "@/content/types";

export interface MetricRow extends Metric {
  /** Which project the figure belongs to, when the table mixes projects. */
  source?: string;
}

interface MetricTableProps {
  rows: MetricRow[];
  caption: string;
}

/**
 * The signature device: a datasheet row where the result and its test conditions are
 * one unit. The condition sits in its own tinted column (the only use of the accent
 * colour besides links) and is never truncated, hidden behind a hover, or set smaller
 * than the label — it is the half of the claim that makes the number mean anything
 * (truth file §9.1). On narrow screens rows stack, and the condition stays attached to
 * its own row.
 *
 * Returns null for an empty list: a project with nothing measured shows no table
 * rather than an empty frame (omission, not disclaimer).
 */
export function MetricTable({ rows, caption }: MetricTableProps) {
  if (rows.length === 0) return null;

  const cell = "max-sm:block max-sm:px-4 max-sm:py-2 max-sm:before:block max-sm:before:font-cond max-sm:before:text-[12.5px] max-sm:before:font-normal max-sm:before:content-[attr(data-h)]";

  return (
    <table className="w-full border-collapse border border-rule bg-sheet text-left max-sm:block">
      <caption className="sr-only">{caption}</caption>
      <thead className="max-sm:sr-only">
        <tr className="bg-thead font-cond text-[13.5px] text-ink-2">
          <th scope="col" className="px-[18px] py-3 font-medium">Measure</th>
          <th scope="col" className="px-[18px] py-3 font-medium">Result</th>
          <th scope="col" className="px-[18px] py-3 font-medium text-cond">Test conditions</th>
        </tr>
      </thead>
      <tbody className="max-sm:block">
        {rows.map((row) => (
          <tr
            key={`${row.source ?? ""}-${row.label}`}
            className="border-t border-rule align-top max-sm:block"
          >
            <th scope="row" className="px-[18px] py-3 font-medium max-sm:block max-sm:px-4 max-sm:pb-1">
              {row.label}
              {row.source && (
                <span className="block font-cond text-[13.5px] font-normal text-ink-2">{row.source}</span>
              )}
            </th>
            <td data-h="Result" className={`fig whitespace-nowrap px-[18px] py-3 text-[17px] max-sm:before:text-ink-2 ${cell}`}>
              {row.value}
            </td>
            <td
              data-h="Test conditions"
              className={`border-l-2 border-cond bg-cond-bg px-[18px] py-3 font-cond text-[15.5px] text-cond max-sm:border-l-0 max-sm:border-t-2 max-sm:before:text-cond ${cell}`}
            >
              {row.condition}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
