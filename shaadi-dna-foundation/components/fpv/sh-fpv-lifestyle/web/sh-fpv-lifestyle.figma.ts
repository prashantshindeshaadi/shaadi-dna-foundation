// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-19613
// component=sh-fpv-lifestyle
// Code Connect template · sh-fpv-lifestyle → HTML/CSS
// Every variant: sh-fpv-lifestyle.html · styles: sh-fpv-section-title.css (+ sh-button, sh-fpv-asset-premium-badge) + sh-card.css + sh-list.css + sh-list-default.css + sh-list-info.css + sh-fpv-lifestyle.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Plan is Free only. State picks NRI (the visa row) or RI. Fill her details and hobbies from the profile
// (Interests icons: icons/line/hobby-<hobby>.svg). Tit for tat is sh-fpv-lifestyle-free-tit-for-tat.

import figma from "figma"

const plan = figma.selectedInstance.getEnum("Plan", { Free: "" })
const state = figma.selectedInstance.getEnum("State", { "Visible NRI": "nri", "Visible RI": "ri" })

const info = (icon: string, text: string) =>
  `<div class="sh-list sh-list--info"><div class="sh-list-info"><span class="sh-list-info__icon sh-icon sh-icon--20" style="--icon:url(icons/line/${icon}.svg)" aria-hidden="true"></span><span class="sh-list-info__content"><span class="sh-list-info__text sh-body-lg-tight">${text}</span></span></div></div>`
const hobby = (icon: string, text: string) =>
  `<div class="sh-list"><div class="sh-list-default sh-list-default--icon sh-list-default--inline"><div class="sh-list-default__row"><span class="sh-list-default__leading"><span class="sh-list-default__icon sh-icon sh-icon--20" style="--icon:url(icons/line/hobby-${icon}.svg)" aria-hidden="true"></span></span><span class="sh-list-default__content"><span class="sh-list-default__title-row"><span class="sh-list-default__title sh-body-lg">${text}</span></span></span></div></div></div>`

const lifestyle =
  info("diet", "Non-Vegetarian") +
  info("drink", "Drinks occasionally") +
  (state === "nri" ? info("document-validation", "Student Visa") + info("location-pin", "Lives in Toronto, Canada") : info("location-pin", "Lives in Mumbai"))
const interests = hobby("reading", "Reading") + hobby("travelling", "Travelling") + hobby("cooking", "Cooking") + hobby("music", "Music") + hobby("yoga-meditation", "Yoga")

export default {
  id: "sh-fpv-lifestyle",
  example: figma.code`<section class="sh-fpv-lifestyle${state === "ri" ? " sh-fpv-lifestyle--ri" : ""}${plan}" aria-labelledby="lifestyle-title"><div class="sh-fpv-section-title"><div class="sh-fpv-section-title__top"><div class="sh-fpv-section-title__title-group"><div class="sh-fpv-section-title__title-row"><h2 class="sh-fpv-section-title__title sh-heading-sm" id="lifestyle-title">Lifestyle &amp; Interests</h2></div></div></div></div><div class="sh-fpv-lifestyle__content"><div class="sh-fpv-lifestyle__basics"><section class="sh-fpv-lifestyle__card sh-card"><h3 class="sh-card__label sh-support-micro">Lifestyle</h3><div class="sh-card__content">${lifestyle}</div></section><section class="sh-fpv-lifestyle__card sh-card"><h3 class="sh-card__label sh-support-micro">Interests</h3><div class="sh-card__content">${interests}</div></section></div></div></section>`,
}
