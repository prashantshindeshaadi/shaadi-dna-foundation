# Softer no-photo silhouettes, switchable nav tabs, Matches and Inbox icons

**2026-10-30**

## What changed
- The no-photo silhouettes (`sh-avatar-silhouette` Female and Male) use the designer's new, toned-down art: softer hair highlight and face, same size and position as before. Every `sh-avatar-placeholder`, `sh-overlay` no-photo state and profile card picks it up. `assets/female.svg`, `male.svg` and their @3x PNGs are re-exported.
- `sh-navigation-item` has a **Tab** switch (Home, Matches, Inbox, Chat, Updates, Premium, Premium offer). The icon and label come with the Tab; the old free Label and Icon properties are gone.
- `sh-navigation-bar` is now **Device** (Mobile, Tablet, Desktop) + **Show tab 6**. Its six slots (Tab 1–6) are exposed tabs, so any slot can be any tab and any slot can be active. The old Active switch on the bar is gone.
- Nav web code matches Figma: glass bar (`sh-gradient/translucent/light/strong`, translucent light border, background blur), tabs that hug their content and spread evenly, tertiary inactive tabs, active icon in `sh-gradient/brand`, brand and neutral badges. Code Connect templates read the new Tab and slot properties.
- `sh-avatar-silhouette` has Jetpack Compose (`ShAvatarSilhouette`) and SwiftUI (`ShAvatarSilhouette`) code with Code Connect, next to its web code.
- New icon `matches` (line + filled). `inbox` now has the app's envelope. The icon list is re-exported with its search keywords; a few glyphs that had drifted from Figma are refreshed.

## Why
- The old silhouettes were too bright on the new lighter grey placeholder.
- The designer wanted to swap any nav tab for another (for example, Premium out and Updates in) without a separate bar variant for every case.
- Matches and Inbox now use the icons from the live app.

## Who needs to do something
- **Designers:** pull the updated library. On a nav bar, pick each slot's Tab in the property panel.
- **Web:** the nav markup is the same; restyle comes from the CSS. Use `icons/line|filled/matches.svg` for Matches.
- **Android / iOS:** re-copy the silhouette assets when the no-photo state is built.

## Still open
- The Premium offer ticket (70% OFF) art isn't in `icons/` yet; the web template shows the Premium icon in its place.

## Checks
- [x] `python3 tools/check.py` passes
- [x] `python3 tools/build.py` run
- [ ] FOUNDATION.md updated if a rule changed (no rule changed)
