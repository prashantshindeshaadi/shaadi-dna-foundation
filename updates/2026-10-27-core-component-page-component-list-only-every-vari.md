# Core Component page: component list only, every variant labelled

**2026-10-27**

## What changed
- The 8 **Examples —** sections (profile actions, sign-up form, feedback stack, FAQs, match header, confirm on scrim, menu open, screen shell, desktop settings, chat screen) are gone. The page is the component list and nothing else.
- Every component is one block: **name**, one line on **what it is for** (from its description), then every variant. Rows and columns are labelled by the property they change (e.g. `Type · Size` down the side, `Default · Hover · Pressed · Disabled · Loading · Focus` across the top). Where a set is not a clean grid, a line under the name lists the variant values instead.
- `sh-action-island` and `sh-action-note` keep their hand-written annotation grids.
- A short "how to read this page" line sits under the logo at the top.
- Sections are re-flowed and stacked again with no overlaps. `sh-bottom-sheet`'s variants are now a 4 × 2 grid: Align · Actions across, Size down.
- Found while clearing the examples: the "sh-icon/tag — tag & badge icons" frame held 9 real icon sets (`sh-icon/verified-badge`, `premium-badge`, `vip-badge`, `tag/online`, `offline`, `megaphone-03`, `pin-location-01`, `left-wing`, `right-wing`). They now live on the **Shaadi Icons** page in a new section "06 Tag & badge icons". No instance changed.
- `sh-overlay` sat inside a loose frame; it is now in "06 Sheets & overlays" with the other overlays. Two stray instances (a lone sh-list-grouped row and the Education & Career mock-up copy) were removed.

## Why
Designers from other teams need a plain list they can scan and copy from. Examples made the page twice as wide and were out of date the moment a component changed.

## Who needs to do something
- **Designers:** nothing. Browse the Core Component page; the labels tell you which variant is which.
- **Developers:** nothing.

## Checks
- [x] No main component was deleted (checked before removing each section)
- [x] Renders checked: 01 Actions, 02 Inputs, 03 Status, 04 Containers, 06 Sheets, 07 Navigation, 08 Messaging
- Script: `DNA Skills/Component Skill/scripts/core-annotate.js` (idempotent; re-run a section after its set layout changes)

## Incident, same day
A screenshot step left copies of the nine Core sections on the FPV page, and the clean-up then removed Daren's own "01 · … 09 ·" sections with them. The file was restored to the 11:57 UTC autosave (Figma version history), which has every FPV section and the finished Core page; the copies were then deleted by exact ID. One section made after that autosave, "Visual explorations" on the FPV page (6 widget frames), is not in the restored file; it can be copied back from the 6:09 PM (12:33 UTC) version in history.
