# Lexend-SH Italic

**2026-10-15**

## What changed

- **New font: Lexend-SH VF Italic** (`fonts/LexendSH-VF-Italic.ttf` + `.woff2`). Lexend has no italic, so this is a true oblique build of our variable font: every outline slanted 10°, same weight axis (100–900) and the same named weights — Italic 360, Medium Italic 460, Bold Italic 560, Black Italic 660. Widths match the upright, so switching a line to italic never reflows it.
- Built by `tools/make_italic.py` from `fonts/LexendSH-VF.ttf` (re-run it whenever the upright font changes). Accents, composites and variation data are slanted with the outlines; the font is flagged italic for every platform (italic angle −10°, STAT `ital` axis).
- First use: the **Pre-written message** type of `sh-action-note` ("Hey Sneha, I came across your profile…"), which is muted and italic.

## Why

Pre-written messages need to read as quoted text the member can still edit, set apart from actions like "To contact her directly — Upgrade Now".

## Who needs to do something

- **Designers:** install `LexendSH-VF-Italic.ttf` (it appears as Lexend-SH VF → Italic / Medium Italic / Bold Italic / Black Italic).
- **Web:** add the woff2 as a second `@font-face` for the same family with `font-style: italic`.
- **iOS / Android:** add the italic file next to the upright one; static italic cuts can be generated with `fontTools.varLib.instancer` if needed.

## Checks

- [x] Rendered upright vs italic at 360 / 460 / 560 / 660 — consistent slant, accents correct, identical widths
- [x] Text style `sh-typo/Body/SM/Italic` added in Figma and applied to the Pre-written message note
- [ ] `/shaadi-dna-update` to pull the new text style into the repo
