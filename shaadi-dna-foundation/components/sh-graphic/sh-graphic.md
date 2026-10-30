# sh-graphic

**Purpose:** Section images for locked sections, all 3:1. **Type** Art = the hand + object drawing; **Type** Backdrop = a blurred mock of that section, soft edges baked in. Pick the section in **Graphic** and the theme in **Mode**. `sh-blur-overlay` stacks Backdrop under Art in its 3:1 Visual box.

Core · 32 variants · [Open in Figma](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=3383-80983) (node `3383:80983`)

*Hand-written 2026-10-28; regenerate with `tools/components.py` on the next export.*

## Properties

| Property | Values | Default |
|---|---|---|
| Type | Art, Backdrop | Art |
| Graphic | Astro, Lifestyle, Education & Career, Family, Contact, Photos, Photo break, Placeholder | Astro |
| Mode | Light, Dark | Light |

On the Core page the set is a grid: one row per Graphic; columns Art Light · Art Dark · Backdrop Light · Backdrop Dark.

## Variants

| Graphic | Art | Backdrop (blurred mock of) |
|---|---|---|
| Astro | hand holding a pocket watch (astro-r3-hand-pocket-watch) | Guna score ring + match line |
| Lifestyle | hand with a paintbrush (lifestyle-interests-r3-hand-paintbrush) | lifestyle / interests cards |
| Education & Career | hands holding an open book (education-career-r3-hand-book) | education / career cards |
| Family | hands around a lit house (family-details-r3-hands-house) | family details text |
| Contact | hand holding a phone (contact-r3-hand-phone) | phone and email rows |
| Photos | hand holding an instant print (photos-r3-hand-print) | the 4-photo album stack |
| Photo break | same art as Photos | a single full photo |
| Placeholder | dashed box: "Graphic · 3:1 · add the final art as a new variant" | a generic paragraph, for sections with no backdrop yet |

Art Dark = the same art; it exists so every Graphic has both modes.

## Anatomy

- **Art** variants: 360 × 120 (3:1), clips content, no fill
  - **Fade**: alpha mask; opaque down to 70%, then clear at the bottom
  - **Art**: 1080 × 360 image, fills the frame
- **Backdrop** variants: 360 × 120 (3:1), clips content, no fill
  - **Backdrop**: 720 × 240 image, fills the frame (stretches with it)

## Assets (code)

`assets/backdrop-<graphic>-<light|dark>.jpg`: 720 × 240 JPEG, 6–15 KB each. Opaque: the page colour (`background/default` of that mode) is baked into the edges, so the image needs no mask or gradient. Blurred images have no fine detail, so one size serves every density.

## How a backdrop is made

`scripts/backdrop-render.js` (DNA Skills) renders the section component itself with mock data:
1. Its own title is hidden; the crop is the section's content column (320 wide, 3:1).
2. It is blurred (14) inside a wider wrapper filled with the page colour, so no edge goes clear or hard.
3. Soft fades into the page colour are baked in: top, both sides, and a longer fade over the bottom half.
4. Exported for Light and Dark.

A new section = render its backdrop with the script, add its Art from visual design. Until then use Placeholder.

## Rules

- 3:1 always. Art and Backdrop share the same box, so they line up at any width.
- Backdrops are mock data only, never a real member's content.
- The current art has a white background baked in. A transparent version (hand + object only) would sit cleaner on the backdrop; ask visual design for it.
- Swap by picking values. Never paste art or a screenshot straight into a slot.

## Replaces

`sh-fpv-asset/astro-card-art`, `sh-fpv-asset/ask-banner`, the loose "Art · Astro · reference" and "Art · placeholder" components, and the blurred live section copy that used to sit inside `sh-blur-overlay`.
