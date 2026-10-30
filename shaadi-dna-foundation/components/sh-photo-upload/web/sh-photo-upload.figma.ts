// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2719-42897
// component=sh-photo-upload
// Code Connect template · sh-photo-upload → HTML/CSS
// Every variant: sh-photo-upload.html · styles: sh-photo-upload.css (needs tokens.css, sh-typo.css, sh-icon.css,
// sh-spinner.css, sh-icon-button.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Uploading and Done show the member's own photo: replace member-photo.jpg. Picking, uploading, retrying and
// removing are the app's job; this file only draws each state.

import figma from "figma"

const state = figma.selectedInstance.getEnum("State", {
  Empty: "empty",
  Uploading: "uploading",
  Error: "error",
  Done: "done",
})

const slot =
  state === "uploading"
    ? `<div class="sh-photo-upload sh-photo-upload--uploading" role="status" aria-busy="true">
  <img class="sh-photo-upload__image" src="member-photo.jpg" alt="">
  <span class="sh-spinner sh-spinner--inverse" aria-hidden="true"><span class="sh-icon sh-spinner__icon" style="--icon:url(icons/line/loader-circle.svg)"></span></span>
  <span class="sh-photo-upload__label sh-support-label">Uploading</span>
</div>`
    : state === "error"
      ? `<button class="sh-photo-upload sh-photo-upload--error" type="button" aria-label="Upload failed. Retry">
  <span class="sh-photo-upload__icon sh-icon sh-icon--24" style="--icon:url(icons/line/refresh.svg)" aria-hidden="true"></span>
  <span class="sh-photo-upload__label sh-support-label">Retry</span>
</button>`
      : state === "done"
        ? `<div class="sh-photo-upload sh-photo-upload--done">
  <img class="sh-photo-upload__image" src="member-photo.jpg" alt="Your photo">
  <button class="sh-photo-upload__remove sh-icon-button sh-icon-button--translucent sh-icon-button--sm" type="button" aria-label="Remove photo">
    <span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/close.svg)" aria-hidden="true"></span>
  </button>
</div>`
        : `<label class="sh-photo-upload">
  <input class="sh-photo-upload__input" type="file" accept="image/*" aria-label="Add photo">
  <span class="sh-photo-upload__icon sh-icon sh-icon--24" style="--icon:url(icons/line/plus-circle.svg)" aria-hidden="true"></span>
  <span class="sh-photo-upload__label sh-support-label">Add photo</span>
</label>`

export default {
  id: "sh-photo-upload",
  example: figma.code`<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-spinner/web/sh-spinner.css">
<link rel="stylesheet" href="components/sh-icon-button/web/sh-icon-button.css">
<link rel="stylesheet" href="components/sh-photo-upload/web/sh-photo-upload.css">

${slot}`,
}
