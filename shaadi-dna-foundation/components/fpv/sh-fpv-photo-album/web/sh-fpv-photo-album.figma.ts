// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-19803
// component=sh-fpv-photo-album
// Code Connect template · sh-fpv-photo-album → HTML/CSS
// Every variant: sh-fpv-photo-album.html · styles: sh-button.css + sh-fpv-asset-premium-badge.css +
// sh-fpv-section-title.css + sh-user-images.css + sh-fpv-photo-album-stack.css + sh-overlay.css + sh-fpv-photo-album.css
// (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Overflow = photos not already shown on the profile; 4+ shows "+N" (N = that count − 4). Drop the section at 0.
// Visible: the stack opens sh-fpv-album-view. Gated: the stack sits under the content lock with the gate's button.

import figma from "figma"

const gate = figma.selectedInstance.getEnum("Gate", {
  Visible: "visible",
  "Accept gated": "accept",
  "Upgrade gated": "upgrade",
  "Tit for tat": "tit-for-tat",
})
const overflow = figma.selectedInstance.getEnum("Overflow", {
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "4+": "4+",
})

const n = { "1": 1, "2": 2, "3": 3, "4": 4, "4+": 4 }[overflow]
const stackMod = {
  "1": "",
  "2": " sh-fpv-photo-album-stack--2",
  "3": " sh-fpv-photo-album-stack--3",
  "4": " sh-fpv-photo-album-stack--4",
  "4+": " sh-fpv-photo-album-stack--4-plus",
}[overflow]
const counter =
  overflow === "4+"
    ? '<span class="sh-fpv-photo-album-stack__counter"><span class="sh-fpv-photo-album-stack__count sh-heading-md">+4</span><span class="sh-fpv-photo-album-stack__count-label sh-title-sm">photos</span></span>'
    : ""
let photos = ""
for (let i = n; i >= 1; i--) {
  photos += `<div class="sh-fpv-photo-album-stack__photo sh-user-image"><img src="photo-${i}.jpg" alt="">${i === 1 ? counter : ""}</div>`
}
const hidden = gate === "visible" ? "" : ' aria-hidden="true"'
const stack = `<div class="sh-fpv-photo-album-stack${stackMod}"${hidden}><div class="sh-fpv-photo-album-stack__frame">${photos}</div></div>`

const lock = {
  visible: ["", ""],
  accept: [
    "Meher shows her album only to members she likes.",
    '<button class="sh-button sh-button--tertiary sh-button--md" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Connect Now</span></span></button>',
  ],
  upgrade: [
    "Meher shows her album to members she likes who are Premium.",
    '<button class="sh-button sh-button--premium-soft sh-button--md" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Upgrade Now</span></span></button>',
  ],
  "tit-for-tat": [
    "Add your photo to see Meher’s album.",
    '<button class="sh-button sh-button--tertiary sh-button--md" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/line/upload.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Upload Now</span></span></button>',
  ],
}[gate]

const body =
  gate === "visible"
    ? `<button class="sh-fpv-photo-album__open" type="button" aria-label="View album">${stack}</button>`
    : `<div class="sh-fpv-photo-album__locked">${stack}
    <div class="sh-overlay sh-overlay--content sh-overlay--message">
      <div class="sh-overlay__content"><img class="sh-fpv-photo-album__art" src="icons/pictogram/locked-photo@2x.png" alt=""><p class="sh-overlay__text sh-body-lg">${lock[0]}</p></div>
      ${lock[1]}
    </div>
  </div>`

export default {
  id: "sh-fpv-photo-album",
  example: figma.code`<section class="sh-fpv-photo-album" aria-labelledby="album-title">
  <div class="sh-fpv-photo-album__title sh-fpv-section-title">
    <div class="sh-fpv-section-title__top"><div class="sh-fpv-section-title__title-group"><div class="sh-fpv-section-title__title-row"><h2 class="sh-fpv-section-title__title sh-heading-sm" id="album-title">Photo Album</h2></div></div></div>
    <p class="sh-fpv-section-title__subtitle sh-body-md">Meher has added 8 more photos.</p>
  </div>
  ${body}
</section>`,
}
