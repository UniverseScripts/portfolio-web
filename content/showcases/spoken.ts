/**
 * The spoken-number gate for narrated films (portfolio CLAUDE.md rule 12). A script line that
 * names a Metric must SAY that metric's numbers, so a film can never drift from the page: change
 * a value in content and the build fails until the script (and its audio) are updated.
 *
 * Integers only — "~43 ms" → 43, "711 of 800" → 711 and 800, "1,341 ms" → 1341. A decimal value
 * has no agreed spoken form yet, so it fails loudly instead of passing silently.
 */
const ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve",
  "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

export function numberWords(n: number): string {
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : "");
  if (n < 1000) return `${ONES[Math.floor(n / 100)]} hundred${n % 100 ? ` and ${numberWords(n % 100)}` : ""}`;
  const rest = n % 1000;
  return `${numberWords(Math.floor(n / 1000))} thousand${rest ? (rest < 100 ? " and " : " ") + numberWords(rest) : ""}`;
}

/** Whole-word match, so a value of 40 cannot pass on the "forty" inside "forty-three". */
const saysWord = (text: string, words: string) =>
  new RegExp(`(^|[^a-z-])${words.replace(/[-]/g, "\\-")}([^a-z-]|$)`).test(text.toLowerCase());

export function spokenNumbersMatch(text: string, value: string): { ok: boolean; missing: string[] } {
  if (/\d\.\d/.test(value)) return { ok: false, missing: [`decimal value "${value}" has no spoken-form rule yet`] };
  const numbers = (value.match(/\d[\d,]*/g) ?? []).map((s) => Number(s.replace(/,/g, "")));
  if (numbers.length === 0) return { ok: false, missing: [`no number found in "${value}"`] };
  const missing = numbers.map(numberWords).filter((w) => !saysWord(text, w));
  return { ok: missing.length === 0, missing };
}
