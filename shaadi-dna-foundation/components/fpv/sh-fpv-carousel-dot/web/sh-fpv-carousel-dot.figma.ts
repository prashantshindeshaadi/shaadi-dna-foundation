// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-16276
// component=sh-fpv-carousel-dot
// Code Connect template · sh-fpv-carousel-dot → HTML/CSS
// Every variant: sh-fpv-carousel-dot.html · styles: sh-carousel-dots.css + sh-fpv-carousel-dot.css (needs tokens.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)

import figma from "figma"

const selected = figma.selectedInstance.getEnum("Selected", {
  False: "",
  True: " sh-carousel-dots__dot--selected",
})

export default {
  id: "sh-fpv-carousel-dot",
  example: figma.code`<span class="sh-carousel-dots__dot${selected} sh-fpv-carousel-dot"></span>`,
}
