// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-20098
// component=sh-fpv-you-and-her
// Code Connect template · sh-fpv-you-and-her → HTML/CSS
// Every variant: sh-fpv-you-and-her.html · styles: sh-fpv-section-title.css (+ sh-button, sh-fpv-asset-premium-badge) +
// sh-divider.css + sh-text-link.css + sh-list.css + sh-list-default.css + sh-list-preference.css + sh-user-images.css +
// sh-avatar.css + sh-fpv-you-and-her.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// One row per preference (sh-list Type=Preference): Match = Filled check, No match = sh-list-preference--no-match + close.
// Verdict is off in v1. Different from Astro; never mix them.

import figma from "figma"

const verdict = figma.selectedInstance.getBoolean("Verdict")
const state = figma.selectedInstance.getEnum("State", { Default: "" })

const pref = (icon: string, label: string, value: string) =>
  `<li class="sh-list sh-list--preference"><div class="sh-list-preference"><div class="sh-list-default__row"><span class="sh-list-default__leading"><span class="sh-list-default__icon sh-icon sh-icon--20" style="--icon:url(icons/line/${icon}.svg)" aria-hidden="true"></span></span><span class="sh-list-preference__main"><span class="sh-list-preference__main-row"><span class="sh-list-default__content"><span class="sh-list-default__title-row"><span class="sh-list-default__title sh-support-label">${label}</span></span><span class="sh-list-default__subtitle sh-body-lg-tight">${value}</span></span><span class="sh-list-default__trailing"><span class="sh-list-preference__mark sh-icon sh-icon--24" style="--icon:url(icons/filled/check.svg)" role="img" aria-label="Matches"></span></span></span></span></div></div></li>`
const rows =
  pref("calendar", "Age", "25 to 30") +
  pref("height", "Height", "5′2″ to 5′8″") +
  pref("location-pin", "State Living In", "Maharashtra, Delhi") +
  pref("globe", "Country Living In", "India") +
  pref("language", "Mother Tongue", "Punjabi, Hindi") +
  pref("income", "Annual Income", "₹10 Lakh and above")
const photo = (label: string, src: string) =>
  `<span class="sh-avatar sh-avatar--md sh-avatar--image" role="img" aria-label="${label}"><span class="sh-avatar__media"><span class="sh-user-image"><img src="${src}" alt=""></span></span></span>`
const verdictBox = verdict
  ? `<div class="sh-fpv-you-and-her__verdict"><div class="sh-fpv-you-and-her__verdict-row"><div class="sh-fpv-you-and-her__verdict-info"><p class="sh-fpv-you-and-her__verdict-label sh-support-micro">Meher’s Preferences</p><p class="sh-fpv-you-and-her__verdict-title sh-title-lg">Strong Match</p></div><span class="sh-fpv-you-and-her__photos" aria-hidden="true">${photo("You", "viewer.jpg")}${photo("Meher", "her.jpg")}</span></div><p class="sh-fpv-you-and-her__verdict-text sh-body-md">You meet most of Meher’s preferences. She is likely to accept your request.</p></div>`
  : ""

export default {
  id: "sh-fpv-you-and-her",
  example: figma.code`<section class="sh-fpv-you-and-her${state}" aria-labelledby="you-her-title"><div class="sh-fpv-section-title"><div class="sh-fpv-section-title__top"><div class="sh-fpv-section-title__title-group"><div class="sh-fpv-section-title__title-row"><h2 class="sh-fpv-section-title__title sh-heading-sm" id="you-her-title">You &amp; Her</h2></div></div></div></div>${verdictBox}<div class="sh-fpv-you-and-her__list"><div class="sh-fpv-you-and-her__list-head" aria-hidden="true"><span class="sh-fpv-you-and-her__list-label sh-support-label">Her Preferences</span><hr class="sh-divider sh-divider--soft"><span class="sh-fpv-you-and-her__list-label sh-support-label">You Match</span></div><ul class="sh-fpv-you-and-her__rows" role="list">${rows}</ul></div></section>`,
}
