// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2814-41977
// component=sh-tag-fpv
// Code Connect template · sh-tag-fpv → HTML/CSS
// Every variant: sh-tag-fpv.html · styles: sh-tag.css + sh-tag-fpv.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Each type is an sh-tag Strong / Small / Rounded with a fixed icon and label.

import figma from "figma"

const tag = figma.selectedInstance.getEnum("Type", {
  "Active Now":
    '<span class="sh-tag sh-tag--strong sh-tag--sm sh-tag-fpv sh-tag-fpv--active-now"><img class="sh-icon sh-icon--12 sh-tag__icon" src="icons/tag/online.svg" alt=""><span class="sh-tag__label sh-support-label">Active Now</span></span>',
  Promoted:
    '<span class="sh-tag sh-tag--strong sh-tag--sm sh-tag-fpv sh-tag-fpv--promoted"><span class="sh-icon sh-icon--12 sh-tag__icon" style="--icon:url(icons/filled/megaphone-02.svg)" aria-hidden="true"></span><span class="sh-tag__label sh-support-label">Promoted</span></span>',
})

export default {
  id: "sh-tag-fpv",
  example: figma.code`${tag}`,
}
