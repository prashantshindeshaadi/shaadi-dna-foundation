// Code Connect · sh-avatar → HTML/CSS
// Every variant: sh-avatar.html · styles: sh-avatar.css (needs tokens.css, sh-typo.css, sh-user-images.css, sh-avatar-glyph.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
//
// One connection per Type (Image / Initial / Icon); Size maps inside each.
// Type=Image: put the member's photo in the <img>. Type=Icon: the "Icon" swap renders its sh-avatar-glyph
// snippet; the avatar sizes the glyph (sm 16 · md 24 · lg 40), so use the matching sh-avatar-glyph--<size> class.

import figma, { html } from "@figma/code-connect/html"

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2486-15378", {
  variant: { Type: "Image" },
  props: {
    size: figma.enum("Size", { sm: "sm", md: "md", lg: "lg" }),
  },
  example: ({ size }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="components/profile-card/sh-user-images/web/sh-user-images.css">
<link rel="stylesheet" href="components/sh-avatar/web/sh-avatar.css">

<span class="sh-avatar sh-avatar--${size} sh-avatar--image" role="img" aria-label="Member name">
  <span class="sh-avatar__media"><span class="sh-user-image"><img src="member.jpg" alt=""></span></span>
</span>`,
})

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2486-15378", {
  variant: { Type: "Initial" },
  props: {
    size: figma.enum("Size", { sm: "sm", md: "md", lg: "lg" }),
    // The Label's text style follows Size.
    labelStyle: figma.enum("Size", { sm: "sh-support-label", md: "sh-body-md", lg: "sh-heading-sm" }),
    label: figma.string("Label"),
  },
  example: ({ size, labelStyle, label }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-avatar/web/sh-avatar.css">

<span class="sh-avatar sh-avatar--${size} sh-avatar--initial">
  <span class="sh-avatar__media"><span class="sh-avatar__label ${labelStyle}">${label}</span></span>
</span>`,
})

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2486-15378", {
  variant: { Type: "Icon" },
  props: {
    size: figma.enum("Size", { sm: "sm", md: "md", lg: "lg" }),
    icon: figma.instance("Icon"),
  },
  example: ({ size, icon }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="components/sh-avatar-glyph/web/sh-avatar-glyph.css">
<link rel="stylesheet" href="components/sh-avatar/web/sh-avatar.css">

<span class="sh-avatar sh-avatar--${size} sh-avatar--icon" role="img" aria-label="No photo">
  <span class="sh-avatar__media">${icon}</span>
</span>`,
})
