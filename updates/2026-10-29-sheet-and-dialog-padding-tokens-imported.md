# Sheet and dialog padding tokens imported

**2026-10-29**

## What changed
- `sh-space` gains the three padding tokens added in Figma on 2026-10-28:
  - `padding/sheet-relaxed`: sh-bottom-sheet Type Relaxed.
  - `padding/sheet-compact`: Type Compact, the scrolling sheet with a grabber.
  - `padding/dialog`: sh-dialog; it keeps the old `sheet-dialog` values.
- `padding/sheet-dialog` is removed (confirmed by Prashant). Its only use, sh-dialog, was already on `padding/dialog` in Figma; the sh-dialog blueprint now says so too.
- dist/ rebuilt; code syntax regenerated (`dist/figma/apply-code-syntax.js`).

## Why
The 2026-10-28 sheet types needed their own margins, and the repo was still on the old single `sheet-dialog` token.

## Who needs to do something
- **Designers:** nothing.
- **Web / Android / iOS:** rebuild from `dist/`. Replace `--sh-space-padding-sheet-dialog` / `sh_space_padding_sheet_dialog` with `padding-dialog` (dialogs) or `padding-sheet-relaxed` / `-compact` (sheets).

## Checks
- [x] `python3 tools/check.py` passes
- [x] `python3 tools/build.py` run
- [ ] Code syntax for the 3 new tokens: apply `dist/figma/apply-code-syntax.js` in Figma (the Desktop Bridge was disconnected)
