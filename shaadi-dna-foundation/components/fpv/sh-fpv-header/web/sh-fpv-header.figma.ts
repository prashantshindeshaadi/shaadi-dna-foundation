// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-19432
// component=sh-fpv-header
// Code Connect template · sh-fpv-header → HTML/CSS
// Every variant: sh-fpv-header.html · styles: sh-tag.css + sh-tag-fpv.css + sh-fpv-header.css
// (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Case only changes the two attribute lines. Fill name, attributes and badges from the member's profile;
// the manager badge reads "Managed by {Self / Parent / Sibling / Relative / Friend}". Each trust badge opens
// sh-fpv-sheet-trust-markers with the matching Case.

import figma from "figma"

const dot = '<span class="sh-fpv-header__dot" aria-hidden="true"></span>'
const lines = figma.selectedInstance.getEnum("Case", {
  "Lives in India": `<p class="sh-fpv-header__line sh-body-md"><span>32 yrs</span>${dot}<span>5′6″</span>${dot}<span>Kayastha</span></p><p class="sh-fpv-header__line sh-body-md"><span>Mumbai, Maharashtra</span>${dot}<span>Teacher</span></p>`,
  "Lives abroad": `<p class="sh-fpv-header__line sh-body-md"><span>32 yrs</span>${dot}<span>5′6″</span>${dot}<span>Kayastha</span>${dot}<span>Teacher</span></p><p class="sh-fpv-header__line sh-body-md"><span>Toronto, Canada</span></p>`,
  "Lives abroad · long community name": `<p class="sh-fpv-header__line sh-body-md"><span>32 yrs</span>${dot}<span>5′6″</span>${dot}<span>Kshatriya Maratha Deshmukh 96 Kuli</span></p><p class="sh-fpv-header__line sh-body-md"><span>Toronto, Canada</span>${dot}<span>Teacher</span></p>`,
})

const badge = (art: string, label: string) =>
  `<button class="sh-fpv-header__badge" type="button"><img class="sh-fpv-header__badge-art" src="icons/pictogram/${art}@2x.png" alt=""><span class="sh-fpv-header__badge-label sh-support-label">${label}</span></button>`

const tags =
  '<div class="sh-fpv-header__tags"><span class="sh-tag sh-tag--strong sh-tag--sm sh-tag-fpv sh-tag-fpv--active-now"><img class="sh-icon sh-icon--12 sh-tag__icon" src="icons/tag/online.svg" alt=""><span class="sh-tag__label sh-support-label">Active Now</span></span><span class="sh-tag sh-tag--strong sh-tag--sm sh-tag-fpv sh-tag-fpv--promoted"><span class="sh-icon sh-icon--12 sh-tag__icon" style="--icon:url(icons/filled/megaphone-02.svg)" aria-hidden="true"></span><span class="sh-tag__label sh-support-label">Promoted</span></span></div>'

const badges = `<div class="sh-fpv-header__badges">${badge("premium-member", "Premium Member")}${badge("parent", "Managed by Parent")}${badge("verified-super", "Super Verified")}${badge("shaadi-id", "Shaadi ID SH1234949")}</div>`

export default {
  id: "sh-fpv-header",
  example: figma.code`<header class="sh-fpv-header"><h1 class="sh-fpv-header__name sh-heading-md">Meher Randhawa</h1><div class="sh-fpv-header__attributes">${lines}</div>${tags}${badges}</header>`,
}
