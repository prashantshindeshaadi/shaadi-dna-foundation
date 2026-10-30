// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=232-6808
// component=sh-status-bar
// Code Connect template · sh-status-bar → HTML/CSS
// Every variant: sh-status-bar.html · styles: sh-status-bar.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Mock-ups and prototypes only: a real web page never draws a status bar.

import figma from "figma"

const time = figma.selectedInstance.getString("Time")
const showNotch = figma.selectedInstance.getBoolean("Show notch")
const platform = figma.selectedInstance.getEnum("Platform", { Android: "", iOS: " sh-status-bar--ios" })
const timeStyle = figma.selectedInstance.getEnum("Platform", { Android: "sh-body-md", iOS: "sh-title-lg" })
const theme = figma.selectedInstance.getEnum("Theme", { Light: "", Dark: " sh-status-bar--dark" })

const cameraHtml = showNotch ? `\n  <span class="sh-status-bar__camera"></span>` : ""

export default {
  id: "sh-status-bar",
  example: figma.code`<div class="sh-status-bar${platform}${theme}" aria-hidden="true">
  <span class="sh-status-bar__time ${timeStyle}">${time}</span>${cameraHtml}
  <span class="sh-status-bar__icons">
    <span class="sh-icon sh-icon--16" style="--icon:url(icons/filled/signal.svg)"></span>
    <span class="sh-icon sh-icon--16" style="--icon:url(icons/filled/battery.svg)"></span>
  </span>
</div>`,
}
