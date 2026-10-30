// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2496-22479
// component=sh-checkbox
// Code Connect template · sh-checkbox → HTML/CSS
// Every variant: sh-checkbox.html · styles: sh-checkbox.css (needs tokens.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Hover, Pressed and Focus are live CSS states (:hover, :active, :focus-visible), so they add nothing to the markup.

import figma from "figma"

const checked = figma.selectedInstance.getEnum("Value", { Unchecked: "", Checked: " checked" })
const disabled = figma.selectedInstance.getEnum("State", {
  Default: "",
  Hover: "",
  Pressed: "",
  Disabled: " disabled",
  Focus: "",
})

export default {
  id: "sh-checkbox",
  example: figma.code`<label class="sh-checkbox">
  <input class="sh-checkbox__input" type="checkbox"${checked}${disabled} aria-label="Show me only verified profiles">
  <span class="sh-checkbox__box" aria-hidden="true">
    <span class="sh-icon sh-icon--16 sh-checkbox__icon" style="--icon:url(icons/filled/check.svg)"></span>
  </span>
</label>`,
}
