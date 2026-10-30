// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=3237-88208
// component=sh-fpv-footer-cta
// Code Connect template · sh-fpv-footer-cta → HTML/CSS
// Every variant: sh-fpv-footer-cta.html · styles: sh-button.css + sh-user-images.css + sh-fpv-footer-cta.css
// (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Shortlist is a toggle: aria-pressed="true" and the label "Shortlisted" when on.

import figma from "figma"

export default {
  id: "sh-fpv-footer-cta",
  example: figma.code`<div class="sh-fpv-footer-cta">
  <div class="sh-fpv-footer-cta__content">
    <div class="sh-fpv-footer-cta__photo sh-user-image"><img src="photo-1.jpg" alt=""></div>
    <p class="sh-fpv-footer-cta__title sh-title-lg">Don’t miss out on Meher</p>
    <div class="sh-fpv-footer-cta__actions">
      <button class="sh-button sh-button--tertiary sh-button--md" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Share</span></span></button>
      <button class="sh-button sh-button--tertiary sh-button--md" type="button" aria-pressed="false"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Shortlist</span></span></button>
    </div>
  </div>
</div>`,
}
