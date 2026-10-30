# sh-profile-card: Declined type

**2026-10-28**

## What changed
- New `sh-profile-card` **Type=Declined**, for when she declined your Request to Connect (matching the app). Her photo, name row, details and tags stay. The action area shows the status **"She declined your Request to Connect"** with no note and no button.
- Built from Type=Connect, with its action area set to `sh-action-island` **Type=Message only** (the status-only island). No new parts.

## Why
The app has this state and the card had no way to show it; designers were detaching the card to type the line in.

## Who needs to do something
- **Designers:** use Type=Declined instead of a detached card. Turn off Show photo actions / Show top tags if the screen doesn't need them.
- **Developers:** state `declined` = card with status text, no CTA.

## Checks
- [x] Render checked against the draft and the app screenshot
