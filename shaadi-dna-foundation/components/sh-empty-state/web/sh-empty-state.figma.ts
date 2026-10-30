// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41694
// component=sh-empty-state
// Code Connect template · sh-empty-state → HTML/CSS
// Every variant: sh-empty-state.html · styles: sh-empty-state.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-button.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// "Pictogram" is an instance swap of the pictograms: the snippet shows the default (sh-icon/pictogram/heart);
// change the src to the one picked in Figma. The Action is a nested sh-button (Primary, Medium): the snippet
// shows its default label; use the one set in Figma.

import figma from "figma"

const title = figma.selectedInstance.getString("Title")
const body = figma.selectedInstance.getString("Body")
const showPictogram = figma.selectedInstance.getBoolean("Show pictogram")
const showAction = figma.selectedInstance.getBoolean("Show action")

const pictogramHtml = showPictogram
  ? `\n  <img class="sh-empty-state__pictogram" src="icons/pictogram/heart@2x.png" alt="">`
  : ""
const actionHtml = showAction
  ? `\n  <button class="sh-empty-state__action sh-button sh-button--primary sh-button--md" type="button">
    <span class="sh-button__text"><span class="sh-button__label sh-button-md">Edit preferences</span></span>
  </button>`
  : ""

export default {
  id: "sh-empty-state",
  example: figma.code`<section class="sh-empty-state">${pictogramHtml}
  <div class="sh-empty-state__text">
    <h2 class="sh-empty-state__title sh-heading-sm">${title}</h2>
    <p class="sh-empty-state__body sh-body-md">${body}</p>
  </div>${actionHtml}
</section>`,
}
