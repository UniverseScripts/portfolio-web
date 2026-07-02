// Server Component — executes at `next build`, baked into static HTML.
// Data fetch chain: GitHub GraphQL (if GITHUB_TOKEN set) → community proxy → empty grid fallback.

/** Contribution level → portfolio green scale */
const LEVEL_COLORS: Record<number, string> = {
  0: "#1c1c1f",
  1: "#0d3d2e",
  2: "#0e5c3f",
  3: "#0f8a5a",
  4: "#10b981",
};

const CELL_SIZE = 10;
const CELL_GAP = 2;
const CELL_STEP = CELL_SIZE + CELL_GAP;
const LABEL_HEIGHT = 16;

type Level = 0 | 1 | 2 | 3 | 4;

interface ContributionDay {
  date: string;
  count: number;
  level: Level;
}

interface ContributionWeek {
  days: ContributionDay[];
}

interface GridData {
  weeks: ContributionWeek[];
  total: number;
}

// ── Normalizers ──────────────────────────────────────────────────────────────

function graphqlLevelToInt(level: string): Level {
  const map: Record<string, Level> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  };
  return map[level] ?? 0;
}

function clampLevel(n: number): Level {
  return (Math.min(Math.max(n, 0), 4) as Level);
}

// ── Empty fallback ────────────────────────────────────────────────────────────

function buildEmptyGrid(): GridData {
  const weeks: ContributionWeek[] = Array.from({ length: 53 }, () => ({
    days: Array.from({ length: 7 }, () => ({
      date: "",
      count: 0,
      level: 0 as Level,
    })),
  }));
  return { weeks, total: 0 };
}

// ── Source 1: GitHub GraphQL API ─────────────────────────────────────────────

const GRAPHQL_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

async function fetchViaGraphQL(
  username: string,
  token: string
): Promise<GridData | null> {
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        query: GRAPHQL_QUERY,
        variables: { login: username },
      }),
    });

    if (!res.ok) return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any = await res.json();
    const calendar =
      json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    const weeks: ContributionWeek[] = calendar.weeks.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (w: any) => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        days: w.contributionDays.map((d: any) => ({
          date: d.date as string,
          count: d.contributionCount as number,
          level: graphqlLevelToInt(d.contributionLevel),
        })),
      })
    );

    return { weeks, total: calendar.totalContributions as number };
  } catch {
    return null;
  }
}

// ── Source 2: Community proxy ─────────────────────────────────────────────────

async function fetchViaProxy(username: string): Promise<GridData | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
    );
    if (!res.ok) return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any = await res.json();
    const days: Array<{ date: string; count: number; level: number }> =
      json?.contributions;
    if (!Array.isArray(days) || days.length === 0) return null;

    // Group flat day array into sequential 7-day weeks
    const weeks: ContributionWeek[] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push({
        days: days.slice(i, i + 7).map((d) => ({
          date: d.date,
          count: d.count,
          level: clampLevel(d.level),
        })),
      });
    }

    // Sum totals across all year keys
    const total = Object.values(
      (json.total ?? {}) as Record<string, number>
    ).reduce<number>((acc, v) => acc + v, 0);

    return { weeks, total };
  } catch {
    return null;
  }
}

// ── Month label positions ─────────────────────────────────────────────────────

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function getMonthLabels(
  weeks: ContributionWeek[]
): Array<{ label: string; x: number }> {
  const labels: Array<{ label: string; x: number }> = [];
  let lastMonth = "";

  weeks.forEach((week, wi) => {
    const firstDated = week.days.find((d) => d.date.length > 0);
    if (!firstDated) return;
    const month = firstDated.date.slice(5, 7);
    if (month !== lastMonth) {
      lastMonth = month;
      labels.push({
        label: MONTH_NAMES[parseInt(month, 10) - 1],
        x: wi * CELL_STEP,
      });
    }
  });

  return labels;
}

// ── SVG Renderer ──────────────────────────────────────────────────────────────

interface RenderProps {
  data: GridData;
  username: string;
  available: boolean;
}

function GridSVG({ data, username, available }: RenderProps) {
  const { weeks, total } = data;
  const svgWidth = weeks.length * CELL_STEP;
  const svgHeight = LABEL_HEIGHT + 7 * CELL_STEP;
  const monthLabels = getMonthLabels(weeks);

  return (
    <section aria-labelledby="github-grid-heading" className="mb-12">
      {/* Section eyebrow */}
      <div className="flex items-baseline justify-between mb-3 gap-4">
        <h2
          id="github-grid-heading"
          className="text-[10px] font-mono text-[#71717a] tracking-[0.2em] uppercase"
        >
          Commit Frequency{" "}
          <span className="text-[#3a3a3f]">{"//"}</span>{" "}
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#3b82f6] transition-colors duration-150"
          >
            github.com/{username}
          </a>
        </h2>
        {available && total > 0 && (
          <span className="text-[9px] font-mono text-[#71717a]/50 tracking-wider shrink-0">
            {total.toLocaleString()} commits{" "}
            <span className="text-[#3a3a3f]">{"//"}</span> last 12 mo
          </span>
        )}
        {!available && (
          <span className="text-[9px] font-mono text-[#71717a]/40 tracking-wider shrink-0">
            {"// data unavailable at build"}
          </span>
        )}
      </div>

      {/* Grid container */}
      <div className="border border-[#27272a] rounded-md px-4 pt-3 pb-2 bg-[#111113] overflow-x-auto">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            width="100%"
            aria-label="GitHub contribution activity grid"
            role="img"
            style={{ minWidth: Math.min(svgWidth, 320) }}
            className="group/svg"
          >
            {/* Month labels */}
            {monthLabels.map(({ label, x }) => (
              <text
                key={`m-${label}-${x}`}
                x={x}
                y={10}
                fontSize={7.5}
                fontFamily="var(--font-geist-mono, ui-monospace, monospace)"
                fill="#52525b"
                letterSpacing="0.06em"
              >
                {label}
              </text>
            ))}

            {/* Contribution cells */}
            {weeks.map((week, wi) =>
              week.days.map((day, di) => (
                <rect
                  key={`${wi}-${di}`}
                  x={wi * CELL_STEP}
                  y={LABEL_HEIGHT + di * CELL_STEP}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  rx={2}
                  ry={2}
                  fill={LEVEL_COLORS[day.level]}
                  className="transition-opacity duration-100 group-hover/svg:opacity-30 hover:!opacity-100 cursor-crosshair"
                />
              ))
            )}
          </svg>

        {/* Legend */}
        <div className="flex items-center gap-1.5 justify-end mt-2 mb-1">
          <span className="text-[8px] font-mono text-[#52525b]">Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <svg key={l} width={CELL_SIZE} height={CELL_SIZE} aria-hidden="true">
              <rect
                width={CELL_SIZE}
                height={CELL_SIZE}
                rx={2}
                fill={LEVEL_COLORS[l]}
              />
            </svg>
          ))}
          <span className="text-[8px] font-mono text-[#52525b]">More</span>
        </div>
      </div>
    </section>
  );
}

// ── Public component ─────────────────────────────────────────────────────────

interface GitHubGridProps {
  username: string;
}

export async function GitHubGrid({ username }: GitHubGridProps) {
  const token = process.env.GITHUB_TOKEN;

  // Source 1: GitHub GraphQL (requires GITHUB_TOKEN env var)
  if (token) {
    const data = await fetchViaGraphQL(username, token);
    if (data) {
      return <GridSVG data={data} username={username} available={true} />;
    }
    // Token present but GraphQL failed — fall through to proxy
    console.warn("[GitHubGrid] GraphQL fetch failed, trying proxy...");
  }

  // Source 2: Community proxy (no auth required)
  const proxyData = await fetchViaProxy(username);
  if (proxyData) {
    return <GridSVG data={proxyData} username={username} available={true} />;
  }

  // Source 3: Empty grid fallback — page deploys successfully, grid is dark
  console.warn("[GitHubGrid] All sources failed — rendering empty grid");
  return (
    <GridSVG data={buildEmptyGrid()} username={username} available={false} />
  );
}
