// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-19389
// component=sh-fpv-photo-area
// Code Connect template · sh-fpv-photo-area → HTML/CSS
// Every variant: sh-fpv-photo-area.html · styles: sh-button.css + sh-user-images.css + sh-overlay.css +
// sh-photo-wrapper.css + sh-carousel-dots.css + sh-fpv-carousel-dot.css + sh-fpv-carousel-dots.css + sh-fpv-photo-area.css
// (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Visible: app code samples the colour at the top of the photo shown and sets --sh-fpv-photo-area-sample.
// Dots: one per photo, only when the album is visible and she has more than one photo.
// No photo / Photo requested: pick the silhouette matching her (female.svg / male.svg).

import figma from "figma"

const showDots = figma.selectedInstance.getBoolean("Carousel dots · only when the album is visible and she has more than one photo")
const gate = figma.selectedInstance.getEnum("Gate", {
  Visible: "visible",
  "Accept gated": "accept",
  "Upgrade gated": "upgrade",
  "Tit for tat": "tit-for-tat",
  "No photo": "no-photo",
  "Photo requested": "photo-requested",
})

const dots = showDots
  ? '\n  <div class="sh-fpv-photo-area__dots sh-carousel-dots sh-fpv-carousel-dots" role="img" aria-label="Photo 1 of 3"><span class="sh-carousel-dots__dot sh-carousel-dots__dot--selected sh-fpv-carousel-dot"></span><span class="sh-carousel-dots__dot sh-fpv-carousel-dot"></span><span class="sh-carousel-dots__dot sh-fpv-carousel-dot"></span></div>'
  : ""

const lock = (message: string, button: string) =>
  `<div class="sh-fpv-photo-area">
  <div class="sh-fpv-photo-area__photo sh-photo-wrapper">
    <div class="sh-photo-wrapper__image sh-user-image" aria-hidden="true"><img src="photo-1.jpg" alt=""></div>
    <div class="sh-overlay sh-overlay--photo-full sh-overlay--message">
      <div class="sh-overlay__content">
        <span class="sh-overlay__icon sh-icon sh-icon--40" style="--icon:url(icons/filled/photo-locked.svg)" aria-hidden="true"></span>
        <p class="sh-overlay__text sh-fpv-photo-area__message sh-body-lg">${message}</p>
      </div>
      ${button}
    </div>
  </div>
</div>`

const tertiary = (label: string, icon: string) =>
  `<button class="sh-overlay__action sh-button sh-button--tertiary sh-button--md" type="button">${icon ? `<span class="sh-button__icon sh-icon" style="--icon:url(icons/${icon}.svg)" aria-hidden="true"></span>` : ""}<span class="sh-button__text"><span class="sh-button__label sh-button-md">${label}</span></span></button>`

const empty = (type: string, title: string, after: string) =>
  `<div class="sh-fpv-photo-area">
  <div class="sh-fpv-photo-area__photo sh-photo-wrapper">
    <div class="sh-overlay sh-overlay--photo-full sh-overlay--${type}">
      <div class="sh-overlay__background" aria-hidden="true"></div>
      <div class="sh-overlay__content">
        <img class="sh-overlay__illustration" src="components/profile-card/sh-avatar-silhouette/assets/female.svg" alt="">
        <p class="sh-overlay__text sh-title-lg">${title}</p>
      </div>
      ${after}
    </div>
  </div>
</div>`

const html = {
  visible: `<div class="sh-fpv-photo-area" style="--sh-fpv-photo-area-sample: /* sampled colour */">
  <div class="sh-fpv-photo-area__photo sh-photo-wrapper">
    <div class="sh-photo-wrapper__image sh-user-image"><img src="photo-1.jpg" alt="Meher, photo 1 of 3"></div>
  </div>
  <div class="sh-fpv-photo-area__top-scrim" aria-hidden="true"></div>${dots}
</div>`,
  accept: lock("Meher shows her photos only to members she likes", tertiary("Connect Now", "filled/check")),
  upgrade: lock("Meher shows her photos to Premium members she likes", tertiary("Upgrade Now", "")),
  "tit-for-tat": lock("Add your photo to see Meher’s photos", tertiary("Upload Now", "line/upload")),
  "no-photo": empty("no-photo", "No Photo added yet", tertiary("Request a Photo", "")),
  "photo-requested": empty(
    "photo-requested",
    "Photo request sent",
    '<span class="sh-overlay__status sh-button-sm"><span class="sh-icon sh-icon--16" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span>Photo Requested</span>',
  ),
}[gate]

export default {
  id: "sh-fpv-photo-area",
  example: figma.code`${html}`,
}
