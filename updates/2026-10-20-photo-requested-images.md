# Photo requested: soft portrait images

**2026-10-20**

## What changed

- **Photo requested now has its own images.** These are soft, blurred portraits (female and male), no longer the same placeholder used for "No photo".
  - `sh-user-images`: new variants **Gender=Female requested** and **Gender=Male requested** (Style=Normal).
  - `sh-avatar-placeholder`: new **Gender=Female requested / Male requested** variants, in 1:1 and 4:5.
- **`sh-profile-card` Type=Photo requested** uses the Female requested image.
  - Its `sh-overlay` (Surface=Photo, Type=Photo requested) no longer has the background blur, so the portrait shows through. The scrim stays to keep the text readable.
  - The overlay's avatar slot now defaults to the requested 1:1 image.
- **FPV:** `sh-fpv-photo-overlay` has a new **Type=Photo requested**. It shows the requested portrait (`sh-user-images` Female requested) with a disabled "Photo Requested" button that leads with the check. A new case, "She has no photos · you requested one", sits in section 02's "She has no photos" row.
- **`sh-photo-wrapper` top scrim** is now 24 px tall (was 80), pinned to the top. All profile-card types follow.

## Why

"Photo requested" should look different from "No photo": the member asked for her photo, so the card shows a soft "coming soon" portrait instead of an empty silhouette.

## Who needs to do something

- **Designers:** use Type=Photo requested on the profile card and FPV once the member has asked for a photo.
- **Developers:** the requested images are static assets, one female and one male, used under the same overlay rules.

## Checks

- [x] Profile card Photo requested and the FPV case render with the new image
- [ ] Pratik to re-check the profile card (the top scrim and Photo requested changed in reviewed components)
