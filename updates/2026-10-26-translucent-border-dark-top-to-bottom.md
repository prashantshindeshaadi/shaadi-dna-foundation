# sh-gradient/translucent/border/dark: top to bottom

**2026-10-26**

## What changed

- The `sh-gradient/translucent/border/dark` paint style is now vertical, top to bottom. It was diagonal, top-left to bottom-right. The stops and their tokens are unchanged: `border/dark/start` → `middle` → `end`.
- Its description now reads: "Dark translucent fill for glass cards over photos (the profile card info box), strongest at the top and fading down."
- Only this style changed. The other dark translucent styles (`translucent/dark/default`, `soft`, `extra-soft`, `strong`) keep their angle.
- Used by 1 layer: the `sh-profile-card-info` fill, so every profile card's info box follows.

## Why

The glass info box reads cleaner with a straight top-to-bottom fade.

## Who needs to do something

- **Developers:** this gradient goes top to bottom (`linear-gradient(180deg, …)`). Bring it in at the next `/shaadi-dna-update` export.

## Checks

- [x] Style direction is top to bottom; stops still bound to tokens
- [x] The profile card info box renders correctly

## Reverted (same day)

- That edit was made on the wrong style. The info box should use the translucent **dark** background, not the dark **border**. `sh-gradient/translucent/border/dark` is back to its original diagonal (top-left → bottom-right) and its original description ("Dark glass edge, for translucent surfaces over light imagery"). See "Info card: dark soft glass, light at the top, default blur".
