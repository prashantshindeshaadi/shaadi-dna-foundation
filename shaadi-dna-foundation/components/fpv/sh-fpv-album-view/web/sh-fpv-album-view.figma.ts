// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-20019
// component=sh-fpv-album-view
// Code Connect template · sh-fpv-album-view → HTML/CSS
// Every variant: sh-fpv-album-view.html · styles: sh-status-bar.css + sh-icon-button.css + sh-button.css +
// sh-user-images.css + sh-photo-wrapper.css + sh-fpv-album-view.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Zoom further: app code sets --sh-fpv-album-view-zoom to the pinch scale. One __thumb per photo; the current one
// is aria-selected. The status bar is for mock-ups only.

import figma from "figma"

const kase = figma.selectedInstance.getEnum("Case", {
  Fullscreen: "",
  "Zoom further": " sh-fpv-album-view--zoom",
})

export default {
  id: "sh-fpv-album-view",
  example: figma.code`<section class="sh-fpv-album-view${kase}" role="dialog" aria-modal="true" aria-label="Meher's photos">
  <header class="sh-fpv-album-view__header">
    <button class="sh-icon-button sh-icon-button--translucent sh-icon-button--lg" type="button" aria-label="Close"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/close.svg)" aria-hidden="true"></span></button>
    <p class="sh-fpv-album-view__counter sh-button-md" aria-live="polite">3 of 10</p>
    <button class="sh-icon-button sh-icon-button--translucent sh-icon-button--md" type="button" aria-label="More options"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/more-vertical.svg)" aria-hidden="true"></span></button>
  </header>
  <div class="sh-fpv-album-view__stage">
    <div class="sh-fpv-album-view__photo sh-photo-wrapper"><div class="sh-photo-wrapper__image sh-user-image"><img src="photo-3.jpg" alt="Photo 3 of 10"></div></div>
  </div>
  <div class="sh-fpv-album-view__thumbs" role="tablist" aria-label="Photos">
    <button class="sh-fpv-album-view__thumb sh-user-image" type="button" role="tab" aria-selected="false" aria-label="Photo 2"><img src="photo-2.jpg" alt=""></button>
    <button class="sh-fpv-album-view__thumb sh-user-image" type="button" role="tab" aria-selected="true" aria-label="Photo 3"><img src="photo-3.jpg" alt=""></button>
    <button class="sh-fpv-album-view__thumb sh-user-image" type="button" role="tab" aria-selected="false" aria-label="Photo 4"><img src="photo-4.jpg" alt=""></button>
  </div>
  <div class="sh-fpv-album-view__connect">
    <button class="sh-button sh-button--primary sh-button--lg" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-lg">Connect Now</span></span></button>
  </div>
</section>`,
}
