// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2597-29841
// component=sh-slider
// Code Connect template · sh-slider → HTML/CSS
// Every variant: sh-slider.html · styles: sh-slider.css (needs tokens.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Start / End are sample positions in Figma; in code they are the inputs' values. Keep --start / --end (0 … 1)
// on the root in step with the values on input. min / max / labels below are an age example: set the real range.
// "Show start thumb2" has no code meaning (a duplicate in Figma) and is not mapped.

import figma from "figma"

const showStartThumb = figma.selectedInstance.getBoolean("Show start thumb")
const start = figma.selectedInstance.getEnum("Start", {
  "0%": 0,
  "25%": 0.25,
  "40%": 0.4,
})
const end = figma.selectedInstance.getEnum("End", {
  "60%": 0.6,
  "75%": 0.75,
  "100%": 1,
})

const startPos = showStartThumb ? start || 0 : 0
const endPos = end || 1
const startValue = 18 + Math.round(startPos * 40)
const endValue = 18 + Math.round(endPos * 40)
const startInput = showStartThumb
  ? `
  <input class="sh-slider__input sh-slider__input--start" type="range" min="18" max="58" value="${startValue}" aria-label="Minimum age" aria-valuetext="${startValue} years">`
  : ""

export default {
  id: "sh-slider",
  example: figma.code`<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="components/sh-slider/web/sh-slider.css">

<div class="sh-slider" style="--start:${startPos}; --end:${endPos}">
  <span class="sh-slider__track" aria-hidden="true"></span>
  <span class="sh-slider__fill" aria-hidden="true"></span>${startInput}
  <input class="sh-slider__input sh-slider__input--end" type="range" min="18" max="58" value="${endValue}" aria-label="${showStartThumb ? "Maximum age" : "Age"}" aria-valuetext="${endValue} years">
</div>`,
}
