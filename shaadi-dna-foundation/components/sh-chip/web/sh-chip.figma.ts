// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=306-3749
// component=sh-chip
// Code Connect template · sh-chip → HTML/CSS
// Every variant: sh-chip.html · styles: sh-chip.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// "Leading icon" / "Trailing icon" (and their Large / Medium / Small twins) are instance swaps of sh-icon. The
// snippet shows the default icons (sh-icon/arrow-left-01, sh-icon/arrow-right-01); swap the --icon URL for the one
// picked in Figma. Hover, Pressed and Focus are live CSS states, so they add nothing to the markup.
// Type=Info is read-only: a <span>, no aria-pressed, no states.

import figma from "figma"

const label = figma.selectedInstance.getString("Label")
const supporting = figma.selectedInstance.getString("Supporting label")
const leadingIcon = figma.selectedInstance.getBoolean("Show leading icon", {
  true: '<span class="sh-icon sh-icon--16 sh-chip__icon" style="--icon:url(icons/line/arrow-left-01.svg)" aria-hidden="true"></span>',
  false: "",
})
const trailingIcon = figma.selectedInstance.getBoolean("Show trailing icon", {
  true: '<span class="sh-icon sh-icon--16 sh-chip__icon" style="--icon:url(icons/line/arrow-right-01.svg)" aria-hidden="true"></span>',
  false: "",
})
const showSupporting = figma.selectedInstance.getBoolean("Show supporting label")
const type = figma.selectedInstance.getEnum("Type", { Choice: "choice", Info: "info" })
const disabled = figma.selectedInstance.getEnum("State", {
  Default: "",
  Hover: "",
  Pressed: "",
  Focus: "",
  Disabled: " disabled",
})
const selected = figma.selectedInstance.getEnum("Selected", { false: "false", true: "true" })

const supportingSpan = showSupporting && type === "info" ? `<span class="sh-chip__supporting sh-support-label">${supporting}</span>` : ""

export default {
  id: "sh-chip",
  example:
    type === "info"
      ? figma.code`<span class="sh-chip sh-chip--info">${leadingIcon}<span class="sh-chip__content">${supportingSpan}<span class="sh-chip__label sh-body-md">${label}</span></span>${trailingIcon}</span>`
      : figma.code`<button class="sh-chip" type="button" aria-pressed="${selected}"${disabled}>${leadingIcon}<span class="sh-chip__content"><span class="sh-chip__label sh-body-md">${label}</span></span>${trailingIcon}</button>`,
}
