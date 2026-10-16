# Opacity: five-step scale

**2026-10-16**

## What changed

- **`sh-opacity` is now five intensity steps plus two ends**, named in the same words as translucency and shadow:
  `hidden` · `extra-soft` · `soft` · `disabled` · `strong` · `extra-strong` · `full`.
- **Renamed:** `muted` → `strong` and `faint` → `extra-soft`. `disabled`, `hidden` and `full` keep their names. Renamed tokens keep their Figma variable IDs, so existing bindings carried over with no visual change.
- **New:** `soft` and `extra-strong`.
- **Raw opacities snapped:** every unbound layer opacity in the Figma file was bound to its nearest step (900 layers). Most were exact matches. The visible changes were small: 92 → extra-strong, 70/72/60/56/50 → strong, 30/20 → soft, 35/36 → disabled, 5/15 → extra-soft.
- **Docs:** the Foundation page's opacity list and swatches show all seven tokens; `FOUNDATION.md` now names `strong` for the focus ring.
- Also new in Figma and now in the repo: `sh-stroke/thin`, for fine dividers and low-emphasis borders.
- Descriptions follow the house format: token name line + `Purpose:` line, no values.

## Why

Opacity values had drifted (twenty-plus raw values in use). Five steps cover every real use: borders, scrims, disabled, de-emphasis and heavy overlays.

## Who needs to do something

- **Developers:** replace `sh-opacity-muted` with `sh-opacity-strong`, and any `faint` with `extra-soft`, after the next sync.
- **Designers:** pick an opacity token, never a typed percentage.

## Checks

- [x] Every layer opacity in the Figma file is bound to an `sh-opacity` token
- [x] Foundation page swatches are bound to the live tokens
- [x] Pulled into `tokens/sh-opacity.json` (read live from Figma with `tools/read_variables.js`); `check.py` passes
