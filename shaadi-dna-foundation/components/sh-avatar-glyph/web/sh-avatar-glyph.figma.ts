// Code Connect · sh-avatar-glyph → HTML/CSS
// Every variant: sh-avatar-glyph.html · styles: sh-avatar-glyph.css (needs tokens.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
//
// Paint is icon/primary; set --sh-icon-paint to repaint (sh-avatar uses icon/secondary).

import figma, { html } from "@figma/code-connect/html"

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2644-42085", {
  props: {
    gender: figma.enum("Gender", {
      Male: "male",
      Female: "female",
    }),
    size: figma.enum("Size", {
      "16": "16",
      "24": "24",
      "40": "40",
    }),
  },
  example: ({ gender, size }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="components/sh-avatar-glyph/web/sh-avatar-glyph.css">

<span class="sh-avatar-glyph sh-avatar-glyph--${gender} sh-avatar-glyph--${size}" aria-hidden="true"></span>`,
})
