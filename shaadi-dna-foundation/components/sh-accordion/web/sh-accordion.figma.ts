// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41883
// component=sh-accordion
// Code Connect template · sh-accordion → HTML/CSS
// Every variant: sh-accordion.html · styles: sh-accordion.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-divider.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// State=Expanded is the open attribute on <details>; the browser toggles it, so the Body is always in the markup.

import figma from "figma"

const title = figma.selectedInstance.getString("Title")
const body = figma.selectedInstance.getString("Body")
const showDivider = figma.selectedInstance.getBoolean("Show divider")
const open = figma.selectedInstance.getEnum("State", { Collapsed: "", Expanded: " open" })

const dividerHtml = showDivider ? `\n  <hr class="sh-accordion__divider sh-divider sh-divider--soft">` : ""

export default {
  id: "sh-accordion",
  example: figma.code`<div class="sh-accordion">
  <details class="sh-accordion__details"${open}>
    <summary class="sh-accordion__header">
      <span class="sh-accordion__title sh-title-md">${title}</span>
      <span class="sh-accordion__chevron sh-icon sh-icon--20" style="--icon:url(icons/line/arrow-down-01.svg)" aria-hidden="true"></span>
    </summary>
    <div class="sh-accordion__content">
      <p class="sh-accordion__body sh-body-md">${body}</p>
    </div>
  </details>${dividerHtml}
</div>`,
}
