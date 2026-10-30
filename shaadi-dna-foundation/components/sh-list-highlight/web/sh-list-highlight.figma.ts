// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=3322-75524
// component=sh-list-highlight
// Code Connect template · sh-list-highlight → HTML/CSS
// Every variant: sh-list-highlight.html · styles: sh-list-highlight.css + sh-list-default.css (shared row parts)
// (needs tokens.css, sh-typo.css, sh-icon.css, sh-divider.css, sh-text-link.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// "Leading icon" / "Title icon" are sh-icon swaps (defaults contact, information-circle). The Action is an
// sh-text-link (Link, Small, Underline Off): write its own label and href.

import figma from "figma"

const title = figma.selectedInstance.getString("Title")
const showSubtitle = figma.selectedInstance.getBoolean("Show subtitle")
const subtitle = figma.selectedInstance.getString("Subtitle")
const showTitleIcon = figma.selectedInstance.getBoolean("Show title icon")
const showDivider = figma.selectedInstance.getBoolean("Show divider")
const style = figma.selectedInstance.getEnum("Style", { Default: "" })

const titleIcon = showTitleIcon
  ? '<span class="sh-list-default__title-icon sh-icon sh-icon--16" style="--icon:url(icons/line/information-circle.svg)" aria-hidden="true"></span>'
  : ""
const sub = showSubtitle ? `<span class="sh-list-default__subtitle sh-body-sm">${subtitle}</span>` : ""
const divider = showDivider ? '<hr class="sh-list-default__divider sh-divider sh-divider--soft">' : ""

export default {
  id: "sh-list-highlight",
  example: figma.code`<div class="sh-list-highlight${style}"><div class="sh-list-default__row"><span class="sh-list-default__leading"><span class="sh-list-default__icon sh-icon sh-icon--20" style="--icon:url(icons/line/contact.svg)" aria-hidden="true"></span></span><span class="sh-list-default__content"><span class="sh-list-default__title-row"><span class="sh-list-default__title sh-body-sm">${title}</span>${titleIcon}</span>${sub}</span><span class="sh-list-default__trailing"><a class="sh-text-link sh-text-link--link sh-text-link--sm sh-text-link--no-border" href="#"><span class="sh-text-link__label sh-button-sm">View</span></a></span></div>${divider}</div>`,
}
