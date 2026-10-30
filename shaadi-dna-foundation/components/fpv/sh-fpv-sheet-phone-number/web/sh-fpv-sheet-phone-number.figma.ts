// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2891-55240
// component=sh-fpv-sheet-phone-number
// Code Connect template · sh-fpv-sheet-phone-number → HTML/CSS
// Every variant: sh-fpv-sheet-phone-number.html · styles: sh-button.css + sh-icon-button.css +
// sh-icon-button-with-label.css + sh-text-link.css + sh-action-note.css + sh-action-island.css + sh-user-images.css +
// sh-avatar.css + sh-profile-identity.css + sh-divider.css + sh-list-default.css + sh-list.css + sh-bottom-sheet.css +
// sh-fpv-sheet-phone-number.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Masked values end with ONE lock, always last. Contact channels never charge. Every button is Medium.

import figma from "figma"

const state = figma.selectedInstance.getEnum("State", {
  "Number shown": "shown",
  "No tokens": "no-tokens",
  "Shown to connections": "connections",
  "Number hidden": "hidden",
})

const row = (icon: string, value: string, masked: boolean) =>
  `<div class="sh-list"><div class="sh-list-default sh-list-default--icon sh-list-default--inline"><div class="sh-list-default__row"><span class="sh-list-default__leading"><span class="sh-list-default__icon sh-icon sh-icon--20" style="--icon:url(icons/line/${icon}.svg)" aria-hidden="true"></span></span><span class="sh-list-default__content"><span class="sh-list-default__title-row"><span class="sh-list-default__title sh-body-lg">${value}</span>${masked ? '<span class="sh-list-default__title-icon sh-icon sh-icon--16" style="--icon:url(icons/filled/lock.svg)" role="img" aria-label="Hidden"></span>' : ""}</span></span></div><hr class="sh-list-default__divider sh-divider sh-divider--soft"></div></div>`
const action = (icon: string, label: string) =>
  `<button class="sh-icon-button-with-label" type="button"><span class="sh-icon-button sh-icon-button--secondary sh-icon-button--md sh-icon-button--fill" aria-hidden="true"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/${icon}.svg)"></span></span><span class="sh-icon-button-with-label__label sh-support-label">${label}</span></button>`
const btn = (type: string, icon: string, label: string) =>
  `<button class="sh-button sh-button--${type} sh-button--md" type="button">${icon ? `<span class="sh-button__icon sh-icon" style="--icon:url(icons/line/${icon}.svg)" aria-hidden="true"></span>` : ""}<span class="sh-button__text"><span class="sh-button__label sh-button-md">${label}</span></span></button>`
const text = (t: string) => `\n        <p class="sh-bottom-sheet__text sh-body-md">${t}</p>`
const note = (t: string) => `\n      <div class="sh-bottom-sheet__note"><p class="sh-fpv-sheet-phone-number__count sh-body-sm">${t}</p></div>`
const actions = (a: string) => `\n      <div class="sh-bottom-sheet__actions">${a}</div>`
const pair = btn("primary", "chat-bubble", "Shaadi Chat") + btn("tertiary", "message", "Send SMS")
const notCounted = note("This contact isn’t counted as viewed")

const parts = {
  shown: [
    "",
    "",
    row("call", "+91 80421 23456", false) +
      row("email", "meher.randhawa@gmail.com", false) +
      `<div class="sh-fpv-sheet-phone-number__island sh-action-island sh-action-island--normal sh-action-island--three-actions"><div class="sh-action-island__actions">${action("chat-bubble", "Shaadi Chat")}${action("whatsapp-02", "WhatsApp")}${action("call", "Call")}</div></div>`,
    note("Contacts viewed 12/40"),
  ],
  "no-tokens": [
    "",
    text("You’ve used all your contact views. Upgrade to see Meher’s number and email."),
    row("call", "+91 8042 ******", true) + row("email", "****** @gmail.com", true),
    actions(btn("premium-solid", "", "View Plans")),
  ],
  connections: [
    " sh-bottom-sheet--side-by-side",
    text("Meher shares her number only with members she’s connected to."),
    row("call", "+91 8042 ******", true) + row("email", "meher.randhawa@gmail.com", false),
    notCounted + actions(pair),
  ],
  hidden: [
    " sh-bottom-sheet--side-by-side",
    text("Meher has hidden her phone number."),
    row("call", "+91 8042 ******", true),
    notCounted + actions(pair),
  ],
}[state]

export default {
  id: "sh-fpv-sheet-phone-number",
  example: figma.code`<div class="sh-bottom-sheet sh-fpv-sheet-phone-number${parts[0]}">
  <div class="sh-bottom-sheet__scrim" aria-hidden="true"></div>
  <section class="sh-bottom-sheet__sheet" role="dialog" aria-modal="true" aria-labelledby="contact-name">
    <div class="sh-bottom-sheet__header"><span class="sh-bottom-sheet__grabber" aria-hidden="true"></span></div>
    <div class="sh-bottom-sheet__visual">
      <div class="sh-profile-identity"><span class="sh-avatar sh-avatar--lg sh-avatar--image" aria-hidden="true"><span class="sh-avatar__media"><span class="sh-user-image"><img src="photo-1.jpg" alt=""></span></span></span><div class="sh-profile-identity__text"><p class="sh-profile-identity__name sh-heading-sm" id="contact-name">Meher Randhawa</p><p class="sh-profile-identity__subtitle sh-body-md">Managed by Parent</p></div></div>
    </div>
    <div class="sh-bottom-sheet__body">
      <div class="sh-bottom-sheet__heading">
        <p class="sh-fpv-sheet-phone-number__status sh-button-sm"><span class="sh-fpv-sheet-phone-number__status-icon sh-icon sh-icon--16" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span>Connect Request Sent</p>${parts[1]}
      </div>
      <div class="sh-bottom-sheet__section">${parts[2]}</div>${parts[3]}
    </div>
    <button class="sh-bottom-sheet__close sh-icon-button sh-icon-button--tertiary sh-icon-button--sm" type="button" aria-label="Close"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/close.svg)" aria-hidden="true"></span></button>
  </section>
</div>`,
}
