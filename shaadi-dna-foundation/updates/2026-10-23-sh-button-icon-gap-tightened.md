# sh-button icon gap tightened

**2026-10-23**

## What changed

- **Common component change:** in `sh-button` **Small and Medium**, the gap between the icon and the label is now `sh-space/2` (was 4), in all 72 variants (every Type × State). Small = 12 px icon + `Button/SM`, Medium = 16 px icon + `Button/MD`.
- 818 Small / Medium buttons in the file follow the main; 4 on Overview had their own gap of 4 and were reset to `sh-space/2`.
- **Large** is now `sh-space/4` (was 6) in all 36 variants; 136 Large buttons follow, none overridden. Final scale: **Small 2 · Medium 2 · Large 4** (icons 12 / 16 / 20).
- **Same scale on the other buttons:**
  - `sh-semantic-button`: Large 6 → 4, Medium 4 → 2 (Small was already 2); 216 variants, 10 uses.
  - `sh-text-link`: Small 4 → 2, Medium 4 → 2, Large 6 → 4; 308 uses. No instance overrode the gap.
- **`sh-text-link` has one underline style: solid.** The `Border` variant property (Dashed / Solid) is removed: the 22 Dashed variants are deleted (none was used) and the remaining variants no longer carry `Border=Solid`. The set is now Type × Size × State (22 variants), laid out one row per Type.
- **Focus ring fixed on `sh-text-link`:** the 11 Focus rings no longer matched the link after the gap change (the ring was 4 px too wide or too narrow). Each ring now sits 4 px outside the link on every side (x/y −4, size +8, stretch constraints), like every other focus ring. All 89 focus rings in the file were checked (sh-button, sh-semantic-button, sh-icon-button, sh-chip, sh-checkbox, sh-radio, sh-toggle, navigation item); the others were already correct. `sh-icon-button-with-label` now has **State=Focus**: a copy of Default whose nested `sh-icon-button` is set to Focus, so it shows the same `_BaseFocusRing` around the circle (label unchanged). Its State options are Default / Focus; the 48 uses stay Default.
- **Minimum width 60 for CTAs:** every variant of `sh-button` (108) and `sh-semantic-button` (216) now has `minWidth` 60. 39 buttons on screens were narrower and now grow to 60, all short labels on FPV ("View" ×22, "Reply" ×8, "SMS" ×6, "Sent" ×2) plus 1 icon-only button on Overview. 6 "View" buttons in the FPV requests strip had their own minimum width of 56; they are set to 60. No button is under 60 now. There is no size token for 60, so the value is a plain number.

## Why

At 4, the 12 / 16 px icons sat visibly apart from the label; 2 balances them optically.

## Who needs to do something

- **Developers:** button icon gap Small 2 · Medium 2 · Large 4 (sh-button, sh-semantic-button, sh-text-link); min width 60 on sh-button / sh-semantic-button; text-link underline is always solid, and `Border` is removed from the API.
