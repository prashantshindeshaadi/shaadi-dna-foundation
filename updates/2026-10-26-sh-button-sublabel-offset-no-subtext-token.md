# sh-button: sublabel offset, one text colour, subtext token removed

**2026-10-26**

## What changed

- **Common component change:** in every `sh-button` variant (Large, Medium and Small, all Types and States, 108 in total), the label wrapper keeps the label's height (24 / 20 / 16), with **gap -2** and centred content. Turning the sublabel on lifts the label slightly and sets the supporting text below it, without changing the button height (48 / 40 / 32). This follows Prashant's sample button.
- **One colour:** the sublabel now uses the same colour token as the label on every type. Secondary used `button/secondary/text/subtext`.
- **Token removed:** `sh-color-common` `button/secondary/text/subtext` had 0 uses and no aliases, and was deleted in Figma. `tokens/` and `dist/` pick this up at the next `/shaadi-dna-update` export.
- The `sh-button` blueprint describes the new sublabel rule.

### Optical offset (follow-up)
- With the sublabel on, the label and sublabel stack sat exactly centred and looked top-heavy. In every variant the sublabel now sits in a small `Sublabel` frame with `sh-space/2` bottom padding, and the frame's visibility is bound to `Show sublabel`. With the sublabel on, the stack lifts 1 px and leaves a little more space at the bottom, matching Prashant's sample: Large 6 above / 8 below, Medium 4 / 6, Small 2 / 4. Label-only buttons are unchanged (12/12, 10/10, 8/8).
- This replaces Prashant's absolute-position hack, which would stop the button growing with its label.
- While the property was being rewired, `Show sublabel` briefly defaulted to on and every button showed "Supporting text". It is back to off; only the 10 buttons that use a sublabel show one (VIP "VIP Managed Profile", "₹945 for 3 months", and test buttons).

### Sublabel opacity
- The `Sublabel` frame is now at `sh-opacity/extra-strong` (88 %), in all 108 variants. The text keeps the label's colour token, and the 88 % softens it slightly against the label. No copy overrides it.

## Why

The supporting text sits inside the button's fixed height, and one colour per button keeps the token set smaller.

## Who needs to do something

- **Developers:** sublabel is the same colour as the label. Label and sublabel stack with -2 px spacing, centred in the button's height. Drop `--sh-button-secondary-text-subtext` after the next token export.

## Checks

- [x] 108 / 108 variants: gap -2, wrapper at the label's height, sublabel colour = label colour
- [x] Large, Medium and Small render with the sublabel on (Primary, Secondary, Tertiary, Premium)
- [x] 0 uses of the removed token before deletion
- [x] Offset measured on all sizes; `Show sublabel` default off; 10 / 951 buttons show a sublabel
