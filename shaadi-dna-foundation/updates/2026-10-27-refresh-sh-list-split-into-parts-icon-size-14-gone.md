# Refresh: sh-list split into parts, icon size 14 gone, badges Small 16

**2026-10-27**

## What changed

This is a full live read of the Figma file (`/shaadi-dna-update`): variables, gradient styles, all 127 component sets and all 401 icons.

- **Variables:**
  - `sh-icon` `size/14` and `stroke/14` are gone from the repo too. They were removed in Figma on 2026-10-26 (see "Icon size 14 removed"), but the repo still had them until now.
  - Nothing else changed.
- **Gradient styles:** no changes.
- **Components:** there are now 127 sets (was 120).
  - **New:**
    - `sh-list`: one `Type` switch: Default, Preference, Report, Score, Highlight, Grouped, Info.
    - The parts it shows as **Row**: `sh-list-default`, `sh-list-preference`, `sh-list-report`, `sh-list-score`, `sh-list-highlight`, `sh-list-grouped` and `sh-list-info`.
    - `sh-fpv-footer-cta` and `sh-fpv-footer-boundaries`.
  - **Renamed or moved:**
    - The old `sh-list` set (`2643:35319`) is now `sh-list-default`.
    - `sh-fpv-info-item` is now Core as `sh-list-info`. Its old folder is removed.
  - **Removed:** `sh-fpv-astro-koota-row`. Its rows are `sh-list` Score now, and its folder is removed.
  - **Rebuilt:** `sh-fpv-locked-text` is a new set with 2 variants and a new node id.
  - **Changed blueprints:**
    - The FPV parts moved onto `sh-list`: You & Her, astro, footer, request card, phone-number sheet, astro sheet parts. See "sh-list: Preference, Report and Score types used across FPV" and "Phone number sheet: contact buttons are sh-action-island".
    - `sh-bottom-sheet`: Visual slot hugs its content.
    - `sh-semantic-button`: Small spinner is size 16.
    - `sh-data-point`: sm icon is size 16; lock is size 12 at every size.
    - Medium button gaps (from "Button icon spacing") now show in `sh-dialog`, `sh-action-island` and `sh-empty-state`.
    - `sh-text-link` instances now list Underline.
- **Icons:**
  - `sh-icon/verified-badge` and `sh-icon/premium-badge` Size Small went from 14 (unbound) to 16, bound to `sh-icon/size/16`. Medium is bound to `sh-icon/size/20`.
  - `verified-badge` has a new border colour.
  - The other 12 icons that came out different were sub-pixel export noise, so they're kept as they were.
- **FOUNDATION.md §5.5:** icon sizes are 12, 16, 20, 24.
- **Code (sizes that used the removed 14):**
  - `sh-tag-profile` Top Profile wings and the Distance pin are `sh-icon/size/12`, as in Figma. Web, Compose and SwiftUI are all updated.
  - `sh-mini-card` badges are `sh-icon/size/16`. Web uses `.sh-badge--16`; Compose and SwiftUI use size 16.
  - `sh-icon` web: `.sh-icon--14` is removed, and `.sh-badge--14` is now `.sh-badge--16`.
- **Profile card size:** Figma is 340 × 542. The blueprint and all three code versions already use that frame proportion, so nothing changed.

## Why

To keep the repo the same as Figma after today's `sh-list` work and FPV migrations. Removing the 14 tokens also meant fixing the code that still used them.

## Who needs to do something

- **Web / Android / iOS:**
  - `sh-icon/size/14` no longer exists. Use 12 for tag art and 16 for badges.
  - `sh-list` is now a Type switch over its parts. Build each part from its blueprint; none of them has code yet.
- **Designers:** none.

## Figma inconsistencies found (not changed)

- **Semantic button padding:** the `sh-semantic-button` Leading icon has `sh-space/2` right padding on 180 of 216 variants. `sh-button` now puts its spacing on the button gap instead.
- **Dialog gap:** in `sh-dialog` Type Destructive, the Primary action keeps a gap of `sh-space/2`. Type Default uses `sh-space/4`.

## Checks

- [x] `python3 tools/check.py` passes
- [x] `python3 tools/order.py --check`
- [x] `python3 tools/build.py` run
- [x] SwiftUI typecheck: 20 files, 0 errors
- [x] Web previews: `sh-mini-card`, `sh-tag-profile`
