// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=3322-75525
// component=sh-list-preference
// Code Connect template · sh-list-preference → HTML/CSS
// Every variant: sh-list-preference.html · styles: sh-list-preference.css + sh-list-default.css (shared row parts)
// (needs tokens.css, sh-typo.css, sh-icon.css, sh-divider.css, sh-text-link.css for Read more / Hide)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// "Leading icon" / "Title icon" are sh-icon swaps (defaults contact, information-circle). Read more / Hide toggles
// the Expand modifier and aria-expanded in your code.

import figma from "figma"

const title = figma.selectedInstance.getString("Title")
const subtitle = figma.selectedInstance.getString("Subtitle")
const showTitleIcon = figma.selectedInstance.getBoolean("Show title icon")
const showDivider = figma.selectedInstance.getBoolean("Show divider")
const state = figma.selectedInstance.getEnum("State", { Match: "", "No match": " sh-list-preference--no-match" })
const expand = figma.selectedInstance.getEnum("Expand", {
  Off: "",
  Collapsed: " sh-list-preference--collapsed",
  Expanded: " sh-list-preference--expanded",
})

const mark =
  state === ""
    ? '<span class="sh-list-preference__mark sh-icon sh-icon--24" style="--icon:url(icons/filled/check.svg)" role="img" aria-label="Matches"></span>'
    : '<span class="sh-list-preference__mark sh-icon sh-icon--24" style="--icon:url(icons/line/close.svg)" role="img" aria-label="Doesn\'t match"></span>'
const more =
  expand === ""
    ? ""
    : expand === " sh-list-preference--collapsed"
      ? '<span class="sh-list-preference__more"><button class="sh-text-link sh-text-link--neutral sh-text-link--md sh-text-link--no-border" type="button" aria-expanded="false"><span class="sh-text-link__label sh-button-md">Read more</span><span class="sh-text-link__icon sh-icon" style="--icon:url(icons/line/arrow-down-01.svg)" aria-hidden="true"></span></button></span>'
      : '<span class="sh-list-preference__more"><button class="sh-text-link sh-text-link--neutral sh-text-link--md sh-text-link--no-border" type="button" aria-expanded="true"><span class="sh-text-link__label sh-button-md">Hide</span><span class="sh-text-link__icon sh-icon" style="--icon:url(icons/line/arrow-up-01.svg)" aria-hidden="true"></span></button></span>'
const titleIcon = showTitleIcon
  ? '<span class="sh-list-default__title-icon sh-icon sh-icon--16" style="--icon:url(icons/line/information-circle.svg)" aria-hidden="true"></span>'
  : ""
const divider = showDivider ? '<hr class="sh-list-default__divider sh-divider sh-divider--soft">' : ""

export default {
  id: "sh-list-preference",
  example: figma.code`<div class="sh-list-preference${state}${expand}"><div class="sh-list-default__row"><span class="sh-list-default__leading"><span class="sh-list-default__icon sh-icon sh-icon--20" style="--icon:url(icons/line/contact.svg)" aria-hidden="true"></span></span><span class="sh-list-preference__main"><span class="sh-list-preference__main-row"><span class="sh-list-default__content"><span class="sh-list-default__title-row"><span class="sh-list-default__title sh-support-label">${title}</span>${titleIcon}</span><span class="sh-list-default__subtitle sh-body-lg-tight">${subtitle}</span>${more}</span><span class="sh-list-default__trailing">${mark}</span></span>${divider}</span></div></div>`,
}
