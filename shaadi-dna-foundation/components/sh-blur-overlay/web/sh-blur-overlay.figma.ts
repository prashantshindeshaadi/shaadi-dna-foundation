// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=3363-74823
// component=sh-blur-overlay
// Code Connect template · sh-blur-overlay → HTML/CSS
// Every variant: sh-blur-overlay.html · styles: sh-blur-overlay.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-button.css, sh-graphic.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Backdrop (instance swap) and Graphic (slot) render the nested sh-graphic snippets; keep the same section in both.
// The button label is edited on the nested sh-button in Figma: copy it into the label.

import figma from "figma"

const unlock = figma.selectedInstance.getEnum("Unlock", {
  Self: { type: "sh-button--tertiary", label: "Add my details" },
  Upgrade: { type: "sh-button--premium-soft", label: "Upgrade now" },
})
const backdrop = figma.selectedInstance.getInstanceSwap("Backdrop")?.executeTemplate().example
const reason = figma.selectedInstance.getString("Reason")
const graphic = figma.selectedInstance.getSlot("Graphic")

export default {
  id: "sh-blur-overlay",
  example: figma.code`<section class="sh-blur-overlay" aria-label="Section locked">
  <div class="sh-blur-overlay__visual">
    ${backdrop}
    ${graphic}
  </div>
  <div class="sh-blur-overlay__message">
    <p class="sh-blur-overlay__reason sh-body-lg">${reason}</p>
    <button class="sh-button ${unlock?.type} sh-button--md" type="button">
      <span class="sh-button__text"><span class="sh-button__label sh-button-md">${unlock?.label}</span></span>
    </button>
  </div>
</section>`,
}
