// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-20558
// component=sh-fpv-requests
// Code Connect template · sh-fpv-requests → HTML/CSS
// Every variant: sh-fpv-requests.html · styles: sh-fpv-section-title.css (+ sh-button, sh-fpv-asset-premium-badge) +
// sh-request-card.css + sh-fpv-requests.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Count = how many pending requests are listed (up to 3; more adds "See all N"). The section drops when there are none.
// Each card is sh-request-card: pick its Type per request (a Free viewer's message is "Message · free viewer").

import figma from "figma"

const count = figma.selectedInstance.getEnum("Count", { "3": 3, "2": 2, "1": 1 })

const meta = (icon: string, text: string) =>
  `<p class="sh-request-card__meta"><span class="sh-request-card__meta-icon sh-icon sh-icon--12" style="--icon:url(icons/line/${icon}.svg)" aria-hidden="true"></span><span class="sh-request-card__meta-text sh-body-sm-tight">${text}</span></p>`
const cta = (label: string) =>
  `<button class="sh-request-card__cta sh-button sh-button--secondary sh-button--sm" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-sm">${label}</span></span></button>`
const cards = [
  `<li><article class="sh-request-card"><div class="sh-request-card__content">${meta("message", "She sent you a message")}<p class="sh-request-card__message sh-body-md">“Hi, we liked your profile and would like to take this forward…”</p></div>${cta("Reply")}</article></li>`,
  `<li><article class="sh-request-card sh-request-card--photo"><div class="sh-request-card__content">${meta("image", "She asked for your photo")}<p class="sh-request-card__message sh-body-md">Add a photo so Meher can see you</p></div>${cta("Add photo")}</article></li>`,
  `<li><article class="sh-request-card sh-request-card--birth-details"><div class="sh-request-card__content">${meta("astro", "She asked for birth details")}<p class="sh-request-card__message sh-body-md">Add yours to see your Kundali match</p></div>${cta("Add details")}</article></li>`,
]
  .slice(0, count || 3)
  .join("")

export default {
  id: "sh-fpv-requests",
  example: figma.code`<section class="sh-fpv-requests" id="requests" aria-labelledby="requests-title"><div class="sh-fpv-requests__header"><div class="sh-fpv-section-title"><div class="sh-fpv-section-title__top"><div class="sh-fpv-section-title__title-group"><div class="sh-fpv-section-title__title-row"><h2 class="sh-fpv-section-title__title sh-heading-sm" id="requests-title">Requests from Meher</h2></div></div></div></div></div><ul class="sh-fpv-requests__cards" role="list">${cards}</ul></section>`,
}
