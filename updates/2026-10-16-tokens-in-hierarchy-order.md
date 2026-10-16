# Tokens in hierarchy order

**2026-10-16**

## What changed
- Every token file is now ordered by hierarchy: low → high, light → strong. **Order only** — no token added, removed, renamed or changed; `tools/order.py` checks that each file holds exactly the same tokens before and after.
- **Space:** steps 0 → 80 (14 moved into place), then gaps, padding and page margin, each by size.
- **Opacity:** hidden → extra-soft → soft → disabled → strong → extra-strong → full.
- **Stroke:** none → thin → default → medium → strong.
- **Radius:** none → xxs → xs → sm → md (= default) → lg → xl → xxl → full, then role tokens by the step they use.
- **Colour (common):** background default → soft → strong, then selected, disabled, brand, inverse, transparent; border soft → default → strong, then selected, focus, brand, disabled, inverse; text and icon primary → secondary → tertiary → disabled, then roles; buttons, premium and status colours run background (default → hover → pressed) → border (soft → default) → text → icon.
- **Colour (basic):** inside each family 25 → 900, then vivid; neutral runs transparent → white → 25 … 900 → black. Family order unchanged.
- **Translucent:** light → dark → brand → blur, each extra-soft → strong; borders light → dark → brand.
- **Typography:** each style lists font, weight, size, line height, letter spacing, paragraph spacing. Shadow and icon were already in order.
- Generated code (`tokens.css`, Android, iOS, JSON, Dev Mode list) follows the same order.

## Why

Tokens read top to bottom in the same order everywhere, so the right step is easy to find and the scale is obvious.

## Who needs to do something
- **Designers:** Figma's plugin API can't reorder variables, so the Figma panel is reordered by hand (drag in the Variables panel). The repo order is the target.
- **Developers:** nothing; names and values are unchanged.

## Checks
- [x] `python3 tools/order.py --check` passes
- [x] `python3 tools/check.py` passes
- [x] `python3 tools/build.py` run
