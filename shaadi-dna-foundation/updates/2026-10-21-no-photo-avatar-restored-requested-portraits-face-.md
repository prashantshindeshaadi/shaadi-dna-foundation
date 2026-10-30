# No photo avatar restored, requested portraits face-centred

**2026-10-21**

## What changed

- **No photo shows the silhouette again.** `sh-overlay` Type=No photo uses `sh-avatar-placeholder` Gender=Female, 1:1 (the "No Photo Avatar") again. On 2026-10-20 it had picked up the "Female requested" portrait by mistake.
  - The Avatar swap property defaults to the silhouette.
  - The hidden avatar on Photo requested keeps the requested art. It is no longer tied to the swap property, so it can't change the No photo avatar.
  - Fixed instances: the profile card No photo variant, its example on the page, and one more instance.
- **Requested portraits are composed with the face at the centre.** In `sh-user-images` Gender=Female requested and Gender=Male requested, the face now sits in the middle of the image.
  - Before, the hair was about 22 px from the top edge.
  - The scale is the same as before. The image's own flat background was extended above the head with a soft fade, so no new colours were added.
  - FPV `sh-fpv-photo-overlay` Photo requested updates with it.
- **Profile card, Photo requested:** the card's photo uses a crop (scaled 1.36 from the bottom). This puts the face in the middle of the photo area above the info card, instead of half under it.
- **Code follows Figma** (web, Compose, SwiftUI):
  - No photo has the 160 silhouette slot, with 12 between slot and title and 8 to the action.
  - Photo requested keeps an empty 160 slot, so the text stays in the same place.
  - The overlay title, status and action carry `sh-shadow/default`.
  - The requested photo uses the same 1.36 crop from the bottom.
- **New assets:**
  - `sh-avatar-placeholder/assets/`: `female-1x1` and `male-1x1`, as SVG for web and @3x PNG for Android and iOS.
  - `sh-user-images/assets/`: `requested-female.jpg` and `requested-male.jpg`.
  - The blueprints link them on their **Code** line.

## Why

"No photo" must show the empty silhouette, not a portrait. The requested portraits sat so high that the head touched the top edge, in the card and in FPV.

## Who needs to do something

- **Designers:** nothing. Everything that uses these components updates.
- **Web:** nothing extra; the HTML uses the new assets.
- **Android / iOS:**
  - Add `female-1x1@3x.png` as `sh_avatar_placeholder_female_1x1` (Android) or `sh-avatar-placeholder/female-1x1` (iOS).
  - Pass `requested-female.jpg` or `requested-male.jpg` as `requestedPortrait`.

## Checks

- [x] `python3 tools/check.py` passes
- [x] Figma: No photo, Photo requested (card), FPV Photo requested and sh-overlay checked by screenshot
- [x] Web renders No photo and Photo requested (headless Chrome)
- [x] SwiftUI type-checks
