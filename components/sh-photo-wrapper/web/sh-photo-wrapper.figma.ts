// Code Connect · sh-photo-wrapper → HTML/CSS
// Markup: sh-photo-wrapper.html · styles: sh-photo-wrapper.css
// The photo and the overlay come from their own connections (sh-user-images, sh-overlay).
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)

import figma, { html } from "@figma/code-connect/html"

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2530-10330", {
  props: {
    image: figma.children("Photo image"),
    bottomScrim: figma.boolean("Show bottom scrim", {
      true: html`<div class="sh-photo-wrapper__scrim sh-photo-wrapper__scrim--bottom"></div>`,
      false: undefined,
    }),
    topScrim: figma.boolean("Show top scrim", {
      true: html`<div class="sh-photo-wrapper__scrim sh-photo-wrapper__scrim--top"></div>`,
      false: undefined,
    }),
    overlay: figma.boolean("Show overlay", {
      true: figma.children("Overlay"),
      false: undefined,
    }),
  },
  example: ({ image, bottomScrim, topScrim, overlay }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="components/profile-card/sh-user-images/web/sh-user-images.css">
<link rel="stylesheet" href="components/sh-overlay/web/sh-overlay.css">
<link rel="stylesheet" href="components/sh-photo-wrapper/web/sh-photo-wrapper.css">

<div class="sh-photo-wrapper">
  ${image}
  ${bottomScrim}
  ${topScrim}
  ${overlay}
</div>`,
})
