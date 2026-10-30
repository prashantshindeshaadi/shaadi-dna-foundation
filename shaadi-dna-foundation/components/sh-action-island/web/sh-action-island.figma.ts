// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2594-16928
// component=sh-action-island
// Code Connect template · sh-action-island → HTML/CSS
// Every variant rendered: sh-action-island.html · styles: sh-action-island.css (needs tokens.css, sh-typo.css,
// sh-icon.css, sh-button.css, sh-icon-button.css, sh-icon-button-with-label.css, sh-text-link.css, sh-action-note.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
//
// Show note renders the nested sh-action-note (its own Code Connect). Button labels and icons are the
// design's: swap the sample text and icon URLs (icons/<type>/<name>.svg).

import figma from "figma"

const type = figma.selectedInstance.getEnum("Type", {
  "Message + primary": "message-primary",
  "Message + premium": "message-premium",
  "Message + tertiary": "message-tertiary",
  "Message only": "message-only",
  "Primary only": "primary-only",
  "Secondary + primary": "secondary-primary",
  "Tertiary + primary": "tertiary-primary",
  "Three actions": "three-actions",
})
const style = figma.selectedInstance.getEnum("Style", {
  Normal: "normal",
  Floating: "floating",
})
const note = figma.selectedInstance.getBoolean("Show note", {
  true: figma.properties.children(["Note"]),
  false: undefined,
})
const actions = figma.selectedInstance.getEnum("Type", {
  "Message + primary":
    '<p class="sh-action-island__message sh-body-md-tight">${figma.string("Message")}</p>\n    <button class="sh-button sh-button--primary sh-button--md sh-button--fill" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/connect.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Connect Now</span></span></button>',
  "Message + premium":
    '<p class="sh-action-island__message sh-body-md-tight">${figma.string("Message")}</p>\n    <button class="sh-button sh-button--premium-solid sh-button--md sh-button--fill" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Upgrade to Connect</span></span></button>',
  "Message + tertiary":
    '<p class="sh-action-island__message sh-body-md-tight">${figma.string("Message")}</p>\n    <button class="sh-button sh-button--tertiary sh-button--md sh-button--fill" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Unhide Her</span></span></button>',
  "Message only":
    '<p class="sh-action-island__message sh-body-md-tight">${figma.string("Status")}</p>',
  "Primary only":
    '<button class="sh-button sh-button--primary sh-button--md sh-button--fill" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">See similar profiles</span></span></button>',
  "Secondary + primary":
    '<button class="sh-button sh-button--secondary sh-button--md sh-button--fill" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/line/chat-bubble.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Shaadi Chat</span></span></button>\n    <button class="sh-button sh-button--primary sh-button--md sh-button--fill" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/connect.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Connect Now</span></span></button>',
  "Tertiary + primary":
    '<button class="sh-button sh-button--tertiary sh-button--md sh-button--fill" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/line/close.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Decline</span></span></button>\n    <button class="sh-button sh-button--primary sh-button--md sh-button--fill" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Accept</span></span></button>',
  "Three actions":
    '<button class="sh-icon-button-with-label" type="button"><span class="sh-icon-button sh-icon-button--secondary sh-icon-button--md sh-icon-button--fill" aria-hidden="true"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/chat-bubble.svg)"></span></span><span class="sh-icon-button-with-label__label sh-support-label">Shaadi Chat</span></button>\n    <button class="sh-icon-button-with-label" type="button"><span class="sh-icon-button sh-icon-button--secondary sh-icon-button--md sh-icon-button--fill" aria-hidden="true"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/whatsapp-02.svg)"></span></span><span class="sh-icon-button-with-label__label sh-support-label">WhatsApp</span></button>\n    <button class="sh-icon-button-with-label" type="button"><span class="sh-icon-button sh-icon-button--secondary sh-icon-button--md sh-icon-button--fill" aria-hidden="true"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/call.svg)"></span></span><span class="sh-icon-button-with-label__label sh-support-label">Call</span></button>',
})
const __props: Record<string, unknown> = {}
if (type && type.type !== "ERROR") {
  __props["type"] = type
}
if (style && style.type !== "ERROR") {
  __props["style"] = style
}
if (note && note.type !== "ERROR") {
  __props["note"] = note
}
if (actions && actions.type !== "ERROR") {
  __props["actions"] = actions
}

export default {
  id: "TODO",
  example: figma.code`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-button/web/sh-button.css">
<link rel="stylesheet" href="components/sh-icon-button/web/sh-icon-button.css">
<link rel="stylesheet" href="components/sh-icon-button-with-label/web/sh-icon-button-with-label.css">
<link rel="stylesheet" href="components/sh-text-link/web/sh-text-link.css">
<link rel="stylesheet" href="components/sh-action-note/web/sh-action-note.css">
<link rel="stylesheet" href="components/sh-action-island/web/sh-action-island.css">

<div class="sh-action-island sh-action-island--${_fcc_renderHtmlValue(
    style,
  )} sh-action-island--${_fcc_renderHtmlValue(type)}">
  ${_fcc_renderHtmlValue(note)}
  <div class="sh-action-island__actions">
    ${_fcc_renderHtmlValue(actions)}
  </div>
</div>`,
}
