// Code Connect · sh-button → HTML/CSS
// Every variant rendered: sh-button.html · styles: sh-button.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)

import figma, { html } from "@figma/code-connect/html"

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=163-1301", {
  props: {
    type: figma.enum("Type", {
      Primary: "primary",
      Secondary: "secondary",
      Tertiary: "tertiary",
      Ghost: "ghost",
      "Premium Solid": "premium-solid",
      "Premium Soft": "premium-soft",
    }),
    size: figma.enum("Size", { Large: "lg", Medium: "md", Small: "sm" }),
    // The label's text style follows Size.
    textStyle: figma.enum("Size", { Large: "sh-button-lg", Medium: "sh-button-md", Small: "sh-button-sm" }),
    // Hover, Pressed and Focus are interaction states (:hover, :active, :focus-visible): nothing to write.
    state: figma.enum("State", {
      Default: "",
      Hover: "",
      Pressed: "",
      Focus: "",
      Disabled: "",
      Loading: " is-loading",
    }),
    disabled: figma.enum("State", { Disabled: true }),
    busy: figma.enum("State", { Loading: "true" }),
    spinner: figma.enum("State", {
      Loading: html`<span class="sh-button__spinner sh-icon" style="--icon:url(icons/line/loader-circle.svg)" aria-hidden="true"></span>`,
    }),
    label: figma.string("Label"),
    sublabel: figma.boolean("Show sublabel", {
      true: figma.string("Sublabel"),
      false: undefined,
    }),
    leadingIcon: figma.boolean("Show leading icon", {
      true: html`<span class="sh-button__icon sh-icon" style="--icon:url(icons/line/arrow-left-01.svg)" aria-hidden="true"></span>`,
      false: undefined,
    }),
    trailingIcon: figma.boolean("Show trailing icon", {
      true: html`<span class="sh-button__icon sh-icon" style="--icon:url(icons/line/arrow-right-01.svg)" aria-hidden="true"></span>`,
      false: undefined,
    }),
  },
  example: ({ type, size, textStyle, state, disabled, busy, spinner, label, sublabel, leadingIcon, trailingIcon }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-button/web/sh-button.css">

<!-- Swap the icon URLs for the icons the design uses (icons/<type>/<name>.svg). Add sh-button--fill to stretch. -->
<button class="sh-button sh-button--${type} sh-button--${size}${state}" type="button" disabled=${disabled} aria-busy=${busy}>
  ${leadingIcon}
  <span class="sh-button__text">
    <span class="sh-button__label ${textStyle}">${label}</span>
    <span class="sh-button__sublabel sh-support-meta">${sublabel}</span>
  </span>
  ${trailingIcon}
  ${spinner}
</button>`,
})
