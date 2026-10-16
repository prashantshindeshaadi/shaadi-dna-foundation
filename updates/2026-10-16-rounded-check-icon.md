# Rounded check icon

**2026-10-16**

## What changed
- **`sh-icon/check`, Line:** stroke ends are round and the corner is a round join, instead of square-cut ends and a pointed corner. All five sizes.
- **`sh-icon/check`, Filled:** every corner is rounded with iOS corner smoothing (60%), radius scaled to the size (1 at 24 down to 0.5 at 12), so the tick keeps its shape without sharp points.
- `sh-checkbox`, and everything else that uses the check (Connect buttons, tags, badges), picks this up automatically.
- `icons/line/check.svg` and `icons/filled/check.svg` re-exported. The filled check now uses `currentColor` like every other filled icon (it was hard-coded black).

## Why

The tick read as sharp and mechanical next to the rounded, iOS-smoothed boxes and buttons around it.

## Who needs to do something
- **Designers:** nothing; pull the library.
- **Developers:** replace the two check SVGs. Known: `icons/line/tag.svg` carries a white 24×24 background square from Figma; remove that layer in Figma, then re-export.

## Checks
- [x] `python3 tools/check.py` passes
- [x] Checked visually in Figma at all sizes and in every sh-checkbox state
