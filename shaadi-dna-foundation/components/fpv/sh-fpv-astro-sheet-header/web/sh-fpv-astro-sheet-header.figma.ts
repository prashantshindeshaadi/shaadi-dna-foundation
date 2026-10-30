// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2891-64071
// component=sh-fpv-astro-sheet-header
// Code Connect template · sh-fpv-astro-sheet-header → HTML/CSS
// Every variant: sh-fpv-astro-sheet-header.html · styles: sh-icon-button.css + sh-fpv-astro-sheet-header.css
// (needs tokens.css, sh-typo.css, sh-icon.css; sh-avatar-placeholder.css for a member with no photo)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// State North = Guna score of 36, South = Porutham score of 10, Ask = no score yet. Fill the photos, her name and
// the score from the match.

import figma from "figma"

const disclaimer = '<p class="sh-fpv-astro-sheet-header__disclaimer sh-body-sm">Based on the birth details you and Ananya shared</p>'
const score = (p: string, t: string) =>
  `<p class="sh-fpv-astro-sheet-header__score" aria-label="${p} out of ${t}"><span class="sh-fpv-astro-sheet-header__points sh-heading-md">${p}</span><span class="sh-fpv-astro-sheet-header__total sh-title-lg">/${t}</span></p>${disclaimer}`

const mod = figma.selectedInstance.getEnum("State", {
  North: "",
  Ask: " sh-fpv-astro-sheet-header--ask",
  South: " sh-fpv-astro-sheet-header--south",
})
const scoreCode = figma.selectedInstance.getEnum("State", {
  North: score("28", "36"),
  Ask: "",
  South: score("7", "10"),
})

export default {
  id: "sh-fpv-astro-sheet-header",
  example: figma.code`<header class="sh-fpv-astro-sheet-header${mod}"><div class="sh-fpv-astro-sheet-header__row"><div class="sh-fpv-astro-sheet-header__lead"><span class="sh-fpv-astro-sheet-header__avatars" aria-hidden="true"><span class="sh-fpv-astro-sheet-header__avatar"><img src="viewer.jpg" alt=""></span><span class="sh-fpv-astro-sheet-header__avatar"><img src="her.jpg" alt=""></span></span><h2 class="sh-fpv-astro-sheet-header__title sh-title-lg">Your Compatibility with Ananya N</h2></div><button class="sh-fpv-astro-sheet-header__close sh-icon-button sh-icon-button--tertiary sh-icon-button--sm" type="button" aria-label="Close"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/close.svg)" aria-hidden="true"></span></button></div>${scoreCode}</header>`,
}
