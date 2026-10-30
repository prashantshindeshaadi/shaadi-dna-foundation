# Web code for the last FPV components: 129 of 130 done

**2026-10-30**

## What changed
- Web code (CSS, demo page, Code Connect file) for the last 12 FPV components:
  - photos: sh-fpv-photo-album-stack, -album-view, -photo-album, -photo-area;
  - header: sh-fpv-app-header;
  - footer: sh-fpv-footer-boundaries, -footer-cta, -footer, -footer-sealed;
  - sheets: sh-fpv-sheet-connect-limit, -sheet-manage-boundaries, -sheet-phone-number.
- **129 of 130 components now have web code**, and all 128 Code Connect templates parse (sh-icon connects icon by icon). Only sh-logo is left: its wordmark and app-icon artwork aren't in the repo.

## Who needs to do something
- **Designers (Figma):**
  - **Variables not in `tokens/`:** these FPV blueprints bind 12 of them (photo edges, counter text, footer fill, lock overlay, app-header outlines), plus the shadows `sticky-bar`, `sheet-dialog`, `card` and `Shadow-32 dp`. None of them are drawn.
  - **Primitive colour:** the album view uses `sh-color-basic/neutral/black`, so the code uses background/inverse.
  - **Missing art:** the Eclipse/Planet backdrop, the Premium Account teaser, the reward-card backgrounds, and the Shaadi logo.
  - **Blueprint gaps:**
    - the three sheets only list title and body, so their rows, copy and buttons follow the rules;
    - only the 1-photo layout of the photo stack is specified;
    - photo-area Photo requested asks for a button that sh-overlay doesn't have;
    - sh-action-island has no style for a light sheet;
    - `sh-fpv-sheet-phone-footer` doesn't exist.
- **Developers:** nothing yet.

## Checks
- [x] `python3 tools/web_check.py` passes for all 12
- [x] `npx figma connect parse`: 128 templates
