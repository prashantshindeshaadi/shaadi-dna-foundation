// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41907
// component=sh-pagination-item
// Code Connect template · sh-pagination-item → HTML/CSS
// Every variant: sh-pagination-item.html · styles: sh-pagination-item.css (needs tokens.css, sh-typo.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)

import figma from "figma"

const label = figma.selectedInstance.getString("Label")
const state = figma.selectedInstance.getEnum("State", {
  Default: "",
  Hover: "",
  Selected: ' aria-current="page"',
})

export default {
  id: "sh-pagination-item",
  example: figma.code`<a class="sh-pagination-item" href="?page=${label}"${state}><span class="sh-pagination-item__label sh-body-md">${label}</span></a>`,
}
