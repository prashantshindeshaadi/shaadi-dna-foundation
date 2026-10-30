// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2613-33495
// component=sh-progress-ring
// Code Connect template · sh-progress-ring → HTML/CSS + inline SVG
// Every variant: sh-progress-ring.html · styles: sh-progress-ring.css (needs tokens.css, sh-typo.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The amount is the Progress arc's end in Figma (not a property). The snippet works it out from Value and
// Total ("of 36"); in the app, set stroke-dasharray="<percent> 100" and the aria-value* from the data.

import figma from "figma"

const value = figma.selectedInstance.getString("Value")
const total = figma.selectedInstance.getString("Total")
const showTotal = figma.selectedInstance.getBoolean("Show total")

const now = parseFloat(String(value)) || 0
const max = parseFloat(String(total).replace(/[^0-9.]/g, "")) || 100
const percent = Math.max(0, Math.min(100, Math.round((now / max) * 100)))
const totalSpan = showTotal ? `<span class="sh-progress-ring__total sh-support-meta">${total}</span>` : ""

export default {
  id: "sh-progress-ring",
  example: figma.code`<div class="sh-progress-ring" role="meter" aria-label="Astro match" aria-valuemin="0" aria-valuemax="${max}" aria-valuenow="${value}">
  <svg class="sh-progress-ring__arcs" aria-hidden="true"><circle class="sh-progress-ring__track"></circle><circle class="sh-progress-ring__progress" pathLength="100" stroke-dasharray="${percent} 100"></circle></svg>
  <span class="sh-progress-ring__value" aria-hidden="true"><span class="sh-progress-ring__number sh-heading-sm">${value}</span>${totalSpan}</span>
</div>`,
}
