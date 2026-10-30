# Web code for the rest of the core components

**2026-10-30**

## What changed
- Web code (CSS, a demo page with every variant, and a Code Connect file) for 27 more components: sh-spinner, sh-skeleton, sh-progress-bar, sh-progress-ring, sh-carousel-dots, sh-avatar-stack, sh-card, sh-otp-input, sh-slider, sh-stepper, sh-date-picker, sh-photo-upload, sh-semantic-button, sh-countdown, sh-accordion, sh-chat-bubble, sh-chat-composer, sh-empty-state, sh-status-bar, sh-offer-card, sh-data-point, sh-section-header, sh-section, sh-profile-identity, sh-navigation-item, sh-navigation-bar, sh-navigation-dashboard-primary-item.
- All pass `tools/web_check.py`; the Code Connect templates parse but aren't published yet. 65 of 130 components now have web code.
- Two are partly done: sh-status-bar (the camera cut-outs use a primitive colour with no code token, and there's no wifi icon) and sh-offer-card (the Money back artwork isn't in the repo).
- sh-logo isn't built: its wordmark and app-icon artwork aren't in the repo yet.

## Why
Every component needs web code and a Code Connect link, so Dev Mode shows real code and the Vision App can show every component live.

## Who needs to do something
- **Designers (in Figma):** some values have no token, so the code uses the nearest one and marks it "no token" in the CSS:
  - **Motion:** spinner speed, skeleton shimmer.
  - **Sizes:** OTP box, slider track and thumb, stepper parts, date-picker row, progress ring, carousel dot width, avatar-stack overlap.
  - **Unbound colours:** chat ticks, countdown, photo upload and stepper icons, data-point asterisk.
  - **Variables missing from `tokens/`:** the dashboard nav hover fill, the offer card "30 Days" colour.
- **Designers (blueprints):** the sh-navigation-bar and sh-indicator blueprints are older than Figma (glass, Brand/Neutral, Show updates, offer ticket). Re-sync them with `/shaadi-dna-sync`.
- **Missing icons:** matches, sh-navigation-offer, bottom-nav-home, wifi.
- **Developers:** nothing yet; these are proposals (status Proposed).

## Checks
- [x] `python3 tools/web_check.py` passes for all 27
- [x] `npx figma connect parse` passes
- [ ] FOUNDATION.md updated if a rule changed (no rule changed)
