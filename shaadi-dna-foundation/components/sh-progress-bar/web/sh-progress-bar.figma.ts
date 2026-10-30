// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13063
// component=sh-progress-bar
// Code Connect template · sh-progress-bar → HTML/CSS
// Every variant: sh-progress-bar.html · styles: sh-progress-bar.css (needs tokens.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The amount is the Progress layer's width in Figma (not a property): set the width (value ÷ max as a %)
// and aria-valuenow / aria-valuemax from the data, and name what is measured in aria-label.

import figma from "figma"

const tone = figma.selectedInstance.getEnum("Tone", {
  Brand: "",
  Premium: " sh-progress-bar--premium",
  Success: " sh-progress-bar--success",
})

export default {
  id: "sh-progress-bar",
  example: figma.code`<div class="sh-progress-bar${tone}" role="progressbar" aria-label="Contacts viewed" aria-valuemin="0" aria-valuemax="72" aria-valuenow="10"><span class="sh-progress-bar__progress" style="width: 14%"></span></div>`,
}
