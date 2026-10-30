// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2530-10330
// Code Connect template · sh-photo-wrapper → HTML/CSS
// Markup: sh-photo-wrapper.html · styles: sh-photo-wrapper.css
// The photo and the overlay come from their own connections (sh-user-images, sh-overlay).
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)

import figma from "figma"

const image = figma.properties.children(["Photo image"])
const bottomScrim = figma.selectedInstance.getBoolean("Show bottom scrim", {
  true: '<div class="sh-photo-wrapper__scrim sh-photo-wrapper__scrim--bottom"></div>',
  false: undefined,
})
const topScrim = figma.selectedInstance.getBoolean("Show top scrim", {
  true: '<div class="sh-photo-wrapper__scrim sh-photo-wrapper__scrim--top"></div>',
  false: undefined,
})
const overlay = figma.selectedInstance.getBoolean("Show overlay", {
  true: figma.properties.children(["Overlay"]),
  false: undefined,
})
const __props: Record<string, unknown> = {}
if (image && image.type !== "ERROR") {
  __props["image"] = image
}
if (bottomScrim && bottomScrim.type !== "ERROR") {
  __props["bottomScrim"] = bottomScrim
}
if (topScrim && topScrim.type !== "ERROR") {
  __props["topScrim"] = topScrim
}
if (overlay && overlay.type !== "ERROR") {
  __props["overlay"] = overlay
}

export default {
  id: "TODO",
  example: figma.code`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="components/profile-card/sh-user-images/web/sh-user-images.css">
<link rel="stylesheet" href="components/sh-overlay/web/sh-overlay.css">
<link rel="stylesheet" href="components/sh-photo-wrapper/web/sh-photo-wrapper.css">

<div class="sh-photo-wrapper">
  ${_fcc_renderHtmlValue(image)}
  ${_fcc_renderHtmlValue(bottomScrim)}
  ${_fcc_renderHtmlValue(topScrim)}
  ${_fcc_renderHtmlValue(overlay)}
</div>`,
}
