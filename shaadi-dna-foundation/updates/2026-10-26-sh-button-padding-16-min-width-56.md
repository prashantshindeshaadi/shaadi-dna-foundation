# sh-button: side padding 16, min width 56

**2026-10-26**

## What changed

- **Common component change: `sh-button` Medium and Small** now have `sh-space/16` padding on the left and right. It was `sh-space/12`. This covers all 72 variants (every Type and State). Large stays at `sh-space/20`.
- **Min width 56** on all 108 variants (it was 60). This was set in Figma by Prashant. There is no `sh-space/56` token, so the value stays a raw 56. Add the token in Figma if it should be bound.
- Uses follow the main. Not changed:
  - 48 Tertiary Medium "Read More" / "See full match" buttons keep 0 side padding on purpose (the text-link rule).
  - 4 docs examples on the Overview page carry old padding overrides: "Add" (10 / 12) and "Remove" (8 / 8).

## Why

The review asked for 16 side padding and min width 56 on buttons.

## Who needs to do something

- **Developers:** button horizontal padding is 16 for md and sm, 20 for lg. Min width is 56.
- **Open:** `sh-semantic-button` is still Small 12 / Medium 16 / Large 20 with min width 60. Should it match?

## Checks

- [x] 72 / 72 Medium and Small variants at `sh-space/16` left and right
- [x] Primary Small, Medium and Large render correctly
