// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2594-16750
// Code Connect template · sh-action-note → HTML/CSS
// Every variant rendered: sh-action-note.html · styles: sh-action-note.css
// (needs tokens.css, sh-typo.css, sh-icon.css, sh-text-link.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
//
// Link slot: the link follows CTA and Style (Edit → sh-text-link Inverse on Normal / Neutral on Floating;
// Upgrade → sh-text-link Premium "Upgrade Now"), Size Small, no icons, underline on.

import figma from "figma"

const cta = figma.selectedInstance.getEnum("CTA", {
  Edit: "edit",
  Upgrade: "upgrade",
})
const style = figma.selectedInstance.getEnum("Style", {
  Normal: "normal",
  Floating: "floating",
})
const text = figma.selectedInstance.getEnum("CTA", {
  Edit: figma.selectedInstance.getString("Message"),
  Upgrade: figma.selectedInstance.getString("Action text"),
})
const linkType = figma.selectedInstance.getEnum("CTA", {
  Edit: figma.selectedInstance.getEnum("Style", {
    Normal: "inverse",
    Floating: "neutral",
  }),
  Upgrade: "premium",
})
const linkLabel = figma.selectedInstance.getEnum("CTA", {
  Edit: "Edit",
  Upgrade: "Upgrade Now",
})
const __props: Record<string, unknown> = {}
if (cta && cta.type !== "ERROR") {
  __props["cta"] = cta
}
if (style && style.type !== "ERROR") {
  __props["style"] = style
}
if (text && text.type !== "ERROR") {
  __props["text"] = text
}
if (linkType && linkType.type !== "ERROR") {
  __props["linkType"] = linkType
}
if (linkLabel && linkLabel.type !== "ERROR") {
  __props["linkLabel"] = linkLabel
}

export default {
  id: "TODO",
  example: figma.code`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-text-link/web/sh-text-link.css">
<link rel="stylesheet" href="components/sh-action-note/web/sh-action-note.css">

<div class="sh-action-note sh-action-note--${_fcc_renderHtmlValue(
    cta,
  )} sh-action-note--${_fcc_renderHtmlValue(style)}">
  <span class="sh-action-note__text sh-body-sm">${_fcc_renderHtmlValue(
    text,
  )}</span>
  <span class="sh-action-note__link">
    <button class="sh-text-link sh-text-link--${_fcc_renderHtmlValue(
      linkType,
    )} sh-text-link--sm" type="button"><span class="sh-text-link__label sh-button-sm">${_fcc_renderHtmlValue(
    linkLabel,
  )}</span></button>
  </span>
</div>`,
}
