# sh-tag-profile: Offline

**2026-10-26**

## What changed

- **Common component change:** `sh-tag-profile` has a new **Type=Offline**, the pair of Type=Online. It has the same structure (`sh-tag` Translucent light, Small, Pill) and the label "Offline", with a grey status dot.
- **New icon `sh-icon/tag/offline`** (Size 20 / 16 / 14 / 12) sits next to `sh-icon/tag/online`. It has the same geometry and keeps the **soft halo ring** (Prashant's call: it looks better), with the core and halo on `neutral/400`, the same lightness as online's `green/300`. The concept comes from Pratik's Online / Offline component; our structure is kept.
- Descriptions for Online, Offline and the set were updated.

## Why

Profile cards need to show offline as well as online.

## Who needs to do something

- **Designers:** use `sh-tag-profile` Type=Offline when the member isn't online.
- **Open:** Pratik's file uses a `status-indicator/neutral` token. We have no status-indicator tokens, so the dot uses `neutral/400`. Add a semantic token in Figma if one is wanted.

## Checks

- [x] Online and Offline side by side on a photo-tone background
- [x] Offline icon at all 4 sizes
