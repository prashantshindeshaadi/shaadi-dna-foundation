# Web code for lists, header, data card, graphic and overlays

**2026-10-30**

## What changed
- Web code (CSS, demo page, Code Connect file) for 14 more components:
  - the sh-list family: sh-list, sh-list-default (owns the shared row parts), sh-list-grouped, -highlight, -info, -preference, -report and -score;
  - sh-fpv-locked-text, sh-app-header, sh-data-card, sh-graphic, sh-blur-overlay, sh-avatar-silhouette.
- All pass `tools/web_check.py`; the Code Connect templates parse but aren't published yet. 79 of 130 components now have web code.

## Why
Every component needs web code and a Code Connect link so Dev Mode shows real code and the Vision App can show it live.

## Who needs to do something
- **Designers (Figma):**
  - **Missing artwork:** the 7 sh-graphic Art drawings aren't in the repo, so those frames render empty. Their white background will also look wrong in Dark.
  - **No token:** the gold asterisk (bound to a primitive), the app header height of 56, and the asterisk and pictogram sizes in list rows.
  - **Unbound colours:** list lock icons, preference tick and cross, leading icons, the data-card Usage chevron.
  - **Not in `tokens/`:** 3 variables used by sh-list-info.
  - **§4.2 pairing breaks:** text/secondary on the information-soft band (highlight row); text/primary and text/tertiary on premium soft (report row Upgrade).
  - **Lock type:** the list blueprint's anatomy says Filled, its purpose text says Line. The code uses Filled.
- **Developers:** nothing yet (status Proposed).

## Checks
- [x] `python3 tools/web_check.py` passes for all 14
- [x] `npx figma connect parse` passes
