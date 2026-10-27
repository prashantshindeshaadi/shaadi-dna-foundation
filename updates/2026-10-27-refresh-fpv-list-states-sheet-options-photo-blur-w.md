# Refresh: FPV list states, sheet options, photo blur wash

**2026-10-27**

## What changed

This refresh picks up the Figma changes made after the morning refresh (`/shaadi-dna-update`). All 128 sets were compared with the last read. 10 had changed and 1 was new, and only those were read again. Variables, gradient styles and the icon count (401) are unchanged.

- **`sh-list-score`:** new State **No match** for a score of 0. The name, points and pictogram all dim (`text/disabled`, pictogram `sh-opacity/disabled`).
- **`sh-list-grouped`:** the Title icon is `icon/tertiary`.
- **`sh-bottom-sheet`:**
  - **Show profile** is gone. A member photo now goes in the Visual slot.
  - **Show grabber** is gone. The grabber shows only on Size=Full.
- **FPV sheets:** the `sh-fpv-sheet-phone-number`, `-connect-limit` and `-manage-boundaries` blueprints show no visible change.
- **`sh-fpv-lifestyle`:** now has 2 variants (Visible NRI, Visible RI). The Tit for tat state is its own component, **`sh-fpv-lifestyle/Free/Tit for tat`**, with a new blueprint. It has to sit outside the set: it shows a blurred copy of the Visible RI variant, and Figma won't let a variant contain its own set.
- **`sh-user-images` Blur:** the wash over the blurred photo is now `sh-gradient/translucent/dark/extra-soft`. It was `background/default` at 1 % with no token.
  - Code is updated on all three platforms (web `--sh-gradient-translucent-dark-extra-soft`, Compose `ShGradient.translucentDarkExtraSoft()`, SwiftUI `SH.Gradient.translucentDarkExtraSoft.view`).
  - The "no token" note is removed.
- **`sh-profile-card-info`:** the Verified, Premium and VIP badges are bound to `sh-icon/size/20`. Code already uses 20.
- **`sh-mini-card`:** the badges are bound to `sh-icon/size/16` (from this morning's change).
- **Log tidy-up:** the peer session's newest "Later" notes went into a separate file again. They are merged into "sh-list: Preference, Report and Score types used across FPV".

## Why

To keep the repo the same as Figma after the afternoon's FPV work.

## Who needs to do something

- **Web / Android / iOS:**
  - Blurred photos: take the new `sh-user-images` code. The wash is now the translucent dark gradient.
  - A score of 0 uses `sh-list-score` State No match.
  - Sheets show the grabber only when the sheet scrolls (Size=Full).
- **Designers:** none.

## Figma inconsistencies found (not changed)

- **Female 2 Blur wash:** `sh-user-images` Gender=Female 2, Style=Blur uses `sh-gradient/translucent/dark/soft`. The other 28 Blur variants use `dark/extra-soft`.
- **Lifestyle stroke:** `sh-fpv-lifestyle` cards still have a stroke bound to a variable that isn't in `tokens/` (`VariableID:16:324`, a shadow or deleted variable).

## Checks

- [x] `python3 tools/check.py` passes
- [x] `python3 tools/order.py --check`
- [x] `python3 tools/build.py` run
- [x] SwiftUI typecheck: 0 errors
- [x] Web preview: `sh-user-images`
