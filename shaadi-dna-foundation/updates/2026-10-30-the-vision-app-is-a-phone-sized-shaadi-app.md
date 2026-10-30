# The Vision App is a phone-sized Shaadi app

**2026-10-30**

## What changed
- **Layout:** the app is a phone-sized Shaadi app, full screen on a phone and a centred phone on a desktop. There's no separate desktop layout.
- **Bottom navigation:** `sh-navigation-bar` with glass, five tabs:
  - **Home:** the My Shaadi screen, copied from the Figma frame "Account — Premium".
  - **Matches:** Matches — Near Me.
  - **Catalog:** the Core components and the Foundation.
  - **Components:** every other component, plus the Jira stories.
  - **Premium:** Premium plans.
- **Real screens:** Home, Matches and Premium are built only from DNA components (`shaadi-vision-app/screens/`).
- **Everything is a DNA component:**
  - every page has an `sh-app-header`;
  - lists are `sh-list-default` rows, with an icon from the pack for every component;
  - the tabs, search, chips, stage stepper, cards and buttons are DNA components;
  - anything empty shows an `sh-empty-state` with a pictogram.
- `tools/vision.py` also writes `dist/vision/components.css`, which loads every component stylesheet, parts first.

## Why
The app is what we show the design VP and CEO. It should look and work exactly like the Shaadi app, built from the system it shows.

## Who needs to do something
- **Designers (Figma):**
  - **Art not in the repo:** the Gold+ badge, the Money back artwork, and the "70% OFF" `sh-navigation-offer` ticket. The Premium nav item uses the plain premium icon for now.
  - **sh-plan-card (collapsed):** it stacks the duration under the plan name; Figma has them on one line. "Best Value" sits in the top row.
  - **Unbound colours:** the benefit ticks and the location pin, so they draw dark instead of gold and red.
  - **Contacts bar:** Figma draws it at 33%, but "10 of 72 used" is 14%. The code follows the numbers.
  - **Lone-button rule:** the Premium CTA is capped at 200 wide by the rule; Figma shows it full width.

## Checks
- [x] Checked in the browser: all five tabs, Light and Dark, no console errors
