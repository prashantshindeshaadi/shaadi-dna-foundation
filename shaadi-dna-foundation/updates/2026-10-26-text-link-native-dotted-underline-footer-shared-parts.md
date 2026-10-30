# Text link: native dotted underline; FPV footer shares one top block

**2026-10-26**

## What changed

### `sh-text-link`: native underline (common component change)
- The drawn "Underline" line layer is gone. The label now uses Figma's **text underline**, the one on the original "Hide, Report or Block Profile": **Dotted**, thickness **Auto**, offset **Auto**, skip ink on, colour Auto (same as the text). It follows the label's width and colour by itself.
- The `Show border` boolean is replaced by a variant property **Underline = On / Off** (44 variants).
  - **Figma limitation:** text formatting (underline, its colour, thickness) belongs to the shared `Label` text property, so it is the same in every variant. The Off variants currently also carry the dotted underline. The 19 links that had the underline off (Upgrade Now × 9, Change × 4, Edit × 3, Read More × 3) keep a plain label through their own override.
  - **Open:** underline everywhere (drop Off), a second label field for Off, or Off keeping a drawn line? Waiting on Prashant.
- 375 links now show the dotted underline. 4 copies that had a solid underline were set to dotted.
- **Edit stays solid:** every underlined "Edit" link (the pre-written note's Edit, 259 copies) keeps a **solid** underline, as before (Auto thickness and offset). All other links are dotted.
- Blueprint regenerated.

### `sh-fpv-footer`: one shared top block for every state
- The 5 states each had their own hand-made copy of the top block (photo, "Don't miss out on …", Share / Shortlist, "Manage your boundaries · Hide, Report or Block Profile"), and the copies had drifted: groups versus auto layout, title colour, text style, button gaps.
- The **Default** state is the reference. Its blocks are now two components, placed in every state:
  - **`sh-fpv-footer-cta`**: photo, title, and the Share and Shortlist buttons.
  - **`sh-fpv-footer-boundaries`**: "Manage your boundaries" plus an `sh-text-link` (Neutral, Small, "Hide, Report or Block Profile").
- The 13 footer uses keep their own changes: the "Kabir" and "Rohan" titles, one title colour, one photo. Leftover text-style overrides now follow the main.
- Both new components sit next to `sh-fpv-footer` in F · Widgets, with no overlaps.

## Why

Edit the footer once and every state follows. The link uses the same underline everywhere.

## Who needs to do something

- **Prashant:** decide the no-underline option (see Open).
- **Developers:** text link = `text-decoration: underline dotted; text-decoration-thickness: auto; text-underline-offset: auto; text-decoration-skip-ink: auto`.

## Checks

- [x] All text link variants: dotted, Auto thickness and offset, skip ink
- [x] The footer's Default state renders like the reference
- [x] 5 / 5 footer states use the shared blocks; 4 recorded overrides re-applied
