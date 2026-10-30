// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2891-58077
// component=sh-fpv-sheet-connect-limit
// Code Connect template · sh-fpv-sheet-connect-limit → HTML/CSS
// Every variant: sh-fpv-sheet-connect-limit.html · styles: sh-button.css + sh-icon-button.css + sh-bottom-sheet.css +
// sh-countdown.css + sh-fpv-sheet-connect-limit.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The app ticks the countdown (update aria-label once a minute), moves focus into the sheet and traps it.

import figma from "figma"

export default {
  id: "sh-fpv-sheet-connect-limit",
  example: figma.code`<div class="sh-bottom-sheet sh-fpv-sheet-connect-limit">
  <div class="sh-bottom-sheet__scrim" aria-hidden="true"></div>
  <section class="sh-bottom-sheet__sheet" role="dialog" aria-modal="true" aria-labelledby="connect-limit-title">
    <div class="sh-bottom-sheet__header"><span class="sh-bottom-sheet__grabber" aria-hidden="true"></span></div>
    <div class="sh-bottom-sheet__body">
      <div class="sh-bottom-sheet__heading">
        <h2 class="sh-bottom-sheet__title sh-heading-sm" id="connect-limit-title">You’re out of Connects!</h2>
        <p class="sh-bottom-sheet__text sh-body-md">Upgrade now to keep sending Connects.</p>
      </div>
      <div class="sh-bottom-sheet__note sh-fpv-sheet-connect-limit__timer">
        <span class="sh-countdown" role="timer" aria-label="Connects refill in 5 hours 42 minutes"><span class="sh-countdown__label sh-support-label">Connects refill in</span><span class="sh-countdown__time" aria-hidden="true"><span class="sh-countdown__box sh-title-sm">05</span><span class="sh-countdown__colon sh-title-sm">:</span><span class="sh-countdown__box sh-title-sm">42</span><span class="sh-countdown__colon sh-title-sm">:</span><span class="sh-countdown__box sh-title-sm">10</span></span></span>
      </div>
      <div class="sh-bottom-sheet__actions">
        <button class="sh-button sh-button--premium-solid sh-button--md" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Upgrade Now</span></span></button>
        <button class="sh-button sh-button--ghost sh-button--md" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Not now</span></span></button>
      </div>
    </div>
    <button class="sh-bottom-sheet__close sh-icon-button sh-icon-button--tertiary sh-icon-button--sm" type="button" aria-label="Close"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/close.svg)" aria-hidden="true"></span></button>
  </section>
</div>`,
}
