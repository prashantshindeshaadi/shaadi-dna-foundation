# sh-badge takes over Daren's Trust Badges

**2026-10-23**

## What changed

### `sh-badge` (common component change)
- New variant property **`Layout`**:
  - **Stacked** (default): pictogram above the label. This is the current look, now 80 wide like Daren's badge (it was 73).
  - **Inline**: pictogram beside the label, label left-aligned. It replaces Daren's "Wide" style.
- Both layouts have Default and Hover, with the same tokens (`sh-space/8` gap, `sh-space/4` padding, min height `sh-space/48`, `sh-typo/Support/Label`, `text/secondary` → `text/primary` on hover, `background/soft` + `sh-radius/md` on hover). 4 variants in total.
- The default `Leading icon` is now `sh-icon/pictogram/parent`, so it matches the default label "Managed by Parent". Before, it was `ver-gold-diamond`.
- `sh-icon/pictogram/self-male` was added to the icon's preferred swaps.
- There is no `Type` property: every trust badge is `sh-badge`, its pictogram and its label.

| Badge | Pictogram | Label |
|---|---|---|
| Shaadi ID | `shaadi-id` | Shaadi-ID SH…  |
| Basics Verified | `verified-basic` | Basics Verified |
| Super Verified | `verified-super` | Super Verified |
| Managed by Parent | `parent` | Managed by Parent |
| Managed by Consultant | `consultant` | Managed by Consultant |
| Managed by Self | `self-female` / `self-male` | Managed by Self |
| VIP Member | `vip-shaadi` | VIP Member |
| Premium Member | `premium-member` | Premium Member |

  All art was already in the pack as `sh-icon/pictogram/*`, with the same images as Daren's, except Self male.

### Pictograms
- **`sh-icon/pictogram/parent` is now Daren's pair**: the female and male figures overlapping, clipped to the square at every size (28 / 40 / 64 / 96). Before, it showed only the male figure, which is Daren's "Managed by Self" (male) art. Its one use, the "Managed by Parent" badge in `sh-fpv-header`, now matches Daren.
- **New `sh-icon/pictogram/self-male`**: the single male figure, for "Managed by Self" on male profiles. It sits next to `self-female` on the Shaadi Icons page.
- `components/icons.md` and `icons/pictogram/` are updated (the `parent` PNG is new; `self-male` is added).

### Daren's copies removed (FPV page)
- "Trust Badges" (14 variants) and "Tag Container" (21 variants) were deleted. All 84 Trust Badges uses were inside Tag Container, and Tag Container had 0 uses, so no screen changed.
- **Not carried over:** Daren's "Grey Placeholder" toggle (a grey circle behind the art). Nothing used it.

## Why

There is one badge component in the system. Daren's badge was a second look-alike with unstyled text and pasted images.

## Who needs to do something

- **Designers:** for a trust badge, use `sh-badge`, swap the pictogram and set the label. Use Inline where the row is wider than it is tall.
- **Developers:** `sh-badge` gets `layout: stacked | inline`. Use the pictograms `parent` (new art) and `self-male` (new).

## Checks

- [x] All 4 variants render (Stacked / Inline × Default / Hover)
- [x] The 4 `sh-fpv-header` badges are unchanged, apart from the Parent art now matching Daren
- [x] The `parent` and `self-male` pictograms render at 28 / 40 / 64 / 96
- [x] 0 uses of Trust Badges or Tag Container before they were deleted
