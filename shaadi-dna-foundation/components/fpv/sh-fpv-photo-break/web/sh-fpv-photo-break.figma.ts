// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-19691
// component=sh-fpv-photo-break
// Code Connect template · sh-fpv-photo-break → HTML/CSS
// Every variant: sh-fpv-photo-break.html · styles: sh-user-images.css + sh-button.css + sh-graphic.css +
// sh-blur-overlay.css + sh-fpv-photo-break.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Pass her photo. The section drops when the album is locked (Accept / Upgrade gated are not used on the FPV).
// Tit for tat: sh-blur-overlay, Graphic Photo break (the art is not in the repo). Upload Now → add his photo.

import figma from "figma"

const overlay = (reason: string, kind: string, label: string, lead: string) =>
  `<section class="sh-blur-overlay" aria-label="Photos locked"><div class="sh-blur-overlay__visual"><div class="sh-blur-overlay__backdrop sh-graphic sh-graphic--backdrop sh-graphic--photo-break" aria-hidden="true"></div><div class="sh-blur-overlay__graphic sh-graphic sh-graphic--photo-break"><img class="sh-graphic__art" src="photo-break-art.png" alt=""></div></div><div class="sh-blur-overlay__message"><p class="sh-blur-overlay__reason sh-body-lg">${reason}</p><button class="sh-button sh-button--${kind} sh-button--md" type="button">${lead ? `<span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/${lead}.svg)" aria-hidden="true"></span>` : ""}<span class="sh-button__text"><span class="sh-button__label sh-button-md">${label}</span></span></button></div></section>`

const gate = figma.selectedInstance.getEnum("Gate", {
  Visible: { mod: "", inner: '<div class="sh-fpv-photo-break__photo sh-user-image"><img src="her-photo.jpg" alt="Meher"></div>' },
  "Tit for tat": { mod: " sh-fpv-photo-break--tit-for-tat", inner: overlay("Add your own photo to see Meher’s", "tertiary", "Upload Now", "") },
  "Accept gated": { mod: " sh-fpv-photo-break--accept-gated", inner: overlay("Meher shares her photos once she accepts your request", "tertiary", "Connect Now", "check") },
  "Upgrade gated": { mod: " sh-fpv-photo-break--upgrade-gated", inner: overlay("Meher has shared her photos with Premium members", "premium-soft", "Upgrade Now", "premium") },
})

export default {
  id: "sh-fpv-photo-break",
  example: figma.code`<figure class="sh-fpv-photo-break${gate?.mod}"><div class="sh-fpv-photo-break__photos">${gate?.inner}</div></figure>`,
}
