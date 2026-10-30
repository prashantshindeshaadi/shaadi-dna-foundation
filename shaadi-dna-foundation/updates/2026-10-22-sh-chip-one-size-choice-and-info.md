# sh-chip: one size, Choice and Info

**2026-10-22**

## What changed

- **Common component change: `sh-chip` has one size, 32 tall.** The `Size` property is gone (Small 28 / Medium / Large 58 → one size), and the set went from 33 to 11 variants.
  - **Type=Choice** is the base: a selectable chip, 10 variants (State Default / Hover / Pressed / Focus / Disabled × Selected false / true). It was a fixed 38 tall; it now hugs to 32 with `sh-space` 6 top and bottom and 12 left and right. Text is `sh-typo/Body/MD/Default`, icons are 16, and the focus ring follows the chip at 40.
  - **Type=Info** is the read-only fact chip: 1 variant, one state, `border/soft`, 6 / 12 / 6 / 8 padding. **Supporting text is now on by default** (small `sh-typo/Support/Label` line above the label, 48 tall), so Info reads differently from Choice. Turn `Show supporting label` off for a one-line 32 chip.
  - Choice no longer has a supporting label: it is a single-line control.
  - Existing chips are unchanged: no chip used supporting text, so all 96 Info chips keep it off. 20 of them had the default value and would have flipped on, so they were pinned off explicitly.
- **Icon colour:** in the normal states, the icon is `icon/secondary` on both types. A selected Choice uses `icon/brand` with its brand label; Disabled uses `icon/disabled`.
- **Icon slots merged:** the six per-size swaps (`Leading icon (Small / Medium / Large)`, same for Trailing) are now one `Leading icon` and one `Trailing icon`.
- **Where Small and Large were used:**
  - Large: nowhere (0 uses).
  - Small: 63 chips moved to the one size with their icons kept (106 icons carried over at 16):
    - Choice 42: Foundation 32, Sunil Navigation / Account page 6, Utility Page Header 4.
    - Info 21: Sunil page 10 + `sh-account-header` 2, Core Component 3, Overview 2, `sh-fpv-compatibility` 4.
  - These chips grow from 28 to 32, and their text goes from Body SM to Body MD.
- **Fixed:** 5 Choice chips on Overview ("My son", "My brother" …) had their label overridden to 16 / 24 text, which made them 36 tall. They now use the chip's own style.
- **Layout:** variants are ordered Choice (unselected row, selected row), then Info, with states left to right.
- All 156 chips in the file are now 32 tall.

## Why

One chip size keeps the library minimal. Choice and Info cover every case: a pick-able option, or a fact.

## Who needs to do something

- **Designers:** re-check the Sunil Navigation / Account filters and the account header (chips are 4 px taller with bigger text).
- **Developers:** at the next blueprint sync, drop `Size` from `sh-chip`. `Leading icon (…)` / `Trailing icon (…)` become `Leading icon` / `Trailing icon`.

## Checks

- [x] 0 chips on Small or Large before those variants were deleted
- [x] 156 / 156 chip instances are 32 tall
- [x] Normal-state icons `icon/secondary`; selected `icon/brand`; disabled `icon/disabled`
- [ ] Choice chips are 32 tall: the 48 × 48 tap area needs the hit-area pattern (open item)
