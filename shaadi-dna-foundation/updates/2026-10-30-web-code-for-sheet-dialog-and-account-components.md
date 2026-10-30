# Web code for sheet, dialog and account components

**2026-10-30**

## What changed
- Web code (CSS, demo page, Code Connect file) for 10 more components:
  - sh-bottom-sheet and sh-dialog;
  - the account components sh-account-header, sh-addon-card, sh-brand-footer, sh-location-bar, sh-map-pin, sh-map-background, sh-membership-card, sh-plan-card.
- All pass `tools/web_check.py`; the templates parse but aren't published yet. 89 of 130 components now have web code.

## Why
Every component needs web code and a Code Connect link.

## Who needs to do something
- **Designers (Figma):**
  - **Tier colours:** sh-plan-card binds raw `sh-color-basic` steps and there are no `tier/*` tokens. The code uses the nearest tokens for now.
  - **Radius:** the sheet uses `radius/xxl` and the dialog `radius/xl`. FOUNDATION §5.4 asks for the `sheet` role on both.
  - **§4.2 pairing:** text/secondary on premium soft in sh-membership-card.
  - **No size tokens:** sheet header height, close-button positions, grabber 36 × 4, compact sheet height, account-header photo 112, story photo, addon visual, map-pin ring, tail and selected size.
  - **Not in the repo:** map artwork, plan badge, addon pictogram.
  - **Blueprint gap:** the account-header chips are Info chips (no states) but are used as actions.
- **Developers:** nothing yet (status Synced).

## Checks
- [x] `python3 tools/web_check.py` passes for all 10
- [x] `npx figma connect parse` passes
