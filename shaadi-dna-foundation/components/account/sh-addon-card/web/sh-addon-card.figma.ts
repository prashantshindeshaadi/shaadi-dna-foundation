// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13683
// component=sh-addon-card
// Code Connect template · sh-addon-card → HTML/CSS
// Every variant: sh-addon-card.html · styles: sh-addon-card.css
// (needs tokens.css, sh-typo.css, sh-icon.css, sh-tag.css, sh-divider.css, sh-data-point.css, sh-button.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Price, was price, discount, status text and the CTA label are edited directly in Figma: the snippet shows the
// defaults. Visual slot: put the add-on's pictogram. Benefits slot: one sh-data-point (md, Included) per benefit.

import figma from "figma"

const title = figma.selectedInstance.getString("Title")
const type = figma.selectedInstance.getEnum("Type", { Offer: "", Active: " sh-addon-card--active" })
const body = figma.selectedInstance.getEnum("Type", {
  Offer: `
  <p class="sh-addon-card__price-row">
    <span class="sh-addon-card__price sh-heading-sm">₹225</span>
    <s class="sh-addon-card__was sh-body-sm">₹500</s>
    <span class="sh-tag"><span class="sh-tag__label sh-support-label">55% off</span></span>
  </p>
  <hr class="sh-divider sh-divider--soft">
  <div class="sh-addon-card__benefits">
    <div class="sh-data-point sh-data-point--md">
      <span class="sh-data-point__icon-box"><span class="sh-data-point__icon sh-icon" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span></span>
      <div class="sh-data-point__content"><div class="sh-data-point__row"><span class="sh-data-point__label sh-body-md">20 More Contact Views</span></div></div>
    </div>
  </div>
  <button class="sh-button sh-button--primary sh-button--md sh-addon-card__cta" type="button">
    <span class="sh-button__text"><span class="sh-button__label sh-button-md">Add extra Contacts</span></span>
  </button>`,
  Active: `
  <p class="sh-addon-card__status sh-body-md">12 of 20 Contacts left</p>`,
})

export default {
  id: "sh-addon-card",
  example: figma.code`<article class="sh-addon-card${type}">
  <div class="sh-addon-card__visual"><img src="addon.png" width="40" height="40" alt=""></div>
  <h3 class="sh-addon-card__title sh-title-md">${title}</h3>${body}
</article>`,
}
