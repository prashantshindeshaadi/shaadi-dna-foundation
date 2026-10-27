# sh-icon/diet is plate, spoon and knife; leaf moves to sh-icon/veg-food

**2026-10-27**

## What changed
- **`sh-icon/diet`** now shows a plate with a spoon and a knife: Daren's FPV "Profile · Diet" drawing, used exactly as drawn.
  - It is rebuilt at every size (Line and Filled, 24 / 20 / 16 / 12) on the `sh-icon/size` and `sh-icon/stroke` tokens, with round caps and joins.
  - Filled = the plate centre filled, the spoon head and knife blade solid, the lines outlined.
  - The artwork was replaced in place, so all 17 uses update by themselves: 16 in `sh-fpv-info-item` (Lifestyle → diet, e.g. "Non-Vegetarian") and 1 list row.
- **New `sh-icon/veg-food`**: the leaf that used to be the diet icon, kept for veg / vegetarian food. Same Line and Filled sizes, placed in Lifestyle on the Shaadi Icons page.
- The loose "Icon / Profile / Diet" reference component on the Shaadi Icons page was removed. It had 0 uses, and its drawing now lives in `sh-icon/diet`.
- Repo:
  - `icons/line|filled/diet.svg` are the new drawing.
  - `icons/line|filled/veg-food.svg` hold the leaf.
  - `components/icons.md` rows are updated.
  - The `icon-map.md` and icon source maps record diet as a custom drawing and veg-food as Leaf01.

## Why
The leaf said "vegetarian", but the diet row covers every food preference. The plate matches the FPV design.

## Who needs to do something
- **Designers:** nothing. Use `sh-icon/veg-food` for a veg marker.
- **Developers:** re-copy `icons/line/diet.svg` and `icons/filled/diet.svg`. Use the new `veg-food` SVGs wherever you meant the leaf.

## Checks
- [x] All 8 diet variants rebuilt, glyph colour and stroke bindings kept
- [x] Render checked in the FPV Lifestyle card
