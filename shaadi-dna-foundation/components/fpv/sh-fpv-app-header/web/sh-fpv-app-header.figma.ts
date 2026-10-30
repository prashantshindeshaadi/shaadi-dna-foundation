// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-15883
// component=sh-fpv-app-header
// Code Connect template · sh-fpv-app-header → HTML/CSS
// Every variant: sh-fpv-app-header.html · styles: sh-status-bar.css + sh-icon-button.css + sh-user-images.css +
// sh-fpv-app-header.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The tab for the section in view gets sh-button-md + aria-current="true"; the rest sh-body-md. The status bar is
// device chrome for mock-ups only, so it is left out here.

import figma from "figma"

const state = figma.selectedInstance.getEnum("State", {
  Onscroll: "onscroll",
  Alternate: "alternate",
})

const mod = state === "alternate" ? " sh-fpv-app-header--alternate" : ""
const middle =
  state === "alternate"
    ? '<div class="sh-fpv-app-header__middle"><div class="sh-fpv-app-header__name-row"><p class="sh-fpv-app-header__name sh-heading-sm">Meher Randhawa</p><span class="sh-fpv-app-header__marks"><img class="sh-fpv-app-header__mark" src="icons/pictogram/premium-crown@2x.png" alt="Premium member"><img class="sh-fpv-app-header__mark" src="icons/pictogram/shaadi-id@2x.png" alt="Shaadi ID verified"></span></div></div>'
    : '<div class="sh-fpv-app-header__middle"><div class="sh-fpv-app-header__photo sh-user-image"><img src="photo-1.jpg" alt=""></div></div>'

export default {
  id: "sh-fpv-app-header",
  example: figma.code`<header class="sh-fpv-app-header${mod}">
  <div class="sh-fpv-app-header__bar">
    <button class="sh-icon-button sh-icon-button--tertiary sh-icon-button--lg" type="button" aria-label="Go back"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/back.svg)" aria-hidden="true"></span></button>
    ${middle}
    <div class="sh-fpv-app-header__actions">
      <button class="sh-icon-button sh-icon-button--tertiary sh-icon-button--sm" type="button" aria-label="View 8 photos"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/filled/image.svg)" aria-hidden="true"></span><span class="sh-icon-button__badge sh-body-sm">8</span></button>
      <button class="sh-icon-button sh-icon-button--tertiary sh-icon-button--sm" type="button" aria-label="More options"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/more-vertical.svg)" aria-hidden="true"></span></button>
    </div>
  </div>
  <nav class="sh-fpv-app-header__tabs" aria-label="Profile sections">
    <a class="sh-fpv-app-header__tab sh-button-md" href="#about" aria-current="true">About</a>
    <a class="sh-fpv-app-header__tab sh-body-md" href="#contact">Contact</a>
    <a class="sh-fpv-app-header__tab sh-body-md" href="#family">Family</a>
    <a class="sh-fpv-app-header__tab sh-body-md" href="#career">Career &amp; Edu</a>
    <a class="sh-fpv-app-header__tab sh-body-md" href="#astro">Astro Compatibility</a>
  </nav>
</header>`,
}
