// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2711-12618
// component=sh-navigation-bar
// Code Connect template · sh-navigation-bar → HTML/CSS
// Every variant: sh-navigation-bar.html · styles: sh-navigation-bar.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-indicator.css, sh-navigation-item.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Each slot (Tab 1–6) is an sh-navigation-item and renders its own snippet, so the tabs, the active one
// and the badges follow what is picked in Figma. Tab 6 only appears with Show tab 6.

import figma from "figma"

const device = figma.selectedInstance.getEnum("Device", {
  Mobile: "",
  Tablet: " sh-navigation-bar--tablet",
  Desktop: " sh-navigation-bar--desktop",
})
const showTab6 = figma.selectedInstance.getBoolean("Show tab 6")
const tab1 = figma.selectedInstance.findInstance("Tab 1")?.executeTemplate().example
const tab2 = figma.selectedInstance.findInstance("Tab 2")?.executeTemplate().example
const tab3 = figma.selectedInstance.findInstance("Tab 3")?.executeTemplate().example
const tab4 = figma.selectedInstance.findInstance("Tab 4")?.executeTemplate().example
const tab5 = figma.selectedInstance.findInstance("Tab 5")?.executeTemplate().example
const tab6 = showTab6 ? figma.selectedInstance.findInstance("Tab 6")?.executeTemplate().example : ""

export default {
  id: "sh-navigation-bar",
  example: figma.code`<nav class="sh-navigation-bar${device}" aria-label="Main">
  ${tab1}
  ${tab2}
  ${tab3}
  ${tab4}
  ${tab5}
  ${tab6}
</nav>`,
}
