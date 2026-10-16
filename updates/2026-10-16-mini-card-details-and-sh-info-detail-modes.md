# Mini card details and sh-info-detail modes

**2026-10-16**

## What changed
- **`sh-info-detail` is now a set** with two properties:
  - **Mode:** `On image` (`text/on-image`, for dark glass and photos) or `Default` (`text/secondary`, for light surfaces).
  - **Size:** `Medium` (`Body/MD`, gap `sh-space/8`) or `Small` (`Body/SM/Tight`, gap `sh-space/6`).
  The existing profile-card details are `Mode=On image, Size=Medium`, unchanged.
- **`sh-mini-card` uses the same details as the profile card.** The single "Details" text is replaced by a centred, wrapping row of three `sh-info-detail` (`Default`, `Small`). The card has **Show detail 1–3** switches, and each detail has its own **Show separator** switch. Both variants (Default, No photo) updated. The old `Details` text property is gone.
- New blueprints: `components/profile-card/sh-info-detail/` and `components/profile-card/sh-tag-profile/`. Updated: `sh-mini-card`, `sh-profile-card-info`.
- New tool: `tools/read_variables.js` reads every variable collection live from Figma; `tools/import.py` takes its output directly, so no manual export is needed.

## Why

One detail component for every card: the same hiding and separator behaviour on the profile card and the mini card, with colour coming from the text token that suits the surface.

## Who needs to do something
- **Designers:** on mini cards, edit each detail by selecting it; use Show detail and Show separator instead of typing dots. Publish the library so `sh-info-detail` and `sh-tag-profile` appear in Assets.
- **Developers:** render details as a wrapping row; colour `text/secondary` on light cards, `text/on-image` on photos and glass.

## Checks
- [x] `python3 tools/check.py` passes
- [x] `python3 tools/build.py` run
- [x] FOUNDATION.md unaffected
- [ ] Code Connect for `sh-info-detail` and `sh-tag-profile`, after they are published
