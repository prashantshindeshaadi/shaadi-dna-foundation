// Code Connect · sh-tag → HTML/CSS
// Every variant: sh-tag.html · styles: sh-tag.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
//
// "Leading icon" / "Trailing icon" are instance swaps of sh-icon. The snippet shows the default icons
// (sh-icon/tag, sh-icon/arrow-right-01); swap the --icon URL for the one picked in Figma.

import figma, { html } from "@figma/code-connect/html"

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2357-23671", {
  props: {
    label: figma.string("Label"),
    mode: figma.enum("Mode", {
      White: "",
      Dark: " sh-tag--dark",
      "Translucent light": " sh-tag--translucent-light",
      "Translucent dark": " sh-tag--translucent-dark",
      Strong: " sh-tag--strong",
    }),
    size: figma.enum("Size", {
      Medium: "",
      Small: " sh-tag--sm",
    }),
    shape: figma.enum("Shape", {
      Rounded: "",
      Pill: " sh-tag--pill",
    }),
    border: figma.boolean("Show border", {
      true: "",
      false: " sh-tag--no-border",
    }),
    // Not wired to a layer in Figma yet: the class is reserved and changes nothing.
    outline: figma.boolean("Show outline", {
      true: " sh-tag--outline",
      false: "",
    }),
    leadingIcon: figma.boolean("Show leading icon", {
      true: html`<span class="sh-icon sh-icon--12 sh-tag__icon" style="--icon:url(icons/line/tag.svg)" aria-hidden="true"></span>`,
      false: undefined,
    }),
    trailingIcon: figma.boolean("Show trailing icon", {
      true: html`<span class="sh-icon sh-icon--12 sh-tag__icon" style="--icon:url(icons/line/arrow-right-01.svg)" aria-hidden="true"></span>`,
      false: undefined,
    }),
  },
  example: ({ label, mode, size, shape, border, outline, leadingIcon, trailingIcon }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-tag/web/sh-tag.css">

<span class="sh-tag${mode}${size}${shape}${border}${outline}">${leadingIcon}<span class="sh-tag__label sh-support-label">${label}</span>${trailingIcon}</span>`,
})
