# sh-mini-card: No photo female and male, 1:1 placeholder

**2026-10-28**

## What changed
- `sh-mini-card` Type is now **Default · No photo female · No photo male** (was Default · No photo; existing No photo cards became No photo female).
- The No photo avatar holds `sh-avatar-placeholder` 1:1 (female or male) filling the 94 Media, the same head crop as the "No Photo Case" design. Before, it was a hand-placed crop of the tall sh-user-images portrait.
- Code: web, Compose and SwiftUI use the placeholder. Types are `NoPhotoFemale` / `NoPhotoMale` (`.noPhotoFemale` / `.noPhotoMale`), and the `requestedPortrait` parameter is gone.

## Why
The mini card showed a cropped piece of the tall art, not the 1:1 head crop, and had no male version.

## Who needs to do something
- **Designers:** pick No photo female or No photo male.
- **Web / Android / iOS:** replace `NoPhoto` with the female or male type; drop `requestedPortrait`.

## Checks
- [x] Figma render: Default, No photo female, No photo male
- [x] `python3 tools/check.py` passes, Swift typecheck clean
