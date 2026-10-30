// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41675
// component=sh-alert
// Code Connect template · sh-alert → HTML/CSS
// Every variant: sh-alert.html · styles: sh-alert.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-text-link.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The Action is a nested sh-text-link (Type Link, Small): the snippet shows its default label; use the one set in Figma.

import figma from "figma"

const title = figma.selectedInstance.getString("Title")
const body = figma.selectedInstance.getString("Body")
const showTitle = figma.selectedInstance.getBoolean("Show title")
const showAction = figma.selectedInstance.getBoolean("Show action")
const showClose = figma.selectedInstance.getBoolean("Show close")
const style = figma.selectedInstance.getEnum("Style", {
  Inline: "",
  Banner: " sh-alert--banner",
})
const type = figma.selectedInstance.getEnum("Type", {
  Information: "information",
  Success: "success",
  Warning: "warning",
  Error: "error",
})
const icon = figma.selectedInstance.getEnum("Type", {
  Information: "information-circle",
  Success: "check-circle",
  Warning: "alert-diamond",
  Error: "alert-circle",
})
const role = figma.selectedInstance.getEnum("Type", {
  Information: "status",
  Success: "status",
  Warning: "alert",
  Error: "alert",
})

const titleHtml = showTitle ? `\n    <p class="sh-alert__title sh-title-sm">${title}</p>` : ""
const actionHtml = showAction
  ? `\n    <a class="sh-alert__action sh-text-link sh-text-link--link sh-text-link--sm" href="#"><span class="sh-text-link__label sh-button-sm">Add photos</span></a>`
  : ""
const closeHtml = showClose
  ? `\n  <button class="sh-alert__close" type="button" aria-label="Close"><span class="sh-icon sh-icon--16" style="--icon:url(icons/line/close.svg)" aria-hidden="true"></span></button>`
  : ""

export default {
  id: "sh-alert",
  example: figma.code`<div class="sh-alert${style} sh-alert--${type}" role="${role}">
  <span class="sh-alert__icon sh-icon sh-icon--20" style="--icon:url(icons/line/${icon}.svg)" aria-hidden="true"></span>
  <div class="sh-alert__content">${titleHtml}
    <p class="sh-alert__body sh-body-sm">${body}</p>${actionHtml}
  </div>${closeHtml}
</div>`,
}
