# Web code for a component (HTML/CSS + Code Connect)

How every `components/<…>/<sh-name>/web/` folder is built, so all of them read the same. Paths are
relative to `shaadi-dna-foundation/`. Good examples to copy: `sh-divider` (small), `sh-tag` (variants),
`sh-button` (states), `profile-card/sh-profile-card` (a composite).

## Inputs

1. **The blueprint** `<sh-name>.md`: purpose, properties, every variant, anatomy and the token for each
   value. It is generated from Figma; never edit it. If it is wrong or thin, say so in your report.
2. **`FOUNDATION.md`**: the rules, especially §4.2 (what may sit on what) and §9 (self-check).
3. **Figma, read-only**, when the figma-console bridge is connected: screenshot the component set to
   compare. Never write to Figma.

## Output: three files in `web/`

### `<sh-name>.css`

- Header comment like `sh-divider.css`: spec link, Figma node, a usage snippet, and every modifier.
- Class names: `.sh-name` block, `.sh-name--<value>` per variant value (the default value has no
  modifier), `.sh-name__<part>` per anatomy part, all lower-case kebab.
- **Tokens only**: every colour, size, space, radius, stroke, shadow and opacity is `var(--sh-…)`.
  No hex, `rgb()`, or raw px (except `0`). A value with no token: stop, write it in your report.
- Text style comes from the `sh-typo` classes in the HTML (`sh-body-md`, `sh-button-sm`…).
- Icons: `<span class="sh-icon sh-icon--16" style="--icon:url(<path to icons/…>.svg)">`, colour from a
  token. Check icons are Filled. Only icons from `icons/`.
- Every interactive part: hover, pressed, `:focus-visible`, disabled (`opacity: var(--sh-opacity-disabled)`),
  loading when async. Tap area at least 48 × 48.
- Light and Dark come from the tokens by themselves; never hard-code a mode.
- **Composites use their parts.** Use the parts' classes and link their CSS; never copy a part's styles.

### `<sh-name>.html`

A demo page with every variant, like `sh-tag.html`:

- Links, with `../` to the right depth: `dist/css/tokens.css`, `dist/sh-typo-kit/developer/web/sh-typo.css`,
  `components/sh-icon/web/sh-icon.css`, each part's CSS, then its own CSS.
- `<h1 class="sh-heading-md"><sh-name></h1>`, then one section per property. Each variant is in a
  `<figure>` with a `<figcaption>` written like Figma: `Type=Connect, Size=Small`.
- No outside images. A photo is a neutral data-URI placeholder (see `sh-tag.html`).
- Real-looking, short content; no lorem ipsum.

### `<sh-name>.figma.ts`: a Code Connect v2 template

```ts
// url=<the "Open in Figma" link from the blueprint>
// component=<sh-name>
// Code Connect template · <sh-name> → HTML/CSS
// Every variant: <sh-name>.html · styles: <sh-name>.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)

import figma from "figma"

const type = figma.selectedInstance.getEnum("Type", { Default: "", Soft: " sh-name--soft" })
const label = figma.selectedInstance.getString("Label")
const showIcon = figma.selectedInstance.getBoolean("Show icon")

export default {
  id: "<sh-name>",
  example: figma.code`<span class="sh-name${type}">${showIcon ? '<span class="sh-icon …"></span>' : ""}${label}</span>`,
}
```

- The first two lines must be `// url=` and `// component=`.
- Map Figma **property names exactly** as in the blueprint, in Figma's order. Variant → `getEnum`,
  boolean → `getBoolean`, text → `getString`. Never map layer names.
- Self-contained: no imports other than `figma`, no helpers from other files.

## Check before you call it done

```bash
python3 tools/web_check.py <sh-name>          # structure, tokens only, Code Connect header
python3 tools/web_preview.py components/<…>/web/<sh-name>.html <your scratch>/<sh-name>.png
npx figma connect parse > /dev/null && echo parse ok
```

Open the PNG and compare it with Figma, variant by variant. Fix what differs.
