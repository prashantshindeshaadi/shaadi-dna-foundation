# sh-button: sublabel at full opacity

**2026-10-26**

## What changed

- **Common component change:** the `Sublabel` in every `sh-button` variant is now at full opacity (`sh-opacity/full`). Before, every type except Secondary was at `sh-opacity/strong` (64 %).
- This matches Secondary, which was already at full opacity with its own colour, `button/secondary/text/subtext`.
- The colours are unchanged. Primary, Tertiary, Ghost and both Premium types use their label colour token; Disabled uses `text/disabled`.
- 108 variants were updated. No instance overrides the sublabel opacity.
- The `sh-button` blueprint now describes the sublabel.
- **Noticed, not changed:** Premium Soft / Loading uses `button/primary/text/default` for the label and sublabel, not `premium/text/on-soft`.

## Why

At 64 %, the sublabel was too faint on the solid and tinted buttons. It should read like Secondary's.

## Who needs to do something

- **Developers:** the sublabel has no opacity. Use the label colour, or `button/secondary/text/subtext` on Secondary.

## Checks

- [x] 108 / 108 sublabels bound to `sh-opacity/full`
- [x] Primary, Secondary and Tertiary with a sublabel render correctly
