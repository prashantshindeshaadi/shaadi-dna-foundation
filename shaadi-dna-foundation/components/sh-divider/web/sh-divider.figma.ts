// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=594-31711
// Code Connect template · sh-divider → HTML/CSS
// Every variant rendered: sh-divider.html · styles: sh-divider.css (needs tokens.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)

import figma from "figma"

const type = figma.selectedInstance.getEnum("Type", {
  Soft: "soft",
  Default: "default",
  Strong: "strong",
})
const orientation = figma.selectedInstance.getEnum("Orientation", {
  Horizontal: "",
  Vertical: " sh-divider--vertical",
})
const role = figma.selectedInstance.getEnum("Orientation", {
  Horizontal: undefined,
  Vertical: "separator",
})
const ariaOrientation = figma.selectedInstance.getEnum("Orientation", {
  Horizontal: undefined,
  Vertical: "vertical",
})
const __props: Record<string, unknown> = {}
if (type && type.type !== "ERROR") {
  __props["type"] = type
}
if (orientation && orientation.type !== "ERROR") {
  __props["orientation"] = orientation
}
if (role && role.type !== "ERROR") {
  __props["role"] = role
}
if (ariaOrientation && ariaOrientation.type !== "ERROR") {
  __props["ariaOrientation"] = ariaOrientation
}

export default {
  id: "TODO",
  example: figma.code`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="components/sh-divider/web/sh-divider.css">

<!-- Horizontal fills the width (an <hr> works too); Vertical fills the height of its row. -->
<div class="sh-divider sh-divider--${_fcc_renderHtmlValue(
    type,
  )}${_fcc_renderHtmlValue(orientation)}" ${_fcc_renderHtmlAttribute(
    "role",
    role,
  )} ${_fcc_renderHtmlAttribute("aria-orientation", ariaOrientation)}></div>`,
}
