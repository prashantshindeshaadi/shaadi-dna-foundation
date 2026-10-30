// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2780-68360
// component=sh-mini-card
// Code Connect template · sh-mini-card → HTML/CSS
// Every variant: sh-mini-card.html · styles: sh-mini-card.css (needs tokens.css, sh-typo.css, sh-icon.css,
// sh-user-images.css, sh-avatar-placeholder.css, sh-avatar.css, sh-info-detail.css, sh-button.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
//
// Badge 1 / Badge 2 swaps: verified-badge ↔ premium-badge — swap the <img> src and alt.
// Details: every fact has a separator except the last one shown; drop the separator of the new last fact
// when Show detail 3 (or 2 and 3) is off. The action is sh-button Primary Small, full width.

import figma from "figma"

const typeClass = figma.selectedInstance.getEnum("Type", {
  Default: "",
  "No photo female": " sh-mini-card--no-photo",
  "No photo male": " sh-mini-card--no-photo",
})
const avatar = figma.selectedInstance.getEnum("Type", {
  Default:
    '<span class="sh-avatar sh-avatar--lg sh-avatar--image sh-mini-card__avatar" aria-hidden="true"><span class="sh-avatar__media"><span class="sh-user-image"><img src="member.jpg" alt=""></span></span></span>',
  "No photo female":
    '<span class="sh-avatar sh-avatar--lg sh-mini-card__avatar" aria-hidden="true"><span class="sh-avatar__media"><span class="sh-avatar-placeholder sh-avatar-placeholder--1x1"><img class="sh-avatar-placeholder__silhouette" src="components/profile-card/sh-avatar-silhouette/assets/female.svg" alt=""></span></span></span>',
  "No photo male":
    '<span class="sh-avatar sh-avatar--lg sh-mini-card__avatar" aria-hidden="true"><span class="sh-avatar__media"><span class="sh-avatar-placeholder sh-avatar-placeholder--1x1"><img class="sh-avatar-placeholder__silhouette" src="components/profile-card/sh-avatar-silhouette/assets/male.svg" alt=""></span></span></span>',
})
const name = figma.selectedInstance.getString("Name")
const badge1 = figma.selectedInstance.getBoolean("Show badge 1", {
  true: '<img class="sh-badge sh-badge--16" src="icons/misc/verified-badge.svg" alt="Verified">',
  false: undefined,
})
const badge2 = figma.selectedInstance.getBoolean("Show badge 2", {
  true: '<img class="sh-badge sh-badge--16" src="icons/misc/premium-badge.svg" alt="Premium">',
  false: undefined,
})
const detail1 = figma.selectedInstance.getBoolean("Show detail 1", {
  true: '<span class="sh-info-detail sh-info-detail--default sh-info-detail--sm"><span class="sh-info-detail__label sh-body-sm-tight">5’6”</span><span class="sh-info-detail__separator" aria-hidden="true"></span></span>',
  false: undefined,
})
const detail2 = figma.selectedInstance.getBoolean("Show detail 2", {
  true: '<span class="sh-info-detail sh-info-detail--default sh-info-detail--sm"><span class="sh-info-detail__label sh-body-sm-tight">Kayastha</span><span class="sh-info-detail__separator" aria-hidden="true"></span></span>',
  false: undefined,
})
const detail3 = figma.selectedInstance.getBoolean("Show detail 3", {
  true: '<span class="sh-info-detail sh-info-detail--default sh-info-detail--sm"><span class="sh-info-detail__label sh-body-sm-tight">Pune, MH</span></span>',
  false: undefined,
})
const __props: Record<string, unknown> = {}
if (typeClass && typeClass.type !== "ERROR") {
  __props["typeClass"] = typeClass
}
if (avatar && avatar.type !== "ERROR") {
  __props["avatar"] = avatar
}
if (name && name.type !== "ERROR") {
  __props["name"] = name
}
if (badge1 && badge1.type !== "ERROR") {
  __props["badge1"] = badge1
}
if (badge2 && badge2.type !== "ERROR") {
  __props["badge2"] = badge2
}
if (detail1 && detail1.type !== "ERROR") {
  __props["detail1"] = detail1
}
if (detail2 && detail2.type !== "ERROR") {
  __props["detail2"] = detail2
}
if (detail3 && detail3.type !== "ERROR") {
  __props["detail3"] = detail3
}

export default {
  id: "TODO",
  example: figma.code`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/profile-card/sh-user-images/web/sh-user-images.css">
<link rel="stylesheet" href="components/profile-card/sh-avatar-placeholder/web/sh-avatar-placeholder.css">
<link rel="stylesheet" href="components/sh-avatar/web/sh-avatar.css">
<link rel="stylesheet" href="components/profile-card/sh-info-detail/web/sh-info-detail.css">
<link rel="stylesheet" href="components/sh-button/web/sh-button.css">
<link rel="stylesheet" href="components/profile-card/sh-mini-card/web/sh-mini-card.css">

<article class="sh-mini-card${_fcc_renderHtmlValue(typeClass)}">
  ${_fcc_renderHtmlValue(avatar)}
  <div class="sh-mini-card__info">
    <p class="sh-mini-card__name-row">
      <span class="sh-mini-card__name sh-title-sm">${_fcc_renderHtmlValue(
        name,
      )}</span>
      <span class="sh-mini-card__badges">${_fcc_renderHtmlValue(
        badge1,
      )}${_fcc_renderHtmlValue(badge2)}</span>
    </p>
    <p class="sh-mini-card__details">${_fcc_renderHtmlValue(
      detail1,
    )}${_fcc_renderHtmlValue(detail2)}${_fcc_renderHtmlValue(detail3)}</p>
  </div>
  <button class="sh-button sh-button--primary sh-button--sm sh-button--fill sh-mini-card__action" type="button">
    <span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span>
    <span class="sh-button__text"><span class="sh-button__label sh-button-sm">Connect Now</span></span>
  </button>
</article>`,
}
