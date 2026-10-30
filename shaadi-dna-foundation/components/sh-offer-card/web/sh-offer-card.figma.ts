// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-40923
// component=sh-offer-card
// Code Connect template · sh-offer-card → HTML/CSS
// Every variant: sh-offer-card.html · styles: sh-offer-card.css (needs tokens.css, sh-typo.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Type=Money back is one exported image (export the artwork from Figma; it is not in the repo yet).
// Type=Custom: put the festival or offer artwork from Figma's "Artwork slot" in the <img>.

import figma from "figma"

const type = figma.selectedInstance.getEnum("Type", { "Money back": "", Custom: " sh-offer-card--custom" })
const art = figma.selectedInstance.getEnum("Type", {
  "Money back": '<img class="sh-offer-card__art" src="money-back.svg" alt="30 days money back guarantee">',
  Custom: '<img class="sh-offer-card__art" src="offer-banner.png" alt="Describe the offer">',
})

export default {
  id: "sh-offer-card",
  example: figma.code`<aside class="sh-offer-card${type}" aria-label="Offer">
  <div class="sh-offer-card__artwork">${art}</div>
</aside>`,
}
