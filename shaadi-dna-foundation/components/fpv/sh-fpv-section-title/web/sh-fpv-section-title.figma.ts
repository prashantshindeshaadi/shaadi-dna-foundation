// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2898-66490
// component=sh-fpv-section-title
// Code Connect template · sh-fpv-section-title → HTML/CSS
// Every variant: sh-fpv-section-title.html · styles: sh-button.css + sh-fpv-asset-premium-badge.css +
// sh-fpv-section-title.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// "Action" is the exposed sh-button: its own Code Connect renders the type and label picked in the panel
// (Free viewer → Unlock, Premium Soft · Premium viewer → View, Tertiary). The badge art is not in the repo yet.

import figma from "figma"

const title = figma.selectedInstance.getString("Title")
const showBadge = figma.selectedInstance.getBoolean("Show badge", {
  true: '<span class="sh-fpv-section-title__badge sh-fpv-asset-premium-badge"><img class="sh-fpv-asset-premium-badge__art" src="premium-badge-art.png" alt="Premium feature"></span>',
  false: "",
})
const showAction = figma.selectedInstance.getBoolean("Show action")
const showSubtitle = figma.selectedInstance.getBoolean("Show subtitle")
const subtitle = figma.selectedInstance.getString("Subtitle")

const action = figma.selectedInstance.findInstance("Action")
const actionCode =
  showAction && action && action.type !== "ERROR"
    ? action.executeTemplate().example
    : ""
const sub = showSubtitle ? `<p class="sh-fpv-section-title__subtitle sh-body-md">${subtitle}</p>` : ""

export default {
  id: "sh-fpv-section-title",
  example: figma.code`<div class="sh-fpv-section-title"><div class="sh-fpv-section-title__top"><div class="sh-fpv-section-title__title-group"><div class="sh-fpv-section-title__title-row"><h2 class="sh-fpv-section-title__title sh-heading-sm">${title}</h2>${showBadge}</div></div>${actionCode}</div>${sub}</div>`,
}
