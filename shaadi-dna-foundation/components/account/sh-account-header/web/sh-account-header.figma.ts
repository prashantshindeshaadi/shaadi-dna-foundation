// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13717
// component=sh-account-header
// Code Connect template · sh-account-header → HTML/CSS
// Every variant: sh-account-header.html · styles: sh-account-header.css
// (needs tokens.css, sh-typo.css, sh-icon.css, sh-user-images.css, sh-avatar.css, sh-progress-ring.css, sh-tag.css, sh-chip.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The ring amount lives on the nested sh-progress-ring and the photo on the nested sh-avatar: set
// stroke-dasharray / aria-valuenow to the completion percent and put the member's photo in the <img>.

import figma from "figma"

const name = figma.selectedInstance.getString("Name")
const profileId = figma.selectedInstance.getString("Profile ID")
const completion = figma.selectedInstance.getString("Completion")
const showCompletion = figma.selectedInstance.getBoolean("Show completion")

const completionHtml = showCompletion
  ? `\n    <span class="sh-tag sh-tag--translucent-light sh-account-header__completion"><span class="sh-tag__label sh-support-label">${completion}</span></span>`
  : ""

export default {
  id: "sh-account-header",
  example: figma.code`<header class="sh-account-header">
  <div class="sh-account-header__photo">
    <div class="sh-progress-ring" role="meter" aria-label="Profile complete" aria-valuemin="0" aria-valuemax="100" aria-valuenow="45">
      <svg class="sh-progress-ring__arcs" aria-hidden="true">
        <circle class="sh-progress-ring__track"></circle>
        <circle class="sh-progress-ring__progress" pathLength="100" stroke-dasharray="45 100"></circle>
      </svg>
    </div>
    <span class="sh-avatar sh-avatar--lg sh-avatar--image" aria-hidden="true">
      <span class="sh-avatar__media"><span class="sh-user-image"><img src="me.jpg" alt=""></span></span>
    </span>${completionHtml}
  </div>
  <h1 class="sh-account-header__name sh-heading-sm">${name}</h1>
  <div class="sh-account-header__actions">
    <button class="sh-chip sh-chip--info" type="button" aria-label="Copy profile ID">
      <span class="sh-icon sh-icon--16 sh-chip__icon" style="--icon:url(icons/line/copy.svg)" aria-hidden="true"></span>
      <span class="sh-chip__content"><span class="sh-chip__label sh-body-md">${profileId}</span></span>
    </button>
    <a class="sh-chip sh-chip--info" href="/profile/edit">
      <span class="sh-icon sh-icon--16 sh-chip__icon" style="--icon:url(icons/line/edit.svg)" aria-hidden="true"></span>
      <span class="sh-chip__content"><span class="sh-chip__label sh-body-md">Edit Profile</span></span>
    </a>
  </div>
</header>`,
}
