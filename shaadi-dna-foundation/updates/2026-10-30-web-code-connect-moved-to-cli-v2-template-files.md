# Web Code Connect moved to CLI v2 template files

**2026-10-30**

## What changed
- All 19 web Code Connect files (`components/**/web/*.figma.ts`) are now Code Connect v2 template files, converted with `figma connect migrate`. Same Figma nodes, properties and snippets; the header notes are kept.
- New `figma.config.json` in `shaadi-dna-foundation/`: language `html`, label `Web`, includes only `components/**/web/*.figma.ts`.
- `/shaadi-code-connect` now describes the v2 template format for web.

## Why
Code Connect CLI 2.x (installed as a dev dependency) dropped the framework parsers, so it couldn't read the old files and nothing could be published. Template files publish without parsing (MG-1034, P5).

## Who needs to do something
- **Publishing:** from `shaadi-dna-foundation/`, `npm install` once, set `FIGMA_ACCESS_TOKEN` in your shell, then `npx figma connect publish`. Not published yet.
- **Compose / SwiftUI:** not touched; their Code Connect files still use the old parsers.

## Checks
- [x] `npx figma connect parse` reads all 19 (label Web, html)
- [x] `python3 tools/check.py` passes
- [ ] FOUNDATION.md updated if a rule changed (no rule changed)
