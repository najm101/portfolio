# Notes for Claude

- Site structure, build and screenshot conventions: see `README.md`.
- LinkedIn project images (1920×1080 per project, in `linkedin/out/`): see
  `linkedin/README.md` for how they're generated, how to add a new project, and
  known gotchas. Re-render with `npm run media:linkedin -- <slug>` (in the
  cloud container, prefix
  `CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; check
  `ls /opt/pw-browsers` if that version folder is gone).
- PDF brochure of the projects (`brochure/out/Abdelrahman-Negm-Projects.pdf`),
  for sending with the CV: see `brochure/README.md`. Re-render with
  `npm run media:brochure` (same `CHROME_PATH` note as above).
- Both read `role` and `featured` from `src/data/projects.js`. Keep all copy
  factual (see the guardrails in `career-stories/README.md`).
