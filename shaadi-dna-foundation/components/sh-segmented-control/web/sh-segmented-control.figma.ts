// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2711-11953
// component=sh-segmented-control
// Code Connect template · sh-segmented-control → HTML/CSS
// Every variant: sh-segmented-control.html · styles: sh-segmented-control.css (needs tokens.css, sh-typo.css, sh-tab-item.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Segments are sh-tab-item Style=Segmented; the snippet shows Figma's default labels with the first selected.
// Rename them and move aria-selected="true" (and sh-button-md) to the segment selected in the design.

import figma from "figma"

const labels = figma.selectedInstance.getEnum("Items", {
  "2": "Premium|VIP",
  "3": "Premium|Profile|Settings",
  "4": "Received|Accepted|Sent|Declined",
})

const segments = String(labels || "")
  .split("|")
  .map((name, i) =>
    i === 0
      ? `  <button class="sh-tab-item sh-tab-item--segmented" type="button" role="tab" aria-selected="true"><span class="sh-tab-item__label sh-button-md">${name}</span></button>`
      : `  <button class="sh-tab-item sh-tab-item--segmented" type="button" role="tab" aria-selected="false"><span class="sh-tab-item__label sh-body-md">${name}</span></button>`,
  )
  .join("\n")

export default {
  id: "sh-segmented-control",
  example: figma.code`<div class="sh-segmented-control" role="tablist">
${segments}
</div>`,
}
