# No-photo placeholder is muted grey and editable

**2026-10-29**

## What changed
- **Grey, not pink.** The no-photo silhouette is now muted grey (DNA neutral tokens) instead of soft pink, following Prashant's grey example.
- **New `sh-avatar-silhouette`** (Gender Female · Male): the Women and Men vector art, kept as the source. White, soft-edged, works on any background.
- **`sh-avatar-placeholder` is editable** instead of a flat image:
  - **Background**: gradient on `neutral/300` → `neutral/400`; the Full one runs on through `neutral/600` → `neutral/800`.
  - **Silhouette**: `sh-avatar-silhouette` at `sh-opacity/strong`.
  - Change either layer without redrawing the other.
- **New Aspect Ratio = Full** (360 × 520) for the full photo slot. The silhouette sits near the top, so the sh-overlay title and button fit below it on the darker part.
- **`sh-overlay`** Photo full · No photo / Photo requested: the placeholder behind them is now `sh-avatar-placeholder` Full.
- **`sh-user-images`** Photo requested (Female, Male; Normal and Blur): the image is a flattened export of `sh-avatar-placeholder` Full.
- **Pink removed everywhere it was used:**
  - 5 profile-card photos that had the pink image set by hand were reset.
  - 4 loose pink images in FPV "B · Photos" were replaced with `sh-avatar-placeholder` instances.
  - The Utility backups and the example image were left as they are.
- **Assets:** `sh-avatar-placeholder/assets/*-{1x1,4x5,full}@3x.jpg` and `sh-user-images/assets/requested-*.jpg` re-exported in grey.
- **Code:** web, Compose and SwiftUI gained Aspect Ratio Full.

## Later the same day: silhouette square on a plain background
- **Silhouette art cleaned up:**
  - Each `sh-avatar-silhouette` is now one `Art` layer; the extra group wrapper on Male is gone.
  - The figure is centred with an even margin (84% of the square), so nothing touches an edge and Female and Male are the same size.
- **`sh-avatar-placeholder`:**
  - The silhouette square sits at 1× (no zoomed crop), centred in 1:1 and 4:5, and 160 at the top of Full (`sh-space/40`).
  - New boolean **Show silhouette**.
- **`sh-overlay`** No photo / Photo requested (Photo and Photo full):
  - The icon slot now holds the `sh-avatar-silhouette` square (160), on top of a plain grey background. Before, an empty 160 box sat over a silhouette baked into the photo.
  - The Avatar swap offers the silhouette Female · Male. Padding top is `sh-space/40` on all four variants.
- **`sh-user-images`** Photo requested: background only (Full, Show silhouette off), so the silhouette is never drawn twice.

## Final: plain grey photo, silhouette on the overlay
- `sh-user-images` Photo requested is a plain grey background, with no silhouette (Prashant: "keep it grey, add that asset on the overlay").
- `sh-overlay` No photo / Photo requested (Photo and Photo full):
  - The icon slot holds the `sh-avatar-silhouette` square (160), picked with the **Avatar** swap (Female · Male), then the title and button.
  - Padding top `sh-space/40`. The placeholder behind Photo full has Show silhouette off.
- Each card's overlay uses the gender of its photo: the male No photo card gets the male silhouette.
- Profile-card "Photo request sent" in the No Photo Case showed a member photo behind the overlay; it's back on the grey requested image.
- A short-lived version (commit 8d8dff7) baked the silhouette into the photo; this replaces it.

## Overlay brings its own background
- `sh-overlay` No photo / Photo requested (all 4) has a solid **Background**: `sh-avatar-placeholder` Full, Show silhouette off, filling the overlay. No opacity, no blur. Then the silhouette, title and button. Whatever photo sits underneath never shows.
- Full background is two stops: `neutral/400` → `neutral/black`. The top is darker than before, the bottom pure black, and the middle stays slate (no dull grey band).
- The silhouette is brighter: `sh-opacity/full` (was strong).
- Fixed: profile-card "Photo request sent" had a hidden silhouette and a stale baked image behind it.
- The two standalone grey `sh-user-images` tiles in "No Photo Case" were deleted (not needed; the overlay covers this case).

## Clean structure: no photo means no photo
- The no-photo card is: Photo › Overlay › Background · Content (Icon/Illustration › sh-avatar-silhouette, Title) · Action.
  - The member photo layer is switched off in sh-profile-card No photo / Photo requested and sh-fpv-photo-area Gate=No photo / Photo requested.
  - Dev Mode no longer shows a JPEG under the overlay.
- **sh-user-images "requested" removed.** The 4 variants (Female and Male × Normal and Blur) are deleted in Figma; the hidden layers that used them were moved to a normal photo first.
  - The repo drops `requested-*.jpg`, the `ShUserImageRequested` option (Compose and SwiftUI) and the web/Code Connect entries.
  - sh-user-images is real photos only (54 variants).
- **sh-avatar-placeholder 1:1 and 4:5** use the same two colours as Full (`neutral/400` → `neutral/black`), stretched so they show the slice of the big card behind its silhouette. Mini cards and round avatars look like the big card made small, not darker. JPGs re-exported.
- **sh-overlay blueprint:** a "No photo and Photo requested" section with the structure; the Figma descriptions say the same.
- **Code follows the same structure** (web, Compose, SwiftUI):
  - `ShOverlay` / `.sh-overlay` No photo / Photo requested draws `background@3x.jpg` (the placeholder background), then the `sh-avatar-silhouette` image (160, `avatar` = gender), then the title and button. Same on Photo and Photo full, top `sh-space/40`.
  - `ShProfileCard` takes `noPhotoGender` instead of `requestedPortrait`, and draws no photo for these types.
  - The previews that used the requested JPEG as a stand-in photo now use the placeholder.
- In progress: the placeholder code still ships flattened JPGs, because its gradient uses base tokens that aren't exported to code. A `sh-gradient/placeholder` style is needed; then it becomes gradient + silhouette SVG.

## Why
The pink felt off-brand. Keeping the background and the silhouette as separate layers means either can change later without redrawing the other, and designs use the editable component rather than a pasted image.

## Who needs to do something
- **Designers:** pull the library. Use `sh-avatar-placeholder` (not an image) wherever a member has no photo; pick Full for a full photo slot with an overlay.
- **Android / iOS / Web:** no-photo cards: hide the member photo and show sh-overlay No photo / Photo requested on top. `ShUserImage(requested:)` is gone. Replace the placeholder images with the new grey ones and add the two `*-full` assets. `ShAvatarPlaceholderAspect` / `.full` / `--full` is new. `requested-*.jpg` is plain grey; draw the silhouette in the overlay (sh-avatar-silhouette) above the title and button.

## Checks
- [x] Renders checked: all 6 variants, sh-overlay Photo full No photo, a profile card No photo, FPV B · Photos
- [x] Scan for leftover pink images: only the Utility backups and the example remain
- [x] `python3 tools/check.py` passes; SwiftUI typechecks
