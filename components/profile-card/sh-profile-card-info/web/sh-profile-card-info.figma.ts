// Code Connect · sh-profile-card-info → HTML/CSS
// Rendered combinations: sh-profile-card-info.html · styles: sh-profile-card-info.css (needs tokens.css, sh-typo.css,
// sh-icon.css, sh-tag.css, sh-tag-profile.css, sh-info-detail.css, sh-divider.css + the island's stylesheets)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
//
// Badge 2 / Badge 3 (instance swaps) are the premium and VIP badges. Detail labels aren't Figma properties:
// replace the sample facts; the last fact of each line has no separator. Actions renders the nested
// sh-action-island (its own Code Connect).

import figma, { html } from "@figma/code-connect/html"

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2496-27797", {
  props: {
    name: figma.string("Name"),
    age: figma.string("Age"),
    badge2: figma.boolean("Show badge 2", {
      true: html`<img class="sh-badge sh-badge--20" src="icons/misc/premium-badge.svg" alt="Premium">`,
      false: undefined,
    }),
    badge3: figma.boolean("Show badge 3", {
      true: html`<img class="sh-badge sh-badge--20" src="icons/misc/vip-badge.svg" alt="VIP">`,
      false: undefined,
    }),
    status: figma.boolean("Show status", {
      true: html`<span class="sh-tag sh-tag--translucent-light sh-tag--sm sh-tag--pill sh-tag-profile sh-tag-profile--online"><img class="sh-icon sh-icon--12 sh-tag__icon" src="icons/tag/online.svg" alt=""><span class="sh-tag__label sh-support-label">Online</span></span>`,
      false: undefined,
    }),
    verified: figma.boolean("Verified", {
      true: html`<img class="sh-badge sh-badge--20" src="icons/misc/verified-badge.svg" alt="Verified">`,
      false: undefined,
    }),
    detail1: figma.boolean("Show detail 1", {
      true: html`<span class="sh-info-detail sh-info-detail--on-image sh-info-detail--md"><span class="sh-info-detail__label sh-body-md">5′ 6″</span><span class="sh-info-detail__separator" aria-hidden="true"></span></span>`,
      false: undefined,
    }),
    detail2: figma.boolean("Show detail 2", {
      true: html`<span class="sh-info-detail sh-info-detail--on-image sh-info-detail--md"><span class="sh-info-detail__label sh-body-md">Kashmiri Pandit</span></span>`,
      false: undefined,
    }),
    detail3: figma.boolean("Show detail 3", {
      true: html`<span class="sh-info-detail sh-info-detail--on-image sh-info-detail--md"><span class="sh-info-detail__label sh-body-md">Pimpri-Chinchwad</span><span class="sh-info-detail__separator" aria-hidden="true"></span></span>`,
      false: undefined,
    }),
    detail4: figma.boolean("Show detail 4", {
      true: html`<span class="sh-info-detail sh-info-detail--on-image sh-info-detail--md"><span class="sh-info-detail__label sh-body-md">Software Developer</span></span>`,
      false: undefined,
    }),
    tags: figma.boolean("Show tags", {
      true: html`<div class="sh-profile-card-info__tags">
    <span class="sh-tag sh-tag--translucent-light sh-tag--sm sh-tag--no-border sh-tag-profile sh-tag-profile--you-and-her"><span class="sh-tag__icon sh-icon sh-icon--12 sh-icon--brand" style="--icon:url(icons/line/link-rings.svg)" aria-hidden="true"></span><span class="sh-tag__label sh-support-label">You &amp; Her</span></span>
    <span class="sh-tag sh-tag--translucent-light sh-tag--sm sh-tag--no-border sh-tag-profile sh-tag-profile--astro"><span class="sh-tag__icon sh-icon sh-icon--12 sh-icon--premium" style="--icon:url(icons/line/astro.svg)" aria-hidden="true"></span><span class="sh-tag__label sh-support-label">Astro</span></span>
  </div>`,
      false: undefined,
    }),
    actions: figma.children("Actions"),
  },
  example: ({ name, age, badge2, badge3, status, verified, detail1, detail2, detail3, detail4, tags, actions }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-tag/web/sh-tag.css">
<link rel="stylesheet" href="components/profile-card/sh-tag-profile/web/sh-tag-profile.css">
<link rel="stylesheet" href="components/profile-card/sh-info-detail/web/sh-info-detail.css">
<link rel="stylesheet" href="components/sh-divider/web/sh-divider.css">
<!-- + the stylesheets sh-action-island lists -->
<link rel="stylesheet" href="components/profile-card/sh-profile-card-info/web/sh-profile-card-info.css">

<section class="sh-profile-card-info" aria-label="${name}, ${age}">
  <div class="sh-profile-card-info__content">
    <div class="sh-profile-card-info__name-row">
      <div class="sh-profile-card-info__name-group">
        <h3 class="sh-profile-card-info__title">
          <span class="sh-profile-card-info__name sh-heading-sm">${name}</span>
          <span class="sh-profile-card-info__age sh-heading-sm">${age}</span>
        </h3>
        ${badge2}${badge3}${status}
      </div>
      <span class="sh-profile-card-info__spacer"></span>
      ${verified}
    </div>
    <div class="sh-profile-card-info__details">
      <p class="sh-info-detail-row">${detail1}${detail2}</p>
      <p class="sh-info-detail-row">${detail3}${detail4}</p>
    </div>
  </div>
  ${tags}
  <hr class="sh-divider sh-divider--soft sh-profile-card-info__divider">
  ${actions}
</section>`,
})
