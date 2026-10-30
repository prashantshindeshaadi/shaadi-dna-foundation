# sh-input Text box (border-only states), semantic button padding

**2026-10-26**

## What changed

### `sh-input`: Multi-line is now Text box (common component change)
- The variant value `Type=Multi-line` is renamed **`Type=Text box`**. Instances keep their variant.
- In the Text box states Error, Warning, Success and Info, the field no longer has a tinted background. It uses `background/default`, like Default, and only the border carries the meaning (`semantic/{error, warning, success, information}/border/default`). The helper text keeps its semantic colour.
- Disabled keeps `background/disabled`.
- The single-line `Default` and `Phone` types are unchanged; they still have the tinted backgrounds.
- 1 Text box use in the file.

### `sh-semantic-button` matches `sh-button`
- Small side padding is now `sh-space/16` (it was 12). Medium stays 16 and Large 20.
- Min width is 56 on all 216 variants (it was 60). It's a raw value, because there is no `sh-space/56` token.

### Docs
- `sh-input` and `sh-semantic-button` blueprints were regenerated from Figma.
- The hand-written `sh-button` blueprint now lists padding 16 for Medium and Small, the gaps 4 / 2 / 2, and min width 56.

## Why

A text box reads clearly with a coloured border alone; the tint added noise. Both button families share one padding and min-width rule.

## Who needs to do something

- **Developers:** rename `multi-line` → `text-box` at the next blueprint sync. In text-box error / warning / success / info states, there is no background tint, only the border.
- **Open:** should single-line inputs also drop the tinted background in semantic states?

## Checks

- [x] All 8 Text box states render: semantic states show a coloured border on a default background
- [x] 216 / 216 semantic button variants: Small 16 / Medium 16 / Large 20, min width 56
