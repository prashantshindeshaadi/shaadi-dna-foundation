# Foundation token sheets: purple, mint, vivid; type specs show real weights

**2026-10-28**

## What changed
- Figma Foundation page, Color/Tokens-Light and Color/Tokens-Dark: new **purple (Private tier)** and **mint (Diamond tier)** rows, plus the **vivid** swatches (premium, green, blue, purple, mint) and **neutral/transparent**. Info column notes for Purple, Mint and Vivid.
- Every hex label is now read from the live `sh-color-basic` variables: 18 were stale, mostly the 25 steps, which carry 64% alpha. 16 swatches that weren't bound to their variable are now bound.
- Typography sheets (both copies): every spec line is regenerated from its sh-typo style and shows the real font and weight, e.g. "Lexend-SH VF 660 · 40px · LH: 50px · LS: -0.8px", instead of the old names (Black, Bold, Medium). Two lines were wrong before: Heading LG said Black (it is 560), and the Buttons said Medium (they are 560).
- A one-page marketing brand style guide (colours, gradients, type, do/don't) was published as a shareable page, built from these tokens.

## Why
The sheets didn't show the tier colours added on 2026-10-19, and the type specs still used the weight names from before the variable-font kit.

## Who needs to do something
- **Designers:** nothing; docs only.
- **Developers:** nothing; no token values changed.

## Checks
- [x] Renders checked: both colour sheets, no overlap with neighbouring sheets
