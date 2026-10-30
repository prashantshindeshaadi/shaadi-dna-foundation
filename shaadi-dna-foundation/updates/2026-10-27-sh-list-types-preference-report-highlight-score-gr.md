# sh-list Types: Preference, Report, Highlight, Score, Grouped

**2026-10-27**

## What changed

`sh-list` now has a **Type** property. The variant properties are Type, then Leading, Trailing and Style. The 43 rows it had before are all **Type=Default** and haven't changed. The new Types come from the full profile view (FPV) rows:

| Type | Style values | Used for |
|---|---|---|
| Default | Default, Inline | Any Leading × Trailing row, as before |
| Preference | Default, Collapsed · Trailing Match / No match | A You & Her partner-preference row: label, her value, then a tick or cross. Collapsed cuts a long value to two lines and adds See More. |
| Report | Default, Locked, Upgrade | A report or document row. Locked mutes the title and shows a lock. Upgrade is the row above locked reports, with an Upgrade button. |
| Highlight | Default | The pinned strip on the information background, with an icon and a text link (e.g. Ask her) |
| Score | Default, Locked | A pictogram with a name and value (koota points). Locked shows a lock instead of the value. |
| Grouped | Single, Start, Middle, End | Rows that share one outline. Each row draws its own part of the outline: Start has the top and rounded top corners, Middle only the sides, End the bottom and rounded bottom corners. There are no lines between rows. |

- **Grouped tokens:**
  - Outline: `border/soft` at `sh-stroke/default`; sides with no outline use `sh-stroke/none`.
  - Corners: `sh-radius/md`, with iOS corner smoothing.
  - Padding: `sh-space/12`.
- **Every new variant has a description,** and the set description lists the Types.
- **FPV astro privacy card:** `sh-fpv-astro-sheet-privacy` is now built from two `sh-list` rows, Grouped Start and End, with the edit icon swapped in. Its hand-built frames and three unknown (shadow) variable bindings are gone.
- **Subtitle sizing:** on every new variant the subtitle fills the width and grows in height, so a long subtitle wraps instead of overflowing.

## Why

Each FPV row pattern becomes one `sh-list` Type with its own states. Screens reuse the row instead of rebuilding it, and code gets one list component.

## Who needs to do something

- **Designers:** use `sh-list` Type Grouped, Preference, Report, Highlight or Score for these rows.
- **Web / Android / iOS:** `sh-list` has no code folder yet. Build from the blueprint.

## Still in progress

These FPV rows will move to `sh-list` instances next:
- You & Her preference rows
- the Reports card and the Kundali locked viewer
- the pinned strip
- the koota rows

## Figma inconsistencies found (not changed)

- **Default subtitle:** on all 43 Default variants, the Subtitle is fixed at 328 wide with no auto-resize. When it's shown, a long subtitle overflows.
- **Title icon placement:** the Title fills its row, so the title icon sits at the far end of the line. In the FPV privacy card, the shield sat right after the words.
- **Card radius:** `sh-radius/card` is 16. The FPV outline used 12, so Grouped uses `sh-radius/md`.
- **Gap:** the FPV privacy rows used a 10 gap (no token), so Grouped keeps the row's `sh-space/12`.
- **Preference fade:** the long-value fade in the source is a raw white gradient (no token, wrong in Dark mode). Collapsed uses two lines with an ellipsis instead.

## Checks

- [x] `python3 tools/check.py` passes
- [x] `python3 tools/order.py --check`
- [x] `python3 tools/build.py` run
