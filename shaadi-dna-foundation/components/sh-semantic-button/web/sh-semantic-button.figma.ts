// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=562-23918
// component=sh-semantic-button
// Code Connect template · sh-semantic-button → HTML/CSS
// Every variant: sh-semantic-button.html · styles: sh-semantic-button.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-button.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The icon swaps (Leading / Trailing icon per size) are instances of sh-icon. The snippet shows the defaults
// (sh-icon/arrow-left-01, sh-icon/arrow-down-01); swap the --icon URL for the one picked in Figma.

import figma from "figma"

const label = figma.selectedInstance.getString("Label")
const showLeadingIcon = figma.selectedInstance.getBoolean("Show leading icon")
const showTrailingIcon = figma.selectedInstance.getBoolean("Show trailing icon")
const intent = figma.selectedInstance.getEnum("Intent", {
  Success: "success",
  Error: "error",
  Warning: "warning",
  Information: "information",
})
const type = figma.selectedInstance.getEnum("Type", {
  Solid: "",
  Soft: " sh-semantic-button--soft",
  Ghost: " sh-semantic-button--ghost",
})
const size = figma.selectedInstance.getEnum("Size", {
  Large: "lg",
  Medium: "md",
  Small: "sm",
})
const state = figma.selectedInstance.getEnum("State", {
  Default: "",
  Hover: "",
  Pressed: "",
  Focus: "",
  Disabled: "",
  Loading: " is-loading",
})
const disabled = figma.selectedInstance.getEnum("State", { Disabled: " disabled" })
const busy = figma.selectedInstance.getEnum("State", { Loading: ' aria-busy="true"' })

const leading = showLeadingIcon
  ? '<span class="sh-button__icon sh-icon" style="--icon:url(icons/line/arrow-left-01.svg)" aria-hidden="true"></span>'
  : ""
const trailing = showTrailingIcon
  ? '<span class="sh-button__icon sh-icon" style="--icon:url(icons/line/arrow-down-01.svg)" aria-hidden="true"></span>'
  : ""

export default {
  id: "sh-semantic-button",
  example: figma.code`<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-button/web/sh-button.css">
<link rel="stylesheet" href="components/sh-semantic-button/web/sh-semantic-button.css">

<button class="sh-button sh-button--${size} sh-semantic-button sh-semantic-button--${intent}${type}${state}" type="button"${disabled || ""}${busy || ""}>
  ${leading}
  <span class="sh-button__text"><span class="sh-button__label sh-button-${size}">${label}</span></span>
  ${trailing}
  <span class="sh-button__spinner sh-icon" style="--icon:url(icons/line/loader-circle.svg)" aria-hidden="true"></span>
</button>`,
}
