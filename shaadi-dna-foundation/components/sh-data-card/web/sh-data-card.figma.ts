// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2644-46398
// component=sh-data-card
// Code Connect template · sh-data-card → HTML/CSS
// Every variant: sh-data-card.html · styles: sh-data-card.css (needs tokens.css, sh-typo.css, sh-icon.css,
// sh-text-link.css, sh-progress-ring.css, sh-button.css, sh-progress-bar.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Action slot and Visual slot render the nested parts' own snippets (sh-text-link / sh-button, sh-progress-ring /
// pictogram). Usage: set the sh-progress-bar width and aria-valuenow from the real numbers.

import figma from "figma"

const actionSlot = figma.selectedInstance.getSlot("Action slot")
const visualSlot = figma.selectedInstance.getSlot("Visual slot")
const title = figma.selectedInstance.getString("Title")
const body = figma.selectedInstance.getString("Body")
const showBody = figma.selectedInstance.getBoolean("Show body")
const showAction = figma.selectedInstance.getBoolean("Show action")
const showVisual = figma.selectedInstance.getBoolean("Show visual")
const value = figma.selectedInstance.getString("Value")
const type = figma.selectedInstance.getEnum("Type", { Score: "", Promo: " sh-data-card--promo", Usage: " sh-data-card--usage" })
const isUsage = figma.selectedInstance.getEnum("Type", { Usage: true })

// Plain strings for the optional parts; the slots are interpolated directly (no nested templates).
const usageBody = showBody ? `\n  <p class="sh-data-card__body sh-body-sm">${body}</p>` : ""
const cardBody = showBody ? `\n      <p class="sh-data-card__body sh-body-md">${body}</p>` : ""
const actionOpen = showAction ? `\n      <div class="sh-data-card__action">` : ""
const actionClose = showAction ? `</div>` : ""
const visualOpen = showVisual ? `\n    <div class="sh-data-card__visual">` : ""
const visualClose = showVisual ? `</div>` : ""

const usage = figma.code`<a class="sh-data-card${type}" href="…">
  <div class="sh-data-card__row">
    <span class="sh-data-card__title sh-title-md">${title}</span>
    <span class="sh-data-card__value sh-body-sm">${value}</span>
    <span class="sh-data-card__chevron sh-icon" style="--icon:url(icons/line/arrow-right-01.svg)" aria-hidden="true"></span>
  </div>
  <div class="sh-progress-bar" role="progressbar" aria-label="${title}" aria-valuemin="0" aria-valuemax="72" aria-valuenow="10"><span class="sh-progress-bar__progress" style="width: 14%"></span></div>${usageBody}
</a>`

const card = figma.code`<article class="sh-data-card${type}">
  <div class="sh-data-card__row">
    <div class="sh-data-card__text">
      <h3 class="sh-data-card__title sh-title-lg">${title}</h3>${cardBody}${actionOpen}${showAction ? actionSlot : ""}${actionClose}
    </div>${visualOpen}${showVisual ? visualSlot : ""}${visualClose}
  </div>
</article>`

export default {
  id: "sh-data-card",
  example: isUsage ? usage : card,
}
