# Button heights fixed

**2026-10-26**

## What changed

- Every `sh-button`, `sh-semantic-button` and `sh-icon-button` main is a fixed height per size: Large 48, Medium 40, Small 28 (icon button Small 32). No change was needed there.
- 13 instances had been stretched off their size. They are back to their variant's height (width unchanged):
  - `sh-fpv-footer` "Connect Now" (Large): 44 → 48
  - Foundation "View details" (Medium): 36 → 40
  - Foundation semantic button examples × 4 (Medium): 42 → 40
  - Overview "Add" × 6 and Sunil page "Add extra Contacts" (Small): 32 → 28
- 0 button instances in the file are now off their size's height.
- The `sh-overlay` Action button was already correct (Tertiary Medium, 40).

## Why

One height per button size, everywhere, so devs never see in-between sizes.

## Who needs to do something

- **Designers:** pick a button Size instead of resizing a button.

## Checks

- [x] 0 instances of `sh-button` / `sh-semantic-button` / `sh-icon-button` off their variant height
- [x] `sh-fpv-footer` renders correctly with the 48 Connect Now
