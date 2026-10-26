# FPV about chips match Daren

**2026-10-22**

## What changed

- **`sh-icon/religion`** is now Hugeicons Book02 in the Standard style (a book with two text lines), the exact shape in Daren's FPV. Before, it was the Rounded Book02 (bookmark tab, no lines). Line and Filled were rebuilt at 24–12. Line strokes stay on `sh-icon/stroke/{size}`. Every use changes with it: FPV chips, `sh-fpv-info-item` rows, header icons and the one Core Component example.
- **New `sh-icon/community`:** a group of three people, drawn from Daren's "Icon / System / User". Use it for caste / community.
- **New `sh-icon/marital-status`:** two rings with a heart, drawn from Daren's "Icon / Profile / Marital status".
- Both new icons take Daren's geometry, rebuilt on our size rhythm: Line 24 / 20 / 16 / 14 / 12, with stroke bound to `sh-icon/stroke/{size}`. Filled = closed shapes filled plus strokes outlined. They sit next to `sh-icon/person` on the Shaadi Icons page.
- **Chips on the FPV page:**
  - 15 caste chips moved `person` → `community`.
  - 15 "Never Married" chips moved `link-rings` → `marital-status`.
  - "Community" was dropped from 20 labels: "Kayastha Community" → "Kayastha", and the same for Devadiga and Baniya.
- **Wrapping:** all 18 chip rows on the FPV page are horizontal auto layout with wrap on, and none overflows. With the shorter labels, the rows break the same way as Daren's.
- **Common component change: chip icons are `icon/secondary`.** `sh-chip` Type=Info (all sizes) and Type=Choice unselected (Default / Hover / Pressed / Focus) now colour the icon `glyph` with `icon/secondary`; they were `icon/primary`. Selected Choice stays `icon/brand` (with its brand label) and Disabled stays `icon/disabled`. 72 chips had `icon/primary` set directly on the chip, overriding the component; those were reset to secondary. All 82 Info chips now show secondary, including the Profile Card's Info / Small chips (Pratik to re-check) and 3 on Core Component.
- **Not changed:** `link-rings` in Profile Card tags (24), Navigation tags (2), Utility and Overview. The Profile Card was reviewed by Pratik; switching those to `marital-status` needs his OK.

## Why

The FPV must match Daren's design. The single-person and plain-rings icons read differently from his group and wedding-rings icons.

## Who needs to do something

- **Designers / Pratik:** decide whether marital status on the Profile Card tags should also use `sh-icon/marital-status`.
- **Developers:** `religion` comes from Hugeicons Book02 Stroke Standard / Solid Standard. `community` and `marital-status` are custom paths; take them from the Figma sets.

## Checks

- [x] Every size renders correctly (Line and Filled) for religion, community and marital-status
- [x] FPV chip row matches Daren's reference side by side
- [x] 0 chip rows without wrap, 0 overflowing
