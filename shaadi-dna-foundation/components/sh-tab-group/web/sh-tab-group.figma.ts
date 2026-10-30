// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2721-43483
// component=sh-tab-group
// Code Connect template · sh-tab-group → HTML/CSS
// Every variant: sh-tab-group.html · styles: sh-tab-group.css (needs tokens.css, sh-typo.css, sh-indicator.css, sh-tab-item.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The tabs are sh-tab-item instances; the snippet shows the default tabs from Figma. Rename, select or add
// tabs to match the design (one aria-selected="true").

import figma from "figma"

const orientation = figma.selectedInstance.getEnum("Orientation", {
  Horizontal: "horizontal",
  Vertical: "vertical",
})

const tabs =
  orientation === "vertical"
    ? ["Profile", "Partner preferences", "Privacy", "Notifications", "Account"]
        .map((name, i) => `  <button class="sh-tab-item sh-tab-item--vertical" type="button" role="tab" aria-selected="${i === 0}"><span class="sh-tab-item__label sh-title-md">${name}</span></button>`)
        .join("\n")
    : ["New", "Daily", "My Matches", "Near Me", "More"]
        .map((name, i) => `  <button class="sh-tab-item" type="button" role="tab" aria-selected="${i === 0}"><span class="sh-tab-item__label sh-title-md">${name}</span></button>`)
        .join("\n")
const open =
  orientation === "vertical"
    ? '<div class="sh-tab-group sh-tab-group--vertical" role="tablist" aria-orientation="vertical">'
    : '<div class="sh-tab-group" role="tablist">'

export default {
  id: "sh-tab-group",
  example: figma.code`${open}
${tabs}
</div>`,
}
