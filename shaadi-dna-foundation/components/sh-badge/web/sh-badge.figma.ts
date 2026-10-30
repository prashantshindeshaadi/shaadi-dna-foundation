// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2364-5662
// component=sh-badge
// Code Connect template · sh-badge → HTML/CSS
// Every variant: sh-badge.html · styles: sh-badge.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The class is .sh-badge-trust because sh-icon.css already owns .sh-badge (the badge images).
// "Leading icon" is an instance swap of a pictogram. The snippet shows the default (sh-icon/pictogram/parent);
// swap the src for the one picked in Figma. Hover is a live CSS state, so it adds nothing to the markup.

import figma from "figma"

const label = figma.selectedInstance.getString("Label")
const leadingIcon = figma.selectedInstance.getBoolean("Show leading icon", {
  true: '<img class="sh-icon sh-badge-trust__icon" src="icons/pictogram/parent@2x.png" alt="">',
  false: "",
})
const layout = figma.selectedInstance.getEnum("Layout", { Stacked: "", Inline: " sh-badge-trust--inline" })

export default {
  id: "sh-badge",
  example: figma.code`<button class="sh-badge-trust${layout}" type="button">${leadingIcon}<span class="sh-badge-trust__label sh-support-label">${label}</span></button>`,
}
