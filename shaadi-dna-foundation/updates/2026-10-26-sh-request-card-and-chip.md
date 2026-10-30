# sh-request-card and sh-request-chip

**2026-10-26**

## What changed

### `sh-request-card` (was `sh-fpv-requests-card`)
- Renamed. The 4 Types (Message, Photo, Birth details, Message · free viewer) and all 20 uses are unchanged; the parent `sh-fpv-requests` description now uses the new name.
- **Type = Message · free viewer** now follows Daren's proposal: "Meher sent you a message", then "**To view her message & reply**" (Body/MD) instead of the masked start of her message, and **Upgrade Now** (`sh-button` Premium Soft Small) with the `sh-icon/premium` crown.
- The loose proposal component ("Requests · card · Message · free viewer · proposal", 0 uses) was removed.
- The 4 variants had grown to 348 wide inside the set; they are back to 320. On screens, the cards now fill their column (320 inside 20 / 20 padding), so nothing runs off the right edge.
- Repo: `components/fpv/sh-fpv-requests-card` → `components/fpv/sh-request-card` (git mv, blueprint regenerated).

### New `sh-request-chip`
- The "3 requests from Meher · View" strip over her photo was a hand-made frame, copied 6 times. It is now **`sh-request-chip`**:
  - Props: `Title`, `Subtitle` + `Show subtitle` (off), `Show icon` (off, `sh-icon/message` 16 on `icon/on-image`); the CTA is `sh-button` Premium Soft Small "View" with the crown.
  - Glass on DNA tokens: `sh-gradient/translucent/dark/extra-soft` fill, `sh-gradient/translucent/border/light` edge, `sh-background-blur/uniform/default`, radius `sh-radius/lg` (16) with 60 % smoothing. Daren's file used raw / remote surface colours.
- All 6 copies replaced; the blueprint was added at `components/fpv/sh-request-chip`.

### Filled icons in buttons take the button's icon colour
- Buttons colour their icon's **stroke**. A Filled icon (crown, check, connect, eye-off) is coloured by its **fill**, which stayed `icon/primary` (dark navy). On 16 buttons the fill now uses the same token as the stroke (`premium/icon/on-soft`, `premium/icon/on-solid`, `button/tertiary/icon/default`). The Upgrade Now and View crowns now match their label. 231 others already matched.

## Why

The request strip and card are reused across many FPV screens, so they must be components, and the crown must match the Premium Soft label.

## Who needs to do something

- **Developers:** rename `sh-fpv-requests-card` → `sh-request-card`; new `sh-request-chip`.
- **Open:** `sh-fpv-header` (3 cases, 60 uses) still uses a detached "Tag Container / Trust Badges" row with grey placeholder circles instead of `sh-badge` pictograms.

## Checks

- [x] 20 / 20 request-card uses intact; cards fit their column
- [x] 6 / 6 chips replaced; chip renders on the photo
- [x] Crowns render in premium brown on both CTAs
