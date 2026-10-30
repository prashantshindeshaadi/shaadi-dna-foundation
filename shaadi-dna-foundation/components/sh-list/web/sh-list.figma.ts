// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=3322-75631
// component=sh-list
// Code Connect template · sh-list → HTML/CSS
// Every variant: sh-list.html · styles: sh-list.css + the chosen row part's CSS (sh-list-default.css is shared by
// every Type except Info). Needs tokens.css, sh-typo.css, sh-icon.css, sh-divider.css.
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The row part is the nested instance exposed as "Row"; its own Code Connect renders inside the wrapper,
// so the snippet follows every option set under Row.

import figma from "figma"

const type = figma.selectedInstance.getEnum("Type", {
  Default: "",
  Preference: " sh-list--preference",
  Report: " sh-list--report",
  Score: " sh-list--score",
  Highlight: " sh-list--highlight",
  Grouped: " sh-list--grouped",
  Info: " sh-list--info",
})
const row = figma.selectedInstance.findInstance("Row")
const rowCode = row && row.type !== "ERROR" ? row.executeTemplate().example : ""

export default {
  id: "sh-list",
  example: figma.code`<div class="sh-list${type}">${rowCode}</div>`,
}
