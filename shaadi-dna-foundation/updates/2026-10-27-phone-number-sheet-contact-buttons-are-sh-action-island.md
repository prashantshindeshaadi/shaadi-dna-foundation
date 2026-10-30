
## Later: Connect status is a toggle
- New `sh-fpv-sheet-phone-footer`, which sits in the sheet's Note slot:
  - **Show connect status**: boolean, on by default. Shows or hides "✓ Connect Request Sent".
  - **Note**: text. The contact-views line, e.g. "Contacts viewed 2/5".
- Replaced the hand-built Footer in all 4 states, the 3 copies on the FPV page and the loose "Sheet / Phone number" frame. Every Note text was kept.
- Why a separate part: Figma can't link a sheet-level toggle to layers inside a slot. To use it, select the footer inside the sheet and flip **Show connect status**.
- **Developers:** `showConnectStatus` is true when this open sent the Connect request. It's false when you were already connected or the request went out earlier.

## Later: email stays on one line
- The email row's value is split into **Local part** (before @) and **Domain** (@ and after). A long address shortens the part before @, e.g. "sb4_8SH123…@emaillocker.com"; the domain is always shown in full. It no longer wraps to a second line.
- Built like the profile name row: the value hugs its text up to a max width (row minus the Email button), and Local part fills inside it with one line and end truncation. Applied to every state and copy that has the email row.
- Figma limitation: truncation stops at a whole character, so a few px may sit between "…" and "@".
- **Developers:** one line. Truncate the local part only, never the domain. iOS/Android: give the domain higher layout priority (or `maxLines 1` + `Ellipsis` on the local part).
