# Full refresh from Figma: tokens, gradients, 119 blueprints, icon pack

**2026-10-26**

## What changed

Everything was read live from the Figma file through the figma-console bridge. It brings in the design changes made between 2026-10-21 and 2026-10-26 (see that week's entries).

- **Variables** (`tools/read_variables.js` → `import.py`):
  - `button/secondary/text/subtext` was removed. The sublabel now uses the label colour.
  - `sh-icon/stroke` changed: 14 → 1.2, 16 → 1.3, 20 → 1.4, 24 → 1.6.
  - `sh-translucent/background/dark/extra-soft` now runs from 6 % (start) to 12 % (end).
- **Gradient styles** (`read_styles.js`): all `translucent/{light, dark, brand}/*` backgrounds now run top to bottom. They used to be diagonal.
- **Blueprints:** all 119 `sh-*` sets were found live and regenerated (there were 87 before).
  - New: the FPV migration components (35 `sh-fpv-*`, plus `sh-tag-fpv`), `sh-tab-item` and `sh-tab-group` (renamed from `sh-tab` and `sh-tabs`).
  - Removed with their components: `sh-action-row` (now a Type of `sh-action-island`), `sh-fpv-inbox`, `sh-fpv-sticky-header` and `sh-fpv-photo-stack`.
  - `sh-button.md` stays hand-written.
- **Icon pack:** 400 icons and 732 files re-exported.
  - 78 files from the old hobby batch were removed; they're replaced by `sh-icon/hobby-*`.
  - No code referenced any of the removed files.
- **Build:** `dist/` rebuilt. The type kit picks up the new Lexend-SH i and j.

## Why

The repo is the single source of truth for tokens and components. It had fallen five days behind Figma.

## Who needs to do something

- **Designers:** nothing.
- **Web / Android / iOS:**
  - Re-copy `dist/` (the stroke and translucent values changed).
  - Re-import icons: removed hobby files and new `hobby-*` names.
  - `sh-action-row` is gone; use `sh-action-island` Type.

## Open points

- **`sh-gradient/translucent/dark/soft` uses raw colours** in Figma. It isn't bound to `background/dark/soft/*`, so `check.py` warns and Android/iOS get light-mode values only. Rebind its two stops in Figma.
- **`sh-gradient/sia/top-match` also has raw colours.** Already known.

## Checks

- [x] `python3 tools/check.py` passes (warnings only)
- [x] `python3 tools/order.py --check`
- [x] `python3 tools/build.py` run
