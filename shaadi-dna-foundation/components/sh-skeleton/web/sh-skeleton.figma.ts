// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13115
// component=sh-skeleton
// Code Connect template · sh-skeleton → HTML/CSS
// Every variant: sh-skeleton.html · styles: sh-skeleton.css (needs tokens.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Line and Block fill their container's width; give a Block its height where it is used.
// Mark the loading region aria-busy="true"; skeletons themselves are aria-hidden.

import figma from "figma"

const type = figma.selectedInstance.getEnum("Type", {
  Line: "line",
  Circle: "circle",
  Block: "block",
  Card: "card",
})

export default {
  id: "sh-skeleton",
  example:
    type === "card"
      ? figma.code`<div class="sh-skeleton sh-skeleton--card" aria-hidden="true"><span class="sh-skeleton__media"></span><span class="sh-skeleton__line"></span><span class="sh-skeleton__line"></span></div>`
      : type === "line"
        ? figma.code`<span class="sh-skeleton" aria-hidden="true"></span>`
        : figma.code`<span class="sh-skeleton sh-skeleton--${type}" aria-hidden="true"></span>`,
}
