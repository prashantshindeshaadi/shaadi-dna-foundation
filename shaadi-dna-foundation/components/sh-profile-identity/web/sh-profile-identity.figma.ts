// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=3698-79779
// component=sh-profile-identity
// Code Connect template · sh-profile-identity → HTML/CSS
// Every variant: sh-profile-identity.html · styles: sh-profile-identity.css (needs tokens.css, sh-typo.css,
// sh-user-images.css, sh-avatar.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The photo is the nested sh-avatar (lg, Image): put the member's photo in the <img>.

import figma from "figma"

const name = figma.selectedInstance.getString("Name")
const subtitle = figma.selectedInstance.getString("Subtitle")
const showSubtitle = figma.selectedInstance.getBoolean("Show subtitle")

const subtitleHtml = showSubtitle
  ? `\n    <p class="sh-profile-identity__subtitle sh-body-md">${subtitle}</p>`
  : ""

export default {
  id: "sh-profile-identity",
  example: figma.code`<div class="sh-profile-identity">
  <span class="sh-avatar sh-avatar--lg sh-avatar--image" aria-hidden="true">
    <span class="sh-avatar__media"><span class="sh-user-image"><img src="member.jpg" alt=""></span></span>
  </span>
  <div class="sh-profile-identity__text">
    <p class="sh-profile-identity__name sh-heading-sm">${name}</p>${subtitleHtml}
  </div>
</div>`,
}
