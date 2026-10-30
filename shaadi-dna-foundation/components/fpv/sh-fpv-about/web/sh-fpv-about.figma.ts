// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-19581
// component=sh-fpv-about
// Code Connect template · sh-fpv-about → HTML/CSS
// Every variant: sh-fpv-about.html · styles: sh-fpv-section-title.css (+ sh-button, sh-fpv-asset-premium-badge) +
// sh-text-link.css + sh-chip.css + sh-fpv-locked-text.css + sh-fpv-about.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Fill the bio and the facts (sh-chip Type=Info) from her profile. "Read more" is sh-text-link Neutral Medium, no
// border, trailing chevron; it shows only while the bio is cut (Truncated) and switches to Expanded.

import figma from "figma"

const state = figma.selectedInstance.getEnum("State", {
  "Truncated (Read More)": "truncated",
  "Expanded / Short bio": "expanded",
})

const chip = (icon: string, label: string) =>
  `<li><span class="sh-chip sh-chip--info"><span class="sh-icon sh-icon--16 sh-chip__icon" style="--icon:url(icons/line/${icon}.svg)" aria-hidden="true"></span><span class="sh-chip__content"><span class="sh-chip__label sh-body-md">${label}</span></span></span></li>`
const dot = '<span class="sh-fpv-locked-text__dot sh-icon"></span>'
const sep = '<span class="sh-fpv-locked-text__separator"></span>'
const dob = `<li><span class="sh-chip sh-chip--info"><span class="sh-icon sh-icon--16 sh-chip__icon" style="--icon:url(icons/line/calendar.svg)" aria-hidden="true"></span><span class="sh-chip__content sh-fpv-about__dob"><span class="sh-chip__label sh-body-md">Born on</span><span class="sh-fpv-locked-text sh-fpv-locked-text--date-of-birth" role="img" aria-label="Date of birth hidden"><span class="sh-fpv-locked-text__mask" style="--icon:url(icons/filled/asterisk.svg)" aria-hidden="true">${dot}${dot}${sep}${dot}${dot}${sep}${dot}${dot}</span><span class="sh-fpv-locked-text__lock sh-icon sh-icon--12" style="--icon:url(icons/filled/lock.svg)" aria-hidden="true"></span></span></span></span></li>`
const facts = chip("religion", "Hindu") + chip("person", "Kayastha") + chip("org-chart", "Attri Gotra") + chip("message", "Punjabi") + chip("link-rings", "Never Married") + dob
const more =
  state === "truncated"
    ? '<button class="sh-fpv-about__more sh-text-link sh-text-link--neutral sh-text-link--md sh-text-link--no-border" type="button" aria-expanded="false" aria-controls="about-bio"><span class="sh-text-link__label sh-button-md">Read more</span><span class="sh-text-link__icon sh-icon" style="--icon:url(icons/line/arrow-down-01.svg)" aria-hidden="true"></span></button>'
    : ""
const mod = state === "expanded" ? " sh-fpv-about--expanded" : ""

export default {
  id: "sh-fpv-about",
  example: figma.code`<section class="sh-fpv-about${mod}" aria-labelledby="about-title"><div class="sh-fpv-about__bio"><div class="sh-fpv-section-title"><div class="sh-fpv-section-title__top"><div class="sh-fpv-section-title__title-group"><div class="sh-fpv-section-title__title-row"><h2 class="sh-fpv-section-title__title sh-heading-sm" id="about-title">About</h2></div></div></div></div><div class="sh-fpv-about__text-group"><p class="sh-fpv-about__text sh-body-lg" id="about-bio">Books over Bollywood, ghazals over gym playlists. I’m a teacher in Pune…</p>${more}</div></div><ul class="sh-fpv-about__facts" role="list">${facts}</ul></section>`,
}
