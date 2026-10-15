# Foundation v1.1: Lexend-SH 1.009, gradients, glass and radius roles

**2026-10-14**

## What changed

**Typeface (Lexend-SH 1.009)**
- Weights recalibrated: Medium 480 → 460, Bold 600 → 560, Black 720 → 660. Regular stays 360.
- Every glyph moved up 30 units (3% of the size) so text sits centred in its line box. Line heights are unchanged.
- Display now uses Black. Headings and all Button sizes use Bold (buttons were Medium).
- New `fonts/LexendSH-VF.woff2` for the web, committed next to the TTFs.
- Weight descriptions rewritten to match how the styles use them.

**Colour**
- New: `text/on-image` and `icon/on-image` for content on photos, `sia/top-match/start|middle|end`, `button/secondary/text/subtext`.
- Overlay gradients simplified: `overlay/image/content-top/*` and `content-bottom/*` → one `overlay/image/content/start|end`.
- `overlay/scrim/default` is navy (`#0F172A`) instead of black, same opacity.
- Status text and icons on soft backgrounds, Light, one step lighter: success green/600 → 500, information blue/600 → 500, error red/700 → 600. On the soft pressed background these are below AA; accepted as a known gap (FOUNDATION §10), reported as warnings by `check.py`.

- Palette grew: new `purple/*` and `mint/*` scales (25–900), plus `vivid` steps for green, blue, premium, mint and purple.
- New `indicator/*` colours for tier marks: `success`, `premium`, `diamond`, `platinum`, `private`. Bright marks held to 3:1, used beside a label, never as text.

**Glass (`sh-translucent`)**
- Rebuilt: `background/{light,dark,brand}/{extra-soft,soft,default,strong}/start|end`, `border/{light,dark,brand}/start|middle|end`, `background/blur/*`. Replaces `surface/*` and `blur/background/*`.
- One mode instead of Light/Dark: pick light or dark glass by what's underneath.
- `border/light` retuned: middle 18% → 0%, end 8% → 50%.

**Radius**
- Role tokens added: `button`, `avatar`, `chip`, `tag`, `tooltip`, `input`, `card`, `media`, `sheet`, `hero`. New step `xxl`; `xl` 24 → 20.
- Chips, tags and tooltips are now `xs` (were `full`); inputs `md` (were `sm`); cards `lg` (were `md`); sheets `xl` (were `lg`).

**Gradients (`sh-gradient`) — new in the repo**
- All 30 `sh-gradient/*` colour styles now live in `tokens/sh-gradient.json`: sia (soft, top-match, solid), overlay (bottom, top, scrim, wash), brand (default, border, hover, pressed), premium (default, soft, hover, pressed), translucent (light, dark, brand × 4 levels, plus 3 borders).
- Every stop points to a colour token, so the styles theme with Light/Dark in code: `var(--sh-gradient-*)` on web, `@drawable/sh_gradient_*` on Android, `SH.Gradient.*` on iOS.
- Known: `sia/top-match` still uses raw colours (not bound to the `sia/top-match/*` tokens) and has no Android drawable (4 stops). `overlay/scrim` applies 60% layer opacity on top of a token that is already semi-transparent.

**Space and icons**
- Space step `14` added.
- Icon strokes retuned for 16 / 20 / 24. `pictogram/size/96` and `brand/size/32` added.

**Repo**
- Removed the `features/` and `code-connect/` placeholders and two index files that repeated other docs. Code Connect steps now live in the `/shaadi-code-connect` skill.
- `build.py` now also makes the shareable type kit (`dist/sh-typo-kit.zip`), and its iOS output compiles.
- Disabled state documented as the Default look at `sh-opacity/disabled`.

## Why

The typeface was recalibrated after review: Lexend runs heavy, and the glyphs
sat low in their line boxes. Glass and radius moved from a few generic tokens
to named roles, so the same component gets the same corner and the same glass
everywhere. The repo was trimmed so each fact lives in exactly one file.

## Who needs to do something

- **Designers:** install the new `LexendSH-VF.ttf` (remove the old one first), pull the updated library. Swap any old overlay or glass variables for the new ones.
- **Web:** use `fonts/LexendSH-VF.woff2` and rebuild. Replace `--sh-translucent-surface-*`, `--sh-translucent-blur-background-*` and `--sh-overlay-image-content-top/bottom-*`.
- **Android / iOS:** re-copy `dist/`, swap in the new fonts, and use the kit's `ShTypography` for text styles.

## Checks
- [x] `python3 tools/check.py` passes (3 accepted contrast gaps reported as warnings)
- [x] `python3 tools/build.py` run
- [x] FOUNDATION.md updated
