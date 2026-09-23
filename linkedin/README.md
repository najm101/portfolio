# LinkedIn project media

One 1920×1080 (16:9) PNG per project, made for the **Media** slot on LinkedIn
profile projects. The rendered images live in `out/<slug>.png` and are
committed, so they can be downloaded straight from the repo.

```
linkedin/
  template.html   The card design (HTML/CSS), filled in by window.renderCard(data)
  render.mjs      Reads the project data, renders each card in headless Chromium
  out/            The PNGs, one per project slug
```

## Regenerating

```bash
npm install
npm run media:linkedin            # every project
npm run media:linkedin -- wgbah   # one or more slugs
```

`render.mjs` uses `playwright-core` (a devDependency), which has no bundled
browser. Either:

- set `CHROME_PATH` to a Chrome/Chromium binary (on macOS:
  `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`), or
- run `npx playwright install chromium` once.

In the Claude Code cloud container, Chromium is pre-installed:

```bash
CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npm run media:linkedin
```

(`ls /opt/pw-browsers` if the version folder has changed.)

## Adding a project

1. Add it to `src/data/projects.js` as usual, with screenshots in
   `src/assets/img/<slug>/` and a `frame` of `phone`, `tablet` or `framed`.
2. Optional: set the project's `featured` list in `src/data/projects.js` to
   choose which three screenshots appear and in what order. **The middle one
   is shown in front**, so put the strongest screen there. Without it, the first
   three real images are used (`"01"`-style placeholders are ignored; a project
   with no real images is skipped). The PDF brochure uses the same list.
3. Run `npm run media:linkedin -- <slug>`, look at `out/<slug>.png`, and commit it.

The layout also handles one or two screenshots, and more than three,
scaling the fan to fit.

## Where the content comes from

Everything is read from the site's data files, so the images stay in sync with
the portfolio:

| On the card                   | Source                                                  |
|-------------------------------|---------------------------------------------------------|
| Eyebrow (category — period)   | `project.category`, `project.period`                    |
| Title, tagline, tag chips     | `project.name`, `project.tagline`, `project.tags`       |
| Status line                   | `project.status` + `project.stores` (`app-store` → "App Store", `play-store` → "Google Play"; others ignored). Non-`live` → "Archived project" |
| Byline                        | `site.name`, `site.headline` from `src/data/site.js`    |
| URL                           | hard-coded `najm101.github.io/portfolio` in `render.mjs` |
| Screenshot presentation       | `project.frame`                                         |

## Design notes

- **Layout:** 700px copy column on the left, rounded lavender "stage" on the
  right with the screenshots fanned out: the middle one at full size in front,
  the neighbours scaled to 0.86, stepped outward and dropped slightly.
  `layoutShots()` measures the first item and scales the whole fan down to fit
  the stage, so phones, tablets and differently sized framed images all work.
- **Frames** mirror the site's gallery (`src/styles.css`, `.phone` /
  `.tablet` / `.shot-framed`):
  - `phone`: raw captures inside a dark bezel with a notch, `object-fit: cover`
    anchored to the top (Invoice Star, Wgbah).
  - `tablet`: same for the 185:296 kiosk captures (Khedma).
  - `framed`: store-style images that already contain a device and headline
    (Roze Moon, Tawqet, SteamDeck) are shown as-is, as rounded white cards
    with a shadow.
- **Type and colour** reuse the site's tokens and self-hosted fonts from
  `src/assets/fonts` (Bricolage Grotesque for the title, Inter for body text,
  IBM Plex Mono for eyebrow, tags and URL). If the site's tokens change,
  update the `:root` block in `template.html` to match.
- `fitTitle()` shrinks long names (e.g. "SteamDeck: Game Compatibility") so
  they stay at about two lines.
- Opening `template.html` directly in a browser shows a preview with Wgbah data,
  handy for tweaking CSS. `renderCard` only auto-runs when the page isn't
  driven by automation (`navigator.webdriver`).

## Known limitations / gotchas

- **Low-resolution sources.** `steamdeck-checker` (148×296), `khedma`
  (185×296) and `roze-moon` (~313×680) screenshots are store thumbnails, so
  they look soft when enlarged on these cards. Replacing the files in
  `src/assets/img/<slug>/` with originals (same filenames) and re-rendering
  fixes it and also sharpens the site.
- App Store / Play Store pages are blocked from the cloud container, so
  higher-res versions couldn't be pulled from there.
- Rendering is through Chromium rather than compositing with `sharp`, because
  the frames, shadows and type are much easier in HTML/CSS. (`sharp` itself
  works fine: `import sharp from "sharp"`.)
- `renderCard` loads the fonts explicitly before `fitTitle()` measures the
  title. With only `document.fonts.ready`, the title was sometimes measured
  in the fallback font and came out a different size between runs.
