# Locked profile card: the photo shows through again

**2026-10-26**

## What changed

- On `sh-profile-card` Type=Locked, the photo behind the lock overlay showed as a flat grey or white surface. Cause: two background blurs were stacked. The photo was `sh-user-images` **Style=Blur** (its own blur layer), and `sh-overlay` (Photo · Message) adds its own scrim and strong blur on top. Together they washed the photo out.
- Fix: the Locked card now uses the photo's **Style=Normal**, and the overlay does the blurring alone. This was applied in the Locked main (Female 6) and in its example card (Female 8). These were the only 2 places in the file where an overlay sat on a Blur photo.
- `sh-overlay` itself is unchanged: scrim `overlay/scrim/default` at 60 % + `sh-background-blur/uniform/strong`.

## Why

Overlays are meant to show the photo behind, blurred, not hide it.

## Who needs to do something

- **Designers:** under an `sh-overlay`, use the Normal photo. The overlay brings its own blur. Use Style=Blur only when nothing else blurs the photo.

## Checks

- [x] 0 overlays sitting on a Style=Blur photo
- [x] The Locked main and example render with the blurred photo behind the message
