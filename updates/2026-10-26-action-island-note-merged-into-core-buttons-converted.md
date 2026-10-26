# Action island and note merged into Core; legacy buttons converted

**2026-10-26**

## What changed

### `sh-action-island` and `sh-action-note` are now Core components
- Both sets moved from Pratik's Profile Card page into **Core Component → 01 Actions**, below `sh-button`, with their labelled grid (Type / CTA rows, Normal / Floating columns, the "add a case / suggest an edit" note). Label colours were switched to the light-section tokens (`text/primary`, `text/secondary`).
- They are the same components (same node ids), so all **106 uses stay linked**. The sections below on the Core page moved down by 1,122 px, and the Examples sections moved with them so they stay aligned.
- Profile Card page: the emptied section C was removed and the page re-laid out. The sections are now A · sh-profile-card, B · Info box, C · Photo area, D · sh-mini-card.
- Repo: `components/profile-card/sh-action-island|note/` moved to `components/sh-action-island|note/` (blueprints regenerated as Core; web / compose / swiftui code moved with `git mv`). The web pages' relative paths were fixed for the shallower folder, and every reference to the old folders was updated. All linked CSS and icons resolve. The index lists both under Core.

### Detached segmented controls converted
- 3 detached "Segmented control" frames on Overview (Premium / Profile / Settings) are now `sh-segmented-control` Items=3, with the same selected segment (Settings × 2, Premium × 1). They use the control's standard hug width (Daren's toggle size) instead of the old stretched 320.

### Legacy buttons converted to `sh-button`
- **Overview** (old docs): Refine × 2 → Tertiary Small; "Button" / Email / Google → Tertiary Large with the plus icon (the originals' placeholder; `sh-icon/brand/google` only exists at 32 and the icon slot is fixed); Next × 2 → Primary Large; Back × 2 → Tertiary Large with the back arrow.
- **Navigation page, "Change Attempt – Can use this!"**: Continue with Gold+ × 2 and "Offer expires in…" → Primary Medium, keeping their widths.
- **Left as is (on purpose):** the buttons inside Sunil's "Old (cropped)" columns of *Compare — old vs new*, which are the old reference being compared. The one in Sunil's "Old (cropped)" Brand footer also stays as the old reference.
- Earlier the same day: 6 FPV pills ("View" × 5, the proposal "Upgrade Now") moved to `sh-button` Premium Soft Small.

## Why

The action island is a common pattern, not a profile-card part, and live designs should only use `sh-button`.

## Who needs to do something

- **Developers:** import island / note from `components/sh-action-island` and `components/sh-action-note`. Code Connect files moved too: republish them at the next Code Connect sync.
- **Pratik:** the island and note are now on the Core page; nothing changes in use.

## Checks

- [x] 106 / 106 island uses still linked after the move
- [x] Core 01 Actions renders with the labelled grids
- [x] All linked files in the moved web pages resolve
- [x] The 3 segmented controls render with the right segment selected
