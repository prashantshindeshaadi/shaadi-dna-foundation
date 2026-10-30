// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2711-11922
// component=sh-tab-item
// Code Connect template · sh-tab-item → HTML/CSS
// Every variant: sh-tab-item.html · styles: sh-tab-item.css (needs tokens.css, sh-typo.css, sh-indicator.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)

import figma from "figma"

const label = figma.selectedInstance.getString("Label")
const count = figma.selectedInstance.getString("Count")
const showCount = figma.selectedInstance.getBoolean("Show count")
const showDot = figma.selectedInstance.getBoolean("Show dot")
const style = figma.selectedInstance.getEnum("Style", {
  Underline: "underline",
  Segmented: "segmented",
  Vertical: "vertical",
})
const selected = figma.selectedInstance.getEnum("Selected", {
  true: "true",
  false: "false",
})

const modifier = style === "underline" ? "" : ` sh-tab-item--${style}`
const textStyle = style === "segmented" ? (selected === "true" ? "sh-button-md" : "sh-body-md") : "sh-title-md"
const dot = showDot ? '<span class="sh-tab-item__dot"><span class="sh-indicator sh-indicator--dot" aria-hidden="true"></span></span>' : ""
const countPart = showCount ? `<span class="sh-tab-item__count sh-support-label">${count}</span>` : ""

export default {
  id: "sh-tab-item",
  example: figma.code`<button class="sh-tab-item${modifier}" type="button" role="tab" aria-selected="${selected}"><span class="sh-tab-item__label ${textStyle}">${label}</span>${dot}${countPart}</button>`,
}
