// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2710-24413
// component=sh-avatar-stack
// Code Connect template · sh-avatar-stack → HTML/CSS
// Every variant: sh-avatar-stack.html · styles: sh-avatar-stack.css (needs tokens.css, sh-typo.css, sh-user-images.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The three photos are image fills in Figma (not properties): pass the members' photos to the <img> tags.
// With the label hidden, the root takes role="img" and the label as its aria-label.

import figma from "figma"

const label = figma.selectedInstance.getString("Label")
const showLabel = figma.selectedInstance.getBoolean("Show label")

const avatar = '<span class="sh-avatar-stack__avatar"><span class="sh-user-image"><img src="member.jpg" alt=""></span></span>'
const avatars = `<span class="sh-avatar-stack__avatars" aria-hidden="true">${avatar}${avatar}${avatar}</span>`

export default {
  id: "sh-avatar-stack",
  example: showLabel
    ? figma.code`<div class="sh-avatar-stack">${avatars}<span class="sh-avatar-stack__label sh-body-sm">${label}</span></div>`
    : figma.code`<div class="sh-avatar-stack" role="img" aria-label="${label}">${avatars}</div>`,
}
