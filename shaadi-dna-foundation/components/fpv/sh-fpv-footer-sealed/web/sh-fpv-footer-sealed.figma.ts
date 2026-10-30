// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-20460
// component=sh-fpv-footer-sealed
// Code Connect template · sh-fpv-footer-sealed → HTML/CSS
// Every variant: sh-fpv-footer-sealed.html · styles: sh-button.css + sh-icon-button.css + sh-icon-button-with-label.css +
// sh-text-link.css + sh-action-note.css + sh-action-island.css + sh-user-images.css + sh-fpv-footer-boundaries.css +
// sh-fpv-footer-sealed.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Not used on the current screens. Connect Now leads with the Filled check.

import figma from "figma"

export default {
  id: "sh-fpv-footer-sealed",
  example: figma.code`<footer class="sh-fpv-footer-sealed">
  <div class="sh-fpv-footer-sealed__card">
    <div class="sh-fpv-footer-sealed__photo sh-user-image"><img src="photo-1.jpg" alt=""></div>
    <p class="sh-fpv-footer-sealed__title sh-title-lg">Like Meher’s Profile?</p>
    <div class="sh-fpv-footer-sealed__actions">
      <button class="sh-button sh-button--tertiary sh-button--md" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Share</span></span></button>
      <button class="sh-button sh-button--tertiary sh-button--md" type="button" aria-pressed="false"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Shortlist</span></span></button>
    </div>
  </div>
  <div class="sh-fpv-footer-sealed__island sh-action-island sh-action-island--floating sh-action-island--primary-only">
    <div class="sh-action-note sh-action-note--edit sh-action-note--floating"><span class="sh-action-note__text sh-body-sm">Hey Meher, I came across your profile. It felt true to me.</span><span class="sh-action-note__link"><button class="sh-text-link sh-text-link--neutral sh-text-link--sm" type="button"><span class="sh-text-link__label sh-button-sm">Edit</span></button></span></div>
    <div class="sh-action-island__actions"><button class="sh-button sh-button--primary sh-button--lg sh-button--fill" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-lg">Connect Now</span></span></button></div>
  </div>
  <div class="sh-fpv-footer-boundaries">
    <p class="sh-fpv-footer-boundaries__title sh-title-sm">Manage your boundaries</p>
    <button class="sh-fpv-footer-boundaries__link sh-text-link sh-text-link--neutral sh-text-link--sm" type="button" aria-haspopup="dialog"><span class="sh-text-link__label sh-button-sm">Hide, Report or Block Profile</span></button>
  </div>
  <p class="sh-fpv-footer-sealed__hint sh-support-label">Swipe up to reveal</p>
</footer>`,
}
