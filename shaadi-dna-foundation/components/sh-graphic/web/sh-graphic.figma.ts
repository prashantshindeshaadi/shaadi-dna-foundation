// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=3383-80983
// component=sh-graphic
// Code Connect template · sh-graphic → HTML/CSS
// Every variant: sh-graphic.html · styles: sh-graphic.css (needs tokens.css, sh-typo.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Mode has no class: the backdrop follows the page theme (prefers-color-scheme or data-theme), like the tokens.
// Art drawings are not in the repo yet: the snippet shows where the section's art image goes.

import figma from "figma"

const isBackdrop = figma.selectedInstance.getEnum("Type", { Art: false, Backdrop: true })
const graphic = figma.selectedInstance.getEnum("Graphic", {
  Astro: "",
  Lifestyle: " sh-graphic--lifestyle",
  "Education & Career": " sh-graphic--education-career",
  Family: " sh-graphic--family",
  Contact: " sh-graphic--contact",
  Photos: " sh-graphic--photos",
  "Photo break": " sh-graphic--photo-break",
  Placeholder: " sh-graphic--placeholder",
})
const isPlaceholder = figma.selectedInstance.getEnum("Graphic", { Placeholder: true })
const mode = figma.selectedInstance.getEnum("Mode", { Light: "light", Dark: "dark" })

const html = isBackdrop
  ? `<!-- Mode=${mode}: follows the page theme -->
<div class="sh-graphic sh-graphic--backdrop${graphic}" aria-hidden="true"></div>`
  : isPlaceholder
    ? `<div class="sh-graphic${graphic}">
  <span class="sh-graphic__label sh-body-sm">Graphic · 3:1 · add the final art as a new variant</span>
</div>`
    : `<div class="sh-graphic${graphic}">
  <img class="sh-graphic__art" src="…" alt="">   <!-- the section art, 1080 × 360 (not in the repo yet) -->
</div>`

export default {
  id: "sh-graphic",
  example: figma.code`${html}`,
}
