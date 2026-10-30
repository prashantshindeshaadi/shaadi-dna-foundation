// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2891-65645
// component=sh-fpv-astro-sheet-ask-card
// Code Connect template · sh-fpv-astro-sheet-ask-card → HTML/CSS
// Every variant: sh-fpv-astro-sheet-ask-card.html · styles: sh-button.css + sh-fpv-astro-sheet-breakdown.css (and its
// parts: sh-tab-item, sh-segmented-control, sh-list-default, sh-list-score, sh-list) + sh-fpv-astro-sheet-ask-card.css
// (needs tokens.css, sh-typo.css, sh-icon.css, sh-divider.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// No Figma properties. Put her first name in the title and CTA; the CTA sends the birth-details request.
// The koota breakdown below the card is sh-fpv-astro-sheet-breakdown's __koota block (one sample row shown).
// The Lottie animation next to the title is not in the repo.

import figma from "figma"

export default {
  id: "sh-fpv-astro-sheet-ask-card",
  example: figma.code`<section class="sh-fpv-astro-sheet-ask-card"><div class="sh-fpv-astro-sheet-ask-card__compat"><div class="sh-fpv-astro-sheet-ask-card__card"><div class="sh-fpv-astro-sheet-ask-card__text"><div class="sh-fpv-astro-sheet-ask-card__title-row"><h3 class="sh-fpv-astro-sheet-ask-card__title sh-button-lg">Ananya hasn’t added her birth details yet</h3></div><p class="sh-fpv-astro-sheet-ask-card__body sh-body-md">Your Kundali match will appear here as soon as she does.</p></div><button class="sh-fpv-astro-sheet-ask-card__cta sh-button sh-button--secondary sh-button--sm" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-sm">Ask Ananya to add</span></span></button></div></div><div class="sh-fpv-astro-sheet-breakdown__koota"><div class="sh-fpv-astro-sheet-breakdown__filters"><h3 class="sh-fpv-astro-sheet-breakdown__filters-title sh-title-sm">Compatibility details</h3><div class="sh-segmented-control" role="tablist" aria-label="Chart"><button class="sh-tab-item sh-tab-item--segmented" type="button" role="tab" aria-selected="true"><span class="sh-tab-item__label sh-button-md">North</span></button><button class="sh-tab-item sh-tab-item--segmented" type="button" role="tab" aria-selected="false"><span class="sh-tab-item__label sh-body-md">South</span></button></div></div><ul class="sh-fpv-astro-sheet-breakdown__rows" role="list"><li class="sh-list sh-list--score"><div class="sh-list-score"><div class="sh-list-default__row"><span class="sh-list-default__leading"><img class="sh-list-default__pictogram sh-icon" src="icons/pictogram/koota-varna@2x.png" alt=""></span><span class="sh-list-default__content"><span class="sh-list-default__title-row"><span class="sh-list-default__title sh-body-lg">Work</span></span></span><span class="sh-list-default__trailing"><span class="sh-list-default__value sh-body-lg">1/1</span></span></div></div></li></ul></div></section>`,
}
