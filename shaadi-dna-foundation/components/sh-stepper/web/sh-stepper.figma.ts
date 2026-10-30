// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13089
// component=sh-stepper
// Code Connect template · sh-stepper → HTML/CSS
// Every variant: sh-stepper.html · styles: sh-stepper.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// One step (<li>). Put the steps of a timeline in <ol class="sh-stepper-list">; the last step has no connector.

import figma from "figma"

const title = figma.selectedInstance.getString("Title")
const subtitle = figma.selectedInstance.getString("Subtitle")
const showSubtitle = figma.selectedInstance.getBoolean("Show subtitle")
const showConnector = figma.selectedInstance.getBoolean("Show connector")
const status = figma.selectedInstance.getEnum("Status", {
  Done: "",
  Current: " sh-stepper--current",
  Pending: " sh-stepper--pending",
})
const done = figma.selectedInstance.getEnum("Status", { Done: true })
const current = figma.selectedInstance.getEnum("Status", { Current: ' aria-current="step"' })

const marker = done
  ? '<span class="sh-stepper__check sh-icon sh-icon--12" style="--icon:url(icons/filled/check.svg)"></span>'
  : '<span class="sh-stepper__dot"></span>'
const connector = showConnector ? '<span class="sh-stepper__connector"></span>' : ""
const sub = showSubtitle ? `
    <span class="sh-stepper__subtitle sh-body-sm">${subtitle}</span>` : ""

export default {
  id: "sh-stepper",
  example: figma.code`<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-stepper/web/sh-stepper.css">

<li class="sh-stepper${status}"${current || ""}>
  <span class="sh-stepper__rail" aria-hidden="true">
    <span class="sh-stepper__marker">${marker}</span>${connector}
  </span>
  <span class="sh-stepper__content">
    <span class="sh-stepper__title sh-title-sm">${title}</span>${sub}
  </span>
</li>`,
}
