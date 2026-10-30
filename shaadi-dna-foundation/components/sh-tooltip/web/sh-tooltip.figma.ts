// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13106
// component=sh-tooltip
// Code Connect template · sh-tooltip → HTML/CSS
// Every variant: sh-tooltip.html · styles: sh-tooltip.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Title and Show close only apply to Type=Rich. Place the tooltip next to its target in the app;
// a Simple tooltip's target takes aria-describedby="<tooltip id>".

import figma from "figma"

const label = figma.selectedInstance.getString("Label")
const title = figma.selectedInstance.getString("Title")
const showClose = figma.selectedInstance.getBoolean("Show close")
const type = figma.selectedInstance.getEnum("Type", {
  Simple: "simple",
  Rich: "rich",
})
const placement = figma.selectedInstance.getEnum("Placement", {
  Top: "",
  Bottom: " sh-tooltip--bottom",
  Left: " sh-tooltip--left",
  Right: " sh-tooltip--right",
})

const closeHtml = showClose
  ? `\n      <button class="sh-tooltip__close" type="button" aria-label="Close"><span class="sh-icon sh-icon--16" style="--icon:url(icons/line/close.svg)" aria-hidden="true"></span></button>`
  : ""

const simpleHtml = `<div class="sh-tooltip${placement}" role="tooltip" id="tooltip">
  <div class="sh-tooltip__bubble"><p class="sh-tooltip__label sh-body-sm">${label}</p></div>
  <span class="sh-tooltip__pointer" aria-hidden="true"></span>
</div>`

const richHtml = `<div class="sh-tooltip sh-tooltip--rich${placement}" role="dialog" aria-labelledby="tooltip-title">
  <div class="sh-tooltip__bubble">
    <div class="sh-tooltip__header">
      <p class="sh-tooltip__title sh-title-sm" id="tooltip-title">${title}</p>${closeHtml}
    </div>
    <p class="sh-tooltip__label sh-body-sm">${label}</p>
  </div>
  <span class="sh-tooltip__pointer" aria-hidden="true"></span>
</div>`

export default {
  id: "sh-tooltip",
  example: figma.code`${type === "rich" ? richHtml : simpleHtml}`,
}
