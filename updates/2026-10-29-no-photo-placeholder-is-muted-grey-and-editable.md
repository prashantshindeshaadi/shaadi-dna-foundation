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

## Why
The pink felt off-brand. Keeping the background and the silhouette as separate layers means either can change later without redrawing the other, and designs use the editable component rather than a pasted image.

## Who needs to do something
- **Designers:** pull the library. Use `sh-avatar-placeholder` (not an image) wherever a member has no photo; pick Full for a full photo slot with an overlay.
- **Android / iOS / Web:** replace the placeholder images with the new grey ones and add the two `*-full` assets. `ShAvatarPlaceholderAspect` / `.full` / `--full` is new. `requested-*.jpg` is now background only: draw the silhouette from the overlay (the `sh-avatar-placeholder` 1:1 art without background would be a separate asset; ask if you need it).

## Checks
- [x] Renders checked: all 6 variants, sh-overlay Photo full No photo, a profile card No photo, FPV B · Photos
- [x] Scan for leftover pink images: only the Utility backups and the example remain
- [x] `python3 tools/check.py` passes; SwiftUI typechecks
