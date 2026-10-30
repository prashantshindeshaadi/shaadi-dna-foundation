// Code Connect · sh-action-note → HTML/CSS
// Every variant rendered: sh-action-note.html · styles: sh-action-note.css
// (needs tokens.css, sh-typo.css, sh-icon.css, sh-text-link.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
//
// Link slot: the link follows CTA and Style (Edit → sh-text-link Inverse on Normal / Neutral on Floating;
// Upgrade → sh-text-link Premium "Upgrade Now"), Size Small, no icons, underline on.

import figma, { html } from "@figma/code-connect/html"

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2594-16750", {
  props: {
    cta: figma.enum("CTA", {
      Edit: "edit",
      Upgrade: "upgrade",
    }),
    style: figma.enum("Style", {
      Normal: "normal",
      Floating: "floating",
    }),
    // Edit shows Message, Upgrade shows Action text
    text: figma.enum("CTA", {
      Edit: figma.string("Message"),
      Upgrade: figma.string("Action text"),
    }),
    linkType: figma.enum("CTA", {
      Edit: figma.enum("Style", { Normal: "inverse", Floating: "neutral" }),
      Upgrade: "premium",
    }),
    linkLabel: figma.enum("CTA", {
      Edit: "Edit",
      Upgrade: "Upgrade Now",
    }),
  },
  example: ({ cta, style, text, linkType, linkLabel }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-text-link/web/sh-text-link.css">
<link rel="stylesheet" href="components/sh-action-note/web/sh-action-note.css">

<div class="sh-action-note sh-action-note--${cta} sh-action-note--${style}">
  <span class="sh-action-note__text sh-body-sm">${text}</span>
  <span class="sh-action-note__link">
    <button class="sh-text-link sh-text-link--${linkType} sh-text-link--sm" type="button"><span class="sh-text-link__label sh-button-sm">${linkLabel}</span></button>
  </span>
</div>`,
})
