// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2710-28466
// component=sh-plan-card
// Code Connect template · sh-plan-card → HTML/CSS
// Every variant: sh-plan-card.html · styles: sh-plan-card.css
// (needs tokens.css, sh-typo.css, sh-icon.css, sh-tag.css, sh-divider.css, sh-data-point.css, sh-text-link.css,
//  sh-button.css, sh-toggle.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Prices, duration, discount, tag text and the CTA label are edited directly in Figma: the snippet shows Silver's.
// Benefits slot: one sh-data-point (md) per benefit, Included or Excluded (--excluded + "(not included)").
// The CTA is a lone button (max 200 wide): keep its label short.

import figma from "figma"

const plan = figma.selectedInstance.getEnum("Plan", {
  Silver: "",
  Gold: " sh-plan-card--gold",
  "Gold+": " sh-plan-card--gold-plus",
  Diamond: " sh-plan-card--diamond",
  "Diamond+": " sh-plan-card--diamond-plus",
  "Platinum+": " sh-plan-card--platinum-plus",
  "Platinum Private": " sh-plan-card--platinum-private",
})
const planName = figma.selectedInstance.getEnum("Plan", {
  Silver: "Silver",
  Gold: "Gold",
  "Gold+": "Gold+",
  Diamond: "Diamond",
  "Diamond+": "Diamond+",
  "Platinum+": "Platinum+",
  "Platinum Private": "Platinum Private",
})
const linkType = figma.selectedInstance.getEnum("Plan", {
  Silver: "neutral",
  Gold: "neutral",
  "Gold+": "neutral",
  Diamond: "neutral",
  "Diamond+": "neutral",
  "Platinum+": "neutral",
  "Platinum Private": "inverse",
})
const collapsed = figma.selectedInstance.getEnum("State", { Expanded: false, Collapsed: true })
const showTag = figma.selectedInstance.getBoolean("Show tag")
const showPlusToggle = figma.selectedInstance.getBoolean("Show Plus toggle")
const showBenefitsLink = figma.selectedInstance.getBoolean("Show benefits link")
const showSocialProof = figma.selectedInstance.getBoolean("Show social proof")
const showAutoRenewNote = figma.selectedInstance.getBoolean("Show auto-renew note")

const tagHtml = showTag ? '<span class="sh-tag"><span class="sh-tag__label sh-support-label">Most popular</span></span>' : ""
const plusHtml = showPlusToggle && !collapsed
  ? '<label class="sh-plan-card__plus"><span class="sh-plan-card__plus-label sh-support-label">Plus</span><span class="sh-toggle"><input class="sh-toggle__input" type="checkbox" role="switch"><span class="sh-toggle__track" aria-hidden="true"><span class="sh-toggle__thumb"><span class="sh-icon sh-icon--16 sh-toggle__icon" style="--icon:url(icons/filled/check.svg)"></span></span></span></span></label>'
  : ""
const topHtml = tagHtml || plusHtml ? `\n  <div class="sh-plan-card__top">${tagHtml}${plusHtml}</div>` : ""

const linkHtml = showBenefitsLink
  ? `\n  <a class="sh-text-link sh-text-link--${linkType} sh-text-link--md" href="/plans/benefits"><span class="sh-text-link__label sh-button-md">See all benefits</span></a>`
  : ""
const socialHtml = showSocialProof
  ? `\n    <p class="sh-plan-card__social-proof sh-body-sm"><span class="sh-icon" style="--icon:url(icons/line/user-multiple.svg)" aria-hidden="true"></span>2,400 members chose ${planName} this week</p>`
  : ""
const noteHtml = showAutoRenewNote
  ? '\n    <p class="sh-plan-card__note sh-support-label">Auto-renews on expiry. Cancel anytime</p>'
  : ""

const expandedHtml = `<article class="sh-plan-card${plan}" aria-label="${planName} plan">${topHtml}
  <div class="sh-plan-card__head">
    <div class="sh-plan-card__name">
      <h3 class="sh-plan-card__plan sh-heading-md">${planName}</h3>
      <span class="sh-plan-card__duration sh-body-sm">1 month</span>
    </div>
    <div class="sh-plan-card__pricing">
      <span class="sh-plan-card__price sh-heading-md">₹509</span>
      <span class="sh-plan-card__per-month"><span class="sh-body-sm">₹509/month ·</span> <s class="sh-plan-card__was sh-body-sm">₹2,999</s></span>
      <span class="sh-tag"><span class="sh-tag__label sh-support-label">Flat 83% off</span></span>
    </div>
  </div>
  <hr class="sh-divider sh-divider--soft">
  <div class="sh-plan-card__benefits">
    <div class="sh-data-point sh-data-point--md">
      <span class="sh-data-point__icon-box"><span class="sh-data-point__icon sh-icon" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span></span>
      <div class="sh-data-point__content"><div class="sh-data-point__row"><span class="sh-data-point__label sh-body-md">View up to 15 contact numbers</span></div></div>
    </div>
    <div class="sh-data-point sh-data-point--md sh-data-point--excluded">
      <span class="sh-data-point__icon-box"><span class="sh-data-point__icon sh-icon" style="--icon:url(icons/line/close.svg)" aria-hidden="true"></span></span>
      <div class="sh-data-point__content"><div class="sh-data-point__row"><span class="sh-data-point__label sh-body-md">Stand out from other Profiles</span> <span class="sh-visually-hidden">(not included)</span></div></div>
    </div>
  </div>${linkHtml}
  <div class="sh-plan-card__footer">
    <button class="sh-button sh-button--primary sh-button--lg sh-plan-card__cta" type="button">
      <span class="sh-button__text"><span class="sh-button__label sh-button-lg">Continue with ${planName}</span></span>
    </button>${socialHtml}${noteHtml}
  </div>
</article>`

const collapsedHtml = `<article class="sh-plan-card sh-plan-card--collapsed${plan}" aria-label="${planName} plan">${topHtml}
  <button class="sh-plan-card__head" type="button" aria-expanded="false">
    <span class="sh-plan-card__name">
      <span class="sh-plan-card__plan sh-title-md">${planName}</span>
      <span class="sh-plan-card__duration sh-body-sm">1 month</span>
    </span>
    <span class="sh-plan-card__pricing"><span class="sh-plan-card__price sh-title-md">₹509</span></span>
  </button>
</article>`

export default {
  id: "sh-plan-card",
  example: figma.code`${collapsed ? collapsedHtml : expandedHtml}`,
}
