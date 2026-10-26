// Code Connect · sh-avatar-placeholder → HTML/CSS
// Markup for every variant: sh-avatar-placeholder.html · styles: sh-avatar-placeholder.css
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)

import figma, { html } from "@figma/code-connect/html"

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2239-13257", {
  props: {
    gender: figma.enum("Gender", {
      Male: "male",
      Female: "female",
      "Female requested": "female-requested",
      "Male requested": "male-requested",
    }),
    // Silhouettes are SVG; the requested portraits are @3x JPG
    file: figma.enum("Gender", {
      Male: "",
      Female: "",
      "Female requested": "@3x",
      "Male requested": "@3x",
    }),
    ext: figma.enum("Gender", {
      Male: "svg",
      Female: "svg",
      "Female requested": "jpg",
      "Male requested": "jpg",
    }),
    label: figma.enum("Gender", {
      Male: "No photo",
      Female: "No photo",
      "Female requested": "Photo requested",
      "Male requested": "Photo requested",
    }),
    ratio: figma.enum("Aspect Ratio", {
      "4:5": "4x5",
      "1:1": "1x1",
    }),
  },
  example: ({ gender, file, ext, label, ratio }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="components/profile-card/sh-avatar-placeholder/web/sh-avatar-placeholder.css">

<span class="sh-avatar-placeholder sh-avatar-placeholder--${gender} sh-avatar-placeholder--${ratio}" role="img" aria-label="${label}">
  <img class="sh-avatar-placeholder__art" src="components/profile-card/sh-avatar-placeholder/assets/${gender}-${ratio}${file}.${ext}" alt="">
</span>`,
})
