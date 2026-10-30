// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41739
// component=sh-menu-item
// Code Connect template · sh-menu-item → HTML/CSS
// Every variant: sh-menu-item.html · styles: sh-menu-item.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// "Icon" is an instance swap of sh-icon. The snippet shows the default (sh-icon/bookmark, Line 20);
// swap the --icon URL for the icon picked in Figma.

import figma from "figma"

const label = figma.selectedInstance.getString("Label")
const showIcon = figma.selectedInstance.getBoolean("Show icon")
const type = figma.selectedInstance.getEnum("Type", {
  Default: "",
  Destructive: " sh-menu-item--destructive",
})
const state = figma.selectedInstance.getEnum("State", {
  Default: "",
  Hover: "",
  Selected: "selected",
})

const icon = showIcon
  ? '<span class="sh-menu-item__icon sh-icon sh-icon--20" style="--icon:url(icons/line/bookmark.svg)" aria-hidden="true"></span>'
  : ""
const role = state === "selected" ? 'role="menuitemradio" aria-checked="true"' : 'role="menuitem"'
const check =
  state === "selected"
    ? '<span class="sh-menu-item__check sh-icon sh-icon--16" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span>'
    : ""

export default {
  id: "sh-menu-item",
  example: figma.code`<button class="sh-menu-item${type}" type="button" ${role}>${icon}<span class="sh-menu-item__label sh-body-md">${label}</span>${check}</button>`,
}
