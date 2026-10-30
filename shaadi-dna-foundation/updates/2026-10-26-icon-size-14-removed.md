# Icon size 14 removed

**2026-10-26**

## What changed

- **`sh-icon` has four sizes: 24 · 20 · 16 · 12.** The **Size=14** variant was deleted from all 342 icon sets that had it (674 variants, Line, Filled and the `sh-icon/tag/*` sets).
- **Tokens deleted in Figma:** `sh-icon/size/14` and `sh-icon/stroke/14`. The 8 layers bound to them were rebound to the 16 tokens. `tokens/` and `dist/` pick this up at the next `/shaadi-dna-update` export.
- **The 550 uses were resized by context** (Prashant's call), keeping Line / Filled and colour (0 colour changes):
  - **→ 16:** `sh-button` Small (211), `sh-semantic-button` Small (72), `sh-text-link` (36), the `sh-chip` leftovers, `sh-badge`, the FPV app / sticky headers and loose page icons.
  - **→ 12:** `sh-tag` icons (54, including the profile tags' wings and pin), `sh-data-point` (16) and the FPV compatibility cues, link-rings and astro (124).
- Icon-slot defaults and preferred lists that pointed at 14 icons (`sh-tag`, `sh-chip`) now point at 16.
- `sh-icon/check` Line 12 keeps its deliberately heavier stroke: it is now on `stroke/16` (1.3), the next step up from 12.
- **Rules and tools updated:**
  - `build-icon` skill: sizes 24, 20, 16, 12.
  - `dna-component` skill: Small button icon is 16.
  - The icon map and icon generators (`hugeicon-gen-*.cjs`, `custom-icon-*.cjs`) no longer make 14.
  - `components/icons.md` lists the new sizes.

## Why

Five icon sizes were more than the system needs. 14 sat too close to 12 and 16.

## Who needs to do something

- **Designers:** pick icons at 24 / 20 / 16 / 12. Small buttons and text links use 16; tags and inline cues use 12.
- **Developers:** drop `--sh-icon-size-14` / `--sh-icon-stroke-14` after the next token export. Small button icons are 16.
- **Figma Agent:** update the internal build-icon skill (prompt given in chat).

## Checks

- [x] 0 Size=14 icon variants and 0 icon 14 tokens left
- [x] 0 instances still on a 14 variant before deletion
- [x] 0 colour changes from the swaps
