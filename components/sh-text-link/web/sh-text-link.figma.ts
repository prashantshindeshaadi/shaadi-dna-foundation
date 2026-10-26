// Code Connect · sh-text-link → HTML/CSS
// Every variant rendered: sh-text-link.html · styles: sh-text-link.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
// "Leading icon" / "Trailing icon" instance swaps pick the glyphs: write them as the --icon URLs.
// State Focus is :focus-visible: nothing to write. Use <a href> to navigate, <button type="button"> for an action.

import figma, { html } from "@figma/code-connect/html"

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2348-22277", {
  props: {
    type: figma.enum("Type", {
      Neutral: "neutral",
      Link: "link",
      Inverse: "inverse",
      Premium: "premium",
    }),
    size: figma.enum("Size", { Small: "sm", Medium: "md", Large: "lg" }),
    // The label's text style follows Size.
    textStyle: figma.enum("Size", { Small: "sh-button-sm", Medium: "sh-button-md", Large: "sh-button-lg" }),
    border: figma.boolean("Show border", { true: "", false: " sh-text-link--no-border" }),
    label: figma.string("Label"),
    leadingIcon: figma.boolean("Show leading icon", {
      true: html`<span class="sh-text-link__icon sh-icon" style="--icon:url(icons/line/arrow-left-01.svg)" aria-hidden="true"></span>`,
      false: undefined,
    }),
    trailingIcon: figma.boolean("Show trailing icon", {
      true: html`<span class="sh-text-link__icon sh-icon" style="--icon:url(icons/line/arrow-right-01.svg)" aria-hidden="true"></span>`,
      false: undefined,
    }),
  },
  example: ({ type, size, textStyle, border, label, leadingIcon, trailingIcon }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-text-link/web/sh-text-link.css">

<a class="sh-text-link sh-text-link--${type} sh-text-link--${size}${border}" href="#">
  ${leadingIcon}
  <span class="sh-text-link__label ${textStyle}">${label}</span>
  ${trailingIcon}
</a>`,
})
