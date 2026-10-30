# Profile tags: all 20 tall, border inside

**2026-10-26**

## What changed

- **Common component change:** `sh-tag-profile` Promoted, Top Profile and Distance now use `sh-tag` **Size=Small** (20 tall), like Online, Offline, You & Her and Astro. They used Medium (22). All 7 profile tags are now 20 tall. Their icons are unchanged (megaphone-02 Filled 12, wings 14, pin 14).
- `sh-tag` already draws its border **inside** (0.5 px, `INSIDE`, on an absolute "Border" layer) at every size, so the border never adds height. No change was needed there.
- 18 copies on cards and pages were pinned to 22 and are now 20. 0 profile tags in the file are off 20.

## Why

The profile card tags must line up at one height: 20, with the border kept inside.

## Who needs to do something

- **Developers:** profile tags are 20 tall, with the border drawn inside (it doesn't add to the height).

## Checks

- [x] 7 / 7 `sh-tag-profile` variants at 20; 0 copies off 20
- [x] All 7 render side by side on a photo-tone background
