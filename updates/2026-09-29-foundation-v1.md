# Foundation v1.0

**2026-09-29**

## What changed

- **Typeface is now Lexend-SH**, our own build of Lexend, replacing Satoshi.
  The accent font (Erode) is gone, so the product runs on one typeface.
- **Font weights are custom:** 360 regular, 480 medium, 600 bold, 720 black.
  Lexend runs heavier than Satoshi at the same numbers, so each step is dialled
  back to keep the same optical weight.
- **Five body line heights went up** because Lexend's lowercase is taller and
  the tight variants had become cramped.
- **Tracking retuned across the board.** Body tracking is now 0, and display
  tracking changes by breakpoint so it stays at −2% at every size.
- **Button labels moved to medium (480)** with title tracking.
- **25 colour combinations that failed accessibility now pass.** Mostly the
  hover and pressed states on status messages, Premium and buttons, where the
  text used to fade into its own background when tapped.
- **Added `text/on-brand` and `icon/on-brand`.** The old advice was to use
  `text/inverse` on brand surfaces, which turned dark navy in dark mode and was
  nearly unreadable.
- **Raw palette colours are hidden** from Figma's pickers, so nobody can reach
  past the semantic tokens by accident.
- **Icon sizes 28 and 32 removed.** Icons are 12 to 24; anything bigger is a
  pictogram.

## Why

Two separate pushes. The typeface change came out of a review with Anupam and
the feedback that followed. The accessibility work came from an audit that
measured every foreground and background pairing against WCAG AA, rather than
trusting that they looked fine.

## Who needs to do something

- **Designers:** install Lexend-SH, then pull the updated library.
- **Web:** rebuild. Values flow through the CSS variables, but load the new font
  and declare the weight range, or the custom weights won't render.
- **Android and iOS:** re-copy `dist/`, add the font files to the bundle.

## Checks

- [x] `python3 tools/check.py` passes — 64 pairings, 0 failures
- [x] `python3 tools/build.py` run
- [x] FOUNDATION.md updated
