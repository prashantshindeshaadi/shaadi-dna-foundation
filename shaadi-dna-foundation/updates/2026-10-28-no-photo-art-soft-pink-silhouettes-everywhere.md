# No-photo art: soft pink silhouettes everywhere

**2026-10-28**

## What changed
- New no-photo art from the "No Photo Case" design: a soft pink-to-purple silhouette (female and male) replaces the blurred AI portraits.
- `sh-user-images` Gender=Female requested / Male requested (Normal and Blur) use the new art, filling the frame.
- `sh-avatar-placeholder` now has 4 variants: **Gender Female · Male × Aspect Ratio 1:1 · 4:5**, all using the new art. The 1:1 crop matches the design's head crop; the 4:5 is a tall crop.
- The 4 old grey silhouette variants left the set. A copy is kept on the Utility page as `_backup/sh-avatar-placeholder-silhouette` (not published). The old "Female requested" / "Male requested" values were renamed to Female / Male.
- `sh-profile-card` Type=No photo and Type=Photo requested show the new tall art, with the photo scrims off (the art has its own dark base), as in the design.
- `sh-overlay` Surface=Photo full, Type=No photo and Photo requested: the title moved down (top padding 208) so it sits below the silhouette instead of on its chin.
- FPV page: `sh-fpv-photo-area` Gate=No photo now says "No Photo added yet", and Gate=Photo requested says "Photo request sent". Before, both said "Connect with Meher to see her photos". The FPV image swatches use the new art too.
- `sh-mini-card` Type=No photo and every FPV screen with no photo pick the new art up automatically.
- Code: `sh-avatar-placeholder` web, Compose and SwiftUI now take Gender Male / Female only, and one JPG per variant (`<gender>-<ratio>@3x.jpg`). The SVG/PNG silhouettes are gone. `sh-user-images` `requested-female.jpg` / `requested-male.jpg` were replaced with the new art.

## Why
The blurred AI portraits looked like a real person and the grey silhouettes looked dated. The new design uses one soft brand-tinted silhouette for every no-photo case.

## Who needs to do something
- **Designers:** pull the updated library. Use sh-avatar-placeholder Gender=Female / Male; "Female requested" is now "Female".
- **Web:** swap to the new asset names (`female-1x1@3x.jpg` etc.); `sh-avatar-placeholder--female-requested` / `--male-requested` classes are gone.
- **Android / iOS:** `ShAvatarPlaceholderGender` is now Male / Female only; re-copy the four JPGs.

## Checks
- [x] Renders checked: profile cards, mini card, sh-overlay, FPV photo area and section 09 screens
- [x] `python3 tools/check.py` passes
