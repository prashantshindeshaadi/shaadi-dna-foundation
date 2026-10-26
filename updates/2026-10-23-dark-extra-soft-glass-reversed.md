# Dark extra-soft glass reversed

**2026-10-23**

## What changed

- `sh-translucent/background/dark/extra-soft/start`: black **16 % → 6 %** (set to 8 first, then 6 by Prashant)
- `sh-translucent/background/dark/extra-soft/end`: black **8 % → 12 %** (16 first, then 12)
- The gradient style `sh-gradient/translucent/dark/extra-soft` (bound to both) now runs 6 % → 12 %, so the dark glass gets denser towards its end. Light and brand extra-soft are unchanged (16 → 8, 12 → 6).

- **`sh-profile-card-info` gradient runs top to bottom** (was diagonal 45°). The card background uses the dark extra-soft tokens 6 % → 12 % directly (not the paint style, because the style keeps its diagonal angle for tags). All 46 copies are now vertical. The 14 copies that carried an old fill (13 × 28 → 14 %, 1 × 16 → 8 %) were reset to the component fill, and one raw 6 → 12 % copy was relinked to the tokens. Now 45 of 46 info cards show 6 % → 12 % top to bottom, linked to the tokens; 1 on the Profile Card page has no gradient fill (left as is).

## Why

Review fix: the dark extra-soft glass reads better lighter at the start and denser at the end.

## Who needs to do something

- **Repo:** values change in Figma first; run `/shaadi-dna-update` to bring them into `tokens/` and `dist/` (never edit those by hand).
- **Developers:** nothing until that sync.

## Checks

- [x] Both variables updated in Figma; the gradient style resolves 8 % → 16 %
- [ ] `/shaadi-dna-update` export
