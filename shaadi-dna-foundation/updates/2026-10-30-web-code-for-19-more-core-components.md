# Web code for 19 more core components

**2026-10-30**

## What changed
- Web code (CSS, a demo page with every variant, and a Code Connect file) for 19 core components: sh-badge, sh-chip, sh-checkbox, sh-radio, sh-toggle, sh-indicator, sh-input, sh-select, sh-search, sh-alert, sh-toast, sh-tooltip, sh-tab-item, sh-tab-group, sh-segmented-control, sh-pagination-item, sh-pagination, sh-menu-item, sh-menu.
- All built to `components/WEB.md`, and all pass `tools/web_check.py`. The Code Connect templates parse; they aren't published to Figma yet.
- 38 of 130 components now have web code.

## Why
Every component needs web code and a Code Connect link, so Dev Mode shows real code and the Vision App can show every component live.

## Who needs to do something
- **Designers:** check them in the Vision App, under Components.
- **Developers:** nothing yet; these are proposals (status Proposed).

## Checks
- [x] `python3 tools/web_check.py` passes for all 19
- [x] `npx figma connect parse` reads all 38 templates
- [ ] FOUNDATION.md updated if a rule changed (no rule changed)
