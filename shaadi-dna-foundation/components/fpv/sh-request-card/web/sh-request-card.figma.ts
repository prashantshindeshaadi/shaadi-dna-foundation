// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-20530
// component=sh-request-card
// Code Connect template · sh-request-card → HTML/CSS
// Every variant: sh-request-card.html · styles: sh-button.css + sh-request-card.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Type picks the icon, copy and CTA. Fill her name and message from the request. Birth details shows only to a
// viewer who hasn't added his; Upgrade Now opens the premium plans.

import figma from "figma"

const meta = (icon: string, text: string) =>
  `<p class="sh-request-card__meta"><span class="sh-request-card__meta-icon sh-icon sh-icon--12" style="--icon:url(icons/line/${icon}.svg)" aria-hidden="true"></span><span class="sh-request-card__meta-text sh-body-sm-tight">${text}</span></p>`
const cta = (type: string, label: string, lead = "") =>
  `<button class="sh-request-card__cta sh-button sh-button--${type} sh-button--sm" type="button">${lead}<span class="sh-button__text"><span class="sh-button__label sh-button-sm">${label}</span></span></button>`
const crown = '<span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/premium.svg)" aria-hidden="true"></span>'

const card = figma.selectedInstance.getEnum("Type", {
  Message: `<article class="sh-request-card"><div class="sh-request-card__content">${meta("message", "She sent you a message")}<p class="sh-request-card__message sh-body-md">“Hi, we liked your profile and would like to take this forward…”</p></div>${cta("secondary", "Reply")}</article>`,
  Photo: `<article class="sh-request-card sh-request-card--photo"><div class="sh-request-card__content">${meta("image", "She asked for your photo")}<p class="sh-request-card__message sh-body-md">Add a photo so Meher can see you</p></div>${cta("secondary", "Add photo")}</article>`,
  "Birth details": `<article class="sh-request-card sh-request-card--birth-details"><div class="sh-request-card__content">${meta("astro", "She asked for birth details")}<p class="sh-request-card__message sh-body-md">Add yours to see your Kundali match</p></div>${cta("secondary", "Add details")}</article>`,
  "Message · free viewer": `<article class="sh-request-card sh-request-card--message-free-viewer"><div class="sh-request-card__content">${meta("message", "Meher sent you a message")}<p class="sh-request-card__message sh-body-md">To view her message &amp; reply</p></div>${cta("premium-soft", "Upgrade Now", crown)}</article>`,
})

export default {
  id: "sh-request-card",
  example: figma.code`${card}`,
}
