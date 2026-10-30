// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2711-12054
// component=sh-navigation-item
// Code Connect template · sh-navigation-item → HTML/CSS
// Every variant: sh-navigation-item.html · styles: sh-navigation-item.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-indicator.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// "Icon" is an instance swap of sh-icon. The snippet shows the default (sh-icon/shaadi, Size 24: Line when
// inactive, Filled when active); swap the --icon URL for the icon picked in Figma.
// The badge is an sh-indicator (Count 12, Information); for Dot or Error use its modifiers (see sh-indicator).

import figma from "figma"

const label = figma.selectedInstance.getString("Label")
const showBadge = figma.selectedInstance.getBoolean("Show badge")
const layout = figma.selectedInstance.getEnum("Layout", {
  Stacked: "stacked",
  Inline: "inline",
})
const active = figma.selectedInstance.getEnum("Active", {
  false: false,
  true: true,
})

const modifier = layout === "inline" ? " sh-navigation-item--inline" : ""
const textStyle = layout === "inline" ? "sh-title-md" : "sh-body-sm"
const current = active ? ' aria-current="page"' : ""
const iconType = active ? "filled" : "line"
const badge = showBadge
  ? '<span class="sh-navigation-item__badge sh-indicator" aria-hidden="true"><span class="sh-indicator__count sh-support-label">12</span></span>'
  : ""

export default {
  id: "sh-navigation-item",
  example: figma.code`<a class="sh-navigation-item${modifier}" href="#"${current}><span class="sh-navigation-item__icon-wrap"><span class="sh-navigation-item__icon sh-icon sh-icon--24" style="--icon:url(icons/${iconType}/shaadi.svg)" aria-hidden="true"></span>${badge}</span><span class="sh-navigation-item__label ${textStyle}">${label}</span></a>`,
}
