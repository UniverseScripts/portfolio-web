import { Metric } from "@/content/types";

export interface MetricRow extends Metric {
  /** Which project the figure belongs to, when the list mixes projects. */
  source?: string;
  /** Attribution shown beside the project name in a group heading. */
  attribution?: string;
}

interface MetricTableProps {
  rows: MetricRow[];
  caption: string;
}

/** A stable id per figure, so a narrated film can light the row it is reading. */
export const metricKey = (row: Pick<MetricRow, "source" | "label">) =>
  `${row.source ?? ""}-${row.label}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * The signature device: the result and its test conditions are one unit. The condition
 * sits in its own tinted chip (teal is the conditions colour) and is never truncated,
 * hidden behind a hover, or set fainter than the label — it is the half of the claim that
 * makes the number mean anything (truth file §9.1).
 *
 * Rows are grouped under the project that produced them, so the figures read as proof of a
 * project rather than a loose list. In the markup each row is label → value → condition (the
 * built-site check reads them in that order); CSS places the value in the left column.
 *
 * Returns null for an empty list: a project with nothing measured shows nothing
 * (omission, not disclaimer).
 */
export function MetricTable({ rows, caption }: MetricTableProps) {
  if (rows.length === 0) return null;

  const groups: { source?: string; attribution?: string; rows: MetricRow[] }[] = [];
  for (const row of rows) {
    const last = groups[groups.length - 1];
    if (last && last.source === row.source) last.rows.push(row);
    else groups.push({ source: row.source, attribution: row.attribution, rows: [row] });
  }

  return (
    <div role="group" aria-label={caption}>
      {groups.map((g) => (
        <section key={g.source ?? "rows"} aria-label={g.source ?? caption}>
          {g.source && (
            <h3 className="m-0 px-2.5 pb-1 pt-4 font-serif text-[15px] font-medium text-ink">
              {g.source}
              {g.attribution && <span className="ml-1.5 text-[13px] font-normal text-ink-2">{g.attribution}</span>}
            </h3>
          )}
          <dl className="m-0">
            {g.rows.map((row) => (
              <div
                key={metricKey(row)}
                data-metric={metricKey(row)}
                className="grid grid-cols-[84px_1fr] gap-x-3.5 gap-y-1 rounded-inner border-t border-rule px-2.5 py-3 transition-[background-color,box-shadow] duration-300 aria-[current=true]:bg-[#f1f7f8] aria-[current=true]:shadow-[inset_3px_0_0_var(--color-cond)] sm:grid-cols-[104px_1fr]"
              >
                <dt className="col-start-2 row-start-1 text-[14.5px] font-medium">{row.label}</dt>
                <dd className="fig col-start-1 row-start-1 m-0 pt-px text-[16.5px] text-ink">{row.value}</dd>
                <dd className="col-start-2 m-0 justify-self-start rounded-[8px] bg-cond-bg px-2 py-1 text-[13.5px] leading-snug text-cond">
                  {row.condition}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
