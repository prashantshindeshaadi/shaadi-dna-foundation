# Sheet header is one block: sh-profile-identity

**2026-10-29**

## What changed
- New core component **`sh-profile-identity`** (Core › 05 Identity & media): her photo (`sh-avatar` lg), name and a one-line subtitle ("Managed by Parent") as one tight block.
  - Spacing: photo → name `sh-space/12`; name → subtitle `sh-space/0`, so the two lines read as one.
  - Properties: Name, Subtitle, Show subtitle. Change the photo on the nested `sh-avatar`.
  - Name and subtitle stay on one line each and end with "…" when too long.
- `sh-fpv-sheet-phone-number`: all four states use it in the sheet's Visual slot. The sheet's own Title/Body are hidden, so the photo and name no longer sit 32 apart.
- `sh-fpv-sheet-phone-number`, Shown to connections and Number hidden: **Shaadi Chat** is Medium (was Large), 200 wide, centred, with the 16 chat icon. Every button in a sheet is Medium.
- FPV page, section 04: the five phone-sheet screens were re-placed as fresh instances. The old ones kept their own slot content, so they still showed the old header and, for the two new screens, the Number shown content.
- FPV page, section 04, Free row: removed the leftover review block "State=Number shown · Proposal on DNA sh-bottom-sheet". It was a flattened copy, not the component, and showed the same sheet as "On a Plus member's profile" beside it.

## Why
The photo, name and who manages the profile describe one person, so they should look like one piece and be reused the same way everywhere. Sheet buttons are Medium across DNA.

## Who needs to do something
- **Designers:** for photo + name + subtitle at the top of a sheet or page, use `sh-profile-identity`. After changing what a sheet component puts in a slot, re-place its screen instances; slot content in instances does not follow the main.
- **Developers:** build the sheet header as one identity view (photo, name, subtitle); see `components/sh-profile-identity/`.

## Checks
- [x] Render checked: phone-sheet set and section 04 screens
- [x] `python3 tools/check.py` passes
