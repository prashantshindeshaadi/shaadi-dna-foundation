# Overlay merge, sheet screens, icon stroke rhythm

**2026-10-22**

## What changed

### One overlay component
- **Common component change: `sh-overlay` has a new Surface, "Photo full".** It is Daren's full-height FPV gate (360 × 520) in three types:
  - Message: icon at 128, message at 180, then the action.
  - No photo / Photo requested: the soft portrait (`sh-user-images` Female requested) fills the area, and the message sits at 180.
  - Same props as the card overlay: Message / Title, Icon, Action, Show message, Show action.
  - The card's Surface=Photo variants are unchanged.
- **`sh-fpv-photo-area`:** every gate now turns on the overlay already built into `sh-photo-wrapper` (Show overlay) and sets it to Photo full. The hand-built `Overlay` frames were deleted, so there is no hidden duplicate overlay any more.
  - The area's own `Message`, `Show message` and `Show action` props were removed. Edit the message and action on the overlay instead.
  - The wrapper's `Overlay` is now exposed in its panel, like `Photo image`, so card uses see it too.
  - The gate icon stays `sh-icon/photo-locked` at 40, colour unchanged.
  - Each screen kept its own message: Upgrade "She has shared Photos with Premium Members", Tit for tat "Add your own Photo to see Meher's", No photo "No Photo added yet". 6 hidden message / action states also carried over.
  - The text now sits at 180 on every gate; No photo was at 188 and Photo requested at 212.
  - The text uses the overlay's tokens (`text/on-image` with its soft shadow, `background/blur/strong`) instead of the old frame's `text/inverse` and medium blur.

### Sheet screens on FPV
- 15 screens with a bottom sheet (trust markers, phone number, manage boundaries, connect limit) had their status bar twice (inside `sh-app-header` + an extra `sh-status-bar`) and a hand-made 60 % dim, while the sheet's own `Scrim` was hidden. Connect limit was dimmed twice.
- Now each screen has one status bar (the header's), and the dim is the `sh-bottom-sheet` `Scrim` with the background blur set in the main component. 16 extra status bars were deleted, 16 hand dims cleared, and 17 sheet scrims turned back on.

### Icon stroke rhythm (`sh-icon/stroke`: 24 → 1.6, 20 → 1.4, 16 → 1.3, 14 → 1.2, 12 → 1)
- Masters: 1,601 of 1,607 stroked glyphs are bound to their own size's token. The exceptions:
  - `sh-icon/check` Line is deliberately one step heavier (it matches button label stems).
  - The Paytm brand art has no stroke token.
- Instances: 6,315 line icons now use their own size's stroke.
  - 409 icons shown at a different size than their variant (for example a 14 squeezed into a 12 slot, or arrows 12 shown at 16) were swapped to the matching Size variant.
  - Colour was checked before and after every swap: 0 colours changed.
  - 1 raw stroke was bound to its token.
  - Left: 3 icons shown at 40 (`user-block` × 2 in the boundaries sheet / Media, `camera-off` in the overlay master); there is no 40 variant.

### Astro icons from the pack
- `sh-fpv-astro-sheet-summary`: the hand-drawn crown → `sh-icon/premium` Filled 16, colour `icon/brand` (unchanged).
- `sh-fpv-astro-sheet-privacy`: the hand-drawn shield → `sh-icon/shield-check` Line 16, colour `semantic/success/icon/on-soft` (unchanged), stroke on the 16 token.


### Pasted icons replaced with the pack (FPV masters)
- `sh-fpv-compatibility` (both versions): the tabler rings → `sh-icon/link-rings` and the Astro cue orbit → `sh-icon/astro`, both Line Size=14 (set to 14 by Prashant to match the cue text).
- `sh-fpv-you-and-her`: 6 Hugeicons circle-check copies → `sh-icon/check` Filled 24 (check is always Filled).
- `sh-fpv-lifestyle`: the pasted "document-validation" → new **`sh-icon/document-validation`** (Hugeicons DocumentValidation, Line and Filled 24–12, stroke tokens), Line 20.
- `sh-fpv-app-header` and `sh-fpv-album-view`: Material arrow_back → `sh-icon/back` Line 24 (the 32 tap container is kept).
- `sh-fpv-footer-sealed`: the 10 px pasted bubble → `sh-icon/chat-bubble` Line 12.
- Every new instance keeps the old icon's colour token. No masters on the FPV page have pasted icons left.
- Still pasted: the "Scroll States" section (Daren's 3-screen flow pasted as is, 75 of his library widgets). It needs a rebuild on the DNA FPV components rather than icon patches.

## Why

One overlay component instead of two systems. Sheet screens must not repeat the status bar or the dim. Every icon follows the new stroke rhythm without any colour drift.

## Who needs to do something

- **Pratik:** `sh-photo-wrapper` now shows `Overlay` in its panel, and `sh-overlay` has the new Photo full surface; the card variants are unchanged.
- **Developers:** `sh-overlay` gets `Surface="Photo full"`; `sh-fpv-photo-area` loses `Message` / `Show message` / `Show action` (use the overlay's).

## Checks

- [x] Every gate renders like before, with the text at 180
- [x] 15 / 15 sheet screens: 1 status bar, sheet scrim on, no hand dim
- [x] 0 line icons off their stroke token; 0 colour changes from swaps
