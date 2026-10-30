// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=3322-75528
// component=sh-list-grouped
// Code Connect template · sh-list-grouped → HTML/CSS
// Every variant: sh-list-grouped.html · styles: sh-list-grouped.css + sh-list-default.css (shared row parts)
// (needs tokens.css, sh-typo.css, sh-icon.css, sh-divider.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// "Title icon" / "Trailing icon" are sh-icon swaps; the snippet shows the defaults (information-circle, arrow-right-01).

import figma from "figma"

const title = figma.selectedInstance.getString("Title")
const showSubtitle = figma.selectedInstance.getBoolean("Show subtitle")
const subtitle = figma.selectedInstance.getString("Subtitle")
const showTitleIcon = figma.selectedInstance.getBoolean("Show title icon")
const showDivider = figma.selectedInstance.getBoolean("Show divider")
const position = figma.selectedInstance.getEnum("Position", {
  Single: "",
  Start: " sh-list-grouped--start",
  Middle: " sh-list-grouped--middle",
  End: " sh-list-grouped--end",
})

const titleIcon = showTitleIcon
  ? '<span class="sh-list-default__title-icon sh-icon sh-icon--16" style="--icon:url(icons/line/information-circle.svg)" aria-hidden="true"></span>'
  : ""
const sub = showSubtitle ? `<span class="sh-list-default__subtitle sh-body-sm">${subtitle}</span>` : ""
const divider = showDivider ? '<hr class="sh-list-default__divider sh-divider sh-divider--soft">' : ""

export default {
  id: "sh-list-grouped",
  example: figma.code`<div class="sh-list-grouped${position}"><a class="sh-list-default__row" href="#"><span class="sh-list-default__content"><span class="sh-list-default__title-row"><span class="sh-list-default__title sh-body-md">${title}</span>${titleIcon}</span>${sub}</span><span class="sh-list-default__trailing"><span class="sh-list-default__icon sh-icon sh-icon--20" style="--icon:url(icons/line/arrow-right-01.svg)" aria-hidden="true"></span></span></a>${divider}</div>`,
}
