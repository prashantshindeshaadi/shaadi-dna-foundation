// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-19688
// component=sh-fpv-lifestyle-free-tit-for-tat
// Code Connect template · sh-fpv-lifestyle-free-tit-for-tat → HTML/CSS
// Every variant: sh-fpv-lifestyle-free-tit-for-tat.html · styles: sh-fpv-section-title.css (+ sh-button, sh-fpv-asset-premium-badge) + sh-graphic.css + sh-blur-overlay.css + sh-fpv-lifestyle-free-tit-for-tat.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// One variant (Plan=Free, State=Tit for tat). The "Tit-for-tat card" is the nested sh-blur-overlay: its own Code
// Connect renders the Reason, CTA and graphic picked in Figma. No title chip. The Lifestyle art is not in the repo.

import figma from "figma"

const lock = figma.selectedInstance.findInstance("Tit-for-tat card")
const fallback =
  '<section class="sh-blur-overlay" aria-label="Lifestyle &amp; Interests locked"><div class="sh-blur-overlay__visual"><div class="sh-blur-overlay__backdrop sh-graphic sh-graphic--backdrop sh-graphic--lifestyle" aria-hidden="true"></div><div class="sh-blur-overlay__graphic sh-graphic sh-graphic--lifestyle"><img class="sh-graphic__art" src="lifestyle-art.png" alt=""></div></div><div class="sh-blur-overlay__message"><p class="sh-blur-overlay__reason sh-body-lg">Add your own Lifestyle &amp; Interests to see Meher’s</p><button class="sh-button sh-button--tertiary sh-button--md" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Add Now</span></span></button></div></section>'
const overlay = lock && lock.type !== "ERROR" ? lock.executeTemplate().example : fallback

export default {
  id: "sh-fpv-lifestyle-free-tit-for-tat",
  example: figma.code`<section class="sh-fpv-lifestyle-free-tit-for-tat" aria-labelledby="lifestyle-title"><div class="sh-fpv-section-title"><div class="sh-fpv-section-title__top"><div class="sh-fpv-section-title__title-group"><div class="sh-fpv-section-title__title-row"><h2 class="sh-fpv-section-title__title sh-heading-sm" id="lifestyle-title">Lifestyle &amp; Interests</h2></div></div></div></div><div class="sh-fpv-lifestyle-free-tit-for-tat__lock">${overlay}</div></section>`,
}
