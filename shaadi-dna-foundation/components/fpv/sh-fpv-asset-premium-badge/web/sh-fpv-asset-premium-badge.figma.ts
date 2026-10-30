// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-19334
// component=sh-fpv-asset-premium-badge
// Code Connect template · sh-fpv-asset/premium-badge → HTML/CSS
// Every variant: sh-fpv-asset-premium-badge.html · styles: sh-fpv-asset-premium-badge.css (needs tokens.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// No Figma properties. The gold badge art is not in the repo yet: replace the src with the final art.

import figma from "figma"

export default {
  id: "sh-fpv-asset-premium-badge",
  example: figma.code`<span class="sh-fpv-asset-premium-badge"><img class="sh-fpv-asset-premium-badge__art" src="premium-badge-art.png" alt="Premium feature"></span>`,
}
