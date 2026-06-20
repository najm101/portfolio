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
  partials/            One file per UI component (hero, project-card, footer…)
  assets/img/<slug>/   Screenshots for each project
build.mjs              Stitches partials + data into dist/index.html
```

`npm run build` runs two steps:

1. **`build:css`** — Tailwind compiles `src/styles.css` → `dist/assets/styles.css`.
2. **`build:html`** — `build.mjs` resolves the `<!-- include -->` tags, renders the
   project/experience/skill loops from the data files, fills `{{TOKENS}}`, copies
   `src/assets` and `resume.md`, and writes `dist/index.html`.

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

All copy lives in the two data files — no need to touch HTML:

- **`src/data/site.js`** — name, contact links, summary, hero stats, experience,
  skills, achievements, education, certifications, languages.
- **`src/data/projects.js`** — each project's name, blurb, tags, store links,
  status (`live` / `deprecated`), `frame` type, and screenshot list.

## Deploying to GitHub Pages

A workflow at `.github/workflows/deploy.yml` builds and deploys on every push to
the working branch (and `main`).

**One-time setup:** in the repo, go to **Settings → Pages → Build and deployment**
and set **Source = GitHub Actions**. After the next push, the site publishes to
`https://najm101.github.io/portfolio/`.

All asset and anchor paths are relative, so it works correctly under that
`/portfolio/` subpath. A `.nojekyll` file is emitted so GitHub Pages serves the
output as-is.
