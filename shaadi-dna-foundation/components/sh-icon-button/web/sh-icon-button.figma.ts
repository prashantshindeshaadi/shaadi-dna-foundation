// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=567-26954
// component=sh-icon-button
// Code Connect template · sh-icon-button → HTML/CSS
// Every variant rendered: sh-icon-button.html · styles: sh-icon-button.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
// The six "Icon (…)" instance swaps pick the glyph: write it as the --icon URL (icons/<type>/<name>.svg).

import figma from "figma"

const type = figma.selectedInstance.getEnum("Type", {
  Primary: "primary",
  Secondary: "secondary",
  Tertiary: "tertiary",
  Translucent: "translucent",
  Ghost: "ghost",
})
const size = figma.selectedInstance.getEnum("Size", {
  Large: "lg",
  Medium: "md",
  Small: "sm",
})
const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
})
const label = figma.selectedInstance.getString("Screen reader label")
const badge = figma.selectedInstance.getBoolean("Show badge", {
  true: figma.selectedInstance.getString("Badge"),
  false: undefined,
})
const badgeStyle = figma.selectedInstance.getEnum("Size", {
  Large: "sh-body-lg",
  Medium: "sh-body-md",
  Small: "sh-body-sm",
})
const __props: Record<string, unknown> = {}
if (type && type.type !== "ERROR") {
  __props["type"] = type
}
if (size && size.type !== "ERROR") {
  __props["size"] = size
}
if (disabled && disabled.type !== "ERROR") {
  __props["disabled"] = disabled
}
if (label && label.type !== "ERROR") {
  __props["label"] = label
}
if (badge && badge.type !== "ERROR") {
  __props["badge"] = badge
}
if (badgeStyle && badgeStyle.type !== "ERROR") {
  __props["badgeStyle"] = badgeStyle
}

export default {
  id: "TODO",
  example: figma.code`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-icon-button/web/sh-icon-button.css">

<button class="sh-icon-button sh-icon-button--${_fcc_renderHtmlValue(
    type,
  )} sh-icon-button--${_fcc_renderHtmlValue(
    size,
  )}" type="button" ${_fcc_renderHtmlAttribute(
    "aria-label",
    label,
  )} ${_fcc_renderHtmlAttribute("disabled", disabled)}>
  <span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/plus.svg)" aria-hidden="true"></span>
  <span class="sh-icon-button__badge ${_fcc_renderHtmlValue(
    badgeStyle,
  )}">${_fcc_renderHtmlValue(badge)}</span>
</button>`,
}
