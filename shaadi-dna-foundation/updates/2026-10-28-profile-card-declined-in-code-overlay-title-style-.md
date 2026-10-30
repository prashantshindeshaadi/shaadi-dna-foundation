# Profile card: Declined in code, overlay title style, blueprints synced

**2026-10-28**

## What changed

I compared the profile card and every part it uses with live Figma.
- 14 parts are unchanged since the last push.
- 5 had changed: `sh-profile-card`, `sh-avatar-placeholder`, `sh-mini-card`, `sh-user-images` and `sh-overlay`.

The soft pink no-photo art and the mini card No photo female / male variants were already pushed today. See "No-photo art: soft pink silhouettes everywhere", "sh-profile-card: Declined type" and "sh-mini-card: No photo female and male".

- **`sh-profile-card` Declined, now in code:** her photo, top row, details, tags and badges show as on Connect. The action area is `sh-action-island` Message only with the status "She declined your Request to Connect", and no note or button.
  - Web: `data-type="declined"`, Code Connect and the demo page.
  - Compose: `ShProfileCardType.Declined`.
  - SwiftUI: `.declined`.
- **`sh-overlay` title style:** the No photo and Photo requested titles ("No Photo added yet", "Photo request sent") are now `sh-typo/Title/LG`, on both Photo and Photo full. The Message copy stays `Body/LG` (Photo) and `Body/MD` (Content).
  - Web uses `.sh-title-lg`; Compose and SwiftUI use `titleLg`.
  - The profile card's own overlay markup is updated too.
- **Blueprints updated from Figma:**
  - `sh-profile-card`: 10 variants, with the Declined description.
  - `sh-avatar-placeholder`: new set description; default Aspect Ratio 1:1.
  - `sh-mini-card`: new variant descriptions.
  - `sh-overlay`: title style.
  - The components index shows 10 variants for `sh-profile-card`.
- **Blueprint generator:** when a set's variants differ in size but it has no Size property, the Size line now lists every size and the property that sets it. For example, `sh-avatar-placeholder` now shows "160 × 160 (Aspect Ratio 1:1) · 160 × 200 (Aspect Ratio 4:5)" instead of only the first variant's size.

## Why

The repo is the source of truth for the profile card. Figma had a new type and a new title style that the code didn't have yet.

## Who needs to do something

- **Web / Android / iOS:**
  - Handle the new Declined type (status only, no action).
  - Use the Title/LG style for the no-photo overlay titles.
- **Designers:** none.

## Figma notes (not changed)

- **Contrast:** "No Photo added yet" and "Photo request sent" are `text/on-image` (white) on the light pink art. They may be hard to read.
- **Declined description:** the Declined variant's description has only a Purpose line. The other 9 types also have When and Actions lines.

## Checks

- [x] `python3 tools/check.py` passes
- [x] `python3 tools/build.py` run
- [x] SwiftUI typecheck: 0 errors
- [x] Web previews: `sh-profile-card` (all 10 types), `sh-overlay`
- [ ] Compose compiled (no Kotlin toolchain here)
