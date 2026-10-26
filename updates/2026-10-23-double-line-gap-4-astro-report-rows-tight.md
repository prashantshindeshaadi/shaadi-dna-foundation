# Double-line info gap 4, astro report rows on Tight

**2026-10-23**

## What changed

- **`sh-fpv-info-item` Lines=Double, Content=Text:** the gap between the two text lines (Description, then Support) is now `sh-space/4`. It was `sh-space/8`. The change is in the main component, and all 18 uses follow it; none had its own override.
- **`sh-fpv-astro` report rows** (her Kundali report, compatibility report): every state now uses the styles from Both added · Free, North:
  - Title: `sh-typo/Body/LG/Tight`
  - Sub line: `sh-typo/Body/MD/Tight`
  - 12 texts in 3 states were changed: Both added · Premium North, Free South and Premium South. They were on `Body/MD/Default` and `Body/SM/Default`.
  - All 74 report-row pairs in the 37 uses now show these styles.
  - Other astro sections were not touched.

## Why

The two lines of one fact read as one unit. The astro report rows now match in every state.

## Who needs to do something

- **Developers:** 4 px between the two lines of a double-line info row. Report rows use Body LG Tight / Body MD Tight.

## Checks

- [x] 18 / 18 double-line rows at `sh-space/4`
- [x] 74 / 74 report-row titles on Body/LG/Tight, sub lines on Body/MD/Tight
