// Code Connect · sh-icon-button → HTML/CSS
// Every variant rendered: sh-icon-button.html · styles: sh-icon-button.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
// The six "Icon (…)" instance swaps pick the glyph: write it as the --icon URL (icons/<type>/<name>.svg).

import figma, { html } from "@figma/code-connect/html"

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=567-26954", {
  props: {
    type: figma.enum("Type", {
      Primary: "primary",
      Secondary: "secondary",
      Tertiary: "tertiary",
      Translucent: "translucent",
      Ghost: "ghost",
    }),
    size: figma.enum("Size", { Large: "lg", Medium: "md", Small: "sm" }),
    // Hover, Pressed and Focus are interaction states (:hover, :active, :focus-visible).
    disabled: figma.enum("State", { Disabled: true }),
    label: figma.string("Screen reader label"),
    badge: figma.boolean("Show badge", {
      true: figma.string("Badge"),
      false: undefined,
    }),
    // The badge's text style follows Size.
    badgeStyle: figma.enum("Size", { Large: "sh-body-lg", Medium: "sh-body-md", Small: "sh-body-sm" }),
  },
  example: ({ type, size, disabled, label, badge, badgeStyle }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-icon-button/web/sh-icon-button.css">

<button class="sh-icon-button sh-icon-button--${type} sh-icon-button--${size}" type="button" aria-label="${label}" disabled=${disabled}>
  <span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/plus.svg)" aria-hidden="true"></span>
  <span class="sh-icon-button__badge ${badgeStyle}">${badge}</span>
</button>`,
})
