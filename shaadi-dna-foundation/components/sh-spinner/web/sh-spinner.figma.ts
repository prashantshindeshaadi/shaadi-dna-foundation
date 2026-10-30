// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41521
// component=sh-spinner
// Code Connect template · sh-spinner → HTML/CSS
// Every variant: sh-spinner.html · styles: sh-spinner.css (needs tokens.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Indeterminate. Give the root a label that says what is loading ("Loading matches").
// Buttons have their own Loading state (sh-button .is-loading): don't put a spinner in a button.

import figma from "figma"

const size = figma.selectedInstance.getEnum("Size", {
  Large: "",
  Medium: " sh-spinner--md",
  Small: " sh-spinner--sm",
})
const tone = figma.selectedInstance.getEnum("Tone", {
  Brand: "",
  Neutral: " sh-spinner--neutral",
  Inverse: " sh-spinner--inverse",
})

export default {
  id: "sh-spinner",
  example: figma.code`<span class="sh-spinner${size}${tone}" role="status" aria-label="Loading"><span class="sh-icon sh-spinner__icon" style="--icon:url(icons/line/loader-circle.svg)" aria-hidden="true"></span></span>`,
}
