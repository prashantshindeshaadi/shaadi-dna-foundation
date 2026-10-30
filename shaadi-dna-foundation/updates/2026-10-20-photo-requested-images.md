# Photo requested: soft portrait images

**2026-10-20**

## What changed

- **Photo requested now has its own images.** These are soft, blurred portraits (female and male), no longer the same placeholder used for "No photo".
  - `sh-user-images`: new variants **Gender=Female requested** and **Gender=Male requested** (Style=Normal).
  - `sh-user-images`: **Female requested / Male requested · Style=Blur** (same image and crop, plus the strong background blur layer, like the other Blur photos).
  - `sh-avatar-placeholder`: new **Gender=Female requested / Male requested** variants, in 1:1 and 4:5.
- **`sh-profile-card` Type=Photo requested** uses the Female requested image.
  - Its `sh-overlay` (Surface=Photo, Type=Photo requested) no longer has the background blur, so the portrait shows through. The scrim stays to keep the text readable.
  - The overlay's avatar slot now defaults to the requested 1:1 image.
- **FPV:** `sh-fpv-photo-overlay` has a new **Type=Photo requested**. It shows the requested portrait (`sh-user-images` Female requested) with a disabled "Photo Requested" button that leads with the check. A new case, "She has no photos · you requested one", sits in section 02's "She has no photos" row.
- **`sh-photo-wrapper` top scrim** is now 24 px tall (was 80), pinned to the top. All profile-card types follow.

- **One FPV photo component (2026-10-21).** `sh-fpv-photo-overlay` is merged into `sh-fpv-photo-area` and deleted.
  - Gates: Visible / Accept gated / Upgrade gated / Tit for tat / No photo / **Photo requested**.
  - New `Message` text property. All 19 screen messages were kept, and the requested example case now uses Gate=Photo requested.
- **Same layout on every gate:**
  - icon (when used) 40 px at the top, y 128
  - message box 302×48 (Body/LG, centred, max 2 lines) at y 180
  - CTA `sh-button` Tertiary Medium at y 252
- **Requested portrait placement:** the original images, full width and top-aligned, so the head sits where the no-photo illustration's head is. On the profile card (340×542, same ratio as the original) the image is shown whole.
- **No photo and Photo requested share one look (2026-10-21, from Prashant's reference):** the soft portrait with no dark base, no silhouette and no blur.
  - No photo: "No Photo added yet" + "Request a Photo" (`sh-button` Tertiary Medium, no icon).
  - Photo requested: "Photo request sent", no button.
  - Message text uses Body/LG.
  - Applies to `sh-overlay` Surface=Photo (No photo / Photo requested), `sh-profile-card` (both types) and FPV `sh-fpv-photo-area` (Gate=No photo / Photo requested).
- **Examples updated (2026-10-21):** all 10 No photo / Photo requested examples were checked (profile card ×3, FPV photo area ×7).
  - `sh-fpv-photo-area` has new **Show message** and **Show action** booleans.
  - "You reported her", "She hid her profile" and "Profile deleted" show only the placeholder: no message, no "Request a Photo".
  - The profile-card Photo requested example dropped its old green "Photo Requested" status.
- **Known leftover:** `sh-user-images` Female placeholder still holds the lavender illustration, because the original placeholder image is no longer in the file. The solid base hides it on the cards; restore it from version history if needed.

## Why

"Photo requested" should look different from "No photo": the member asked for her photo, so the card shows a soft "coming soon" portrait instead of an empty silhouette.

## Who needs to do something

- **Designers:** use Type=Photo requested on the profile card and FPV once the member has asked for a photo.
- **Developers:** the requested images are static assets, one female and one male, used under the same overlay rules.

## Checks

- [x] Profile card Photo requested and the FPV case render with the new image
- [ ] Pratik to re-check the profile card (the top scrim and Photo requested changed in reviewed components)
