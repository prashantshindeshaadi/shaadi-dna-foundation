# Profile card web page on the shared parts

**2026-10-26**

## What changed

- **`sh-profile-card` web page rewritten for the card's 9 types** (Connect, Received, Post-Connect, Gated, No photo, Photo requested, Blocked, VIP, With Overlay).
  - It's built only from the parts' own markup and CSS: sh-photo-wrapper, sh-user-images, sh-overlay, sh-tag-profile, sh-icon-button, sh-profile-card-info, sh-action-island, sh-action-note, sh-button and the rest.
  - `sh-profile-card.css` now only lays the parts out: photo, top row and info inset.
  - `sh-profile-card.figma.ts` maps the new Type values and the two switches.
- **What each Type shows follows the Figma variants:**
  - Post-Connect has no details or tags.
  - Gated, No photo, Photo requested and Blocked have no trust badges.
  - No photo and Photo requested have no top row, and show the requested portrait top-aligned.
  - Blocked hides the photo count.
- **Paths updated** for `sh-action-island` and `sh-action-note`, which moved to Core today. The `sh-action-note` italic font path was fixed for its shallower folder.
- **Every component on the Profile Card page now has code** on all three platforms: sh-profile-card, sh-profile-card-info, sh-info-detail, sh-tag-profile, sh-avatar-placeholder, sh-user-images, sh-mini-card. The island and note are now Core.

## Why

The web page now uses the same parts as Compose and SwiftUI, so a fix to a part shows up everywhere.

## Notes

- **The parts are responsive.** Type sizes and the page margin change at 768 px and 1024 px (sh-typo, sh-space). On a wide screen the card's text is larger than in Figma's mobile frame, so compare at mobile width.

## Checks

- [x] `python3 tools/check.py` passes
- [x] SwiftUI: all 20 component files typecheck, 0 errors
- [x] Web: all 9 Types rendered at mobile width and compared with Figma; every stylesheet and image loads
