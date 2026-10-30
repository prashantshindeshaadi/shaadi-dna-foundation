// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=3238-90068
// component=sh-request-chip
// Code Connect template · sh-request-chip → HTML/CSS
// Every variant: sh-request-chip.html · styles: sh-button.css + sh-request-chip.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Glass strip over her photo. View scrolls to the requests section.

import figma from "figma"

const title = figma.selectedInstance.getString("Title")
const subtitle = figma.selectedInstance.getString("Subtitle")
const showSubtitle = figma.selectedInstance.getBoolean("Show subtitle")
const showIcon = figma.selectedInstance.getBoolean("Show icon", {
  true: '<span class="sh-request-chip__icon sh-icon sh-icon--16" style="--icon:url(icons/line/message.svg)" aria-hidden="true"></span>',
  false: "",
})
const sub = showSubtitle ? `<span class="sh-request-chip__subtitle sh-body-sm">${subtitle}</span>` : ""

export default {
  id: "sh-request-chip",
  example: figma.code`<div class="sh-request-chip">${showIcon}<span class="sh-request-chip__text"><span class="sh-request-chip__title sh-body-md">${title}</span>${sub}</span><a class="sh-request-chip__cta sh-button sh-button--secondary sh-button--sm" href="#requests"><span class="sh-button__text"><span class="sh-button__label sh-button-sm">View</span></span></a></div>`,
}
