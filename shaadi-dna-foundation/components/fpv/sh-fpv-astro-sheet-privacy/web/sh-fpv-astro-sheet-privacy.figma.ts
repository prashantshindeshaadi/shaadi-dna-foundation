// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2891-65417
// component=sh-fpv-astro-sheet-privacy
// Code Connect template · sh-fpv-astro-sheet-privacy → HTML/CSS
// Every variant: sh-fpv-astro-sheet-privacy.html · styles: sh-list.css + sh-list-default.css + sh-list-grouped.css +
// sh-fpv-astro-sheet-privacy.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-divider.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// No Figma properties. Two sh-list Type=Grouped rows (Start + End); each row's own Code Connect gives its markup.
// The row text below is a sample: the blueprint names none.

import figma from "figma"

export default {
  id: "sh-fpv-astro-sheet-privacy",
  example: figma.code`<section class="sh-fpv-astro-sheet-privacy" aria-label="Privacy"><div class="sh-fpv-astro-sheet-privacy__rows"><div class="sh-list sh-list--grouped"><div class="sh-list-grouped sh-list-grouped--start"><a class="sh-list-default__row" href="#"><span class="sh-list-default__content"><span class="sh-list-default__title-row"><span class="sh-list-default__title sh-body-md">Who sees your birth details</span></span><span class="sh-list-default__subtitle sh-body-sm">Only members you connect with</span></span><span class="sh-list-default__trailing"><span class="sh-list-default__icon sh-icon sh-icon--20" style="--icon:url(icons/line/arrow-right-01.svg)" aria-hidden="true"></span></span></a><hr class="sh-list-default__divider sh-divider sh-divider--soft"></div></div><div class="sh-list sh-list--grouped"><div class="sh-list-grouped sh-list-grouped--end"><a class="sh-list-default__row" href="#"><span class="sh-list-default__content"><span class="sh-list-default__title-row"><span class="sh-list-default__title sh-body-md">Hide my horoscope</span></span><span class="sh-list-default__subtitle sh-body-sm">Your Kundali match stays private</span></span><span class="sh-list-default__trailing"><span class="sh-list-default__icon sh-icon sh-icon--20" style="--icon:url(icons/line/arrow-right-01.svg)" aria-hidden="true"></span></span></a></div></div></div></section>`,
}
