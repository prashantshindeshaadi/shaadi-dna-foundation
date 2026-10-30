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

## Later: Visual slot hugs its content
- `sh-bottom-sheet`, all 8 variants: **Visual slot** is now Hug width instead of Fill. The Sheet centres it in every variant (Align=Left still centres the visual, as before), with 16 below.
- The trust-marker sheets' `Visual` frames went from Fill to Hug, so the slot wraps the real art (VIP 199, Premium 157, others 96). Nothing is cropped.
- Checked: all 19 visible visual slots hug, and the Hide, VIP and Premium sheet renders are unchanged.

## Later: member photo sits in the Visual slot
- `sh-bottom-sheet`: the **Show profile** option is gone. It floated an sh-avatar half over the sheet's top edge. A member photo now goes in the **Visual slot** (Show visual on, sh-avatar Type=Image lg), which hugs the photo and centres it, 16 below.
- `sh-fpv-sheet-phone-number`, all 4 states, plus its 3 copies on the FPV page and the loose "Sheet / Phone number" frame: photo moved from the floating layer into the Visual slot. Each copy keeps its own photo.
- Nothing else used Show profile (checked all 37 sheet uses).
- **Developers:** no special "profile" mode on the sheet. Render the photo as the sheet's visual content.

## Later: grabber only on scrolling sheets
- `sh-bottom-sheet`: the grabber now follows **Size**. **Size=Full** (content scrolls or runs past the screen) always shows it; **Size=Hug** (sheet fits its content) never does. The **Show grabber** toggle is removed.
- Effect: the one Hug sheet that had the grabber on (Trust marker · Managed by self) loses it. The Full sheet "Filter — Mother tongue" (Sunil), which scrolls, now has it.
- **Developers:** show the drag handle only when the sheet's content is taller than the space it's given (scrollable / expandable). Fitted sheets: no handle.

## Later: CTAs are Medium; left-aligned sheets put the primary on the left
- `sh-bottom-sheet`: every CTA is now **sh-button Medium** (was Large). Stacked primary stays max 200 and centred; side-by-side pairs fill equally.
- **Align=Left** sheets are always **side by side with the primary on the left**. The two "Left · Stacked" variants are gone (their 2 uses moved to Left · Side by side), so the set is 6 variants: Size (Hug · Full) × Center Stacked · Center Side by side · Left Side by side.
- All 38 dependent sheets (FPV, Sunil, core) checked: 98 CTAs, all Medium now (5 were still Large).
- **Developers:** sheet buttons = Medium (40 tall). Left-aligned sheet → horizontal pair, primary first.

## Later: no grey corners behind sheets
- `sh-fpv-screen-behind` (the profile shown behind every FPV sheet) had a 16 radius on all corners. Its screen frame is square with a white fill, so the white showed in the corners and the sheet's scrim tinted it into a grey wedge. A full-screen layer is never rounded: the radius is now 0. All 7 screens that use it are fixed (Astro match sheet, North and South).
- Scanned every 360-wide screen for a rounded full-width layer under an overlay: no other cases.

## Later: score number and total on one bottom line
- `sh-fpv-astro-sheet-header` (North, Ask, South): the big score ("28", "7") and its total ("/36", "/10") sit on one **baseline**. Measured at 6×: every digit's bottom is within 0.3 px of the others. The "/" dips about 2 px below the line, as slashes do in Lexend.
- Tried and dropped: centre line (looked off); Figma "Vertical trim" + bottom align (same line, but it detaches the sh-typo text styles).
- The score frames no longer clip, so no glyph can be cut.
- **Developers:** align the two texts on their first baseline: `Modifier.alignByBaseline()` / `HStack(alignment: .firstTextBaseline)` / `align-items: baseline`.
