// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-19728
// component=sh-fpv-contact
// Code Connect template · sh-fpv-contact → HTML/CSS
// Every variant: sh-fpv-contact.html · styles: sh-fpv-section-title.css (+ sh-button, sh-fpv-asset-premium-badge) +
// sh-list.css + sh-list-info.css + sh-fpv-locked-text.css + sh-graphic.css + sh-blur-overlay.css + sh-fpv-contact.css
// (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Contact is always masked on the profile (one lock, always last); only sh-fpv-sheet-phone-number shows the number.
// Unlock → premium plans · View Contact → phone-number sheet · Verify Now → verify. The badge art is not in the repo.

import figma from "figma"

const plan = figma.selectedInstance.getEnum("Plan", { Free: "free", Premium: "premium" })
const state = figma.selectedInstance.getEnum("State", {
  Gated: "gated",
  Unlock: "unlock",
  Visible: "visible",
  Unverified: "unverified",
  Filtered: "filtered",
})

const btn = (kind: string, label: string) =>
  `<button class="sh-fpv-section-title__action sh-button sh-button--${kind} sh-button--sm" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-sm">${label}</span></span></button>`
const badge =
  '<span class="sh-fpv-section-title__badge sh-fpv-asset-premium-badge"><img class="sh-fpv-asset-premium-badge__art" src="premium-badge-art.png" alt="Premium feature"></span>'
const mask = (middle: string, label: string) =>
  `<span class="sh-fpv-locked-text" role="img" aria-label="${label}"><span class="sh-fpv-locked-text__mask" style="--icon:url(icons/filled/asterisk.svg)" aria-hidden="true">${'<span class="sh-fpv-locked-text__dot sh-icon"></span>'.repeat(6)}</span>${middle}<span class="sh-fpv-locked-text__lock sh-icon sh-icon--12" style="--icon:url(icons/filled/lock.svg)" aria-hidden="true"></span></span>`
const row = (mod: string, icon: string, content: string) =>
  `<div class="sh-list sh-list--info"><div class="sh-list-info${mod}"><span class="sh-list-info__icon sh-icon sh-icon--20" style="--icon:url(icons/line/${icon}.svg)" aria-hidden="true"></span><span class="sh-list-info__content">${content}</span></div></div>`
const text = (t: string) => `<span class="sh-list-info__text sh-body-lg-tight">${t}</span>`
const masked =
  row(" sh-list-info--masked-phone", "call", text("+91 8042") + mask("", "Rest of the number hidden")) +
  row(" sh-list-info--masked-email", "email", mask(text("@gmail.com"), "Email hidden, at gmail.com"))
const note = (t: string) => `<p class="sh-fpv-contact__note sh-body-md">${t}</p>`

const premium = plan === "premium"
const titleExtras =
  !premium && state === "gated" ? ["", btn("premium-soft", "Unlock")]
  : !premium ? ["", btn("premium-soft", "View Contact")]
  : state === "unlock" ? [badge, btn("tertiary", "View Contact")]
  : [badge, ""]
const body =
  state === "visible" ? `<div class="sh-fpv-contact__rows">${row("", "call", text("+91 80421 23456"))}${row("", "email", text("meher.kapoor@gmail.com"))}</div>`
  : state === "unverified" ? '<section class="sh-fpv-contact__lock sh-blur-overlay" aria-label="Contact locked"><div class="sh-blur-overlay__visual"><div class="sh-blur-overlay__backdrop sh-graphic sh-graphic--backdrop sh-graphic--contact" aria-hidden="true"></div><div class="sh-blur-overlay__graphic sh-graphic sh-graphic--contact"><img class="sh-graphic__art" src="contact-art.png" alt=""></div></div><div class="sh-blur-overlay__message"><p class="sh-blur-overlay__reason sh-body-lg">Verify your profile to view Meher’s contact details</p><button class="sh-button sh-button--tertiary sh-button--md" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Verify Now</span></span></button></div></section>'
  : state === "filtered" ? `<div class="sh-fpv-contact__rows">${masked}${note("Meher has limited who can see her contact details.")}</div>`
  : !premium && state === "unlock" ? `<div class="sh-fpv-contact__rows">${masked}${note("3 of 5 free views left")}</div>`
  : `<div class="sh-fpv-contact__rows">${masked}</div>`
const mods = (premium ? " sh-fpv-contact--premium" : "") + (state === "gated" ? "" : ` sh-fpv-contact--${state}`)

export default {
  id: "sh-fpv-contact",
  example: figma.code`<section class="sh-fpv-contact${mods}" aria-labelledby="contact-title"><div class="sh-fpv-section-title"><div class="sh-fpv-section-title__top"><div class="sh-fpv-section-title__title-group"><div class="sh-fpv-section-title__title-row"><h2 class="sh-fpv-section-title__title sh-heading-sm" id="contact-title">Contact</h2>${titleExtras[0]}</div></div>${titleExtras[1]}</div></div>${body}</section>`,
}
