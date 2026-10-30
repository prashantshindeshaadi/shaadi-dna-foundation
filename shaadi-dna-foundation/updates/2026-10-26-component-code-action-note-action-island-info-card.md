# Component code: action note, action island, info card; profile card compiles

**2026-10-26**

## What changed

- **Web, Compose and SwiftUI code, with Code Connect files**, for:
  - `sh-action-note`: CTA Edit / Upgrade × Style Normal / Floating.
  - `sh-action-island`: all 8 Types × Normal / Floating.
  - `sh-profile-card-info`: name, age, badges, Online / Offline status, verified badge, detail rows, tags, divider and the island slot.
- **The profile card's SwiftUI and Compose code now builds on these parts.** It covers the card's 9 types: Connect, Received, Post-Connect, Gated, No photo, Photo requested, Blocked, VIP, With Overlay.
  - SwiftUI: all 17 component files typecheck together with 0 errors.
  - Compose: not compiled (no Kotlin toolchain on this Mac).

## Still in progress

- `sh-avatar`, `sh-avatar-glyph` and `sh-mini-card` (builder running).
- The profile card's web page.

## Who needs to do something

- **Web / Android / iOS:** the profile card and its parts can be used now on Compose and SwiftUI. Bundle `fonts/LexendSH-VF-Italic` for the italic pre-written note.

## Figma inconsistencies found (not changed)

- **Floating glass:** the floating note and island surfaces have no background blur. FOUNDATION §5.7 says glass is fill + edge + blur.
- **Island sizing:** it differs between Normal and Floating (message hug vs fill; one Primary action hug).
- **Broken sublayer:** `sh-profile-card-info` has a broken layer in its Actions / Note / Link slot. Exporting it from Figma fails.
- **Floating text in Dark mode:** it uses `text/primary` and `text/secondary` on light glass, so it turns light on white in Dark mode (FOUNDATION §10, the open "text on glass" decision).
- **Missing link colour option:** `sh-text-link` has no colour override, but the island recolours "Upgrade Now" gold. The code does the same. A link colour option would be cleaner.

## Checks

- [x] `python3 tools/check.py` passes
- [x] SwiftUI typecheck: 17 files, 0 errors
- [x] Web previews checked against Figma (island, note)
