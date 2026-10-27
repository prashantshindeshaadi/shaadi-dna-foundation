# Button icon spacing on the button's own gap

**2026-10-27**

## What changed

- **`sh-button`: the space between an icon and the label is now the button's own auto-layout gap, the same on both sides of the label:**
  - Small: `sh-space/2`.
  - Medium: `sh-space/4` (was 2).
  - Large: `sh-space/4`.
- **The extra 2 px right padding on every Leading icon frame is removed** (90 frames). The icon frames now carry no spacing of their own.
- **Space between the leading icon and the label:**
  - Small: 4 → 2.
  - Medium: 4 (unchanged, now from the gap alone).
  - Large: 6 → 4.
- **Space between the label and the trailing icon:** Medium 2 → 4. Small and Large are unchanged.
- **All 108 variants were updated.** All 940 buttons in the file follow the main; none overrides the gap or the icon padding.
- **Code updated to match:** web, Compose and SwiftUI (Medium gap 4). The blueprint table now shows one gap per size and the Small icon at 12.

## Why

Spacing belongs on the component's gap, not as padding on the icon. One token per size is cleaner and keeps both sides of the label even.

## Who needs to do something

- **Web / Android / iOS:** take the updated `components/sh-button/`.

## Checks

- [x] `python3 tools/check.py` passes
- [x] Figma: Large, Medium and Small checked by screenshot; 940 copies scanned
- [x] SwiftUI typecheck: 0 errors; web demo rendered
