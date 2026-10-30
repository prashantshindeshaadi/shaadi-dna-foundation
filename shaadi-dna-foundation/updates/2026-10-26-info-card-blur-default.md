# Info card: dark extra-soft glass, straight translucent gradients, italic fixed

**2026-10-26**

## What changed

### Info card (`sh-profile-card-info`), common component change
- **Fill:** `sh-gradient/translucent/dark/extra-soft`, which uses `background/dark/extra-soft` from 6 % at the top (start) to 12 % at the bottom (end). So it's light at the top and darker at the bottom.
- **Blur:** `sh-background-blur/uniform/default` (16).
- **Every use follows the main:** all 29 copies have no fill or blur of their own. Copies that had them were reset, and their other changes (name, tags, details, island type, buttons, note) were kept and re-checked against the recording.
  - Five note messages now show the component default ("…It felt true to me."), which the note truncates on screen. Before, they had a hand-trimmed "…It felt true...".
  - The Connected card's note link is back to the gold Premium "Upgrade Now".

### Translucent background styles
- All 12 `sh-gradient/translucent/{light, dark, brand}/*` background styles now run **straight top to bottom** (they were diagonal). The stops are unchanged: start at the top, end at the bottom.
  - `dark/soft` is back to its original stops, 28 % → 14 % (a reversal made earlier today is undone).
- The `translucent/border/*` styles are not touched; `border/dark` keeps its original diagonal.

### Italic
- `sh-typo/Body/SM/Italic` rendered upright. Its font family was bound to the `body/sm/default/font` variable, which carries only the family name, so it forced Regular. The family is unbound on this one style (size, line height, letter spacing and paragraph spacing stay bound), and the font is Lexend-SH VF Italic. All 134 texts using it render italic (the pre-written notes, "Hey Sneha, …").
- The italic font is already installed; there's nothing to share.

## Why

One glass look for the info box, inherited everywhere. The translucent fills read straight, light to dark. The pre-written message must read as italic.

## Who needs to do something

- **Developers:** info box = `translucent/dark/extra-soft` at `180deg` (6 % → 12 %), `backdrop-filter: blur(16px)`. All translucent background gradients are `180deg`. Bring the style changes in at the next `/shaadi-dna-update`.
- **Designers:** don't bind the font family on `sh-typo/Body/SM/Italic`; binding it removes the italic.

## Checks

- [x] 29 / 29 info copies inherit dark/extra-soft + uniform/default
- [x] 12 translucent background styles straight top to bottom; border styles unchanged
- [x] 134 / 134 Italic-style texts render italic
