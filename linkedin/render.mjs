// Render one 1920×1080 LinkedIn media image per project into linkedin/out/.
//
//   npm run media:linkedin              # all projects
//   npm run media:linkedin -- wgbah     # just one (by slug)
//
// Project copy comes from src/data/projects.js; the screenshots used for each
// card are picked below. Uses a local Chromium: set CHROME_PATH to your
// Chrome/Chromium binary, or run `npx playwright install chromium` once.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";
import { site } from "../src/data/site.js";
import { projects } from "../src/data/projects.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const IMG = path.join(here, "..", "src", "assets", "img");
const OUT = path.join(here, "out");

// Three screenshots per card; the middle one is shown in front.
const PICKS = {
  "roze-moon": ["02.jpg", "01.jpg", "03.jpg"],
  "invoice-star": ["02.png", "01.png", "05.png"],
  khedma: ["02.png", "01.png", "03.png"],
  tawqet: ["02.png", "01.png", "03.png"],
  wgbah: ["05.png", "02.png", "04.png"],
  "steamdeck-checker": ["03.png", "05.png", "04.png"],
};

const STORE_NAMES = { "app-store": "App Store", "play-store": "Google Play" };

function statusText(project) {
  if (project.status !== "live") return "Archived project";
  const stores = project.stores.map((s) => STORE_NAMES[s.type]).filter(Boolean);
  return stores.length ? `Live on ${stores.join(" & ")}` : "Live";
}

const only = process.argv.slice(2);
const selected = projects.filter((p) => !only.length || only.includes(p.slug));

await fs.mkdir(OUT, { recursive: true });
const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
);
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

for (const project of selected) {
  const picks = PICKS[project.slug] ?? project.images.slice(0, 3);
  await page.goto(pathToFileURL(path.join(here, "template.html")).href);
  await page.evaluate((data) => window.renderCard(data), {
    name: project.name,
    tagline: project.tagline,
    category: project.category,
    period: project.period,
    status: project.status,
    statusText: statusText(project),
    tags: project.tags,
    author: site.name,
    role: site.headline,
    url: "najm101.github.io/portfolio",
    frame: project.frame,
    images: picks.map((file) => pathToFileURL(path.join(IMG, project.slug, file)).href),
  });
  const file = path.join(OUT, `${project.slug}.png`);
  await page.screenshot({ path: file });
  console.log(`✓ ${path.relative(process.cwd(), file)}`);
}

await browser.close();
