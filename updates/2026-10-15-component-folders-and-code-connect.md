# Component folders and Code Connect

**2026-10-15**

## What changed
- Every `sh-*` component now has its own folder, named exactly like the Figma component: `components/sh-chip/sh-chip.md`. Migration-page components keep their group: `components/fpv/sh-fpv-footer/sh-fpv-footer.md`. 86 folders, one blueprint each.
- Each blueprint links back to its component in Figma; the index (`components/README.md`) lists the Figma node for every component.
- Figma Code Connect links all 86 components to their blueprint (label **Markdown**). In Dev Mode, and through the Figma MCP, a component now points to its spec in this repo.
- `button.md` moved to `sh-button/sh-button.md`; it stays hand-written.

## Why

Code Connect needs one file per component to link to. There is no component code yet, so each Figma component links to its blueprint; when a code component is built, it goes in the same folder and gets a second Code Connect link for its framework. People and AI agents find everything about a component in one place.

## Who needs to do something
- **Designers:** nothing. Dev Mode shows the blueprint link on each component.
- **Developers:** read `components/<sh-name>/<sh-name>.md` before building a component; put the code and its `.figma.tsx` in the same folder.

## Checks
- [x] `python3 tools/check.py` passes
- [x] `python3 tools/build.py` run
- [x] FOUNDATION.md updated (§8)
