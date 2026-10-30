// Code Connect · sh-avatar-placeholder → HTML/CSS
// Markup for every variant: sh-avatar-placeholder.html · styles: sh-avatar-placeholder.css
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)

import figma, { html } from "@figma/code-connect/html"

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2239-13257", {
  props: {
    gender: figma.enum("Gender", {
      Male: "male",
      Female: "female",
    }),
    modifier: figma.enum("Aspect Ratio", {
      "4:5": "",
      "1:1": " sh-avatar-placeholder--1x1",
      "Full": " sh-avatar-placeholder--full",
    }),
  },
  example: ({ gender, modifier }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="components/profile-card/sh-avatar-placeholder/web/sh-avatar-placeholder.css">

<span class="sh-avatar-placeholder${modifier}" role="img" aria-label="No photo">
  <img class="sh-avatar-placeholder__silhouette" src="components/profile-card/sh-avatar-silhouette/assets/${gender}.svg" alt="">
</span>`,
})
