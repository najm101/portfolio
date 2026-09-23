// Render the projects brochure (A4 PDF) into brochure/out/.
//
//   npm run media:brochure
//
// Content comes from src/data/site.js, src/data/projects.js (including `role`
// and `featured`) and the story titles in career-stories/. Uses a local
// Chromium: set CHROME_PATH to your Chrome/Chromium binary, or run
// `npx playwright install chromium` once. See brochure/README.md.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";
import { chromium } from "playwright-core";
import { site } from "../src/data/site.js";
import { projects } from "../src/data/projects.js";
import { careerStories } from "../src/data/career-stories.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");
const IMG = path.join(root, "src", "assets", "img");
const OUT = path.join(here, "out");
const FILE = path.join(OUT, "Abdelrahman-Negm-Projects.pdf");
const SITE_URL = "https://najm101.github.io/portfolio/";

// Store types with an official badge; anything else becomes a text link.
const BADGES = {
  "app-store": pathToFileURL(path.join(here, "badges", "app-store.svg")).href,
  "play-store": pathToFileURL(path.join(here, "badges", "google-play.svg")).href,
};
const LINK_TEXT = { github: "GitHub Releases" };

// Screenshots are shown at most ~100mm tall, so ~1000px keeps them sharp in
// print while keeping the PDF small enough to email.
async function screenshot(file) {
  const jpeg = await sharp(file)
    .resize({ height: 1000, withoutEnlargement: true })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();
  return `data:image/jpeg;base64,${jpeg.toString("base64")}`;
}

async function storyTitle(source) {
  const md = await fs.readFile(path.join(root, "career-stories", source), "utf8");
  return md.match(/^#\s+(.+)$/m)?.[1].trim() ?? source;
}

const storyBySlug = new Map(careerStories.map((s) => [s.slug, s]));

const data = {
  year: new Date().getFullYear(),
  site: {
    name: site.name,
    headline: site.headline,
    thesis: site.thesis,
    stats: site.stats,
    email: site.email,
    portfolio: SITE_URL,
    portfolioLabel: "najm101.github.io/portfolio",
    contacts: [
      { label: "Email", text: site.email, href: `mailto:${site.email}` },
      { label: "Phone", text: site.phone, href: `tel:${site.phoneHref}` },
      { label: "Portfolio", text: "najm101.github.io/portfolio", href: SITE_URL },
      { label: "LinkedIn", text: "in/abdelrahman-negm", href: site.linkedin },
      { label: "GitHub", text: "github.com/najm101", href: site.github },
      { label: "Location", text: site.location },
    ],
  },
  badges: BADGES,
  projects: [],
};

for (const p of projects) {
  const picks = p.featured ?? p.images.filter((f) => /\.\w+$/.test(f)).slice(0, 3);
  if (!picks.length) {
    console.warn(`– ${p.slug}: no screenshots, skipped`);
    continue;
  }
  data.projects.push({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    category: p.category,
    period: p.period,
    status: p.status,
    role: p.role ?? "",
    blurb: p.blurb,
    points: p.points,
    tags: p.tags,
    frame: p.frame,
    images: await Promise.all(picks.map((f) => screenshot(path.join(IMG, p.slug, f)))),
    stores: p.stores.map((s) => ({ ...s, linkText: LINK_TEXT[s.type] ?? s.label })),
    unavailableText: "Retired. No longer available on the stores.",
    stories: await Promise.all(
      (p.stories ?? []).map(async (s) => ({
        title: storyBySlug.has(s.slug) ? await storyTitle(storyBySlug.get(s.slug).source) : s.label,
        url: `${SITE_URL}career-stories/${s.slug}/`,
      })),
    ),
  });
}

await fs.mkdir(OUT, { recursive: true });
const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
);
const page = await browser.newPage();
await page.goto(pathToFileURL(path.join(here, "template.html")).href);
const overflowing = await page.evaluate((d) => window.renderBrochure(d), data);
if (overflowing.length) {
  console.warn(`! content overflows the page on: ${overflowing.join(", ")}`);
}
await page.emulateMedia({ media: "print" });
await page.pdf({ path: FILE, printBackground: true, preferCSSPageSize: true });
await browser.close();

const { size } = await fs.stat(FILE);
console.log(`✓ ${path.relative(process.cwd(), FILE)} (${data.projects.length + 1} pages, ${(size / 1024 / 1024).toFixed(1)} MB)`);
