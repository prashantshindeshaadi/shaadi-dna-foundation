// Code Connect · sh-action-island → HTML/CSS
// Every variant rendered: sh-action-island.html · styles: sh-action-island.css (needs tokens.css, sh-typo.css,
// sh-icon.css, sh-button.css, sh-icon-button.css, sh-icon-button-with-label.css, sh-text-link.css, sh-action-note.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
//
// Show note renders the nested sh-action-note (its own Code Connect). Button labels and icons are the
// design's: swap the sample text and icon URLs (icons/<type>/<name>.svg).

import figma, { html } from "@figma/code-connect/html"

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2594-16928", {
  props: {
    type: figma.enum("Type", {
      "Message + primary": "message-primary",
      "Message + premium": "message-premium",
      "Message + tertiary": "message-tertiary",
      "Message only": "message-only",
      "Primary only": "primary-only",
      "Secondary + primary": "secondary-primary",
      "Tertiary + primary": "tertiary-primary",
      "Three actions": "three-actions",
    }),
    style: figma.enum("Style", {
      Normal: "normal",
      Floating: "floating",
    }),
    note: figma.boolean("Show note", {
      true: figma.children("Note"),
      false: undefined,
    }),
    actions: figma.enum("Type", {
      "Message + primary": html`<p class="sh-action-island__message sh-body-md-tight">${figma.string("Message")}</p>
    <button class="sh-button sh-button--primary sh-button--md sh-button--fill" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/connect.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Connect Now</span></span></button>`,
      "Message + premium": html`<p class="sh-action-island__message sh-body-md-tight">${figma.string("Message")}</p>
    <button class="sh-button sh-button--premium-solid sh-button--md sh-button--fill" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Upgrade to Connect</span></span></button>`,
      "Message + tertiary": html`<p class="sh-action-island__message sh-body-md-tight">${figma.string("Message")}</p>
    <button class="sh-button sh-button--tertiary sh-button--md sh-button--fill" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Unhide Her</span></span></button>`,
      "Message only": html`<p class="sh-action-island__message sh-body-md-tight">${figma.string("Status")}</p>`,
      "Primary only": html`<button class="sh-button sh-button--primary sh-button--md sh-button--fill" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">See similar profiles</span></span></button>`,
      "Secondary + primary": html`<button class="sh-button sh-button--secondary sh-button--md sh-button--fill" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/line/chat-bubble.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Shaadi Chat</span></span></button>
    <button class="sh-button sh-button--primary sh-button--md sh-button--fill" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/connect.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Connect Now</span></span></button>`,
      "Tertiary + primary": html`<button class="sh-button sh-button--tertiary sh-button--md sh-button--fill" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/line/close.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Decline</span></span></button>
    <button class="sh-button sh-button--primary sh-button--md sh-button--fill" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Accept</span></span></button>`,
      "Three actions": html`<button class="sh-icon-button-with-label" type="button"><span class="sh-icon-button sh-icon-button--secondary sh-icon-button--md sh-icon-button--fill" aria-hidden="true"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/chat-bubble.svg)"></span></span><span class="sh-icon-button-with-label__label sh-support-label">Shaadi Chat</span></button>
    <button class="sh-icon-button-with-label" type="button"><span class="sh-icon-button sh-icon-button--secondary sh-icon-button--md sh-icon-button--fill" aria-hidden="true"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/whatsapp-02.svg)"></span></span><span class="sh-icon-button-with-label__label sh-support-label">WhatsApp</span></button>
    <button class="sh-icon-button-with-label" type="button"><span class="sh-icon-button sh-icon-button--secondary sh-icon-button--md sh-icon-button--fill" aria-hidden="true"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/call.svg)"></span></span><span class="sh-icon-button-with-label__label sh-support-label">Call</span></button>`,
    }),
  },
  example: ({ type, style, note, actions }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-button/web/sh-button.css">
<link rel="stylesheet" href="components/sh-icon-button/web/sh-icon-button.css">
<link rel="stylesheet" href="components/sh-icon-button-with-label/web/sh-icon-button-with-label.css">
<link rel="stylesheet" href="components/sh-text-link/web/sh-text-link.css">
<link rel="stylesheet" href="components/profile-card/sh-action-note/web/sh-action-note.css">
<link rel="stylesheet" href="components/profile-card/sh-action-island/web/sh-action-island.css">

<div class="sh-action-island sh-action-island--${style} sh-action-island--${type}">
  ${note}
  <div class="sh-action-island__actions">
    ${actions}
  </div>
</div>`,
})
