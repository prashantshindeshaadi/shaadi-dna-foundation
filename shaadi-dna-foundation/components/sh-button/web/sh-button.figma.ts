// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=163-1301
// Code Connect template · sh-button → HTML/CSS
// Every variant rendered: sh-button.html · styles: sh-button.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)

import figma from "figma"

const type = figma.selectedInstance.getEnum("Type", {
  Primary: "primary",
  Secondary: "secondary",
  Tertiary: "tertiary",
  Ghost: "ghost",
  "Premium Solid": "premium-solid",
  "Premium Soft": "premium-soft",
})
const size = figma.selectedInstance.getEnum("Size", {
  Large: "lg",
  Medium: "md",
  Small: "sm",
})
const textStyle = figma.selectedInstance.getEnum("Size", {
  Large: "sh-button-lg",
  Medium: "sh-button-md",
  Small: "sh-button-sm",
})
const state = figma.selectedInstance.getEnum("State", {
  Default: "",
  Hover: "",
  Pressed: "",
  Focus: "",
  Disabled: "",
  Loading: " is-loading",
})
const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
})
const busy = figma.selectedInstance.getEnum("State", {
  Loading: "true",
})
const spinner = figma.selectedInstance.getEnum("State", {
  Loading:
    '<span class="sh-button__spinner sh-icon" style="--icon:url(icons/line/loader-circle.svg)" aria-hidden="true"></span>',
})
const label = figma.selectedInstance.getString("Label")
const sublabel = figma.selectedInstance.getBoolean("Show sublabel", {
  true: figma.selectedInstance.getString("Sublabel"),
  false: undefined,
})
const leadingIcon = figma.selectedInstance.getBoolean("Show leading icon", {
  true: '<span class="sh-button__icon sh-icon" style="--icon:url(icons/line/arrow-left-01.svg)" aria-hidden="true"></span>',
  false: undefined,
})
const trailingIcon = figma.selectedInstance.getBoolean("Show trailing icon", {
  true: '<span class="sh-button__icon sh-icon" style="--icon:url(icons/line/arrow-right-01.svg)" aria-hidden="true"></span>',
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
if (state && state.type !== "ERROR") {
  __props["state"] = state
}
if (disabled && disabled.type !== "ERROR") {
  __props["disabled"] = disabled
}
if (busy && busy.type !== "ERROR") {
  __props["busy"] = busy
}
if (spinner && spinner.type !== "ERROR") {
  __props["spinner"] = spinner
}
if (label && label.type !== "ERROR") {
  __props["label"] = label
}
if (sublabel && sublabel.type !== "ERROR") {
  __props["sublabel"] = sublabel
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
<link rel="stylesheet" href="components/sh-button/web/sh-button.css">

<!-- Swap the icon URLs for the icons the design uses (icons/<type>/<name>.svg). Add sh-button--fill to stretch. -->
<button class="sh-button sh-button--${_fcc_renderHtmlValue(
    type,
  )} sh-button--${_fcc_renderHtmlValue(size)}${_fcc_renderHtmlValue(
    state,
  )}" type="button" ${_fcc_renderHtmlAttribute(
    "disabled",
    disabled,
  )} ${_fcc_renderHtmlAttribute("aria-busy", busy)}>
  ${_fcc_renderHtmlValue(leadingIcon)}
  <span class="sh-button__text">
    <span class="sh-button__label ${_fcc_renderHtmlValue(
      textStyle,
    )}">${_fcc_renderHtmlValue(label)}</span>
    <span class="sh-button__sublabel sh-support-meta">${_fcc_renderHtmlValue(
      sublabel,
    )}</span>
  </span>
  ${_fcc_renderHtmlValue(trailingIcon)}
  ${_fcc_renderHtmlValue(spinner)}
</button>`,
}
