# Check icon: round ends, sharp joint

**2026-10-16**

## What changed
- **`sh-icon/check` now follows the Hugeicons drawing style**, so it sits in the same family as `check-circle`, `shield-check`, `user-check` and the rest of the icon set: fully round ends, same line weight as the other line icons.
- **The joint stays sharp** (mitre), by choice: the tick keeps a crisp point at the elbow.
- **Line:** round caps, mitre join, stroke still bound to `sh-icon/stroke/<size>`. All five sizes.
- **Filled:** rebuilt as the same tick drawn with a heavier stroke (round ends, mitre joint) and outlined, so Line and Filled are one mark in two weights. Footprint is unchanged (16.3 × 12 at 24), so nothing shifts in buttons, checkboxes or badges.
- **Filled weight matches the button label.** The tick's stroke equals the stem of Lexend-SH Bold (560) at the label size it sits next to, so it no longer looks thin beside bold text:

  | Button | Label | Icon | Tick stroke |
  |---|---|---|---|
  | Small | 12px | 12 | 1.61 (was 1.31) |
  | Medium | 14px | 16 | 1.88 (was 1.75) |
  | Large | 16px | 20 | 2.14 (was 2.19) |

  Sizes 14 (1.75) and 24 (2.40) follow the same line. Footprints are unchanged; the extra weight fills inward.
- Everything that uses the check — `sh-checkbox`, Connect buttons, lists, read receipts — updates automatically.
- `icons/line/check.svg` and `icons/filled/check.svg` re-exported; the filled check uses `currentColor` like every other filled icon.

## Why

The old tick had square-cut ends and a pointed polygon shape, so it looked like it came from a different icon set than the Hugeicons-based icons around it.

## Who needs to do something
- **Designers:** nothing; pull the library.
- **Developers:** replace the two check SVGs. Known: `icons/line/tag.svg` carries a white 24×24 background square from Figma; remove that layer in Figma, then re-export.

## Checks
- [x] `python3 tools/check.py` passes
- [x] Checked in real Large, Medium and Small Connect buttons
- [x] Compared side by side with Hugeicons `check-circle` and `user-check`; checked in every `sh-checkbox` state
