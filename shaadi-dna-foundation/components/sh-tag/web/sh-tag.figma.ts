// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2357-23671
// component=sh-tag
// Code Connect template · sh-tag → HTML/CSS
// Every variant: sh-tag.html · styles: sh-tag.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
//
// "Leading icon" / "Trailing icon" are instance swaps of sh-icon. The snippet shows the default icons
// (sh-icon/tag, sh-icon/arrow-right-01); swap the --icon URL for the one picked in Figma.

import figma from "figma"

const label = figma.selectedInstance.getString("Label")
const mode = figma.selectedInstance.getEnum("Mode", {
  White: "",
  Dark: " sh-tag--dark",
  "Translucent light": " sh-tag--translucent-light",
  "Translucent dark": " sh-tag--translucent-dark",
  Strong: " sh-tag--strong",
})
const size = figma.selectedInstance.getEnum("Size", {
  Medium: "",
  Small: " sh-tag--sm",
})
const shape = figma.selectedInstance.getEnum("Shape", {
  Rounded: "",
  Pill: " sh-tag--pill",
})
const border = figma.selectedInstance.getBoolean("Show border", {
  true: "",
  false: " sh-tag--no-border",
})
const outline = figma.selectedInstance.getBoolean("Show outline", {
  true: " sh-tag--outline",
  false: "",
})
const leadingIcon = figma.selectedInstance.getBoolean("Show leading icon", {
  true: '<span class="sh-icon sh-icon--12 sh-tag__icon" style="--icon:url(icons/line/tag.svg)" aria-hidden="true"></span>',
  false: undefined,
})
const trailingIcon = figma.selectedInstance.getBoolean("Show trailing icon", {
  true: '<span class="sh-icon sh-icon--12 sh-tag__icon" style="--icon:url(icons/line/arrow-right-01.svg)" aria-hidden="true"></span>',
  false: undefined,
})
const __props: Record<string, unknown> = {}
if (label && label.type !== "ERROR") {
  __props["label"] = label
}
if (mode && mode.type !== "ERROR") {
  __props["mode"] = mode
}
if (size && size.type !== "ERROR") {
  __props["size"] = size
}
if (shape && shape.type !== "ERROR") {
  __props["shape"] = shape
}
if (border && border.type !== "ERROR") {
  __props["border"] = border
}
if (outline && outline.type !== "ERROR") {
  __props["outline"] = outline
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
<link rel="stylesheet" href="components/sh-tag/web/sh-tag.css">

<span class="sh-tag${_fcc_renderHtmlValue(mode)}${_fcc_renderHtmlValue(
    size,
  )}${_fcc_renderHtmlValue(shape)}${_fcc_renderHtmlValue(
    border,
  )}${_fcc_renderHtmlValue(outline)}">${_fcc_renderHtmlValue(
    leadingIcon,
  )}<span class="sh-tag__label sh-support-label">${_fcc_renderHtmlValue(
    label,
  )}</span>${_fcc_renderHtmlValue(trailingIcon)}</span>`,
}
