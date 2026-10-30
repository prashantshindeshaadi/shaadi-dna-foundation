# Profile card code synced to Figma update

**2026-10-21**

## What changed

The profile card's web, Compose and SwiftUI code was checked against a deep read of all 9 Figma variants, looking inside nested instances, and brought in line:

- **Info card fill:**
  - Connect uses `sh-gradient/translucent/dark/soft`.
  - Every other Type uses `sh-gradient/translucent/dark/extra-soft`.
  - Locked has no background blur.
- **Top scrim** sits at `sh-opacity/strong`.
- **Divider** is `sh-divider` Soft: `border/soft` at `opacity/extra-soft`.
- **Tag icons keep their own colour:**
  - You & Her: `sh-gradient/brand/default`.
  - Astro: `sh-gradient/premium/default`.
  - Online: green dot with halo.
  - Promoted megaphone: `icon/secondary`.
- **Borders and links:**
  - The white Promoted tag and the Tertiary buttons have no border.
  - Edit and Upgrade Now use `sh-text-link` Small: `button/sm` with a 1 px underline.
- **Connected:**
  - The note ("To contact her directly" + Upgrade Now) is centred.
  - The island gap is `sh-space/8`.
  - Shaadi Chat, WhatsApp and Call sit on pill-shaped Secondary icon buttons, 40 tall.
- **Locked overlay:**
  - The icon and text are grouped with a 12 gap.
  - The text and the action carry `sh-shadow/default`.
  - The copy is "She has shared Photos with / Premium Members", with the line break taken from Figma.
- **Photo requested portrait:** Figma went back to the original requested images, full width and top-aligned, shown whole on the card. This was decided in the FPV photo work (see the 2026-10-20 entry). It replaces the face-centred images from earlier today.
  - `sh-user-images/assets/requested-*.jpg` now hold the originals.
  - The 1.36 crop is removed from all three platforms.
- **Blueprints:** the nested parts (action island, note, row, overlay, info detail, tag, tag-profile, user images, avatar placeholder) were regenerated with their new variant descriptions.
- **Repeatable process:**
  - New `tools/read_component_deep.js` and `tools/deep_lines.py`.
  - A new "Recipe: build or update one component's code" section in `skills/shaadi-code-connect/SKILL.md`. Call `/shaadi-code-connect` for the next component.

## Why

The card was updated in Figma. The code has to show exactly what each variant renders.

## Who needs to do something

- **Designers:** nothing.
- **Web / Android / iOS:** take the updated files from `components/profile-card/sh-profile-card/`.

## Open points

- **Peer session still editing.** Another session ("Shaadi DNA Plugin") was editing the card while this sync ran: No photo's Promoted tag was hidden at about 15:30. The 2026-10-20 entry also describes a No photo overlay with no solid fill or blur and a hidden silhouette, but that isn't in Figma yet. The code keeps the current Figma state. Re-sync once that work lands.

- **Photo count text.** The "10" next to the photo icon is bound to `text/inverse`. That colour is navy in dark mode, so the number would vanish on the dark glass. The code keeps `text/on-image` until Figma confirms.
- **White tag description.** The description of `sh-tag` Mode=White says "with shadow", but the tag has no shadow in Figma.
- **Compose not compiled.** There is no Kotlin toolchain here.

## Checks

- [x] `python3 tools/check.py` passes
- [x] SwiftUI type-checks
- [x] Web renders all 9 Types and matches the Figma screenshots
- [ ] Compose compiled in an Android project
