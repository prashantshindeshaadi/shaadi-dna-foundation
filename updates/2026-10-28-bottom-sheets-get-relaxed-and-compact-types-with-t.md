# Bottom sheets get Relaxed and Compact types, with their own margin tokens

**2026-10-28**

## What changed
- New `sh-space` tokens:

  | Token | Mobile | Tablet | Desktop | For |
  |---|---|---|---|---|
  | `padding/sheet-relaxed` | 32 | 32 | 40 | Side margin of a relaxed sheet: centred content |
  | `padding/sheet-compact` | 24 | 24 | 32 | Side margin of a compact sheet: lists, long scrolling content |
  | `padding/dialog` | 16 | 20 | 32 | Dialog padding (old `sheet-dialog` values) |

- `padding/sheet-dialog` is **retired**. Its uses (`sh-dialog` Default and Destructive, two Foundation doc spacers) now use `padding/dialog`. Sheets had never used it; they were bound to raw `sh-space/32`.
- `sh-bottom-sheet`: **Size** (Hug · Full) is replaced by **Type**:
  - **Relaxed:** hugs its content, side margin `padding/sheet-relaxed`.
  - **Compact:** tall, content scrolls, grabber shows, side margin `padding/sheet-compact`.

  The set is still 6 variants (Type × Align × Actions). All 35 uses kept their variant; Hug became Relaxed, Full became Compact.
- FPV Astro match sheet (built from parts, not `sh-bottom-sheet`): 137 side margins moved from `sh-space/32` to `padding/sheet-compact`. That covers header, breakdown, summary, privacy, ask card, pinned strip, section divider, the Kundali reports blocks and their pasted copies.
- Phone-number sheet bodies (5 overrides): `sh-space/32` → `padding/sheet-relaxed`.
- Sunil's Mother tongue filter (was Size=Full) is now Compact: 24 side margin.
- FOUNDATION.md §5.3 lists the new semantic tokens.

## Why
Centred content needs a wider margin to breathe; long left-aligned lists look cramped at 32. Each sheet type now gets its own named margin, so they can change separately.

## Who needs to do something
- **Designers:** pick Type on `sh-bottom-sheet`: Relaxed for centred content, Compact for lists and long sheets.
- **Web / Android / iOS:** run `/shaadi-dna-update` (Figma export → `tokens/`, `dist/`). Use `padding/sheet-relaxed` or `padding/sheet-compact` for the sheet's horizontal inset, and `padding/dialog` for dialogs. Drop `padding/sheet-dialog`.

## Checks
- [x] Renders: Astro match sheet (24), Mother tongue (24), phone-number sheet (32)
- [ ] `/shaadi-dna-update` export run (tokens/ not edited by hand)
