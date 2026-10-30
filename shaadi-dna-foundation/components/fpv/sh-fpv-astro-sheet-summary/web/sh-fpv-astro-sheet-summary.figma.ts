// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2891-65357
// component=sh-fpv-astro-sheet-summary
// Code Connect template · sh-fpv-astro-sheet-summary → HTML/CSS
// Every variant: sh-fpv-astro-sheet-summary.html · styles: sh-text-link.css + sh-fpv-astro-sheet-summary.css
// (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// No Figma properties. Fill her name and the match summary. "Read more" (hidden in Figma) is added only when the
// text is cut: then add sh-fpv-astro-sheet-summary--clamped and the sh-text-link after the value.

import figma from "figma"

export default {
  id: "sh-fpv-astro-sheet-summary",
  example: figma.code`<section class="sh-fpv-astro-sheet-summary"><div class="sh-fpv-astro-sheet-summary__title-row"><h3 class="sh-fpv-astro-sheet-summary__title sh-title-lg">You and Ananya</h3><span class="sh-fpv-astro-sheet-summary__icon sh-icon sh-icon--16 sh-icon--premium" style="--icon:url(icons/filled/premium.svg)" role="img" aria-label="Premium"></span></div><div class="sh-fpv-astro-sheet-summary__body"><p class="sh-fpv-astro-sheet-summary__value sh-body-lg">You steady each other. Her Moon in Kanya and yours in Vrisha make a calm, practical pair.</p></div></section>`,
}
