// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2613-33481
// component=sh-card
// Code Connect template · sh-card → HTML/CSS
// Every variant: sh-card.html · styles: sh-card.css (needs tokens.css, sh-typo.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// "Content slot" is a Figma slot: put the slot's parts (each with its own Code Connect snippet) inside
// .sh-card__content. Use a heading level that fits the page for the Label.

import figma from "figma"

const label = figma.selectedInstance.getString("Label")
const showLabel = figma.selectedInstance.getBoolean("Show label")
const type = figma.selectedInstance.getEnum("Type", {
  Outlined: "",
  Filled: " sh-card--filled",
  Elevated: " sh-card--elevated",
})
const size = figma.selectedInstance.getEnum("Size", {
  Medium: "",
  Small: " sh-card--sm",
})

export default {
  id: "sh-card",
  example: showLabel
    ? figma.code`<section class="sh-card${type}${size}" aria-labelledby="card-label">
  <h3 class="sh-card__label sh-support-micro" id="card-label">${label}</h3>
  <div class="sh-card__content"><!-- Content slot --></div>
</section>`
    : figma.code`<div class="sh-card${type}${size}">
  <div class="sh-card__content"><!-- Content slot --></div>
</div>`,
}
