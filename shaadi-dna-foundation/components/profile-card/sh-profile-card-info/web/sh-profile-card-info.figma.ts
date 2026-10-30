// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2496-27797
// Code Connect template · sh-profile-card-info → HTML/CSS
// Rendered combinations: sh-profile-card-info.html · styles: sh-profile-card-info.css (needs tokens.css, sh-typo.css,
// sh-icon.css, sh-tag.css, sh-tag-profile.css, sh-info-detail.css, sh-divider.css + the island's stylesheets)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
//
// Badge 2 / Badge 3 (instance swaps) are the premium and VIP badges. Detail labels aren't Figma properties:
// replace the sample facts; the last fact of each line has no separator. Actions renders the nested
// sh-action-island (its own Code Connect).

import figma from "figma"

const name = figma.selectedInstance.getString("Name")
const age = figma.selectedInstance.getString("Age")
const badge2 = figma.selectedInstance.getBoolean("Show badge 2", {
  true: '<img class="sh-badge sh-badge--20" src="icons/misc/premium-badge.svg" alt="Premium">',
  false: undefined,
})
const badge3 = figma.selectedInstance.getBoolean("Show badge 3", {
  true: '<img class="sh-badge sh-badge--20" src="icons/misc/vip-badge.svg" alt="VIP">',
  false: undefined,
})
const status = figma.selectedInstance.getBoolean("Show status", {
  true: '<span class="sh-tag sh-tag--translucent-light sh-tag--sm sh-tag--pill sh-tag-profile sh-tag-profile--online"><img class="sh-icon sh-icon--12 sh-tag__icon" src="icons/tag/online.svg" alt=""><span class="sh-tag__label sh-support-label">Online</span></span>',
  false: undefined,
})
const verified = figma.selectedInstance.getBoolean("Verified", {
  true: '<img class="sh-badge sh-badge--20" src="icons/misc/verified-badge.svg" alt="Verified">',
  false: undefined,
})
const detail1 = figma.selectedInstance.getBoolean("Show detail 1", {
  true: '<span class="sh-info-detail sh-info-detail--on-image sh-info-detail--md"><span class="sh-info-detail__label sh-body-md">5′ 6″</span><span class="sh-info-detail__separator" aria-hidden="true"></span></span>',
  false: undefined,
})
const detail2 = figma.selectedInstance.getBoolean("Show detail 2", {
  true: '<span class="sh-info-detail sh-info-detail--on-image sh-info-detail--md"><span class="sh-info-detail__label sh-body-md">Kashmiri Pandit</span></span>',
  false: undefined,
})
const detail3 = figma.selectedInstance.getBoolean("Show detail 3", {
  true: '<span class="sh-info-detail sh-info-detail--on-image sh-info-detail--md"><span class="sh-info-detail__label sh-body-md">Pimpri-Chinchwad</span><span class="sh-info-detail__separator" aria-hidden="true"></span></span>',
  false: undefined,
})
const detail4 = figma.selectedInstance.getBoolean("Show detail 4", {
  true: '<span class="sh-info-detail sh-info-detail--on-image sh-info-detail--md"><span class="sh-info-detail__label sh-body-md">Software Developer</span></span>',
  false: undefined,
})
const tags = figma.selectedInstance.getBoolean("Show tags", {
  true: '<div class="sh-profile-card-info__tags">\n    <span class="sh-tag sh-tag--translucent-light sh-tag--sm sh-tag--no-border sh-tag-profile sh-tag-profile--you-and-her"><span class="sh-tag__icon sh-icon sh-icon--12 sh-icon--brand" style="--icon:url(icons/line/link-rings.svg)" aria-hidden="true"></span><span class="sh-tag__label sh-support-label">You &amp; Her</span></span>\n    <span class="sh-tag sh-tag--translucent-light sh-tag--sm sh-tag--no-border sh-tag-profile sh-tag-profile--astro"><span class="sh-tag__icon sh-icon sh-icon--12 sh-icon--premium" style="--icon:url(icons/line/astro.svg)" aria-hidden="true"></span><span class="sh-tag__label sh-support-label">Astro</span></span>\n  </div>',
  false: undefined,
})
const actions = figma.properties.children(["Actions"])
const __props: Record<string, unknown> = {}
if (name && name.type !== "ERROR") {
  __props["name"] = name
}
if (age && age.type !== "ERROR") {
  __props["age"] = age
}
if (badge2 && badge2.type !== "ERROR") {
  __props["badge2"] = badge2
}
if (badge3 && badge3.type !== "ERROR") {
  __props["badge3"] = badge3
}
if (status && status.type !== "ERROR") {
  __props["status"] = status
}
if (verified && verified.type !== "ERROR") {
  __props["verified"] = verified
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
if (detail4 && detail4.type !== "ERROR") {
  __props["detail4"] = detail4
}
if (tags && tags.type !== "ERROR") {
  __props["tags"] = tags
}
if (actions && actions.type !== "ERROR") {
  __props["actions"] = actions
}

export default {
  id: "TODO",
  example: figma.code`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-tag/web/sh-tag.css">
<link rel="stylesheet" href="components/profile-card/sh-tag-profile/web/sh-tag-profile.css">
<link rel="stylesheet" href="components/profile-card/sh-info-detail/web/sh-info-detail.css">
<link rel="stylesheet" href="components/sh-divider/web/sh-divider.css">
<!-- + the stylesheets sh-action-island lists -->
<link rel="stylesheet" href="components/profile-card/sh-profile-card-info/web/sh-profile-card-info.css">

<section class="sh-profile-card-info" ${_fcc_renderHtmlAttribute(
    "aria-label",
    name,
  )}, ${_fcc_renderHtmlValue(age)}">
  <div class="sh-profile-card-info__content">
    <div class="sh-profile-card-info__name-row">
      <div class="sh-profile-card-info__name-group">
        <h3 class="sh-profile-card-info__title">
          <span class="sh-profile-card-info__name sh-heading-sm">${_fcc_renderHtmlValue(
            name,
          )}</span>
          <span class="sh-profile-card-info__age sh-heading-sm">${_fcc_renderHtmlValue(
            age,
          )}</span>
        </h3>
        ${_fcc_renderHtmlValue(badge2)}${_fcc_renderHtmlValue(
    badge3,
  )}${_fcc_renderHtmlValue(status)}
      </div>
      <span class="sh-profile-card-info__spacer"></span>
      ${_fcc_renderHtmlValue(verified)}
    </div>
    <div class="sh-profile-card-info__details">
      <p class="sh-info-detail-row">${_fcc_renderHtmlValue(
        detail1,
      )}${_fcc_renderHtmlValue(detail2)}</p>
      <p class="sh-info-detail-row">${_fcc_renderHtmlValue(
        detail3,
      )}${_fcc_renderHtmlValue(detail4)}</p>
    </div>
  </div>
  ${_fcc_renderHtmlValue(tags)}
  <hr class="sh-divider sh-divider--soft sh-profile-card-info__divider">
  ${_fcc_renderHtmlValue(actions)}
</section>`,
}
