// Build step: stitch modular partials and content data into static HTML.
// Tailwind CSS is compiled separately through `npm run build:css`.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { site } from "./src/data/site.js";
import { projects } from "./src/data/projects.js";
import { careerStories } from "./src/data/career-stories.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(root, "src");
const PARTIALS = path.join(SRC, "partials");
const STORY_SOURCES = path.join(root, "career-stories");
const DIST = path.join(root, "dist");
const SITE_URL = "https://najm101.github.io/portfolio/";
const imageManifest = new Map();
const RESPONSIVE_IMAGE_WIDTHS = [320, 640, 960];

const esc = (value = "") =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attr = (value = "") => esc(value).replace(/"/g, "&quot;");

function fill(template, map) {
  return template.replace(/\{\{([A-Z0-9_]+)\}\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(map, key) ? map[key] : match,
  );
}

async function readPartial(name) {
  return fs.readFile(path.join(PARTIALS, name), "utf8");
}

async function resolveIncludes(html) {
  const pattern = /<!--\s*include:\s*partials\/([\w./-]+)\s*-->/g;
  let output = "";
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(html))) {
    output += html.slice(lastIndex, match.index);
    output += await resolveIncludes(await readPartial(match[1]));
    lastIndex = pattern.lastIndex;
  }

  return output + html.slice(lastIndex);
}

const bullets = (points, tone = "text-muted") =>
  points.length
    ? `<ul class="case-points ${tone}">${points
        .map(
          (point) =>
            `<li>${esc(point)}</li>`,
        )
        .join("")}</ul>`
    : "";

const STORE_ICON = {
  "app-store": `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.36 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.57-2.74-1.78-3.33-1.8-1.42-.14-2.77.83-3.49.83-.72 0-1.83-.81-3.01-.79-1.55.02-2.98.9-3.78 2.29-1.61 2.8-.41 6.93 1.16 9.2.77 1.11 1.68 2.35 2.87 2.31 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.13 2.76-2.25.87-1.29 1.23-2.54 1.25-2.6-.03-.01-2.39-.92-2.41-3.66zM14.1 5.66c.64-.77 1.07-1.85.95-2.92-.92.04-2.03.61-2.69 1.38-.59.68-1.11 1.78-.97 2.83 1.03.08 2.07-.52 2.71-1.29z"/></svg>`,
  "play-store": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3.2c-.3.18-.5.5-.5.92v15.76c0 .42.2.74.5.92l8.43-8.8L4 3.2z" fill="#34A853"/><path d="M16.6 8.06L13.2 6.1 4.6 2.78c-.13-.05-.24-.06-.35-.04l8.18 8.55 4.17-4.23z" fill="#EA4335"/><path d="M4.25 21.26c.1.02.22 0 .35-.04l8.6-3.32 3.4-1.96-4.17-4.23-8.18 9.55z" fill="#FBBC04"/><path d="M16.6 8.06l-4.17 4.23 4.17 4.23 3.78-2.19c.6-.35.6-1.46 0-1.81L16.6 8.06z" fill="#4285F4"/></svg>`,
  web: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" stroke="currentColor" stroke-width="1.6"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"/></svg>`,
};

function storeBadge(store) {
  const icon = STORE_ICON[store.type] || STORE_ICON.web;
  const label = esc(store.label);
  if (!store.url) {
    return `<span class="badge" aria-disabled="true">${icon}<span>${label}</span><span class="text-muted">· archived</span></span>`;
  }
  return `<a class="badge" href="${attr(store.url)}" target="_blank" rel="noopener" aria-label="${attr(
    store.label,
  )}, opens in a new tab">${icon}<span>${label}</span></a>`;
}

const PLACEHOLDER = `<div class="shot-placeholder"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.6"/><circle cx="8.5" cy="8.5" r="1.8" fill="currentColor"/><path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Screenshot<br>coming soon</span></div>`;

function projectImageKey(projectSlug, image) {
  return `${projectSlug}/${image}`;
}

async function prepareResponsiveImages() {
  const sourceAssets = path.join(SRC, "assets");
  const outputAssets = path.join(DIST, "assets");
  await fs.mkdir(outputAssets, { recursive: true });
  await fs.rm(path.join(outputAssets, "img"), { recursive: true, force: true });
  await fs.cp(sourceAssets, outputAssets, { recursive: true });

  const jobs = [];
  for (const project of projects) {
    for (const image of project.images) {
      if (!String(image).includes(".")) continue;

      jobs.push((async () => {
        const sourcePath = path.join(sourceAssets, "img", project.slug, image);
        const metadata = await sharp(sourcePath).metadata();
        if (!metadata.width || !metadata.height) {
          throw new Error(`Could not read dimensions for ${project.slug}/${image}.`);
        }

        const parsed = path.parse(image);
        const widths = [...new Set([
          ...RESPONSIVE_IMAGE_WIDTHS.filter((width) => width < metadata.width),
          Math.min(metadata.width, RESPONSIVE_IMAGE_WIDTHS.at(-1)),
        ])].sort((a, b) => a - b);

        const variants = [];
        for (const width of widths) {
          const filename = `${parsed.name}-${width}w.webp`;
          const outputPath = path.join(outputAssets, "img", project.slug, filename);
          await sharp(sourcePath)
            .resize({ width, withoutEnlargement: true })
            .webp({ quality: 82, effort: 4 })
            .toFile(outputPath);
          variants.push({ width, filename });
        }

        imageManifest.set(projectImageKey(project.slug, image), {
          width: metadata.width,
          height: metadata.height,
          variants,
        });
      })());
    }
  }

  await Promise.all(jobs);
}

function responsiveImage(project, image, number, frame) {
  const metadata = imageManifest.get(projectImageKey(project.slug, image));
  if (!metadata) throw new Error(`Missing image metadata for ${project.slug}/${image}.`);

  const base = `./assets/img/${project.slug}/`;
  const srcset = metadata.variants
    .map((variant) => `${base}${attr(variant.filename)} ${variant.width}w`)
    .join(", ");
  const sizes = frame === "tablet"
    ? "(min-width: 1024px) 300px, 256px"
    : frame === "framed"
      ? "(min-width: 1024px) 420px, 280px"
      : "(min-width: 1024px) 200px, 176px";

  return `<picture><source type="image/webp" srcset="${srcset}" sizes="${sizes}" /><img src="${base}${attr(
    image,
  )}" alt="${attr(`${project.name} screenshot ${number}`)}" width="${metadata.width}" height="${metadata.height}" loading="lazy" decoding="async" /></picture>`;
}

async function buildGallery(project, templates) {
  const frame = project.frame || "phone";
  return project.images
    .map((image, index) => {
      const number = index + 1;
      const isReal = String(image).includes(".");
      const alt = attr(`${project.name} screenshot ${number}${isReal ? "" : " (coming soon)"}`);
      const content = isReal ? responsiveImage(project, image, number, frame) : PLACEHOLDER;

      if (frame === "framed") {
        return `<figure class="shot-framed" role="group" aria-label="${alt}" data-gallery-item>${content}</figure>`;
      }

      return fill(frame === "tablet" ? templates.tablet : templates.phone, {
        ALT: alt,
        CONTENT: content,
      });
    })
    .join("\n");
}

function statusPill(status) {
  return status === "live"
    ? `<span class="pill-live">Live</span>`
    : `<span class="pill-live pill-archived">Archived</span>`;
}

function buildProjectStoryLinks(project) {
  if (!project.stories?.length) return "";

  const links = project.stories
    .map(
      (story) =>
        `<a href="./career-stories/${attr(story.slug)}/" class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">${esc(
          story.label,
        )}<span aria-hidden="true">→</span></a>`,
    )
    .join("");

  return `<div class="mt-5 border-t border-line pt-4"><p class="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted">Related career story</p><div class="mt-2 flex flex-wrap gap-x-5 gap-y-2">${links}</div></div>`;
}

async function buildProjects() {
  const cardTemplate = await readPartial("project-card.html");
  const templates = {
    phone: await readPartial("device-frame.html"),
    tablet: await readPartial("tablet-frame.html"),
  };
  const cards = [];

  for (const [index, project] of projects.entries()) {
    cards.push(
      fill(cardTemplate, {
        SLUG: attr(project.slug),
        NUMBER: String(index + 1).padStart(2, "0"),
        ORIENTATION_CLASS: index % 2 === 1 ? "project-case--reverse" : "",
        CATEGORY: esc(project.category),
        STATUS_PILL: statusPill(project.status),
        NAME: esc(project.name),
        TAGLINE: esc(project.tagline),
        PERIOD: esc(project.period),
        BLURB: esc(project.blurb),
        POINTS: bullets(project.points),
        TAGS: project.tags.map((tag) => `<span class="chip">${esc(tag)}</span>`).join(""),
        STORES: project.stores.map(storeBadge).join(""),
        STORY_LINKS: buildProjectStoryLinks(project),
        GALLERY: await buildGallery(project, templates),
        GALLERY_COUNT: String(project.images.length),
      }),
    );
  }

  return cards.join("\n");
}

async function buildExperience() {
  const template = await readPartial("experience-item.html");
  return site.experience
    .map((experience) =>
      fill(template, {
        PERIOD: esc(experience.period),
        LOCATION: esc(experience.location),
        COMPANY: esc(experience.company),
        ROLE: esc(experience.role),
        POINTS: bullets(experience.points, "text-ink/80"),
      }),
    )
    .join("\n");
}

function buildStats() {
  return site.stats
    .map(
      (stat) =>
        `<div><dt>${esc(
          stat.value,
        )}</dt><dd>${esc(stat.label)}</dd></div>`,
    )
    .join("");
}

function buildSkills() {
  return site.skills
    .map(
      (group, index) =>
        `<article class="skill-case"><details class="responsive-disclosure skill-disclosure" data-responsive-disclosure data-disclosure-group="skills"><summary><span class="case-number">${String(
          index + 1,
        ).padStart(2, "0")}</span><h3>${esc(group.group)}</h3><span class="skill-disclosure__count">${group.items.length}</span><span class="disclosure-icon" aria-hidden="true"></span></summary><div class="skill-disclosure__body"><div class="chip-list">${group.items
          .map((item) => `<span class="chip">${esc(item)}</span>`)
          .join("")}</div></div></details></article>`,
    )
    .join("");
}

function buildCertifications() {
  return site.certifications
    .map(
      (certification) =>
        `<div><p class="education-card__primary">${esc(certification.name)}</p><p class="education-card__secondary">${esc(
          certification.detail,
        )}</p></div>`,
    )
    .join("");
}

function buildLanguages() {
  return site.languages
    .map(
      (language) =>
        `<div class="language-row"><span>${esc(
          language.name,
        )}</span><span>${esc(language.level)}</span></div>`,
    )
    .join("");
}

const PRIVATE_STORY_SECTIONS = new Set([
  "best questions for this story",
  "best questions for these stories",
  "factual boundaries",
  "choosing between the examples",
]);

function stripPrivateStorySections(markdown) {
  const lines = markdown.split(/\r?\n/);
  const output = [];
  let skippedHeadingLevel = null;

  for (const line of lines) {
    const heading = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (heading) {
      const level = heading[1].length;
      const title = heading[2].trim().toLowerCase();

      if (skippedHeadingLevel !== null && level <= skippedHeadingLevel) {
        skippedHeadingLevel = null;
      }
      if (PRIVATE_STORY_SECTIONS.has(title)) {
        skippedHeadingLevel = level;
        continue;
      }
    }

    if (skippedHeadingLevel === null) output.push(line);
  }

  return output.join("\n").trim();
}

function extractHeading(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  if (!match) throw new Error("Career story is missing its H1 title.");
  return match[1].trim();
}

function extractSection(markdown, title, level = 2) {
  const lines = markdown.split(/\r?\n/);
  const marker = "#".repeat(level);
  const start = lines.findIndex((line) => line.trim().toLowerCase() === `${marker} ${title.toLowerCase()}`);
  if (start < 0) return "";

  const content = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    const heading = lines[index].match(/^(#{1,6})\s+/);
    if (heading && heading[1].length <= level) break;
    content.push(lines[index]);
  }
  return content.join("\n").trim();
}

function removeSection(markdown, title, level = 2) {
  const lines = markdown.split(/\r?\n/);
  const output = [];
  let skipping = false;

  for (const line of lines) {
    const heading = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (heading) {
      const currentLevel = heading[1].length;
      const currentTitle = heading[2].trim().toLowerCase();
      if (skipping && currentLevel <= level) skipping = false;
      if (currentLevel === level && currentTitle === title.toLowerCase()) {
        skipping = true;
        continue;
      }
    }
    if (!skipping) output.push(line);
  }

  return output.join("\n").trim();
}

function toPlainText(markdown) {
  return markdown
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function headingSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function inlineMarkdown(value) {
  return esc(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const output = [];
  const headings = [];
  const headingCounts = new Map();
  let paragraph = [];
  let list = null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    output.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!list) return;
    output.push(`<${list.tag}>${list.items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</${list.tag}>`);
    list = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = trimmed.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      const text = heading[2].trim();
      const baseSlug = headingSlug(text) || `section-${output.length + 1}`;
      const count = (headingCounts.get(baseSlug) || 0) + 1;
      headingCounts.set(baseSlug, count);
      const id = count === 1 ? baseSlug : `${baseSlug}-${count}`;
      output.push(`<h${level} id="${attr(id)}">${inlineMarkdown(text)}</h${level}>`);
      headings.push({ level, id, text });
      continue;
    }

    const unordered = trimmed.match(/^[-*]\s+(.+)$/);
    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const tag = ordered ? "ol" : "ul";
      if (list && list.tag !== tag) flushList();
      if (!list) list = { tag, items: [] };
      list.items.push((ordered || unordered)[1]);
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return { html: output.join("\n"), headings };
}

async function loadStories() {
  return Promise.all(
    careerStories.map(async (story, index) => {
      const sourcePath = path.join(STORY_SOURCES, story.source);
      const raw = await fs.readFile(sourcePath, "utf8");
      const title = extractHeading(raw);
      const shortVersion = toPlainText(extractSection(raw, "Short version"));
      const cardSummary = story.cardSummary || shortVersion;
      const lead = shortVersion || cardSummary;

      if (!cardSummary) throw new Error(`${story.source} needs a Short version or cardSummary.`);
      if (!story.slug || !story.theme || !story.tags?.length) {
        throw new Error(`${story.source} is missing presentation metadata.`);
      }

      let publicMarkdown = stripPrivateStorySections(raw);
      publicMarkdown = publicMarkdown.replace(/^#\s+.+$/m, "").trim();
      if (shortVersion) publicMarkdown = removeSection(publicMarkdown, "Short version");
      publicMarkdown = publicMarkdown.replace(/^(#{2,4})\s+Detailed story in my voice\s*$/gm, "$1 The full story");

      const rendered = renderMarkdown(publicMarkdown);

      return {
        ...story,
        number: String(index + 1).padStart(2, "0"),
        title,
        lead,
        cardSummary,
        html: rendered.html,
        headings: rendered.headings,
      };
    }),
  );
}

async function buildChallenges(stories) {
  const template = await readPartial("challenge-card.html");
  const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-12"];
  return stories
    .map((story, index) =>
      fill(template, {
        GRID_CLASS: spans[index] || "lg:col-span-6",
        URL: `./career-stories/${attr(story.slug)}/`,
        NUMBER: story.number,
        THEME: esc(story.theme),
        TITLE: esc(story.title),
        SUMMARY: esc(story.cardSummary),
        TAGS: story.tags.map((tag) => `<span class="chip">${esc(tag)}</span>`).join(""),
      }),
    )
    .join("\n");
}

function buildPortfolioIndex(stories) {
  const items = [
    { href: "about", label: "About", meta: "Profile" },
    { href: "challenges", label: "Challenges", meta: `${stories.length} stories` },
    { href: "work", label: "Work", meta: `${projects.length} projects` },
    { href: "experience", label: "Experience", meta: `${site.experience.length} roles` },
    { href: "skills", label: "Skills", meta: `${site.skills.length} groups` },
  ];

  return items
    .map(
      (item, index) =>
        `<a href="#${item.href}" data-section-link><span class="portfolio-index__number">${String(index + 1).padStart(
          2,
          "0",
        )}</span><span class="portfolio-index__label">${item.label}</span><span class="portfolio-index__meta">${item.meta}</span></a>`,
    )
    .join("");
}

function buildStoryToc(story) {
  return story.headings
    .filter((heading) => heading.level === 2)
    .map(
      (heading, index) =>
        `<a href="#${attr(heading.id)}" data-story-toc-link><span>${String(index + 1).padStart(2, "0")}</span>${esc(
          heading.text,
        )}</a>`,
    )
    .join("");
}

function sharedTokens({ assetPrefix, homeUrl, pageDescription, pageTitle, pageType, pageUrl }) {
  return {
    NAME: esc(site.name),
    NAME_SHORT: "Negm",
    HEADLINE: esc(site.headline),
    LOCATION: esc(site.location),
    EMAIL: esc(site.email),
    PHONE: esc(site.phone),
    PHONE_HREF: attr(site.phoneHref),
    WHATSAPP: attr(site.whatsapp),
    LINKEDIN: attr(site.linkedin),
    GITHUB: attr(site.github),
    YEAR: String(new Date().getFullYear()),
    ASSET_PREFIX: attr(assetPrefix),
    HOME_URL: attr(homeUrl),
    PAGE_TITLE: esc(pageTitle),
    PAGE_DESCRIPTION: attr(pageDescription),
    PAGE_TYPE: attr(pageType),
    PAGE_URL: attr(pageUrl),
  };
}

function assertRenderedPage(html, name) {
  const unresolved = html.match(/\{\{[A-Z0-9_]+\}\}/g);
  if (unresolved) {
    throw new Error(`${name} has unresolved tokens: ${[...new Set(unresolved)].join(", ")}`);
  }
  if (html.includes("40%")) throw new Error(`${name} still contains the unsupported 40% claim.`);
  if (/Things I(?:'|&#39;)ve solved/i.test(html)) throw new Error(`${name} still contains the removed Highlights section.`);
  if (html.includes("—")) throw new Error(`${name} contains an em dash in public copy.`);
}

async function buildHome(stories) {
  const layout = await fs.readFile(path.join(SRC, "layout.html"), "utf8");
  let html = await resolveIncludes(layout);
  const summaryShort = site.summary.split(". ")[0] + ".";

  html = fill(html, {
    ...sharedTokens({
      assetPrefix: "./",
      homeUrl: "",
      pageDescription: `${site.name}, ${site.headline}. ${summaryShort}`,
      pageTitle: `${site.name} | ${site.headline}`,
      pageType: "website",
      pageUrl: SITE_URL,
    }),
    THESIS: esc(site.thesis),
    SUMMARY: esc(site.summary),
    STATS: buildStats(),
    PORTFOLIO_INDEX: buildPortfolioIndex(stories),
    CHALLENGES: await buildChallenges(stories),
    PROJECTS: await buildProjects(),
    EXPERIENCE: await buildExperience(),
    SKILLS: buildSkills(),
    EDU_SCHOOL: esc(site.education.school),
    EDU_DEGREE: esc(site.education.degree),
    EDU_PERIOD: esc(site.education.period),
    CERTS: buildCertifications(),
    LANGUAGES: buildLanguages(),
  });

  assertRenderedPage(html, "Home page");
  await fs.writeFile(path.join(DIST, "index.html"), html, "utf8");
}

async function buildStoryPages(stories) {
  const layout = await fs.readFile(path.join(SRC, "story-layout.html"), "utf8");
  const template = await resolveIncludes(layout);
  const storyRoot = path.join(DIST, "career-stories");
  await fs.rm(storyRoot, { recursive: true, force: true });

  for (const story of stories) {
    const storyUrl = `${SITE_URL}career-stories/${story.slug}/`;
    const html = fill(template, {
      ...sharedTokens({
        assetPrefix: "../../",
        homeUrl: "../../",
        pageDescription: story.lead,
        pageTitle: `${story.title} | ${site.name}`,
        pageType: "article",
        pageUrl: storyUrl,
      }),
      STORY_THEME: esc(story.theme),
      STORY_TITLE: esc(story.title),
      STORY_LEAD: esc(story.lead),
      STORY_TAGS: story.tags.map((tag) => `<span class="chip">${esc(tag)}</span>`).join(""),
      STORY_TOC: buildStoryToc(story),
      STORY_CONTENT: story.html,
    });

    if (/Best questions|Factual boundaries|Choosing between the examples/i.test(html)) {
      throw new Error(`${story.source} exposed internal interview notes.`);
    }
    assertRenderedPage(html, story.title);

    const outputDirectory = path.join(storyRoot, story.slug);
    await fs.mkdir(outputDirectory, { recursive: true });
    await fs.writeFile(path.join(outputDirectory, "index.html"), html, "utf8");
  }
}

async function main() {
  const stories = await loadStories();
  await fs.mkdir(DIST, { recursive: true });
  await prepareResponsiveImages();
  await buildHome(stories);
  await buildStoryPages(stories);
  await fs.writeFile(path.join(DIST, ".nojekyll"), "", "utf8");
  await fs.copyFile(path.join(root, "resume.md"), path.join(DIST, "resume.md"));

  const size = (await fs.stat(path.join(DIST, "index.html"))).size;
  console.log(
    `✓ Built dist/index.html (${(size / 1024).toFixed(1)} KB), ${projects.length} projects, and ${stories.length} career stories`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
