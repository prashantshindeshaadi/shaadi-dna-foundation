// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2825-43215
// Code Connect template · sh-info-detail → HTML/CSS
// Every variant + the row helper: sh-info-detail.html · styles: sh-info-detail.css (needs tokens.css, sh-typo.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
//
// Facts line up in <p class="sh-info-detail-row"> (add sh-info-detail-row--sm for Size Small);
// turn the separator off on the last fact of each row.

import figma from "figma"

const label = figma.selectedInstance.getString("Label")
const mode = figma.selectedInstance.getEnum("Mode", {
  "On image": "on-image",
  Default: "default",
})
const size = figma.selectedInstance.getEnum("Size", {
  Medium: "md",
  Small: "sm",
})
const labelStyle = figma.selectedInstance.getEnum("Size", {
  Medium: "sh-body-md",
  Small: "sh-body-sm-tight",
})
const separator = figma.selectedInstance.getBoolean("Show separator", {
  true: '<span class="sh-info-detail__separator" aria-hidden="true"></span>',
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
if (labelStyle && labelStyle.type !== "ERROR") {
  __props["labelStyle"] = labelStyle
}
if (separator && separator.type !== "ERROR") {
  __props["separator"] = separator
}

export default {
  id: "TODO",
  example: figma.code`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/profile-card/sh-info-detail/web/sh-info-detail.css">

<span class="sh-info-detail sh-info-detail--${_fcc_renderHtmlValue(
    mode,
  )} sh-info-detail--${_fcc_renderHtmlValue(
    size,
  )}"><span class="sh-info-detail__label ${_fcc_renderHtmlValue(
    labelStyle,
  )}">${_fcc_renderHtmlValue(label)}</span>${_fcc_renderHtmlValue(
    separator,
  )}</span>`,
}
