# Koota glyphs join the pack, monochrome

**2026-10-27**

## What changed
- 10 new icons, `sh-icon/koota-*`, for the South-chart (Dasa porutham) breakdown. Each is Type=Filled, Size 24 · 20 · 16 · 12, with one glyph bound to `icon/primary` (monochrome) and sizes bound to `sh-icon/size/*`:
  `koota-dina` (Health) · `koota-gana` (Temperament) · `koota-mahendra` (Children) · `koota-stree-deergha` (Wellbeing) · `koota-yoni` (Intimacy) · `koota-rasi` (Love) · `koota-rasi-adhipati` (Compatibility) · `koota-vashya` (Influence) · `koota-rajju` (Longevity) · `koota-vedha` (Obstacles).
- They come from Daren's multicolour `astro/Glyph/*` library components, which arrived with the pasted South breakdown sheet. All 58 uses in the DNA file now point to ours; none of his remote glyphs are left in use.
- Shaadi Icons page: new section "07 Koota glyphs · South chart". Repo: `icons/filled/koota-*.svg` (currentColor) and rows in `components/icons.md`.

## Why
Icons come only from our pack, named sh-icon, in one colour that follows the row's state (muted rows dim with the text).

## Who needs to do something
- **Designers:** pick these from `sh-icon/koota-*`; the 3D `sh-icon/pictogram/koota-*` stay for the North-chart score list.
- **Developers:** SVGs in `icons/filled/`; tint with the row's icon colour.

## Checks
- [x] `python3 tools/check.py` passes
- [x] Breakdown sheet render checked; every glyph full opacity
