// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13716
// component=sh-membership-card
// Code Connect template · sh-membership-card → HTML/CSS
// Every variant: sh-membership-card.html · styles: sh-membership-card.css (needs tokens.css, sh-typo.css, sh-tag.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Visual slot: put the plan's badge artwork in the <img> (export it from Figma; it is not in the repo yet).

import figma from "figma"

const plan = figma.selectedInstance.getString("Plan")
const details = figma.selectedInstance.getString("Details")
const status = figma.selectedInstance.getEnum("Status", { Active: "Active", Expired: "Expired" })

export default {
  id: "sh-membership-card",
  example: figma.code`<section class="sh-membership-card" aria-label="Your membership">
  <div class="sh-membership-card__visual"><img src="plan-badge.png" width="58" height="58" alt=""></div>
  <div class="sh-membership-card__text">
    <p class="sh-membership-card__plan-row">
      <span class="sh-membership-card__plan sh-heading-sm">${plan}</span>
      <span class="sh-tag"><span class="sh-tag__label sh-support-label">${status}</span></span>
    </p>
    <p class="sh-membership-card__details sh-body-md">${details}</p>
  </div>
</section>`,
}
