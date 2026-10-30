// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-19793
// component=sh-fpv-family-details
// Code Connect template · sh-fpv-family-details → HTML/CSS
// Every variant: sh-fpv-family-details.html · styles: sh-fpv-section-title.css (+ sh-button, sh-fpv-asset-premium-badge) +
// sh-list.css + sh-list-info.css + sh-graphic.css + sh-blur-overlay.css + sh-fpv-family-details.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Tit for tat only for a Free viewer without his own family details: sh-blur-overlay Unlock=Self, Graphic Family
// (the art is not in the repo). Add Now → add his own details.

import figma from "figma"

const plan = figma.selectedInstance.getEnum("Plan", { Free: "" })
const state = figma.selectedInstance.getEnum("State", { Visible: "visible", "Tit for tat": "tit-for-tat" })

const info = (icon: string, text: string) =>
  `<div class="sh-list sh-list--info"><div class="sh-list-info"><span class="sh-list-info__icon sh-icon sh-icon--20" style="--icon:url(icons/line/${icon}.svg)" aria-hidden="true"></span><span class="sh-list-info__content"><span class="sh-list-info__text sh-body-lg-tight">${text}</span></span></div></div>`
const body =
  state === "tit-for-tat"
    ? '<section class="sh-fpv-family-details__lock sh-blur-overlay" aria-label="Family Details locked"><div class="sh-blur-overlay__visual"><div class="sh-blur-overlay__backdrop sh-graphic sh-graphic--backdrop sh-graphic--family" aria-hidden="true"></div><div class="sh-blur-overlay__graphic sh-graphic sh-graphic--family"><img class="sh-graphic__art" src="family-art.png" alt=""></div></div><div class="sh-blur-overlay__message"><p class="sh-blur-overlay__reason sh-body-lg">Add your own Family Details to see Meher’s</p><button class="sh-button sh-button--tertiary sh-button--md" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Add Now</span></span></button></div></section>'
    : `<p class="sh-fpv-family-details__text sh-body-lg">Father runs a business, mother is a homemaker.<br>She has 2 brothers, both married.</p><div class="sh-fpv-family-details__rows">${info("family", "Nuclear family")}${info("location-pin", "Family lives in Pune")}</div>`
const mod = state === "tit-for-tat" ? " sh-fpv-family-details--tit-for-tat" : ""

export default {
  id: "sh-fpv-family-details",
  example: figma.code`<section class="sh-fpv-family-details${mod}${plan}" aria-labelledby="family-title"><div class="sh-fpv-section-title"><div class="sh-fpv-section-title__top"><div class="sh-fpv-section-title__title-group"><div class="sh-fpv-section-title__title-row"><h2 class="sh-fpv-section-title__title sh-heading-sm" id="family-title">Family Details</h2></div></div></div></div>${body}</section>`,
}
