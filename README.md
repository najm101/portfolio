# Abdelrahman Negm — Portfolio

A mobile-first portfolio for a Flutter mobile engineer. Authored as small,
modular HTML components and a content data layer, then compiled into a **single
static `index.html`** (plus one CSS file) for GitHub Pages.

## How it works

```
src/
  layout.html          Page shell — pulls partials in via <!-- include: ... -->
  styles.css           Tailwind v4 entry + design tokens + component styles
  data/
    site.js            You, contact, summary, experience, skills, education…
    projects.js        The project list (each becomes a card + screenshot gallery)
    career-stories.js  Ordering and presentation metadata for career stories
  partials/            One file per UI component (hero, project-card, footer…)
  assets/img/<slug>/   Screenshots for each project
career-stories/        Long-form Markdown stories used by the site build
build.mjs              Stitches partials + data into dist/index.html
```

`npm run build` runs two steps:

1. **`build:css`** — Tailwind compiles `src/styles.css` → `dist/assets/styles.css`.
2. **`build:html`** — `build.mjs` resolves the `<!-- include -->` tags, renders the
   project/experience/skill loops from the data files, renders the public parts
   of each career story, fills `{{TOKENS}}`, copies `src/assets` and `resume.md`,
   and writes the homepage plus the pages under `dist/career-stories/`.

Everything ships from `dist/` — nothing else needs to be served.

## Local development

```bash
npm install
npm run build      # produces dist/
npm run serve      # serves dist/ at http://localhost:4321
# or: npm run dev  # build + serve in one go
```

## Adding or changing screenshots

1. Drop the image files into the matching folder, e.g.
   `src/assets/img/roze-moon/01.png`, `02.png`, …
2. In `src/data/projects.js`, list those **filenames (with extension)** in that
   project's `images` array, in the order you want them shown:
   ```js
   images: ["01.png", "02.png", "03.png", "04.png"],
   ```
   (A bare entry like `"01"` renders a "coming soon" placeholder instead.)
3. Pick how each screenshot is presented with the project's `frame` field:
   | `frame`    | Use for                                              |
   |------------|------------------------------------------------------|
   | `"phone"`  | Raw phone screen captures — wrapped in a phone bezel  |
   | `"tablet"` | Raw tablet captures — wrapped in a wider tablet bezel |
   | `"framed"` | Images that already include a device frame — shown as-is |
4. `npm run build`. The frames adapt to any number of screenshots — no layout
   changes needed.

Raw captures are object-fit cropped to the bezel, so tall phone shots (~9:19.5)
and the kiosk tablet ratio both fit cleanly.

## Editing content

Portfolio copy lives in the data and story files:

- **`src/data/site.js`** — name, contact links, summary, hero stats, experience,
  skills, education, certifications, and languages.
- **`src/data/projects.js`** — each project's name, blurb, tags, store links,
  status (`live` / `deprecated`), `frame` type, and screenshot list.
- **`career-stories/*.md`** — public long-form story content. The homepage uses
  concise summaries, while the build omits interview-only sections such as
  factual boundaries and suggested questions from the published pages.
- **`src/data/career-stories.js`** — story order, URL slugs, topic labels, tags,
  and any shorter homepage-card summary.

## Deploying to GitHub Pages

A workflow at `.github/workflows/deploy.yml` builds and deploys on every push to
`main`.

**One-time setup:** in the repo, go to **Settings → Pages → Build and deployment**
and set **Source = GitHub Actions**. After the next push, the site publishes to
`https://najm101.github.io/portfolio/`.

All asset and anchor paths are relative, so it works correctly under that
`/portfolio/` subpath. A `.nojekyll` file is emitted so GitHub Pages serves the
output as-is.

## LinkedIn project media

`linkedin/render.mjs` turns each project into a 1920×1080 PNG for the
LinkedIn "Projects → Media" slot, using `linkedin/template.html` and the copy
from `src/data/projects.js`. The three screenshots per card come from each
project's `featured` list.

```bash
npm run media:linkedin            # all projects → linkedin/out/<slug>.png
npm run media:linkedin -- wgbah   # one project
```

It needs a Chromium: set `CHROME_PATH` to your Chrome binary, or run
`npx playwright install chromium` once. Details, design notes and how to add a
new project: [`linkedin/README.md`](linkedin/README.md).

## Projects brochure (PDF)

`npm run media:brochure` builds `brochure/out/Abdelrahman-Negm-Projects.pdf`,
an A4 brochure to send with the CV: a cover, then one page per project with
screenshots, role, overview, highlights, stack, clickable official App Store /
Google Play badges, and links to the full stories. See
[`brochure/README.md`](brochure/README.md).
