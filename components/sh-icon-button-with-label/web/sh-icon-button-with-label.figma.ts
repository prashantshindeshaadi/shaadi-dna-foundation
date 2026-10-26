// Code Connect · sh-icon-button-with-label → HTML/CSS
// Every variant rendered: sh-icon-button-with-label.html · styles: sh-icon-button-with-label.css
// (needs tokens.css, sh-typo.css, sh-icon.css, sh-icon-button.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
// State Focus is :focus-visible (the icon button shows the ring): nothing to write.

import figma, { html } from "@figma/code-connect/html"

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2198-32247", {
  props: {
    label: figma.string("Label"),
  },
  example: ({ label }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-icon-button/web/sh-icon-button.css">
<link rel="stylesheet" href="components/sh-icon-button-with-label/web/sh-icon-button-with-label.css">

<!-- Swap the icon URL for the action's icon. Over imagery add style="--sh-icon-button-with-label-color: var(--sh-text-on-image)". -->
<button class="sh-icon-button-with-label" type="button">
  <span class="sh-icon-button sh-icon-button--secondary sh-icon-button--md sh-icon-button--fill" aria-hidden="true">
    <span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/plus.svg)"></span>
  </span>
  <span class="sh-icon-button-with-label__label sh-support-label">${label}</span>
</button>`,
})
