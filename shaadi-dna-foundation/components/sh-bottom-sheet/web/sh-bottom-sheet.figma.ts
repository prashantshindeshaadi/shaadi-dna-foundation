// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2638-64989
// component=sh-bottom-sheet
// Code Connect template · sh-bottom-sheet → HTML/CSS
// Every variant: sh-bottom-sheet.html · styles: sh-bottom-sheet.css (needs tokens.css, sh-typo.css, sh-icon.css,
// sh-button.css, sh-icon-button.css, plus the slot parts: sh-avatar / sh-profile-identity, sh-list + sh-list-default)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The four slots and the two action swaps render the nested parts' own snippets. Keep the primary action first.
// Use one id per sheet for aria-labelledby.

import figma from "figma"

const sectionSlot = figma.selectedInstance.getSlot("Section slot")
const visualSlot = figma.selectedInstance.getSlot("Visual slot")
const backgroundSlot = figma.selectedInstance.getSlot("Background slot")
const noteSlot = figma.selectedInstance.getSlot("Note slot")
const title = figma.selectedInstance.getString("Title")
const body = figma.selectedInstance.getString("Body")
const showVisual = figma.selectedInstance.getBoolean("Show visual")
const showBackground = figma.selectedInstance.getBoolean("Show background")
const showSection = figma.selectedInstance.getBoolean("Show section")
const showNote = figma.selectedInstance.getBoolean("Show note")
const showBody = figma.selectedInstance.getBoolean("Show body")
const showActions = figma.selectedInstance.getBoolean("Show actions")
const showSecondaryAction = figma.selectedInstance.getBoolean("Show secondary action")
const primaryAction = figma.selectedInstance.getInstanceSwap("Primary action")?.executeTemplate().example
const secondaryAction = figma.selectedInstance.getInstanceSwap("Secondary action")?.executeTemplate().example
const type = figma.selectedInstance.getEnum("Type", { Relaxed: "", Compact: " sh-bottom-sheet--compact" })
const align = figma.selectedInstance.getEnum("Align", { Center: "", Left: " sh-bottom-sheet--left" })
const actions = figma.selectedInstance.getEnum("Actions", { Stacked: "", "Side by side": " sh-bottom-sheet--side-by-side" })

// Plain strings for the optional wrappers; slots and swaps are interpolated directly (no nested templates).
const bodyText = showBody ? `\n        <p class="sh-bottom-sheet__text sh-body-md">${body}</p>` : ""
const bgOpen = showBackground ? `\n    <div class="sh-bottom-sheet__background" aria-hidden="true">` : ""
const bgClose = showBackground ? `</div>` : ""
const visualOpen = showVisual ? `\n    <div class="sh-bottom-sheet__visual">` : ""
const visualClose = showVisual ? `</div>` : ""
const sectionOpen = showSection ? `\n      <div class="sh-bottom-sheet__section">` : ""
const sectionClose = showSection ? `</div>` : ""
const noteOpen = showNote ? `\n      <div class="sh-bottom-sheet__note">` : ""
const noteClose = showNote ? `</div>` : ""
const actionsOpen = showActions ? `\n      <div class="sh-bottom-sheet__actions">\n        ` : ""
const actionsGap = showActions && showSecondaryAction ? `\n        ` : ""
const actionsClose = showActions ? `\n      </div>` : ""

export default {
  id: "sh-bottom-sheet",
  example: figma.code`<div class="sh-bottom-sheet${type}${align}${actions}">
  <div class="sh-bottom-sheet__scrim" aria-hidden="true"></div>
  <section class="sh-bottom-sheet__sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">${bgOpen}${showBackground ? backgroundSlot : ""}${bgClose}
    <div class="sh-bottom-sheet__header"><span class="sh-bottom-sheet__grabber" aria-hidden="true"></span></div>${visualOpen}${showVisual ? visualSlot : ""}${visualClose}
    <div class="sh-bottom-sheet__body">
      <div class="sh-bottom-sheet__heading">
        <h2 class="sh-bottom-sheet__title sh-heading-sm" id="sheet-title">${title}</h2>${bodyText}
      </div>${sectionOpen}${showSection ? sectionSlot : ""}${sectionClose}${noteOpen}${showNote ? noteSlot : ""}${noteClose}${actionsOpen}${showActions ? primaryAction : ""}${actionsGap}${showActions && showSecondaryAction ? secondaryAction : ""}${actionsClose}
    </div>
    <button class="sh-bottom-sheet__close sh-icon-button sh-icon-button--tertiary sh-icon-button--sm" type="button" aria-label="Close">
      <span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/close.svg)" aria-hidden="true"></span>
    </button>
  </section>
</div>`,
}
