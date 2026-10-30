// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=3598-69346
// component=sh-avatar-silhouette
// Code Connect template · sh-avatar-silhouette → HTML/CSS
// Every variant: sh-avatar-silhouette.html · styles: sh-avatar-silhouette.css (needs tokens.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// White art on transparent: place it over the sh-gradient/placeholder background (sh-avatar-placeholder).

import figma from "figma"

const gender = figma.selectedInstance.getEnum("Gender", {
  Female: "",
  Male: " sh-avatar-silhouette--male",
})

export default {
  id: "sh-avatar-silhouette",
  example: figma.code`<span class="sh-avatar-silhouette${gender}" aria-hidden="true"></span>`,
}
