// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2891-59058
// component=sh-fpv-sheet-manage-boundaries
// Code Connect template · sh-fpv-sheet-manage-boundaries → HTML/CSS
// Every variant: sh-fpv-sheet-manage-boundaries.html · styles: sh-button.css + sh-icon-button.css + sh-divider.css +
// sh-radio.css + sh-checkbox.css + sh-list-default.css + sh-list.css + sh-bottom-sheet.css +
// sh-fpv-sheet-manage-boundaries.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Choose → Hide · confirm / Block · confirm / Report · reasons. Give each row title a unique id for aria-labelledby.

import figma from "figma"

const step = figma.selectedInstance.getEnum("Step", {
  Choose: "choose",
  "Hide · confirm": "hide",
  "Block · confirm": "block",
  "Report · reasons": "report",
})

const radio = (id: string, title: string, sub: string, checked: string) =>
  `<div class="sh-list"><div class="sh-list-default sh-list-default--control sh-list-default--inline"><div class="sh-list-default__row"><span class="sh-list-default__leading"><label class="sh-radio"><input class="sh-radio__input" type="radio" name="boundary" aria-labelledby="${id}"${checked}><span class="sh-radio__circle" aria-hidden="true"><span class="sh-radio__dot"></span></span></label></span><span class="sh-list-default__content"><span class="sh-list-default__title-row"><span class="sh-list-default__title sh-body-md" id="${id}">${title}</span></span><span class="sh-list-default__subtitle sh-body-sm">${sub}</span></span></div><hr class="sh-list-default__divider sh-divider sh-divider--soft"></div></div>`
const check = (id: string, title: string) =>
  `<div class="sh-list"><div class="sh-list-default sh-list-default--control sh-list-default--inline"><div class="sh-list-default__row"><span class="sh-list-default__leading"><label class="sh-checkbox"><input class="sh-checkbox__input" type="checkbox" aria-labelledby="${id}"><span class="sh-checkbox__box" aria-hidden="true"><span class="sh-icon sh-icon--16 sh-checkbox__icon" style="--icon:url(icons/filled/check.svg)"></span></span></label></span><span class="sh-list-default__content"><span class="sh-list-default__title-row"><span class="sh-list-default__title sh-body-md" id="${id}">${title}</span></span></span></div><hr class="sh-list-default__divider sh-divider sh-divider--soft"></div></div>`

const content = {
  choose: [
    "Manage your boundaries",
    "Choose what happens with Meher’s profile.",
    `<div class="sh-bottom-sheet__section sh-fpv-sheet-manage-boundaries__options" role="radiogroup" aria-label="Choose an action">${radio("mb-hide", "Hide her profile", "She won’t show up in your matches or searches.", " checked")}${radio("mb-block", "Block her", "She can’t see your profile or contact you.", "")}${radio("mb-report", "Report her profile", "Tell us if something about it isn’t right.", "")}</div>`,
    "Continue",
  ],
  hide: ["Hide Meher’s profile?", "She won’t show up in your matches or searches. You can unhide her any time from her profile.", "", "Hide Profile"],
  block: ["Block Meher?", "She won’t be able to see your profile or contact you. You can unblock her any time.", "", "Block"],
  report: [
    "Report Meher’s profile",
    "Pick what’s wrong. She won’t know who reported her.",
    `<div class="sh-bottom-sheet__section sh-fpv-sheet-manage-boundaries__options" role="group" aria-label="Reasons">${check("mr-fake", "Fake profile or wrong details")}${check("mr-photos", "Inappropriate photos")}${check("mr-money", "Asked for money")}${check("mr-rude", "Rude or offensive messages")}${check("mr-married", "Already married")}${check("mr-other", "Something else")}</div>`,
    "Submit Report",
  ],
}[step]

export default {
  id: "sh-fpv-sheet-manage-boundaries",
  example: figma.code`<div class="sh-bottom-sheet sh-bottom-sheet--left sh-fpv-sheet-manage-boundaries">
  <div class="sh-bottom-sheet__scrim" aria-hidden="true"></div>
  <section class="sh-bottom-sheet__sheet" role="dialog" aria-modal="true" aria-labelledby="boundaries-title">
    <div class="sh-bottom-sheet__header"><span class="sh-bottom-sheet__grabber" aria-hidden="true"></span></div>
    <div class="sh-bottom-sheet__body">
      <div class="sh-bottom-sheet__heading">
        <h2 class="sh-bottom-sheet__title sh-heading-sm" id="boundaries-title">${content[0]}</h2>
        <p class="sh-bottom-sheet__text sh-body-md">${content[1]}</p>
      </div>
      ${content[2]}
      <div class="sh-bottom-sheet__actions">
        <button class="sh-button sh-button--primary sh-button--md" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">${content[3]}</span></span></button>
        <button class="sh-button sh-button--ghost sh-button--md" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Cancel</span></span></button>
      </div>
    </div>
    <button class="sh-bottom-sheet__close sh-icon-button sh-icon-button--tertiary sh-icon-button--sm" type="button" aria-label="Close"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/close.svg)" aria-hidden="true"></span></button>
  </section>
</div>`,
}
