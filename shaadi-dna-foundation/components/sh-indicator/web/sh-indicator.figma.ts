// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2717-39751
// component=sh-indicator
// Code Connect template · sh-indicator → HTML/CSS
// Every variant: sh-indicator.html · styles: sh-indicator.css (needs tokens.css, sh-typo.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Status Brand and Neutral exist in Figma but not yet in the blueprint; they're mapped so they don't fall through.

import figma from "figma"

const count = figma.selectedInstance.getString("Count")
const type = figma.selectedInstance.getEnum("Type", { Count: "count", Dot: "dot" })
const status = figma.selectedInstance.getEnum("Status", {
  Information: "",
  Error: " sh-indicator--error",
  Brand: " sh-indicator--brand",
  Neutral: " sh-indicator--neutral",
})

export default {
  id: "sh-indicator",
  example:
    type === "dot"
      ? figma.code`<span class="sh-indicator sh-indicator--dot${status}" aria-hidden="true"></span>`
      : figma.code`<span class="sh-indicator${status}"><span class="sh-indicator__count sh-support-label">${count}</span></span>`,
}
