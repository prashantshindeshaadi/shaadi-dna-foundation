// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2644-42085
// Code Connect template · sh-avatar-glyph → HTML/CSS
// Every variant: sh-avatar-glyph.html · styles: sh-avatar-glyph.css (needs tokens.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
//
// Paint is icon/primary; set --sh-icon-paint to repaint (sh-avatar uses icon/secondary).

import figma from "figma"

const gender = figma.selectedInstance.getEnum("Gender", {
  Male: "male",
  Female: "female",
})
const size = figma.selectedInstance.getEnum("Size", {
  "16": "16",
  "24": "24",
  "40": "40",
})
const __props: Record<string, unknown> = {}
if (gender && gender.type !== "ERROR") {
  __props["gender"] = gender
}
if (size && size.type !== "ERROR") {
  __props["size"] = size
}

export default {
  id: "TODO",
  example: figma.code`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="components/sh-avatar-glyph/web/sh-avatar-glyph.css">

<span class="sh-avatar-glyph sh-avatar-glyph--${_fcc_renderHtmlValue(
    gender,
  )} sh-avatar-glyph--${_fcc_renderHtmlValue(
    size,
  )}" aria-hidden="true"></span>`,
}
