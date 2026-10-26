// Code Connect · sh-info-detail → HTML/CSS
// Every variant + the row helper: sh-info-detail.html · styles: sh-info-detail.css (needs tokens.css, sh-typo.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
//
// Facts line up in <p class="sh-info-detail-row"> (add sh-info-detail-row--sm for Size Small);
// turn the separator off on the last fact of each row.

import figma, { html } from "@figma/code-connect/html"

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2825-43215", {
  props: {
    label: figma.string("Label"),
    mode: figma.enum("Mode", {
      "On image": "on-image",
      Default: "default",
    }),
    size: figma.enum("Size", {
      Medium: "md",
      Small: "sm",
    }),
    labelStyle: figma.enum("Size", {
      Medium: "sh-body-md",
      Small: "sh-body-sm-tight",
    }),
    separator: figma.boolean("Show separator", {
      true: html`<span class="sh-info-detail__separator" aria-hidden="true"></span>`,
      false: undefined,
    }),
  },
  example: ({ label, mode, size, labelStyle, separator }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/profile-card/sh-info-detail/web/sh-info-detail.css">

<span class="sh-info-detail sh-info-detail--${mode} sh-info-detail--${size}"><span class="sh-info-detail__label ${labelStyle}">${label}</span>${separator}</span>`,
})
