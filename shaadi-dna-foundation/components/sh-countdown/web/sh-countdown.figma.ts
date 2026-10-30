// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41900
// component=sh-countdown
// Code Connect template · sh-countdown → HTML/CSS
// Every variant: sh-countdown.html · styles: sh-countdown.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Boxed uses Hours / Minutes / Seconds; Inline uses Time. Ticking is the app's job: update the digits every
// second and the aria-label every minute.

import figma from "figma"

const label = figma.selectedInstance.getString("Label")
const hours = figma.selectedInstance.getString("Hours")
const minutes = figma.selectedInstance.getString("Minutes")
const seconds = figma.selectedInstance.getString("Seconds")
const time = figma.selectedInstance.getString("Time")
const style = figma.selectedInstance.getEnum("Style", {
  Boxed: "boxed",
  Inline: "inline",
})

const body =
  style === "inline"
    ? `<span class="sh-countdown sh-countdown--inline" role="timer" aria-label="${label} ${time}">
  <span class="sh-countdown__icon sh-icon sh-icon--16" style="--icon:url(icons/line/timer.svg)" aria-hidden="true"></span>
  <span class="sh-countdown__label sh-body-sm">${label}</span>
  <span class="sh-countdown__time sh-title-sm" aria-hidden="true">${time}</span>
</span>`
    : `<span class="sh-countdown" role="timer" aria-label="${label} ${hours}:${minutes}:${seconds}">
  <span class="sh-countdown__label sh-support-label">${label}</span>
  <span class="sh-countdown__time" aria-hidden="true">
    <span class="sh-countdown__box sh-title-sm">${hours}</span><span class="sh-countdown__colon sh-title-sm">:</span>
    <span class="sh-countdown__box sh-title-sm">${minutes}</span><span class="sh-countdown__colon sh-title-sm">:</span>
    <span class="sh-countdown__box sh-title-sm">${seconds}</span>
  </span>
</span>`

export default {
  id: "sh-countdown",
  example: figma.code`<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-countdown/web/sh-countdown.css">

${body}`,
}
