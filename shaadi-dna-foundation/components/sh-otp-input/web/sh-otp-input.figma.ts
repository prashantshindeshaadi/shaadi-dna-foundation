// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-42875
// component=sh-otp-input
// Code Connect template · sh-otp-input → HTML/CSS
// Every variant: sh-otp-input.html · styles: sh-otp-input.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Figma has only variant properties (Length, State); the helper text is the layer's own text, so the snippet
// shows the Figma default. Focus is the field's real :focus. Moving between boxes, paste and backspace are the
// app's job.

import figma from "figma"

const length = figma.selectedInstance.getEnum("Length", {
  "4": 4,
  "6": 6,
})
const state = figma.selectedInstance.getEnum("State", {
  Default: "",
  Focus: "",
  Filled: "",
  Error: " sh-otp-input--error",
})
const filled = figma.selectedInstance.getEnum("State", { Filled: true, Error: true })
const error = figma.selectedInstance.getEnum("State", { Error: true })

const digits = "482916"
let boxes = ""
for (let i = 0; i < (length || 4); i++) {
  boxes += `
    <label class="sh-otp-input__box"><input class="sh-otp-input__field sh-heading-sm" type="text" inputmode="numeric" autocomplete="${i === 0 ? "one-time-code" : "off"}" maxlength="1" pattern="[0-9]" aria-label="Digit ${i + 1} of ${length}" value="${filled ? digits[i] : ""}"${error ? ' aria-invalid="true"' : ""}></label>`
}
const status = error
  ? '<span class="sh-otp-input__status sh-icon sh-icon--12" style="--icon:url(icons/line/alert-circle.svg)" aria-hidden="true"></span>'
  : ""
const helper = error ? "Incorrect code. Try again." : "Resend code in 00:30"

export default {
  id: "sh-otp-input",
  example: figma.code`<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-otp-input/web/sh-otp-input.css">

<fieldset class="sh-otp-input${state}" aria-describedby="otp-help">
  <legend class="sh-otp-input__legend">Verification code</legend>
  <div class="sh-otp-input__boxes">${boxes}
  </div>
  <p class="sh-otp-input__helper" id="otp-help">${status}<span class="sh-support-label">${helper}</span></p>
</fieldset>`,
}
