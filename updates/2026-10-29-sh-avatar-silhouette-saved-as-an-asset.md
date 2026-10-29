# sh-avatar-silhouette saved as an asset

**2026-10-29**

## What changed
- New blueprint `components/profile-card/sh-avatar-silhouette/`.
  - The silhouette art (Female · Male) as transparent files: `assets/<gender>.svg` (492 × 492) and `assets/<gender>@3x.png` (480 × 480).
- It's an asset: replace the art in a variant, or add a variant, and every `sh-avatar-placeholder` and `sh-overlay` No photo / Photo requested updates. The blueprint lists the steps.
- Checked: the updated female art in Figma matches the `sh-avatar-placeholder` JPGs already on GitHub (only JPEG noise between them), so they didn't need re-exporting.
- `components/README.md`: sh-avatar-placeholder 6 variants / 3 properties; sh-avatar-silhouette added.

## Why
The silhouette will be swapped or extended later, so it needs its own source files and a place to document changes.

## Who needs to do something
- **Designers:** change the silhouette in `sh-avatar-silhouette` only. Keep each figure centred in its square.
- **Developers:** use the SVG or PNG if you draw the silhouette yourself; otherwise keep using the placeholder JPGs.

## Checks
- [x] `python3 tools/check.py` passes
- [x] Figma vs repo pixel check on all 6 placeholder images
