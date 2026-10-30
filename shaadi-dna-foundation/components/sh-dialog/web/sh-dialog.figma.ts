// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41832
// component=sh-dialog
// Code Connect template · sh-dialog → HTML/CSS
// Every variant: sh-dialog.html · styles: sh-dialog.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-button.css,
// sh-semantic-button.css, sh-icon-button.css; the dim is sh-bottom-sheet's scrim from sh-bottom-sheet.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The button labels are edited on the nested sh-buttons in Figma: copy them into the labels.

import figma from "figma"

const title = figma.selectedInstance.getString("Title")
const body = figma.selectedInstance.getString("Body")
const showClose = figma.selectedInstance.getBoolean("Show close")
const type = figma.selectedInstance.getEnum("Type", {
  Default: { mod: "", role: "dialog", primary: "sh-button--primary", label: "Send interest" },
  Destructive: { mod: " sh-dialog--destructive", role: "alertdialog", primary: "sh-semantic-button sh-semantic-button--error", label: "Block" },
})

const close = showClose
  ? `\n  <button class="sh-dialog__close sh-icon-button sh-icon-button--ghost sh-icon-button--sm" type="button" aria-label="Close">
    <span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/close.svg)" aria-hidden="true"></span>
  </button>`
  : ""

export default {
  id: "sh-dialog",
  example: figma.code`<section class="sh-dialog${type?.mod}" role="${type?.role}" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-body">
  <div class="sh-dialog__text">
    <h2 class="sh-dialog__title sh-heading-sm" id="dialog-title">${title}</h2>
    <p class="sh-dialog__body sh-body-md" id="dialog-body">${body}</p>
  </div>
  <div class="sh-dialog__actions">
    <button class="sh-button sh-button--secondary sh-button--md" type="button">
      <span class="sh-button__text"><span class="sh-button__label sh-button-md">Cancel</span></span>
    </button>
    <button class="sh-button ${type?.primary} sh-button--md" type="button">
      <span class="sh-button__text"><span class="sh-button__label sh-button-md">${type?.label}</span></span>
    </button>
  </div>${close}
</section>`,
}
