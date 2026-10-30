// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2348-22277
// Code Connect template · sh-text-link → HTML/CSS
// Every variant rendered: sh-text-link.html · styles: sh-text-link.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
// "Leading icon" / "Trailing icon" instance swaps pick the glyphs: write them as the --icon URLs.
// State Focus is :focus-visible: nothing to write. Use <a href> to navigate, <button type="button"> for an action.

import figma from "figma"

const type = figma.selectedInstance.getEnum("Type", {
  Neutral: "neutral",
  Link: "link",
  Inverse: "inverse",
  Premium: "premium",
})
const size = figma.selectedInstance.getEnum("Size", {
  Small: "sm",
  Medium: "md",
  Large: "lg",
})
const textStyle = figma.selectedInstance.getEnum("Size", {
  Small: "sh-button-sm",
  Medium: "sh-button-md",
  Large: "sh-button-lg",
})
const border = figma.selectedInstance.getBoolean("Show border", {
  true: "",
  false: " sh-text-link--no-border",
})
const label = figma.selectedInstance.getString("Label")
const leadingIcon = figma.selectedInstance.getBoolean("Show leading icon", {
  true: '<span class="sh-text-link__icon sh-icon" style="--icon:url(icons/line/arrow-left-01.svg)" aria-hidden="true"></span>',
  false: undefined,
})
const trailingIcon = figma.selectedInstance.getBoolean("Show trailing icon", {
  true: '<span class="sh-text-link__icon sh-icon" style="--icon:url(icons/line/arrow-right-01.svg)" aria-hidden="true"></span>',
  false: undefined,
})
const __props: Record<string, unknown> = {}
if (type && type.type !== "ERROR") {
  __props["type"] = type
}
if (size && size.type !== "ERROR") {
  __props["size"] = size
}
if (textStyle && textStyle.type !== "ERROR") {
  __props["textStyle"] = textStyle
}
if (border && border.type !== "ERROR") {
  __props["border"] = border
}
if (label && label.type !== "ERROR") {
  __props["label"] = label
}
if (leadingIcon && leadingIcon.type !== "ERROR") {
  __props["leadingIcon"] = leadingIcon
}
if (trailingIcon && trailingIcon.type !== "ERROR") {
  __props["trailingIcon"] = trailingIcon
}

export default {
  id: "TODO",
  example: figma.code`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-text-link/web/sh-text-link.css">

<a class="sh-text-link sh-text-link--${_fcc_renderHtmlValue(
    type,
  )} sh-text-link--${_fcc_renderHtmlValue(size)}${_fcc_renderHtmlValue(
    border,
  )}" href="#">
  ${_fcc_renderHtmlValue(leadingIcon)}
  <span class="sh-text-link__label ${_fcc_renderHtmlValue(
    textStyle,
  )}">${_fcc_renderHtmlValue(label)}</span>
  ${_fcc_renderHtmlValue(trailingIcon)}
</a>`,
}
