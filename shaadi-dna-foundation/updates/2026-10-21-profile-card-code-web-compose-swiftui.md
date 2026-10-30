# Profile card code: Web, Compose, SwiftUI

**2026-10-21**

## What changed

- **`sh-profile-card` has code for all three platforms**, in its folder `components/profile-card/sh-profile-card/`:
  - `web/`: `sh-profile-card.html` (all 9 Types), `sh-profile-card.css`, and `sh-profile-card.figma.ts` (Code Connect, html parser).
  - `compose/`: `ShProfileCard.kt` (Jetpack Compose, no XML) and `ShProfileCard.figma.kt`.
  - `swiftui/`: `ShProfileCard.swift` and `ShProfileCard.figma.swift`.
  - All three share one model:
    - `type`: the 9 Figma Types.
    - `member`: name, age, photo, photo count, online, verified, detail rows, tags, top tag and message.
    - `showTopTags` and `showPhotoActions`: the two Figma switches.
    - `requestedPortrait`: the soft image used for Photo requested.
    - An actions object with one callback per tap.
  - Every value comes from a token. The SwiftUI file type-checks against `SHTokens.swift` and the type kit.
- **Logic is in Figma descriptions now.**
  - The card set has Purpose, Built from, Switches, Rules and Taps.
  - Each of the 9 variants has When, Purpose and Actions.
  - Blueprints gain a **Types** section (one block per variant, from its description) and a **Code** line linking `web/`, `compose/` and `swiftui/` when they exist.
- **Figma clean-up on the card:**
  - Shadow is bound to the `sh-shadow/default` style.
  - Content paddings are bound to `sh-space/0`.
  - The Locked "Upgrade to Connect" label uses `premium/text/on-solid` and the local `sh-typo/button/md` text style.
  - The VIP, premium and verified badges are bound to DNA variables.
  - The card has no bindings to other libraries left.
- **New native tokens from `tools/build.py`:**
  - Blur: `R.dimen.sh_translucent_background_blur_*`, `SH.Blur.*`.
  - Shadow: `R.dimen.sh_shadow_*`, `R.color.sh_shadow_*_color`, `SH.Shadow.*`, `SH.Color.shadow*`.
  - Opacity: `values/sh_opacity.xml`, read with `ResourcesCompat.getFloat(resources, R.dimen.sh_opacity_strong)`.
- **Gradients re-pulled from Figma:**
  - New: `translucent/border/light-ring`.
  - Changed: `overlay/scrim`, `overlay/wash` and `translucent/border/light`.
- **Icons re-exported:** 380 icons.
  - Badges moved to `misc/`: `premium-badge`, `verified-badge`, `vip-badge`.
  - `crown` is now `premium`.
  - `loader` is now `loader-circle`.
  - The old files were removed.

## Why

Developers get one folder per component with the logic, the blueprint and ready code for Web, Android and iOS. Every platform reads the same tokens, so a value changed in Figma reaches all three.

## Who needs to do something

- **Designers:** nothing.
- **Web:** rebuild for the gradient changes. Use `web/sh-profile-card.css` with `dist/css/tokens.css` and `sh-typo.css`.
- **Android:**
  - Re-copy `dist/android`; `sh_opacity.xml` is new.
  - Import the icons as vector drawables named `sh_icon_<type>_<name>`.
  - Set `package` and `R` in `ShProfileCard.kt`.
- **iOS:**
  - Re-copy `dist/ios/SHTokens.swift`, which now has `SH.Blur` and `SH.Shadow`.
  - Add the icons to the asset catalogue as `sh-icon/<type>/<name>`.
- **Everyone:** icon paths changed: `badge/*` is now `misc/*-badge`, `crown` is now `premium` and `loader` is now `loader-circle`.

## Open points

- **Info card fill.** In Figma, only Connect uses the glass fill (`sh-gradient/translucent/dark/soft`). The other 8 Types use a flat `sh-translucent/background/dark/extra-soft/end`, and Locked has no blur. The code uses the glass fill for all 9 Types.
- **No photo avatar.** The No photo overlay shows the "Female requested" portrait. It probably should show the plain placeholder; the code does that.
- **Overlay side padding.** `sh-overlay` binds its side padding to `page/margin`, which grows to 40 on tablet. The code caps it at `sh-space/20` inside a card.
- **Photo Requested label.** The green text has low contrast on a light portrait.
- **Android glass.** Android has no backdrop blur, so the glass is the gradient alone.
- **Compose not compiled.** `ShProfileCard.kt` was not compiled; there is no Kotlin toolchain on this Mac.
- **Code Connect.** The Web, Compose and SwiftUI mappings go live after a push, plus `figma connect publish` with a Figma access token.

## Checks

- [x] `python3 tools/check.py` passes
- [x] `python3 tools/build.py` run
- [x] SwiftUI type-checks (iOS 17 simulator SDK)
- [x] Web renders all 9 Types (headless Chrome)
- [ ] Compose compiled in an Android project
