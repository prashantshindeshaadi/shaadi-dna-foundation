# sh-blur-overlay

**Purpose:** Locks a section without loading it. A 3:1 **Visual** (a blurred mock of the section, with the section's art on top) sits above the reason and one button. One component for every gated section: tit-for-tat (add your own details), connect-to-see and upgrade-to-see.

Core · 2 variants · [Open in Figma](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=3363-74823) (node `3363:74823`)

*Was `sh-fpv-tit-for-tat-card`. Hand-written after the 2026-10-28 rebuild; regenerate with `tools/components.py` on the next export.*

## Variants

### Unlock=Self

**Purpose:** the viewer unlocks it themselves (add their details, connect, ask her). Button: sh-button Tertiary Medium.

### Unlock=Upgrade

**Purpose:** the section opens with a paid plan. Button: sh-button Premium Soft Medium.

## Properties

| Property | Type | Values | Default |
|---|---|---|---|
| Unlock | variant | Self, Upgrade | Self |
| Backdrop | instance swap | an `sh-graphic` Type=Backdrop variant: the section's blurred mock | Backdrop · Photos · Light |
| Reason | text | — | "Add your own details to see Meher's" |
| Graphic | slot | an `sh-graphic` Type=Art instance; pick the section in its Graphic dropdown | Art · Astro |

Button label: edit it on the button directly.

## Anatomy

- root: column, fill width × hug, `background/default`, gap `sh-space/8`, padding bottom `sh-space/24`, centred. Nothing draws outside its bounds.
  - **Visual**: fill width, hugs the 3:1 art, clips content
    - **Backdrop**: `sh-graphic` Type=Backdrop, behind, stretches to fill Visual
    - **Graphic**: slot, fill width, 3:1. Holds `sh-graphic` Type=Art (Graphic = the section)
  - **Message**: column, padding-x `sh-space/20`, gap `sh-space/16`, centred
    - **Reason**: `sh-typo/Body/LG/Default`, `text/primary`, centred
    - **Button**: sh-button Medium (Tertiary or Premium Soft by Unlock)

## Build in code

No live blur, no gradient layer, no negative margins. The backdrop is a plain image with its soft edges already in it, so the locked section's real data never has to reach the device.

```
Column(fillMaxWidth, background = background/default, spacing = sh-space/8, bottom = sh-space/24)
  Box(fillMaxWidth, aspectRatio = 3:1)          // Visual
    Image(backdrop_<section>, ContentScale.Crop) // light + dark asset, fills the box
    Image(art_<section>)                         // hand + object, on top
  Column(horizontal = sh-space/20, spacing = sh-space/16, centred)
    Text(reason)
    ShButton(Medium, Tertiary | PremiumSoft)
```

SwiftUI: `VStack { ZStack { Image(backdrop).resizable().scaledToFill(); Image(art).resizable().scaledToFit() }.aspectRatio(3, contentMode: .fit).clipped(); VStack { Text; ShButton } }`.

Assets: `components/sh-graphic/assets/backdrop-<section>-<light|dark>.jpg`. Put both in one asset (iOS asset catalog Any/Dark, Android `drawable` / `drawable-night`) so the app picks the mode; no mode parameter in code.

## Rules

- No card box, outline or shadow: it sits on the page like the section it hides.
- The Backdrop always matches the section (Astro backdrop under Astro art).
- Self: for a viewer missing the same details, or not yet connected. Upgrade: only when paying is the way in.
- Never replaces a lock that has a reason.

## Used in

sh-fpv-lifestyle, sh-fpv-education-career, sh-fpv-family-details, sh-fpv-contact, sh-fpv-astro (She hasn't / You haven't / Neither added, Request sent), sh-fpv-photo-break (Accept / Upgrade gated, Tit for tat), sh-fpv-photo-album (gated variants). 59 uses.
