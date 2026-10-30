// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2711-12618
// component=sh-navigation-bar
// Code Connect template · sh-navigation-bar → HTML/CSS
// Every variant: sh-navigation-bar.html · styles: sh-navigation-bar.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-indicator.css, sh-navigation-item.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The items are sh-navigation-item instances; the snippet shows the five default items. Edit labels, icons
// and badges to match the design. icons/<type>/matches.svg is not in the icon pack yet.

import figma from "figma"

const device = figma.selectedInstance.getEnum("Device", {
  Mobile: "mobile",
  Tablet: "tablet",
  Desktop: "desktop",
})
const active = figma.selectedInstance.getEnum("Active", {
  Home: "Home",
  Matches: "Matches",
  Inbox: "Inbox",
  Chat: "Chat",
  Premium: "Premium",
})

const inline = device !== "mobile"
const barModifier = device === "mobile" ? "" : ` sh-navigation-bar--${device}`
const itemModifier = inline ? " sh-navigation-item--inline" : ""
const textStyle = inline ? "sh-title-md" : "sh-body-sm"
const items = [
  ["Home", "shaadi"],
  ["Matches", "matches"],
  ["Inbox", "inbox"],
  ["Chat", "chat"],
  ["Premium", "premium"],
]
  .map(([name, icon]) => {
    const isActive = name === active
    const current = isActive ? ' aria-current="page"' : ""
    const type = isActive ? "filled" : "line"
    return `  <a class="sh-navigation-item${itemModifier}" href="#"${current}><span class="sh-navigation-item__icon-wrap"><span class="sh-navigation-item__icon sh-icon sh-icon--24" style="--icon:url(icons/${type}/${icon}.svg)" aria-hidden="true"></span></span><span class="sh-navigation-item__label ${textStyle}">${name}</span></a>`
  })
  .join("\n")

export default {
  id: "sh-navigation-bar",
  example: figma.code`<nav class="sh-navigation-bar${barModifier}" aria-label="Main">
${items}
</nav>`,
}
