# sh-avatar-silhouette

**Purpose:** The no-photo silhouette art, one variant per Gender. White with soft edges, so it works on any background. It is an **asset**: replace the art in a variant, or add a variant for a new case, and every `sh-avatar-placeholder` and `sh-overlay` (No photo / Photo requested) that uses it updates.

Profile card (migration, not yet core) · 2 variants · [Open in Figma](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=3598-69346) (node `3598:69346`)

**Assets:** [female.svg](assets/female.svg), [female@3x.png](assets/female@3x.png), [male.svg](assets/male.svg), [male@3x.png](assets/male@3x.png)

*Hand-written 2026-10-29; regenerate with `tools/components.py` on the next export.*

## Variants

| Gender | Art |
|---|---|
| Female | long hair, head and shoulders (vector) |
| Male | short hair, head and shoulders (vector; two soft-gradient areas are bitmaps inside masks in the source art, so the SVG embeds them) |

## Properties

| Property | Type | Values | Default |
|---|---|---|---|
| Gender | variant | Female, Male | Female |

## Anatomy

- root: 492 × 492 square, clips content, no fill
  - **Art**: one frame holding the vectors, centred, with an even margin (the figure fills 84% of the square). It scales with the square.

## Assets

- `assets/<gender>.svg`: transparent, 492 × 492.
- `assets/<gender>@3x.png`: transparent, 480 × 480, for a 160 slot.

Both are white art on transparent, so place them on the placeholder background. In code, the silhouette is a plain image drawn over the `sh-gradient/placeholder/*` background; no flattened JPGs.

## Changing or adding art

1. In Figma, replace the vectors inside **Art** in a variant, or duplicate a variant and add a new value (for example a new Gender case).
2. Keep the figure centred in the square, with the same margin, so it lines up everywhere it is used.
3. Export the SVG and the @3x PNG into `assets/`.
4. Add an `updates/` entry.

## Used in

- `sh-avatar-placeholder` › Silhouette › Art (every Gender × Aspect Ratio)
- `sh-overlay` No photo / Photo requested › Icon/Illustration › Avatar (the **Avatar** swap)
