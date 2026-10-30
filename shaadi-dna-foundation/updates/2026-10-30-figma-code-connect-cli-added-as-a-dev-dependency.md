# Figma Code Connect CLI added as a dev dependency

**2026-10-30**

## What changed
- `shaadi-dna-foundation/package.json` now lists `@figma/code-connect` (2.1.0) as a dev dependency, with its `package-lock.json`.
- `node_modules/` is git-ignored.

## Why
Publishing the `.figma.ts` Code Connect files needs the Figma CLI. A global install needed `sudo`; a project install doesn't.

## Who needs to do something
- **Designers / anyone publishing Code Connect:** in `shaadi-dna-foundation/`, run `npm install` once. The CLI is then `npx figma`. Publishing also needs a `FIGMA_ACCESS_TOKEN` in your own shell; never commit it.
- **Web / Android / iOS:** nothing.

## Checks
- [x] `python3 tools/check.py` passes
- [x] `python3 tools/build.py` run
- [ ] FOUNDATION.md updated if a rule changed (no rule changed)
