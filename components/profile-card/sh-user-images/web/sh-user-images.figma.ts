// Code Connect · sh-user-images → HTML/CSS
// Markup for every variant: sh-user-images.html · styles: sh-user-images.css
// Female 1–21 / Male 1–6 are design-only sample photos: the app passes the member's photo (member-photo.jpg below).
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)

import figma, { html } from "@figma/code-connect/html"

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2248-13619", {
  props: {
    src: figma.enum("Gender", {
      "Female 1": "member-photo.jpg",
      "Female 2": "member-photo.jpg",
      "Female 3": "member-photo.jpg",
      "Female 4": "member-photo.jpg",
      "Female 5": "member-photo.jpg",
      "Female 6": "member-photo.jpg",
      "Female 7": "member-photo.jpg",
      "Female 8": "member-photo.jpg",
      "Female 9": "member-photo.jpg",
      "Female 10": "member-photo.jpg",
      "Female 11": "member-photo.jpg",
      "Female 12": "member-photo.jpg",
      "Female 13": "member-photo.jpg",
      "Female 14": "member-photo.jpg",
      "Female 15": "member-photo.jpg",
      "Female 16": "member-photo.jpg",
      "Female 17": "member-photo.jpg",
      "Female 18": "member-photo.jpg",
      "Female 19": "member-photo.jpg",
      "Female 20": "member-photo.jpg",
      "Female 21": "member-photo.jpg",
      "Male 1": "member-photo.jpg",
      "Male 2": "member-photo.jpg",
      "Male 3": "member-photo.jpg",
      "Male 4": "member-photo.jpg",
      "Male 5": "member-photo.jpg",
      "Male 6": "member-photo.jpg",
    }),
    crop: figma.enum("Gender", {
      "Female 1": "",
      "Female 2": "",
      "Female 3": "",
      "Female 4": "",
      "Female 5": "",
      "Female 6": "",
      "Female 7": "",
      "Female 8": "",
      "Female 9": "",
      "Female 10": "",
      "Female 11": "",
      "Female 12": "",
      "Female 13": "",
      "Female 14": "",
      "Female 15": "",
      "Female 16": "",
      "Female 17": "",
      "Female 18": "",
      "Female 19": "",
      "Female 20": "",
      "Female 21": "",
      "Male 1": "",
      "Male 2": "",
      "Male 3": "",
      "Male 4": "",
      "Male 5": "",
      "Male 6": "",
    }),
    style: figma.enum("Style", {
      Normal: "",
      Blur: " sh-user-image--blur",
    }),
  },
  example: ({ src, crop, style }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="components/profile-card/sh-user-images/web/sh-user-images.css">

<div class="sh-user-image${crop}${style}"><img src="${src}" alt=""></div>`,
})
