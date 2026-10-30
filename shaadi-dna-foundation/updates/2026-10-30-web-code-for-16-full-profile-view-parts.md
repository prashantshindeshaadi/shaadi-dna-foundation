# Web code for 16 full-profile-view parts

**2026-10-30**

## What changed
- Web code (CSS, demo page, Code Connect file) for 16 FPV parts:
  - sh-fpv-section-title, -section-divider, -carousel-dot, -carousel-dots, -asset-premium-badge, -header;
  - sh-tag-fpv, sh-request-chip, sh-request-card;
  - the six astro-sheet parts: grabber, pinned strip, summary, header, privacy, ask card and breakdown.
- All pass `tools/web_check.py`; the templates parse but aren't published yet. 105 of 130 components now have web code.

## Who needs to do something
- **Designers (Figma):**
  - **Missing art:** the gold premium badge, the ask-card Lottie, `pictogram/koota-rasi`.
  - **Variables that no longer exist:** several FPV blueprints still bind them; the code uses the nearest semantic tokens.
  - **sh-fpv-section-title:** Figma moved it to a Type property on 10-28, but the blueprint still shows the old booleans. Re-sync it before publishing its Code Connect.
  - **sh-request-chip:** the CTA is Secondary in the blueprint but Premium Soft in the update log.
  - **§4.2 pairing:** the pinned strip puts text/secondary on an information background.
  - **Duplicates:** sh-fpv-carousel-dot(s) bind no tokens and duplicate sh-carousel-dots.
- **Developers:** nothing yet.

## Checks
- [x] `python3 tools/web_check.py` passes for all 16
