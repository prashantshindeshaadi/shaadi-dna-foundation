# Component status: Draft, Proposed, In refinement, Core

**2026-10-30**

## What changed
- Every component now has a status: Draft → Proposed → In refinement → Core. The rule is in `FOUNDATION.md` §8.
- `components/status.json` holds the statuses. It's empty for now, so every component takes its default: 71 Core-page components are Proposed, 59 migration-page components are Draft. Nothing is Core yet.
- `tools/vision.py` adds the status to `dist/vision/catalog.json` and stops on an unknown status.
- Shaadi Vision App: a status badge on every component, status tabs with counts on Components, and a Component status block on the overview.

## Why
Figma components are the design intent. Developers refine them into the real component, and only that refined, released version is final. The status shows where each component is, so nobody treats a draft as finished.

## Who needs to do something
- **Designers:** when you mark a component Ready for dev, set it to `proposed` in `components/status.json` if it isn't on the Core page.
- **Developers:** set `in-refinement` with your merge request link when you start, and `core` when it's released and the Figma component is aligned.

## Checks
- [x] `python3 tools/check.py` passes
- [x] `python3 tools/build.py` run
- [x] FOUNDATION.md updated (§8, status)
