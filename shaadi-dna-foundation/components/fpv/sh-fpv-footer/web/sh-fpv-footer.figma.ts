// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-20188
// component=sh-fpv-footer
// Code Connect template · sh-fpv-footer → HTML/CSS
// Every variant: sh-fpv-footer.html · styles: sh-button.css + sh-text-link.css + sh-user-images.css +
// sh-fpv-footer-cta.css + sh-fpv-footer-boundaries.css + sh-fpv-footer.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The boundaries link opens sh-fpv-sheet-manage-boundaries. The Eclipse / Planet backdrop and Premium Account art
// are not in the repo.

import figma from "figma"

const state = figma.selectedInstance.getEnum("State", {
  Default: "default",
  "Settled · Quote reward": "quote",
  "Settled · Success story": "story",
  "Settled · Premium (unclaimed)": "unclaimed",
  "Settled · Premium (claimed)": "claimed",
})

const premiumText =
  '<h3 class="sh-fpv-footer__heading sh-heading-sm">Premium unlocked! One free contact reveal.</h3><p class="sh-fpv-footer__text sh-body-md">Unlock a contact for free and feel what our Premium members get every single day.</p>'
const emblem =
  '<span class="sh-fpv-footer__emblem sh-icon sh-icon--20 sh-icon--brand" style="--icon:url(icons/filled/shaadi.svg)" aria-hidden="true"></span>'

const content = {
  default: "",
  quote:
    '<p class="sh-fpv-footer__quote sh-title-lg">Look for a partner where the connection feels natural and harmonised, as if the universe itself is aligning your two paths into one.</p><p class="sh-fpv-footer__source"><span class="sh-fpv-footer__rule" aria-hidden="true"></span><span class="sh-support-micro">Rig Veda · 10.85.47</span><span class="sh-fpv-footer__rule" aria-hidden="true"></span></p>',
  story:
    '<div class="sh-fpv-footer__story"><p class="sh-fpv-footer__couple"><span class="sh-fpv-footer__name sh-heading-sm">Radhika</span><span class="sh-fpv-footer__and sh-title-lg">&amp;</span><span class="sh-fpv-footer__name sh-heading-sm">Yash</span></p><p class="sh-fpv-footer__meta"><span class="sh-fpv-footer__found sh-support-meta">Found love on Shaadi.com</span><span class="sh-fpv-footer__year sh-support-label">2021</span></p></div><p class="sh-fpv-footer__caption sh-body-sm">Your Match could be one scroll away.</p>',
  unclaimed:
    premiumText +
    '<button class="sh-button sh-button--premium-solid sh-button--md" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Claim My Free Unlock</span></span></button>',
  claimed:
    premiumText +
    '<button class="sh-button sh-button--tertiary sh-button--md" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Free Unlock Claimed</span></span></button>',
}[state]

const reward = state === "default" ? "" : `\n  <section class="sh-fpv-footer__reward" aria-label="Reward">${emblem}${content}</section>`
const hint = state === "default" ? '\n  <p class="sh-fpv-footer__hint sh-support-label">Scroll to reveal</p>' : ""

export default {
  id: "sh-fpv-footer",
  example: figma.code`<footer class="sh-fpv-footer">
  <div class="sh-fpv-footer-cta">
    <div class="sh-fpv-footer-cta__content">
      <div class="sh-fpv-footer-cta__photo sh-user-image"><img src="photo-1.jpg" alt=""></div>
      <p class="sh-fpv-footer-cta__title sh-title-lg">Don’t miss out on Meher</p>
      <div class="sh-fpv-footer-cta__actions">
        <button class="sh-button sh-button--tertiary sh-button--md" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Share</span></span></button>
        <button class="sh-button sh-button--tertiary sh-button--md" type="button" aria-pressed="false"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Shortlist</span></span></button>
      </div>
    </div>
  </div>${reward}
  <div class="sh-fpv-footer-boundaries">
    <p class="sh-fpv-footer-boundaries__title sh-title-sm">Manage your boundaries</p>
    <button class="sh-fpv-footer-boundaries__link sh-text-link sh-text-link--neutral sh-text-link--sm" type="button" aria-haspopup="dialog"><span class="sh-text-link__label sh-button-sm">Hide, Report or Block Profile</span></button>
  </div>${hint}
</footer>`,
}
