# sh-tag optical padding: 4 left, 6 right

**2026-10-23**

## What changed

- **Common component change:** `sh-tag` uses `sh-space` **4 on the left and 6 on the right** in all 20 variants (White / Translucent light / Strong … × Medium / Small × Rounded / Pill), so the label reads optically centred against a leading icon or dot. Top and bottom stay 2; the gap stays 2.
- No instance overrides the padding, so all **462 tags** in the file follow the main.

**Affected, by component:**
- `sh-profile-card` 186 (132 on screens, 54 in the master)
- `sh-fpv-header` 118 (110 on screens, 8 in the master)
- `sh-profile-card-info` 60
- `sh-tag-profile` 36
- `sh-plan-card` 21
- `sh-fpv-screen-behind` 8
- `sh-tag-fpv` 8
- `sh-list` 8
- `sh-account-header` 6
- `sh-membership-card` 5
- `sh-addon-card` 4
- FPV "Connect limit" row 2

**By page:** Profile Card 264 · FPV 132 · Navigation / Payment / Account 49 · Core Component 7 · Utility 6 · (deleted components) 4.

**By variant:** Strong · Small · Rounded 136 · White · Medium · Rounded 132 · Translucent light · Small · Rounded 94 · Translucent light · Small · Pill 93 · Translucent light · Medium · Rounded 7.

## Why

Equal padding makes a tag look heavier on the icon side. 4 / 6 balances it optically.

## Who needs to do something

- **Pratik:** the Profile Card tags (264) shift by 2 px on the right; quick visual check.
- **Developers:** tag padding start 4, end 6 (`sh-space`).
