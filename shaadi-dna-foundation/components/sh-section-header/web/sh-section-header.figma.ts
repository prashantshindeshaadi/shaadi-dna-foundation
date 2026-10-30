// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2606-29601
// component=sh-section-header
// Code Connect template · sh-section-header → HTML/CSS
// Every variant: sh-section-header.html · styles: sh-section-header.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-button.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// "Badge" is an instance swap of the pictograms: the snippet shows the default (sh-icon/pictogram/premium-member);
// change the src to the one picked in Figma. The Action is a nested sh-button (Size Small, default Premium Soft
// "Unlock"): use the Type and label set in Figma.

import figma from "figma"

const title = figma.selectedInstance.getString("Title")
const showBadge = figma.selectedInstance.getBoolean("Show badge")
const showAction = figma.selectedInstance.getBoolean("Show action")

const badgeHtml = showBadge
  ? `\n    <img class="sh-section-header__badge" src="icons/pictogram/premium-member@2x.png" alt="Premium">`
  : ""
const actionHtml = showAction
  ? `\n  <button class="sh-section-header__action sh-button sh-button--premium-soft sh-button--sm" type="button">
    <span class="sh-button__text"><span class="sh-button__label sh-button-sm">Unlock</span></span>
  </button>`
  : ""

export default {
  id: "sh-section-header",
  example: figma.code`<header class="sh-section-header">
  <div class="sh-section-header__title-group">
    <h2 class="sh-section-header__title sh-heading-sm">${title}</h2>${badgeHtml}
  </div>${actionHtml}
</header>`,
}
