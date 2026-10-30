// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=3322-75527
// component=sh-list-score
// Code Connect template · sh-list-score → HTML/CSS
// Every variant: sh-list-score.html · styles: sh-list-score.css + sh-list-default.css (shared row parts)
// (needs tokens.css, sh-typo.css, sh-icon.css, sh-divider.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// "Pictogram" is a pictogram swap (default koota-rajju): set the <img> src. "Title icon" defaults to information-circle.

import figma from "figma"

const title = figma.selectedInstance.getString("Title")
const showSubtitle = figma.selectedInstance.getBoolean("Show subtitle")
const subtitle = figma.selectedInstance.getString("Subtitle")
const showTitleIcon = figma.selectedInstance.getBoolean("Show title icon")
const showValueCaption = figma.selectedInstance.getBoolean("Show value caption")
const valueCaption = figma.selectedInstance.getString("Value caption")
const value = figma.selectedInstance.getString("Value")
const showDivider = figma.selectedInstance.getBoolean("Show divider")
const state = figma.selectedInstance.getEnum("State", {
  Default: "",
  Locked: " sh-list-score--locked",
  "No match": " sh-list-score--no-match",
})

const titleIcon = showTitleIcon
  ? '<span class="sh-list-default__title-icon sh-icon sh-icon--16" style="--icon:url(icons/line/information-circle.svg)" aria-hidden="true"></span>'
  : ""
const sub = showSubtitle ? `<span class="sh-list-default__subtitle sh-body-sm">${subtitle}</span>` : ""
const caption = showValueCaption ? `<span class="sh-list-default__value-caption sh-body-sm">${valueCaption}</span>` : ""
const trailing =
  state === " sh-list-score--locked"
    ? '<span class="sh-list-score__lock sh-icon sh-icon--12" style="--icon:url(icons/filled/lock.svg)" role="img" aria-label="Locked"></span>'
    : `${caption}<span class="sh-list-default__value sh-body-lg">${value}</span>`
const divider = showDivider ? '<hr class="sh-list-default__divider sh-divider sh-divider--soft">' : ""

export default {
  id: "sh-list-score",
  example: figma.code`<div class="sh-list-score${state}"><div class="sh-list-default__row"><span class="sh-list-default__leading"><img class="sh-list-default__pictogram sh-icon" src="icons/pictogram/koota-rajju@2x.png" alt=""></span><span class="sh-list-default__content"><span class="sh-list-default__title-row"><span class="sh-list-default__title sh-body-lg">${title}</span>${titleIcon}</span>${sub}</span><span class="sh-list-default__trailing">${trailing}</span></div>${divider}</div>`,
}
