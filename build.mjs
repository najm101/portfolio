// Build step: stitch modular partials + content data into a single dist/index.html.
// Tailwind CSS is compiled separately (see package.json `build:css`).
//
//   npm run build   ->   build:css (tailwind) then build:html (this file)

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "./src/data/site.js";
import { projects } from "./src/data/projects.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(root, "src");
const PARTIALS = path.join(SRC, "partials");
const DIST = path.join(root, "dist");

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attr = (s = "") => esc(s).replace(/"/g, "&quot;");

// {{KEY}} -> value, only for keys present in `map` (unknown tokens left intact).
function fill(template, map) {
  return template.replace(/\{\{([A-Z0-9_]+)\}\}/g, (m, key) =>
    Object.prototype.hasOwnProperty.call(map, key) ? map[key] : m,
  );
}

async function readPartial(name) {
  return fs.readFile(path.join(PARTIALS, name), "utf8");
}

// Recursively inline <!-- include: partials/x.html --> references.
async function resolveIncludes(html) {
  const re = /<!--\s*include:\s*partials\/([\w./-]+)\s*-->/g;
  let out = "";
  let last = 0;
  let m;
  while ((m = re.exec(html))) {
    out += html.slice(last, m.index);
    out += await resolveIncludes(await readPartial(m[1]));
    last = re.lastIndex;
  }
  return out + html.slice(last);
}

// ---- Small HTML builders ----

const bullets = (points, tone = "text-muted") =>
  points.length
    ? `<ul class="mt-4 space-y-2 text-sm leading-relaxed ${tone}">${points
        .map(
          (p) =>
            `<li class="relative pl-4 before:absolute before:left-0 before:top-[0.55rem] before:h-1 before:w-1.5 before:rounded-full before:bg-brand/60">${esc(
              p,
            )}</li>`,
        )
        .join("")}</ul>`
    : "";

const STORE_ICON = {
  "app-store": `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.36 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.57-2.74-1.78-3.33-1.8-1.42-.14-2.77.83-3.49.83-.72 0-1.83-.81-3.01-.79-1.55.02-2.98.9-3.78 2.29-1.61 2.8-.41 6.93 1.16 9.2.77 1.11 1.68 2.35 2.87 2.31 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.13 2.76-2.25.87-1.29 1.23-2.54 1.25-2.6-.03-.01-2.39-.92-2.41-3.66zM14.1 5.66c.64-.77 1.07-1.85.95-2.92-.92.04-2.03.61-2.69 1.38-.59.68-1.11 1.78-.97 2.83 1.03.08 2.07-.52 2.71-1.29z"/></svg>`,
  "play-store": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3.2c-.3.18-.5.5-.5.92v15.76c0 .42.2.74.5.92l8.43-8.8L4 3.2z" fill="#34A853"/><path d="M16.6 8.06L13.2 6.1 4.6 2.78c-.13-.05-.24-.06-.35-.04l8.18 8.55 4.17-4.23z" fill="#EA4335"/><path d="M4.25 21.26c.1.02.22 0 .35-.04l8.6-3.32 3.4-1.96-4.17-4.23-8.18 9.55z" fill="#FBBC04"/><path d="M16.6 8.06l-4.17 4.23 4.17 4.23 3.78-2.19c.6-.35.6-1.46 0-1.81L16.6 8.06z" fill="#4285F4"/></svg>`,
  web: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" stroke="currentColor" stroke-width="1.6"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"/></svg>`,
  "microsoft-store": `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 3h8.5v8.5H3zM12.5 3H21v8.5h-8.5zM3 12.5h8.5V21H3zM12.5 12.5H21V21h-8.5z"/></svg>`,
};

function storeBadge(store) {
  const icon = STORE_ICON[store.type] || STORE_ICON.web;
  const label = esc(store.label);
  if (!store.url) {
    return `<span class="badge" aria-disabled="true">${icon}<span>${label}</span><span class="text-muted">· archived</span></span>`;
  }
  return `<a class="badge" href="${attr(store.url)}" target="_blank" rel="noopener" aria-label="${attr(
    store.label,
  )} — opens in a new tab">${icon}<span>${label}</span></a>`;
}

const PLACEHOLDER = `<div class="shot-placeholder"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.6"/><circle cx="8.5" cy="8.5" r="1.8" fill="currentColor"/><path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Screenshot<br>coming soon</span></div>`;

async function buildGallery(project, frameTpl) {
  const frames = project.images.map((img, i) => {
    const n = i + 1;
    const isReal = String(img).includes(".");
    const alt = `${project.name} screenshot ${n}${isReal ? "" : " (coming soon)"}`;
    const content = isReal
      ? `<img src="./assets/img/${project.slug}/${attr(img)}" alt="${attr(
          `${project.name} screenshot ${n}`,
        )}" loading="lazy" decoding="async" />`
      : PLACEHOLDER;
    return fill(frameTpl, { ALT: attr(alt), CONTENT: content });
  });
  return frames.join("\n");
}

function statusPill(status) {
  return status === "live"
    ? `<span class="pill-live">Live</span>`
    : `<span class="pill-live pill-archived">Archived</span>`;
}

async function buildProjects() {
  const cardTpl = await readPartial("project-card.html");
  const frameTpl = await readPartial("device-frame.html");
  const cards = [];
  for (const p of projects) {
    const gallery = await buildGallery(p, frameTpl);
    const tags = p.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("");
    const stores = p.stores.map(storeBadge).join("");
    cards.push(
      fill(cardTpl, {
        CATEGORY: esc(p.category),
        STATUS_PILL: statusPill(p.status),
        NAME: esc(p.name),
        TAGLINE: esc(p.tagline),
        PERIOD: esc(p.period),
        BLURB: esc(p.blurb),
        POINTS: bullets(p.points),
        TAGS: tags,
        STORES: stores,
        GALLERY: gallery,
      }),
    );
  }
  return cards.join("\n");
}

async function buildExperience() {
  const tpl = await readPartial("experience-item.html");
  return site.experience
    .map((e) =>
      fill(tpl, {
        PERIOD: esc(e.period),
        LOCATION: esc(e.location),
        COMPANY: esc(e.company),
        ROLE: esc(e.role),
        POINTS: bullets(e.points, "text-ink/80"),
      }),
    )
    .join("\n");
}

function buildStats() {
  return site.stats
    .map(
      (s) =>
        `<div><dt class="font-display text-2xl font-extrabold tracking-tight">${esc(
          s.value,
        )}</dt><dd class="mt-1 text-xs leading-snug text-muted">${esc(s.label)}</dd></div>`,
    )
    .join("");
}

function buildSkills() {
  return site.skills
    .map(
      (g) =>
        `<div><h3 class="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-muted">${esc(
          g.group,
        )}</h3><div class="flex flex-wrap gap-2">${g.items
          .map((i) => `<span class="chip">${esc(i)}</span>`)
          .join("")}</div></div>`,
    )
    .join("");
}

function buildAchievements() {
  return site.achievements
    .map(
      (a) =>
        `<div class="card p-5"><h3 class="font-display font-bold tracking-tight">${esc(
          a.title,
        )}</h3><p class="mt-2 text-sm leading-relaxed text-muted">${esc(a.body)}</p></div>`,
    )
    .join("");
}

function buildCerts() {
  return site.certifications
    .map(
      (c) =>
        `<div><p class="font-semibold">${esc(c.name)}</p><p class="text-sm text-muted">${esc(
          c.detail,
        )}</p></div>`,
    )
    .join("");
}

function buildLanguages() {
  return site.languages
    .map(
      (l) =>
        `<div class="flex items-baseline justify-between gap-3 border-b border-line pb-2"><span class="font-medium">${esc(
          l.name,
        )}</span><span class="font-mono text-xs text-muted">${esc(l.level)}</span></div>`,
    )
    .join("");
}

async function main() {
  const layout = await fs.readFile(path.join(SRC, "layout.html"), "utf8");
  let html = await resolveIncludes(layout);

  const summaryShort = site.summary.split(". ")[0] + ".";

  const tokens = {
    NAME: esc(site.name),
    NAME_SHORT: "Negm",
    HEADLINE: esc(site.headline),
    LOCATION: esc(site.location),
    EMAIL: esc(site.email),
    PHONE: esc(site.phone),
    PHONE_HREF: attr(site.phoneHref),
    LINKEDIN: attr(site.linkedin),
    GITHUB: attr(site.github),
    RESUME_URL: attr(site.resumeUrl),
    THESIS: esc(site.thesis),
    SUMMARY: esc(site.summary),
    SUMMARY_SHORT: attr(summaryShort),
    YEAR: String(new Date().getFullYear()),
    STATS: buildStats(),
    PROJECTS: await buildProjects(),
    EXPERIENCE: await buildExperience(),
    SKILLS: buildSkills(),
    ACHIEVEMENTS: buildAchievements(),
    EDU_SCHOOL: esc(site.education.school),
    EDU_DEGREE: esc(site.education.degree),
    EDU_PERIOD: esc(site.education.period),
    CERTS: buildCerts(),
    LANGUAGES: buildLanguages(),
  };

  html = fill(html, tokens);

  const leftover = html.match(/\{\{[A-Z0-9_]+\}\}/g);
  if (leftover) {
    console.warn("⚠ Unresolved tokens:", [...new Set(leftover)].join(", "));
  }

  await fs.mkdir(DIST, { recursive: true });
  await fs.writeFile(path.join(DIST, "index.html"), html, "utf8");
  await fs.writeFile(path.join(DIST, ".nojekyll"), "", "utf8");

  // Copy static assets (merges over the already-compiled styles.css).
  await fs.cp(path.join(SRC, "assets"), path.join(DIST, "assets"), { recursive: true });

  // Make the resume downloadable from the live site.
  await fs.copyFile(path.join(root, "resume.md"), path.join(DIST, "resume.md"));

  console.log(`✓ Built dist/index.html (${(html.length / 1024).toFixed(1)} KB) · ${projects.length} projects`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
