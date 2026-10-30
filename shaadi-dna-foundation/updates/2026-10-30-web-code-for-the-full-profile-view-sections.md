# Web code for the full-profile-view sections

**2026-10-30**

## What changed
- Web code (CSS, demo page, Code Connect file) for 11 FPV sections: sh-fpv-about, -astro, -compatibility, -contact, -education-career, -family-details, -lifestyle, -lifestyle-free-tit-for-tat, -you-and-her, -requests, -photo-break.
- All pass `tools/web_check.py`; the templates parse but aren't published yet. 116 of 130 components now have web code.

## Who needs to do something
- **Designers (Figma):**
  - **Variables that no longer exist:** sh-fpv-you-and-her and sh-fpv-compatibility use almost only deleted variables, so their text colours were inferred. The you-and-her Verdict box uses a raw blue/400, so it's drawn with no fill, edge or radius.
  - **Not drawn:** the compatibility gradient background, because it has no token.
  - **Out of date:** the sh-fpv-astro blueprint (it still shows State × Chart). sh-fpv-lifestyle-free-tit-for-tat was deleted in Figma; remove it with the next sync.
  - **Rule conflict:** compatibility cues are plain rows in Figma, but the chips rule says sh-chip.
  - **Unbound:** root padding, gaps, card corners, and the photo-break photo height.

## Checks
- [x] `python3 tools/web_check.py` passes for all 11
