// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2496-22347
// component=sh-radio
// Code Connect template · sh-radio → HTML/CSS
// Every variant: sh-radio.html · styles: sh-radio.css (needs tokens.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Hover, Pressed and Focus are live CSS states (:hover, :active, :focus-visible), so they add nothing to the markup.
// Radios in one group share a name.

import figma from "figma"

const checked = figma.selectedInstance.getEnum("Selected", { Active: " checked", Inactive: "" })
const disabled = figma.selectedInstance.getEnum("State", {
  Default: "",
  Disabled: " disabled",
  Hover: "",
  Pressed: "",
  Focus: "",
})

export default {
  id: "sh-radio",
  example: figma.code`<label class="sh-radio">
  <input class="sh-radio__input" type="radio" name="diet" value="veg"${checked}${disabled} aria-label="Vegetarian">
  <span class="sh-radio__circle" aria-hidden="true"><span class="sh-radio__dot"></span></span>
</label>`,
}
