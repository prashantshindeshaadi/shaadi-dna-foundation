# sh-button Small icons back to 12 in every use

**2026-10-27**

## What changed
- `sh-button` Size=Small uses a 12 icon (`sh-icon/size/12`) in its main component, but 191 uses still showed a 16 icon. These were leftovers from moving icon size 14 to 16, plus hand swaps.
- All of them now show the same icon at Size=12: 4 top-level uses, 150 inside other components, and the rest followed their mains. Each was set through the button's own `Leading icon (Small)` / `Trailing icon (Small)` property, so the override is clean.
- Icon colours were checked before and after: none changed.
- Checked: all 395 Small-button uses, 0 left that aren't 12.

## Why
A Small button's icon is 12 everywhere. Uses at 16 looked heavier than the label and didn't match the component.

## Who needs to do something
- **Designers:** pull the library. Don't swap a Small button's icon to a 16; pick the icon in `Leading icon (Small)` and it stays 12.
- **Web / Android / iOS:** Small button icon = `sh-icon/size/12` (already in code).

## Checks
- [x] 395 Small sh-button uses scanned: every leading/trailing icon is 12
- [x] Glyph colour unchanged on all 154 fixed uses
