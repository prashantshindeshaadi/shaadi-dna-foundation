# All text on local sh-typo styles, Lexend-SH only

**2026-10-23**

## What changed

- **Remote styles replaced.** About 3,000 text layers across the file used *remote* text styles from Daren's and older libraries. Those had the same names as ours (`sh-typo/Body/MD/Default`, `Heading/SM` …) but were set in Satoshi, Satoshi 2 or Roboto. Every one now uses the **local** `sh-typo` style:
  - matched by name first, including case and older variants (`body/SM`, `label/default`, `helper-text` → `Support/Meta`);
  - otherwise matched by size and weight.
  - Main components were fixed first, so instances follow; overrides inside instances were re-pointed too.
  - Counts: FPV 835, Sunil Navigation / Payment / Account 183, Overview 61, Foundation 1.
- **Unstyled text styled.** 1,102 text layers with no style (Satoshi, Geist on Foundation docs, Inter labels on Shaadi Icons / FPV captions, Erode, plain Lexend-SH) now use the nearest `sh-typo` style. Sizes: Display only from 36 px; Button styles only inside buttons / CTAs.
- **New text style `sh-typo/Body/SM/Italic`:** a copy of Body/SM/Default (bound to `body/sm/default/size`, `line-height`, `letter-spacing`, `paragraph-spacing` and `font` variables) in Lexend-SH VF Italic, placed after Body/SM/Loose. It is used by the pre-written note in `sh-action-note` (4 masters); every instance follows (112 texts, 83 on FPV).
- **Forced Satoshi words fixed.** 3 texts had a local style with a Satoshi word forced inside; the style font is re-applied.
- **Result:** 0 remote text styles left in the file. Every visible text is Lexend-SH on a local `sh-typo` style, except:
  - **Decorative "30 Days" / "2"** (≈ 12, Satoshi Black Italic in plan artwork and Sunil's old-design side): left as they are.
  - **OS status-bar clocks** (13: "9:30" / "9:41" in SF Pro / Roboto). Device chrome, kept in the system font.
  - **1 Marathi string** ("आमची मुंबई", Poppins). Lexend-SH may not have Devanagari glyphs.
  - **78 texts** inside old remote library instances in Sunil's "Compare — old vs new" frame (the "old" side). They are already Lexend-SH, but the remote component resets any style set on them.

## Why

Text styles must come from the DNA file so the in-house Lexend-SH font and its token values reach every screen and developers get one source.

## Who needs to do something

- **Designers:** use `sh-typo/Body/SM/Italic` for pre-written / quoted messages.
- **Repo:** the new style reaches `tokens/` and `dist/` at the next `/shaadi-dna-update` export (never edit them by hand).
- **Developers:** nothing; style names are unchanged.

## Checks

- [x] 0 texts on remote text styles
- [x] Every visible text is Lexend-SH on a local `sh-typo` style, except the listed exceptions
