// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=436-6142
// component=sh-navigation-dashboard-primary-item
// Code Connect template · sh-navigation-dashboard-primary-item → HTML/CSS
// Every variant: sh-navigation-dashboard-primary-item.html · styles: sh-navigation-dashboard-primary-item.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// "Icon" is an instance swap of sh-icon. The blueprint's default, sh-icon/bottom-nav-home, is not in the icon
// pack, so the snippet shows icons/line/home.svg (Filled when Selected); swap the --icon URL for the icon picked in Figma.
// Hover and Focus are interaction states (:hover, :focus-visible), so they render like Default here.

import figma from "figma"

const label = figma.selectedInstance.getString("Label")
const showLabel = figma.selectedInstance.getBoolean("Show label")
const state = figma.selectedInstance.getEnum("State", {
  Default: "default",
  Hover: "default",
  Selected: "selected",
  Disabled: "disabled",
  Focus: "default",
})

const attrs =
  (state === "selected" ? ' href="#" aria-current="page"' : state === "disabled" ? ' aria-disabled="true"' : ' href="#"') +
  (showLabel ? "" : ` aria-label="${label}"`)
const iconType = state === "selected" ? "filled" : "line"
const labelPart = showLabel ? `<span class="sh-navigation-dashboard-primary-item__label sh-body-sm">${label}</span>` : ""

export default {
  id: "sh-navigation-dashboard-primary-item",
  example: figma.code`<a class="sh-navigation-dashboard-primary-item"${attrs}><span class="sh-navigation-dashboard-primary-item__icon sh-icon sh-icon--24" style="--icon:url(icons/${iconType}/home.svg)" aria-hidden="true"></span>${labelPart}</a>`,
}
