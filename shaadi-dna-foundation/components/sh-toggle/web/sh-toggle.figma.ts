// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2496-22571
// component=sh-toggle
// Code Connect template · sh-toggle → HTML/CSS
// Every variant: sh-toggle.html · styles: sh-toggle.css (needs tokens.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Hover, Pressed and Focus are live CSS states (:hover, :active, :focus-visible), so they add nothing to the markup.

import figma from "figma"

const checked = figma.selectedInstance.getEnum("Value", { Off: "", On: " checked" })
const disabled = figma.selectedInstance.getEnum("State", {
  Default: "",
  Hover: "",
  Pressed: "",
  Disabled: " disabled",
  Focus: "",
})

export default {
  id: "sh-toggle",
  example: figma.code`<label class="sh-toggle">
  <input class="sh-toggle__input" type="checkbox" role="switch"${checked}${disabled} aria-label="Show my photo to members only">
  <span class="sh-toggle__track" aria-hidden="true">
    <span class="sh-toggle__thumb">
      <span class="sh-icon sh-icon--16 sh-toggle__icon" style="--icon:url(icons/filled/check.svg)"></span>
    </span>
  </span>
</label>`,
}
