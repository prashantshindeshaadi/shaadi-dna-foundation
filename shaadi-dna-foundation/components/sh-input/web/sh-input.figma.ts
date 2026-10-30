// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=1467-17271
// component=sh-input
// Code Connect template · sh-input → HTML/CSS
// Every variant: sh-input.html · styles: sh-input.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// "Leading icon", "Trailing icon" and "Status Icon" are instance swaps of sh-icon. The snippet shows the defaults
// (sh-icon/calendar, sh-icon/arrow-down-01, sh-icon/help-circle); swap the --icon URL for the one picked in Figma.
// The label floats by itself (placeholder=" " marks the field empty); Typing is the field's real :focus.

import figma from "figma"

const showLeadingIcon = figma.selectedInstance.getBoolean("Show leading icon")
const showTrailingIcon = figma.selectedInstance.getBoolean("Show trailing icon")
const label = figma.selectedInstance.getString("Label")
const value = figma.selectedInstance.getString("Value")
const helperText = figma.selectedInstance.getString("Helper text")
const counter = figma.selectedInstance.getString("Counter")
const countryCode = figma.selectedInstance.getString("Country code")
const type = figma.selectedInstance.getEnum("Type", {
  Default: "default",
  Phone: "phone",
  "Text box": "text-box",
})
const state = figma.selectedInstance.getEnum("State", {
  Default: "",
  Filled: "",
  Typing: "",
  Disabled: "",
  Error: " sh-input--error",
  Warning: " sh-input--warning",
  Success: " sh-input--success",
  Info: " sh-input--info",
})
const empty = figma.selectedInstance.getEnum("State", { Default: true })
const disabled = figma.selectedInstance.getEnum("State", { Disabled: " disabled" })
const invalid = figma.selectedInstance.getEnum("State", { Error: ' aria-invalid="true"' })
const showHelper = figma.selectedInstance.getEnum("State", { Error: true, Warning: true, Success: true, Info: true })

const typeClass = type === "default" ? "" : ` sh-input--${type}`
const fieldValue = empty ? "" : value
const describedBy = showHelper ? ' aria-describedby="field-help"' : ""
const leading =
  showLeadingIcon && type === "default"
    ? '<span class="sh-input__icon sh-icon sh-icon--16" style="--icon:url(icons/line/calendar.svg)" aria-hidden="true"></span>'
    : ""
const trailing =
  showTrailingIcon && type !== "text-box"
    ? '<span class="sh-input__icon sh-icon sh-icon--16" style="--icon:url(icons/line/arrow-down-01.svg)" aria-hidden="true"></span>'
    : ""
const country =
  type === "phone"
    ? `<button class="sh-input__country" type="button" aria-label="Country code ${countryCode}"${disabled || ""}><span class="sh-body-md">${countryCode}</span><span class="sh-icon sh-icon--16" style="--icon:url(icons/line/arrow-down-01.svg)" aria-hidden="true"></span></button>
    <span class="sh-input__separator" aria-hidden="true"></span>`
    : ""
const field =
  type === "text-box"
    ? `<textarea class="sh-input__field sh-body-md-tight" id="field" rows="3" maxlength="500" placeholder=" "${disabled || ""}${invalid || ""}${describedBy}>${fieldValue}</textarea>`
    : `<input class="sh-input__field sh-body-md-tight" id="field" type="${type === "phone" ? "tel" : "text"}" placeholder=" " value="${fieldValue}"${disabled || ""}${invalid || ""}${describedBy}>`
const support = showHelper
  ? `
  <div class="sh-input__support">
    <span class="sh-input__status sh-icon sh-icon--12" style="--icon:url(icons/line/help-circle.svg)" aria-hidden="true"></span>
    <span class="sh-input__helper sh-body-sm" id="field-help">${helperText}</span>${
      type === "text-box" ? `
    <span class="sh-input__counter sh-support-meta">${counter}</span>` : ""
    }
  </div>`
  : ""

export default {
  id: "sh-input",
  example: figma.code`<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-input/web/sh-input.css">

<div class="sh-input${typeClass}${state}">
  <label class="sh-input__control" for="field">
    ${country}${leading}
    <span class="sh-input__content">
      <span class="sh-input__label sh-body-sm-loose">${label}</span>
      ${field}
    </span>
    ${trailing}
  </label>${support}
</div>`,
}
