# Lexend-SH: new capital I and J

**2026-10-23**

## What changed

- New Lexend-SH files from the updated sh-typo kit. The name and version are unchanged (Lexend-SH VF, 1.009), and so are the weights, metrics and every other glyph.
- **The only change:** capital **I** and **J**, and their accented forms (Ì Í Î Ï Ĩ Ī Ĭ Į İ Ĵ Ǐ Ȉ Ȋ Ḯ Ỉ Ị), now use what were the `ss01` alternates.
  - **I** is narrower: 464 → 308 units in Regular, 520 → 329 in Bold. Lines with a capital I get slightly shorter.
  - **J** is 638 → 583 units in Regular.
- `fonts/`: the VF TTF and the 4 static TTFs (Regular, Medium, Bold, Black) were replaced from the kit.
- `LexendSH-VF.woff2` was rebuilt from the new TTF. The kit's own woff2 still had the old I and J, so it was not used.
- `LexendSH-VF-Italic.ttf` / `.woff2` were rebuilt with `tools/make_italic.py`, so the italic matches.
- `fonts/README.md` (also the kit README) has a note on the change.
- `dist/sh-typo-kit.zip` was rebuilt (`python3 tools/build.py`). Share this zip rather than the one from the kit: its web font is the new one.
- **Figma:** text styles need no change, because the family and style names are the same. Text laid out before the new font was installed keeps the old glyphs until it is laid out again. All text was re-laid out (see Checks).

## Why

The kit was updated with the new I and J. Every platform must use the same file.

## Who needs to do something

- **Designers:** replace Lexend-SH VF in Font Book with `designer/LexendSH-VF.ttf` from the new zip, then quit and reopen Figma. Figma keeps the old file while it is open, because the font name is unchanged.
- **Developers:** replace the font files (web woff2, Android `res/font`, iOS `Fonts`). No code changes.

## Checks

- [x] Every font in `fonts/` and in the kit maps I → I.ss01 and J → J.ss01
- [x] No other glyph, metric or name changed (table diff: only `cmap` and `head`)
- [x] Figma re-laid out all Lexend-SH text with the new font (2026-10-26): every page; ~7,800 text layers touched (instance texts follow their mains). 0 Lexend-SH texts left with a missing font. Not Lexend-SH, left as they are: 2 decorative "30 Days" (Satoshi Black Italic) and 3 status-bar clocks (SF Pro), both known exceptions. 40 empty text layers were skipped.
