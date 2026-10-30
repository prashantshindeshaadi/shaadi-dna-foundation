// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41602
// component=sh-toast
// Code Connect template · sh-toast → HTML/CSS
// Every variant: sh-toast.html · styles: sh-toast.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-text-link.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The Action is a nested sh-text-link (Inverse on Neutral, Link on the status types): the snippet shows its
// default label; use the one set in Figma.

import figma from "figma"

const message = figma.selectedInstance.getString("Message")
const showIcon = figma.selectedInstance.getBoolean("Show icon")
const showAction = figma.selectedInstance.getBoolean("Show action")
const showClose = figma.selectedInstance.getBoolean("Show close")
const type = figma.selectedInstance.getEnum("Type", {
  Neutral: "",
  Success: " sh-toast--success",
  Information: " sh-toast--information",
  Warning: " sh-toast--warning",
  Error: " sh-toast--error",
})
const icon = figma.selectedInstance.getEnum("Type", {
  Neutral: "information-circle",
  Success: "check-circle",
  Information: "information-circle",
  Warning: "alert-diamond",
  Error: "alert-circle",
})
const link = figma.selectedInstance.getEnum("Type", {
  Neutral: "inverse",
  Success: "link",
  Information: "link",
  Warning: "link",
  Error: "link",
})
const actionLabel = figma.selectedInstance.getEnum("Type", {
  Neutral: "Undo",
  Success: "View",
  Information: "View",
  Warning: "View",
  Error: "View",
})

const iconHtml = showIcon
  ? `\n  <span class="sh-toast__icon sh-icon sh-icon--20" style="--icon:url(icons/line/${icon}.svg)" aria-hidden="true"></span>`
  : ""
const actionHtml = showAction
  ? `\n  <button class="sh-toast__action sh-text-link sh-text-link--${link} sh-text-link--sm" type="button"><span class="sh-text-link__label sh-button-sm">${actionLabel}</span></button>`
  : ""
const closeHtml = showClose
  ? `\n  <button class="sh-toast__close" type="button" aria-label="Close"><span class="sh-icon sh-icon--16" style="--icon:url(icons/line/close.svg)" aria-hidden="true"></span></button>`
  : ""

export default {
  id: "sh-toast",
  example: figma.code`<div class="sh-toast${type}" role="status">${iconHtml}
  <p class="sh-toast__message sh-body-md">${message}</p>${actionHtml}${closeHtml}
</div>`,
}
