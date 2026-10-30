// Code Connect · sh-divider → HTML/CSS
// Every variant rendered: sh-divider.html · styles: sh-divider.css (needs tokens.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)

import figma, { html } from "@figma/code-connect/html"

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=594-31711", {
  props: {
    type: figma.enum("Type", { Soft: "soft", Default: "default", Strong: "strong" }),
    orientation: figma.enum("Orientation", { Horizontal: "", Vertical: " sh-divider--vertical" }),
    role: figma.enum("Orientation", { Horizontal: undefined, Vertical: "separator" }),
    ariaOrientation: figma.enum("Orientation", { Horizontal: undefined, Vertical: "vertical" }),
  },
  example: ({ type, orientation, role, ariaOrientation }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="components/sh-divider/web/sh-divider.css">

<!-- Horizontal fills the width (an <hr> works too); Vertical fills the height of its row. -->
<div class="sh-divider sh-divider--${type}${orientation}" role=${role} aria-orientation=${ariaOrientation}></div>`,
})
