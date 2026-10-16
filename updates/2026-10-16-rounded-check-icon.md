# Check icon: round ends, sharp joint

**2026-10-16**

## What changed
- **`sh-icon/check` now follows the Hugeicons drawing style**, so it sits in the same family as `check-circle`, `shield-check`, `user-check` and the rest of the icon set: fully round ends, same line weight as the other line icons.
- **The joint stays sharp** (mitre), by choice: the tick keeps a crisp point at the elbow.
- **Line:** round caps, mitre join, stroke still bound to `sh-icon/stroke/<size>`. All five sizes.
- **Filled:** rebuilt as the same tick drawn with a heavier stroke (round ends, mitre joint) and outlined, so Line and Filled are one mark in two weights. Arm thickness and footprint are unchanged (16.3 × 12 at 24), so nothing shifts in buttons, checkboxes or badges.
- Everything that uses the check — `sh-checkbox`, Connect buttons, lists, read receipts — updates automatically.
- `icons/line/check.svg` and `icons/filled/check.svg` re-exported; the filled check uses `currentColor` like every other filled icon.

## Why

The old tick had square-cut ends and a pointed polygon shape, so it looked like it came from a different icon set than the Hugeicons-based icons around it.

## Who needs to do something
- **Designers:** nothing; pull the library.
- **Developers:** replace the two check SVGs. Known: `icons/line/tag.svg` carries a white 24×24 background square from Figma; remove that layer in Figma, then re-export.

## Checks
- [x] `python3 tools/check.py` passes
- [x] Compared side by side with Hugeicons `check-circle` and `user-check`; checked in every `sh-checkbox` state
