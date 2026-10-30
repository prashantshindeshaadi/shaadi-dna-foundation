# Component code: avatar, avatar glyph, mini card

**2026-10-26**

## What changed

- **Web, Compose and SwiftUI code, with Code Connect files**, for:
  - `sh-avatar-glyph`: Male / Female × 16 / 24 / 40. SVG assets are in its `assets/` folder.
  - `sh-avatar`: sm / md / lg × Image / Initial / Icon, with the ring and the Media inset.
  - `sh-mini-card`: Default / No photo; name, verified and premium badges, up to 3 facts, and the Connect Now button. The No photo version crops the requested portrait as in Figma.
- **Every component on the Profile Card page now has code**, as do the core parts the card uses.
- **SwiftUI:** all 20 component files typecheck together with 0 errors.
- **Compose:** not compiled (no Kotlin toolchain on this Mac).

## Still in progress

- The profile card's web page.

## Figma inconsistencies found (not changed)

- **Wrong glyph variant:** `sh-avatar` Type=Icon uses the 24 glyph resized to 16 and 40, pinned top-left, so it doesn't scale. It should swap to the 16 / 40 variants. The code uses the matching size.
- **Unbound sizes:** the `sh-avatar` lg size and the ring weight aren't bound to tokens.
- **Detached frame:** the `sh-mini-card` No photo avatar repeats `sh-avatar` by hand instead of using an instance.
- **Card radius:** the `sh-mini-card` radius is `sh-radius/md`. FOUNDATION says cards use the `card` role token.
- **Trailing dot:** turning off "Show detail 3" in Figma leaves a dot after detail 2. Code drops it.

## Checks

- [x] `python3 tools/check.py` passes
- [x] SwiftUI typecheck: 20 files, 0 errors
- [x] Web previews checked; the mini card matches the Figma screenshot
