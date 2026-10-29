# Locked sections use backdrop images instead of a live blur

**2026-10-28**

## What changed
- `sh-graphic` gained **Type** (Art · Backdrop) and **Mode** (Light · Dark). Graphic gained **Photo break**. 32 variants, laid out on the Core page as a grid: one row per section; columns Art Light · Art Dark · Backdrop Light · Backdrop Dark.
- **Backdrop** = a blurred mock of the section (mock data), 3:1, with soft fades into `background/default` baked in at the top, the sides and the bottom. One per section: Astro, Lifestyle, Education & Career, Family, Contact, Photos, Photo break, plus Placeholder.
- `sh-blur-overlay` rebuilt as a simple stack, from Prashant's sketch:
  - **Visual** (3:1): Backdrop behind, the section Art on top.
  - **Message**: reason and button below, on the plain page.
  - Gap `sh-space/8`, bottom `sh-space/24`.
  - Gone: the hidden live copy of the section, the layer blur, the gradient layer and the 20px bleed past each side.
- Property **Blurred sample** → **Backdrop** (instance swap, Backdrop variants only).
- All 59 uses moved to the matching Backdrop. Reason, button and art are unchanged on every use (checked before/after). Each locked section is about 24 shorter.
- Fixed: on some sections a strip of blurred content showed past the fade at the left and right edges, ending in a hard line. Photo break overlays were also clipped at the sides.
- New assets: `components/sh-graphic/assets/backdrop-<section>-<light|dark>.jpg`, 720 × 240, 6–15 KB each.

## Why
The live blur drew the real section and then hid it. That is slow on low-end Android, puts the gated data on the phone (readable in the API response) and bled outside the component. A plain image is the same on Android, iOS and web: `Box { Image(backdrop); Image(art) }` + text + button.

## Who needs to do something
- **Designers:** pull the library. In `sh-blur-overlay`, pick the section's Backdrop (instead of Blurred sample) and keep the Art in the Graphic slot.
- **Android / iOS / Web:** build the overlay from the blueprint: a 3:1 box with two images, then the reason and the button. Add each backdrop as one asset with light + dark versions (`drawable-night` / asset catalog Dark). No blur code. Don't send the locked section's data to the app.

## Checks
- [x] Renders checked: all 7 locked sections (Light), every backdrop Light + Dark, Core page block
- [x] Before/after text and label check on all 59 uses
- [ ] Code for sh-blur-overlay / sh-graphic in web, compose and swiftui: next refresh
