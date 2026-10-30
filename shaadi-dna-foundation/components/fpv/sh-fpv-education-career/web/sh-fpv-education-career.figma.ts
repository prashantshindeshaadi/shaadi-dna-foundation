// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-19759
// component=sh-fpv-education-career
// Code Connect template · sh-fpv-education-career → HTML/CSS
// Every variant: sh-fpv-education-career.html · styles: sh-fpv-section-title.css (+ sh-button, sh-fpv-asset-premium-badge) +
// sh-card.css + sh-list.css + sh-list-info.css + sh-fpv-locked-text.css + sh-graphic.css + sh-blur-overlay.css +
// sh-fpv-education-career.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Title by viewer: Free = Unlock (Premium Soft, no badge) · Premium = badge + View (Tertiary). One mask per section:
// Gated masks the college names; Tit for tat locks the section. The badge and Education & Career art are not in the repo.

import figma from "figma"

const plan = figma.selectedInstance.getEnum("Plan", { Free: "free", Premium: "premium" })
const state = figma.selectedInstance.getEnum("State", { Gated: "gated", Visible: "visible", "Tit for tat": "tit-for-tat" })

const premium = plan === "premium"
const action = premium
  ? '<button class="sh-fpv-section-title__action sh-button sh-button--tertiary sh-button--sm" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-sm">View</span></span></button>'
  : '<button class="sh-fpv-section-title__action sh-button sh-button--premium-soft sh-button--sm" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-sm">Unlock</span></span></button>'
const badge = premium
  ? '<span class="sh-fpv-section-title__badge sh-fpv-asset-premium-badge"><img class="sh-fpv-asset-premium-badge__art" src="premium-badge-art.png" alt="Premium feature"></span>'
  : ""
const icon = (name: string) =>
  `<span class="sh-list-info__icon sh-icon sh-icon--20" style="--icon:url(icons/line/${name}.svg)" aria-hidden="true"></span>`
const text = (t: string) => `<span class="sh-list-info__text sh-body-lg-tight">${t}</span>`
const mask =
  `<span class="sh-fpv-locked-text" role="img" aria-label="College name hidden. Upgrade to view"><span class="sh-fpv-locked-text__mask" style="--icon:url(icons/filled/asterisk.svg)" aria-hidden="true">${'<span class="sh-fpv-locked-text__dot sh-icon"></span>'.repeat(6)}</span><span class="sh-fpv-locked-text__lock sh-icon sh-icon--12" style="--icon:url(icons/filled/lock.svg)" aria-hidden="true"></span></span>`
const degree = (d: string, college: string) =>
  state === "gated"
    ? `<div class="sh-list sh-list--info"><div class="sh-list-info sh-list-info--double sh-list-info--masked"><span class="sh-list-info__icon-box">${icon("graduation")}</span><span class="sh-list-info__content">${text(d)}${mask}</span></div></div>`
    : `<div class="sh-list sh-list--info"><div class="sh-list-info sh-list-info--double"><span class="sh-list-info__icon-box">${icon("graduation")}</span><span class="sh-list-info__content">${text(d)}<span class="sh-list-info__support sh-body-md-tight">${college}</span></span></div></div>`
const job = (name: string, t: string) =>
  `<div class="sh-list sh-list--info"><div class="sh-list-info">${icon(name)}<span class="sh-list-info__content">${text(t)}</span></div></div>`
const body =
  state === "tit-for-tat"
    ? '<section class="sh-fpv-education-career__lock sh-blur-overlay" aria-label="Education &amp; Career locked"><div class="sh-blur-overlay__visual"><div class="sh-blur-overlay__backdrop sh-graphic sh-graphic--backdrop sh-graphic--education-career" aria-hidden="true"></div><div class="sh-blur-overlay__graphic sh-graphic sh-graphic--education-career"><img class="sh-graphic__art" src="education-career-art.png" alt=""></div></div><div class="sh-blur-overlay__message"><p class="sh-blur-overlay__reason sh-body-lg">Add your own Education &amp; Career to see Meher’s</p><button class="sh-button sh-button--tertiary sh-button--md" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Add Now</span></span></button></div></section>'
    : `<div class="sh-fpv-education-career__basics"><section class="sh-fpv-education-career__card sh-card"><h3 class="sh-card__label sh-support-micro">Education</h3><div class="sh-card__content">${degree("M.A. English", "Fergusson College")}${degree("B.Ed.", "Tilak College of Education")}${degree("B.A. English", "SP College")}</div></section><section class="sh-fpv-education-career__card sh-card"><h3 class="sh-card__label sh-support-micro">Career</h3><div class="sh-card__content">${job("briefcase", "Teacher")}${job("building", "Private sector")}${job("income", "₹6 – 8 Lakh a year")}</div></section></div>`
const mods = (premium ? " sh-fpv-education-career--premium" : "") + (state === "gated" ? "" : ` sh-fpv-education-career--${state}`)

export default {
  id: "sh-fpv-education-career",
  example: figma.code`<section class="sh-fpv-education-career${mods}" aria-labelledby="career-title"><div class="sh-fpv-section-title"><div class="sh-fpv-section-title__top"><div class="sh-fpv-section-title__title-group"><div class="sh-fpv-section-title__title-row"><h2 class="sh-fpv-section-title__title sh-heading-sm" id="career-title">Education &amp; Career</h2>${badge}</div></div>${action}</div></div>${body}</section>`,
}
