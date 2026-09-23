# Projects brochure (PDF)

An A4 PDF to send alongside the CV: a cover page, then one page per project
with screenshots, my role, a short overview, highlights, the stack, official
App Store / Google Play badges linking to the listings, and links to the full
stories on the portfolio.

```
brochure/
  template.html   The layout (HTML/CSS), filled in by window.renderBrochure(data)
  render.mjs      Collects the data, shrinks screenshots, prints the PDF with Chromium
  badges/         Official store badges + NOTICE.md (source and trademark notes)
  out/            Abdelrahman-Negm-Projects.pdf (committed)
```

## Regenerating

```bash
npm install
npm run media:brochure
```

Like `linkedin/`, this uses `playwright-core` with a local Chromium: set
`CHROME_PATH` (macOS: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`)
or run `npx playwright install chromium` once. In the Claude Code cloud container:

```bash
CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npm run media:brochure
```

The script prints `! content overflows the page on: <slug>` when a page's
content spills off the sheet or comes within 4 mm of the footer. If that
happens, shorten the copy or tighten the spacing in `template.html`
(`.stage` height is the biggest lever).

## Adding a project

Add it to `src/data/projects.js` as usual; it gets a page automatically, in the
same order as the site. The brochure uses these fields:

| On the page            | Source                                                        |
|------------------------|---------------------------------------------------------------|
| Eyebrow, status chip   | `category`, `period`, `status` (`live` → "Live", else "Archived") |
| Title, tagline         | `name`, `tagline`                                             |
| My role                | `role` (one line, brochure/LinkedIn only)                     |
| Screenshots            | `featured` (3 filenames; falls back to the first 3 real `images`), framed per `frame` |
| Overview               | `blurb`                                                       |
| Highlights             | `points` (section hidden when empty)                          |
| Get the app            | `stores`: `app-store` / `play-store` → official badge; any other type → text button (`github` → "GitHub Releases"). No stores → "Retired. No longer available on the stores." |
| Stack                  | `tags`                                                        |
| Full story             | `stories[].slug` → title from the story's Markdown `# heading`, link to `https://najm101.github.io/portfolio/career-stories/<slug>/` |

The cover reads `name`, `headline`, `thesis`, `stats`, and contact details
from `src/data/site.js`. The project index links to each page inside the PDF.

Keep the copy factual. `career-stories/README.md` has "factual guardrails"
(e.g. 6+ apps, not 10+; the Khedma MDM approach wasn't shipped).

## How it works

- `render.mjs` resizes every screenshot with `sharp` to at most 1000 px tall,
  JPEG q84, and passes them in as data URIs. Unresized PNGs made the PDF about
  3 MB; this keeps it around 1 MB, most of which is the embedded fonts.
- `template.html` builds all pages in the browser. Each `.page` is exactly
  210×297 mm with `@page { size: A4; margin: 0 }`, so one element = one sheet.
- `page.pdf()` keeps every `<a href>` as a real PDF link: external URLs,
  `mailto:`/`tel:`, and `#slug` anchors, which become internal jumps.
- Fonts are loaded explicitly (`document.fonts.load`) before printing, so
  the output doesn't change between runs.
- Frames and design tokens match the site and the LinkedIn images.

## Checking the output

No PDF tools ship in the container. To look at the pages and verify links:

```bash
python3 -m venv /tmp/pdfenv && /tmp/pdfenv/bin/pip install -q pypdf pypdfium2 pillow
/tmp/pdfenv/bin/python - <<'EOF'
import pypdf, pypdfium2 as pdfium
f = "brochure/out/Abdelrahman-Negm-Projects.pdf"
for i, page in enumerate(pdfium.PdfDocument(f)):
    page.render(scale=1.4).to_pil().save(f"/tmp/page-{i+1}.png")
for i, p in enumerate(pypdf.PdfReader(f).pages):
    print(i + 1, [a.get_object().get("/A", {}).get("/URI") for a in p.get("/Annots") or []])
EOF
```

## Store badges

See `badges/NOTICE.md`. Apple's badge came straight from developer.apple.com.
Google's badge page was blocked from the cloud container, so the Google Play
SVG comes from an npm package that redistributes the official artwork.
Replacing it with a download from https://play.google.com/intl/en_us/badges/
is a drop-in swap (same filename). Brand rules: don't alter the badges, keep
both at the same height (`.badges img` in the template), and link each one to
the app's own listing.
