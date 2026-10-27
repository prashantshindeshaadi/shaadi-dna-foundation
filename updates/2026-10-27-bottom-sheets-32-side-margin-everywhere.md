# Bottom sheets: 32 side margin everywhere

**2026-10-27**

## What changed
- Every bottom sheet now keeps its content 32 px from each side, bound to `sh-space/32`. Core `sh-bottom-sheet` already used it; the FPV sheet parts did not.
- FPV astro sheet parts, side padding 20 (unbound) → `sh-space/32`:
  - `sh-fpv-astro-sheet-header` (North, Ask, South)
  - `sh-fpv-astro-sheet-breakdown` (North, South)
  - `sh-fpv-astro-sheet-summary`
  - `sh-fpv-astro-sheet-privacy`
  - `sh-fpv-astro-sheet-ask-card`
  - `sh-fpv-astro-sheet-pinned-strip` (the strip stays full width; its content moves in)
  - `sh-fpv-section-divider` (all 109 uses are in sheets)
- The 6 hand-built "Kundali reports · free viewer" blocks in the astro sheets: 20 → `sh-space/32`.
- `sh-fpv-sheet-phone-number`:
  - Number shown and No tokens had the sheet body overridden to 20; both are back to `sh-space/32`. Top stays 16, per the Show profile rule.
  - The Details block (phone and email rows) was a fixed 332 px wide and pushed the SMS and Email buttons out. It now fills the body, in the main and in the 2 copies on the page.
- Trust marker sheet "Managed by VIP": a bullet's text ran 5 px past the margin. It now fills its row and wraps.

## Why
One margin for every sheet, matching core `sh-bottom-sheet`, so nothing on a sheet runs outside it.

## Who needs to do something
- **Designers:** nothing. New sheets: put content inside the sheet body, which has a 32 margin. Don't override the body padding.
- **Developers:** sheet content inset = `sh-space/32` on both sides, FPV astro sheets included.

## Checks
- [x] 59 sheet bodies and parts scanned (FPV, Sunil, Core): 0 elements outside the 32 margins
- [x] Renders checked: astro match sheet, phone number sheet
- Not changed: the `sh-action-island` footer on the astro screens. It's a shared floating bar with its own 16 inset, used on the profile card as well.
