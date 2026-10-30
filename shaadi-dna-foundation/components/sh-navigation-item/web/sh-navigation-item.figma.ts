// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2711-12054
// component=sh-navigation-item
// Code Connect template · sh-navigation-item → HTML/CSS
// Every variant: sh-navigation-item.html · styles: sh-navigation-item.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-indicator.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Tab picks the label and the icon (Line when inactive, Filled when active). Premium offer shows the
// 70% OFF ticket when inactive; that art is not exported to icons/ yet, so the snippet uses the Premium icon.
// The badge is an sh-indicator: brand for Matches, neutral for the others. Replace the count with the real one.

import figma from "figma"

const tab = figma.selectedInstance.getEnum("Tab", {
  Home: "Home|shaadi|",
  Matches: "Matches|matches|brand",
  Inbox: "Inbox|inbox|neutral",
  Chat: "Chat|chat|neutral",
  Updates: "Updates|notification|neutral",
  Premium: "Premium|premium|",
  "Premium offer": "Premium|premium|",
})
const showBadge = figma.selectedInstance.getBoolean("Show badge")
const layout = figma.selectedInstance.getEnum("Layout", {
  Stacked: "stacked",
  Inline: "inline",
})
const active = figma.selectedInstance.getEnum("Active", {
  false: false,
  true: true,
})

const [label, icon, badgeTone] = tab.split("|")
const modifier = layout === "inline" ? " sh-navigation-item--inline" : ""
const textStyle = layout === "inline" ? "sh-title-md" : "sh-body-sm"
const current = active ? ' aria-current="page"' : ""
const iconType = active ? "filled" : "line"
const tone = badgeTone ? ` sh-indicator--${badgeTone}` : ""
const badge = showBadge
  ? `<span class="sh-navigation-item__badge sh-indicator${tone}" aria-hidden="true"><span class="sh-indicator__count sh-support-label">12</span></span>`
  : ""

export default {
  id: "sh-navigation-item",
  example: figma.code`<a class="sh-navigation-item${modifier}" href="#"${current}><span class="sh-navigation-item__icon-wrap"><span class="sh-navigation-item__icon sh-icon sh-icon--24" style="--icon:url(icons/${iconType}/${icon}.svg)" aria-hidden="true"></span>${badge}</span><span class="sh-navigation-item__label ${textStyle}">${label}</span></a>`,
}
