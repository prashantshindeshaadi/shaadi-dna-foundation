// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=3322-75526
// component=sh-list-report
// Code Connect template · sh-list-report → HTML/CSS
// Every variant: sh-list-report.html · styles: sh-list-report.css + sh-list-default.css (shared row parts)
// (needs tokens.css, sh-typo.css, sh-icon.css, sh-divider.css, sh-button.css for Upgrade)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// "Title icon" / "Trailing icon" are sh-icon swaps; the snippet shows each State's default glyph.

import figma from "figma"

const title = figma.selectedInstance.getString("Title")
const showSubtitle = figma.selectedInstance.getBoolean("Show subtitle")
const subtitle = figma.selectedInstance.getString("Subtitle")
const showTitleIcon = figma.selectedInstance.getBoolean("Show title icon")
const showDivider = figma.selectedInstance.getBoolean("Show divider")
const state = figma.selectedInstance.getEnum("State", {
  Open: "open",
  Locked: "locked",
  Upgrade: "upgrade",
  Download: "download",
  "Premium lock": "premium-lock",
})

const titleStyle = state === "locked" ? "sh-body-md" : state === "upgrade" ? "sh-body-sm-tight" : "sh-body-lg"
const subStyle = state === "upgrade" ? "sh-body-sm" : "sh-body-md"
const lock = '<span class="sh-list-report__lock sh-icon sh-icon--16" style="--icon:url(icons/filled/lock.svg)" role="img" aria-label="Locked"></span>'
const trailing =
  state === "open"
    ? '<span class="sh-list-default__icon sh-icon sh-icon--20" style="--icon:url(icons/line/arrow-right-01.svg)" aria-hidden="true"></span>'
    : state === "download"
      ? '<span class="sh-list-default__icon sh-icon sh-icon--20" style="--icon:url(icons/line/download.svg)" role="img" aria-label="Download"></span>'
      : state === "upgrade"
        ? '<button class="sh-button sh-button--premium-solid sh-button--sm" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-sm">Upgrade</span></span></button>'
        : lock
const mod = state === "open" ? "" : ` sh-list-report--${state}`
const tappable = state === "open" || state === "download"
const open = tappable ? '<a class="sh-list-default__row" href="#">' : '<div class="sh-list-default__row">'
const close = tappable ? "</a>" : "</div>"
const titleIcon = showTitleIcon
  ? '<span class="sh-list-default__title-icon sh-icon sh-icon--16" style="--icon:url(icons/line/information-circle.svg)" aria-hidden="true"></span>'
  : ""
const sub = showSubtitle ? `<span class="sh-list-default__subtitle ${subStyle}">${subtitle}</span>` : ""
const divider = showDivider ? '<hr class="sh-list-default__divider sh-divider sh-divider--soft">' : ""

export default {
  id: "sh-list-report",
  example: figma.code`<div class="sh-list-report${mod}">${open}<span class="sh-list-default__content"><span class="sh-list-default__title-row"><span class="sh-list-default__title ${titleStyle}">${title}</span>${titleIcon}</span>${sub}</span><span class="sh-list-default__trailing">${trailing}</span>${close}${divider}</div>`,
}
