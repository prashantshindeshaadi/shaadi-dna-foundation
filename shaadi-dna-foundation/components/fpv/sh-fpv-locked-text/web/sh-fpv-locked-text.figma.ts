// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=3313-31645
// component=sh-fpv-locked-text
// Code Connect template · sh-fpv-locked-text → HTML/CSS
// Every variant: sh-fpv-locked-text.html · styles: sh-fpv-locked-text.css (needs tokens.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// One lock, always the last child. Text that follows the mask (e.g. "@gmail.com") goes before the lock.

import figma from "figma"

const variant = figma.selectedInstance.getEnum("Property 1", {
  Default: "",
  "Date of birth": " sh-fpv-locked-text--date-of-birth",
})

const dot = '<span class="sh-fpv-locked-text__dot sh-icon"></span>'
const sep = '<span class="sh-fpv-locked-text__separator"></span>'
const dots = variant === "" ? dot.repeat(6) : dot + dot + sep + dot + dot + sep + dot + dot
const label = variant === "" ? "Hidden. Upgrade to view" : "Date of birth hidden. Upgrade to view"

export default {
  id: "sh-fpv-locked-text",
  example: figma.code`<span class="sh-fpv-locked-text${variant}" role="img" aria-label="${label}"><span class="sh-fpv-locked-text__mask" style="--icon:url(icons/filled/asterisk.svg)" aria-hidden="true">${dots}</span><span class="sh-fpv-locked-text__lock sh-icon sh-icon--12" style="--icon:url(icons/filled/lock.svg)" aria-hidden="true"></span></span>`,
}
