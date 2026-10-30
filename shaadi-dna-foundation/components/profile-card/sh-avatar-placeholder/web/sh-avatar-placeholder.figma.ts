// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2239-13257
// component=sh-avatar-placeholder
// Code Connect template · sh-avatar-placeholder → HTML/CSS
// Markup for every variant: sh-avatar-placeholder.html · styles: sh-avatar-placeholder.css
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)

import figma from "figma"

const gender = figma.selectedInstance.getEnum("Gender", {
  Male: "male",
  Female: "female",
})
const modifier = figma.selectedInstance.getEnum("Aspect Ratio", {
  "4:5": "",
  "1:1": " sh-avatar-placeholder--1x1",
  Full: " sh-avatar-placeholder--full",
})
const __props: Record<string, unknown> = {}
if (gender && gender.type !== "ERROR") {
  __props["gender"] = gender
}
if (modifier && modifier.type !== "ERROR") {
  __props["modifier"] = modifier
}

export default {
  id: "TODO",
  example: figma.code`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="components/profile-card/sh-avatar-placeholder/web/sh-avatar-placeholder.css">

<span class="sh-avatar-placeholder${_fcc_renderHtmlValue(
    modifier,
  )}" role="img" aria-label="No photo">
  <img class="sh-avatar-placeholder__silhouette" src="components/profile-card/sh-avatar-silhouette/assets/${_fcc_renderHtmlValue(
    gender,
  )}.svg" alt="">
</span>`,
}
