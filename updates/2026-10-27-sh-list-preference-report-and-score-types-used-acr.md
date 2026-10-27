# sh-list: Preference, Report and Score types used across FPV

**2026-10-27**

## What changed
`sh-list` is now the one list-row component for every list on FPV. Types were added earlier today; this pass finished their states and moved the hand-built rows onto them.

- **Preference** (partner preference, label above value):
  - `Trailing`: Match (active, check) / No match (disabled text, close)
  - `Style`: Default · Collapsed (2 lines + **Read More** ⌄) · **Expanded** (new: full text + **Hide** ⌃)
  - Read More / Hide follow the FPV expand-button rule: `sh-button` Tertiary Medium, no fill, side padding 0, chevron. Content is left-aligned so short labels don't shift.
- **Report** (no side padding; the container insets it):
  - Chevron = open
  - **Download** (new) = Premium viewer
  - **Lock · Premium** (new) = free viewer on the profile: readable text, gold lock
  - **Lock · Locked** (was Chevron · Locked) = greyed text, grey lock, in sheets
  - **Action · Upgrade** = premium soft band with the Upgrade button. It keeps 16 padding because it is a filled band.
- **Score:** row minimum height removed, so it is 40 tall. These rows aren't tappable.

## Migrated (text, icons, pictograms and states kept)
- `sh-fpv-you-and-her`: 6 preference rows in the main. The 2 copies with "Country Living In" not matching keep No match. The 2 exploration frames keep their Read More / Hide states.
- Kundali report sheets: 6 hand-built groups.
  - The upgrade strip is now Report Upgrade.
  - The 2 locked rows are now Report Lock · Locked, in an inset `Reports` frame.
- `sh-fpv-astro` Reports cards, 4 mains:
  - Free → Lock · Premium, Premium → Download.
  - Rows sit in 16 inset wrappers, and the divider is now `sh-divider` running edge to edge.
- `sh-fpv-astro-koota-row`: 78 uses → `sh-list` Score (Default / Locked). The component is deleted.
  - All 52 nested screen copies match.
  - The Temperament 0 / 6 dimmed colour (text/disabled) was restored in the breakdown North main.

## Who needs to do something
- **Designers:** for any list row, use `sh-list` and pick `Type`. Don't build rows by hand. `sh-fpv-astro-koota-row` no longer exists.
- **Developers:** one list-row component with the types above. The sh-list blueprint and code need regenerating at the next code sync.

## Checks
- [x] Renders checked: preference states, report states, sheet group, widget Free / Premium cards, koota breakdown
- [x] 0 uses left on `sh-fpv-astro-koota-row` before delete

## Later the same day: one sh-list, options per Type (profile-card pattern)
- **`sh-list`** is now a set with one switch, **`Type`**: Default · Preference · Report · Score · Highlight · Grouped · Info.
  - Each Type holds its own part, exposed as **Row**.
  - When you pick a Type, only that type's options appear, the same way `sh-profile-card` works.
- **Parts** (each with only its own options):
  - `sh-list-default`: Leading / Trailing / Style. New: Leading=Control · Inline, for checkbox rows in sheets with no side padding (31 report-reason rows switched).
  - `sh-list-preference`: State Match / No match × Style Default / Collapsed / Expanded.
  - `sh-list-report`: State Open / Download / Premium lock / Locked / Upgrade.
  - `sh-list-score`: State Default / Locked.
  - `sh-list-highlight`: one variant.
  - `sh-list-grouped`: Position Single / Start / Middle / End.
  - **`sh-list-info`**: was `sh-fpv-info-item`, moved to Core. Lines Single / Double × Content Text / Masked…
- **Uses moved onto `sh-list`: 658**, copying every override (text, icon swaps, colours, control states).
  - By Type: Default 167 · Preference 84 · Report 76 · Score 78 · Grouped 14 · Info 239.
  - Every row was checked against its content before the move.
  - The hand-built "Student Visa" Lifestyle row is now an Info row.
- **Not moved:** 87 `sh-list-default` rows inside sheet slot content (Sunil 14 + FPV 28 copies, 45 in slots). The Figma API blocks deleting nodes in slot content. They still work as `sh-list-default` and can be moved by hand.
  - In one Sunil sheet slot (the "We're reviewing your report" content), the API also couldn't delete 2 extra copies it had added. They are hidden and named "(duplicate — delete) sh-list"; delete them by hand.
- **Restored after the move:** Score, Report and Grouped text (from the koota record and version history) and three Info rows. The Temperament 0 / 6 dimmed colour was kept.
- The 2 "You and Ananya" summary blocks in the astro sheets went from 20 to the 32 sheet margin.
- Scripts: `scripts/list-split.js`, `scripts/list-wrap.js`, `scripts/list-wrap2.js` (override-preserving move).
