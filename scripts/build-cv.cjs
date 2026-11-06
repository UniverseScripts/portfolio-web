// Renders planning/resume.md to a print stylesheet page, then headless Chrome prints it to
// code/web/public/cv.pdf. The resume is the source of truth (resume_claims.md maps every line
// to the truth file); this script only formats it — it never adds or rewrites text.
const fs = require("fs");
const { execFileSync } = require("child_process");
const path = require("path");
const os = require("os");
// planning/ sits beside the repo (outside git) — see the Portfolio CLAUDE.md.
const SRC = path.resolve(__dirname, "../../../planning/resume.md");
const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "cv-"));
const HTML = DIR + "/cv.html";
const OUT = path.resolve(__dirname, "../public/cv.pdf");
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (s) => esc(s)
  .replace(/`([^`]+)`/g, "<code>$1</code>")
  .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  .replace(/\*([^*]+)\*/g, "<em>$1</em>")
  .replace(/((?:github\.com|linkedin\.com|[a-z0-9-]+\.vercel\.app|internship\.flyrank\.ai)[^\s·)]*)/g, '<a href="https://$1">$1</a>');

const lines = fs.readFileSync(SRC, "utf8").replace(/\r/g, "").split("\n");
let html = "", inList = false, para = [];
const flush = () => { if (para.length) { html += `<p>${para.map(inline).join("<br>")}</p>\n`; para = []; } };
const closeList = () => { if (inList) { html += "</ul>\n"; inList = false; } };
for (const raw of lines) {
  const line = raw.trimEnd();
  if (/^# /.test(line)) { flush(); closeList(); html += `<h1>${inline(line.slice(2))}</h1>\n`; continue; }
  if (/^## /.test(line)) { flush(); closeList(); html += `<h2>${inline(line.slice(3))}</h2>\n`; continue; }
  if (/^---$/.test(line)) { flush(); closeList(); continue; }
  if (/^- /.test(line)) { flush(); if (!inList) { html += "<ul>\n"; inList = true; } html += `<li>${inline(line.slice(2))}`; continue; }
  if (/^\s{2,}\S/.test(line) && inList) { html += " " + inline(line.trim()); continue; }
  if (line === "") { flush(); if (inList) { html += "</li>\n"; } closeList(); continue; }
  if (inList) { html += "</li>\n"; closeList(); }
  para.push(line.trim());
}
flush(); closeList();
html = html.replace(/<li>([\s\S]*?)(?=<li>|<\/ul>)/g, (m, c) => `<li>${c.replace(/<\/li>\s*$/, "")}</li>\n`);

const page = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Yoshio Nomura — CV</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500&family=IBM+Plex+Mono:wght@500&family=Inter:wght@400;500;600&display=block" rel="stylesheet">
<style>
@page { size: A4; margin: 11mm 14mm 11mm 14mm; }
* { box-sizing: border-box; }
body { margin: 0; font: 9.2pt/1.4 Inter, system-ui, sans-serif; color: #15191e; letter-spacing: -0.005em; }
a { color: #0b5566; text-decoration: none; }
h1 { font: 400 24pt/1.1 "DM Sans", Inter, sans-serif; margin: 0 0 4pt; letter-spacing: -0.02em; }
h2 { font: 500 11.5pt/1.2 "DM Sans", Inter, sans-serif; margin: 10pt 0 4pt; padding-bottom: 2pt; border-bottom: 0.6pt solid #c9ced3; break-after: avoid; }
p { margin: 0 0 3pt; }
h1 + p, h1 + p + p { color: #434c55; }
strong { font-weight: 600; }
em { color: #434c55; font-style: normal; }
ul { margin: 2pt 0 6pt; padding-left: 12pt; }
li { margin: 0 0 1.5pt; }
code { font: 500 8.6pt "IBM Plex Mono", monospace; }
p, li { break-inside: avoid; }
</style></head><body>
${html}</body></html>`;
fs.writeFileSync(HTML, page);
execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--user-data-dir=${DIR}/chrome-cv`, "--virtual-time-budget=8000", `--print-to-pdf=${OUT}`, "file:///" + HTML.replace(/\\/g, "/")], { stdio: "ignore" });
console.log("wrote", OUT, fs.statSync(OUT).size, "bytes");
// The text that went into the PDF, for the retracted-string guard.
console.log("guard text:", DIR + "/cv.txt");
fs.writeFileSync(DIR + "/cv.txt", page.replace(/<style[\s\S]*?<\/style>/, "").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " "));
