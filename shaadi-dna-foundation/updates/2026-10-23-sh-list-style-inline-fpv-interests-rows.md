# sh-list Style=Inline, FPV Interests rows

**2026-10-23**

## What changed

- **Common component change: `sh-list` has a new variant property `Style` = Default / Inline.**
  - All 42 existing variants are `Style=Default` and unchanged.
  - New `Leading=Icon, Trailing=None, Style=Inline`: an icon + text row that sits inside a card. It is 40 tall (padding `sh-space/8` top and bottom, 0 at the sides), with a `sh-space/16` icon gap and no divider. The title is `sh-typo/Body/LG/Default` in `text/secondary`, and the 20 px leading icon is `icon/secondary`.
  - Inline rows are read-only info, so the 48 px minimum height of the tappable list rows is not applied.
  - Same properties as the other variants: Title, Leading icon, Subtitle, Title icon, Show divider (the property links were re-applied after cloning).
- **`sh-fpv-lifestyle`:** the 5 Interests rows ("Hobbies · item 1–5", plain frames) are now `sh-list` Inline instances in both Visible variants, with the same labels and icons. The Tit-for-tat variant follows through its nested preview.
- **Per-screen hobbies kept:** 2 screens had their own hobbies:
  - Trekking / Cooking / Reading
  - Cricket / Biking

  The first swap dropped these overrides; they were restored from the 09:32 version as Title / Leading icon properties on the new rows.

## Why

Review comment: "use sh-list-item". Icon + text info rows should come from one list component, not hand-built frames.

## Who needs to do something

- **Developers:** `sh-list` gains `Style: Default | Inline` at the next blueprint sync.
- **Next (not done):** the Student Visa row and the `sh-fpv-info-item` rows in the same section could move to `sh-list` Inline too; waiting for a go.

## Checks

- [x] Inline row is 40 tall and matches the old hobby row (text, icon, colours, gap)
- [x] Screens with their own hobbies show them on the new rows
