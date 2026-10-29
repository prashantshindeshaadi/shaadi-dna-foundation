// Code Connect · sh-mini-card → HTML/CSS
// Every variant: sh-mini-card.html · styles: sh-mini-card.css (needs tokens.css, sh-typo.css, sh-icon.css,
// sh-user-images.css, sh-avatar-placeholder.css, sh-avatar.css, sh-info-detail.css, sh-button.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
//
// Badge 1 / Badge 2 swaps: verified-badge ↔ premium-badge — swap the <img> src and alt.
// Details: every fact has a separator except the last one shown; drop the separator of the new last fact
// when Show detail 3 (or 2 and 3) is off. The action is sh-button Primary Small, full width.

import figma, { html } from "@figma/code-connect/html"

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2780-68360", {
  props: {
    typeClass: figma.enum("Type", {
      Default: "",
      "No photo female": " sh-mini-card--no-photo",
      "No photo male": " sh-mini-card--no-photo",
    }),
    avatar: figma.enum("Type", {
      Default: html`<span class="sh-avatar sh-avatar--lg sh-avatar--image sh-mini-card__avatar" aria-hidden="true"><span class="sh-avatar__media"><span class="sh-user-image"><img src="member.jpg" alt=""></span></span></span>`,
      "No photo female": html`<span class="sh-avatar sh-avatar--lg sh-mini-card__avatar" aria-hidden="true"><span class="sh-avatar__media"><span class="sh-avatar-placeholder sh-avatar-placeholder--1x1"><img class="sh-avatar-placeholder__silhouette" src="components/profile-card/sh-avatar-silhouette/assets/female.svg" alt=""></span></span></span>`,
      "No photo male": html`<span class="sh-avatar sh-avatar--lg sh-mini-card__avatar" aria-hidden="true"><span class="sh-avatar__media"><span class="sh-avatar-placeholder sh-avatar-placeholder--1x1"><img class="sh-avatar-placeholder__silhouette" src="components/profile-card/sh-avatar-silhouette/assets/male.svg" alt=""></span></span></span>`,
    }),
    name: figma.string("Name"),
    badge1: figma.boolean("Show badge 1", {
      true: html`<img class="sh-badge sh-badge--16" src="icons/misc/verified-badge.svg" alt="Verified">`,
      false: undefined,
    }),
    badge2: figma.boolean("Show badge 2", {
      true: html`<img class="sh-badge sh-badge--16" src="icons/misc/premium-badge.svg" alt="Premium">`,
      false: undefined,
    }),
    detail1: figma.boolean("Show detail 1", {
      true: html`<span class="sh-info-detail sh-info-detail--default sh-info-detail--sm"><span class="sh-info-detail__label sh-body-sm-tight">5’6”</span><span class="sh-info-detail__separator" aria-hidden="true"></span></span>`,
      false: undefined,
    }),
    detail2: figma.boolean("Show detail 2", {
      true: html`<span class="sh-info-detail sh-info-detail--default sh-info-detail--sm"><span class="sh-info-detail__label sh-body-sm-tight">Kayastha</span><span class="sh-info-detail__separator" aria-hidden="true"></span></span>`,
      false: undefined,
    }),
    detail3: figma.boolean("Show detail 3", {
      true: html`<span class="sh-info-detail sh-info-detail--default sh-info-detail--sm"><span class="sh-info-detail__label sh-body-sm-tight">Pune, MH</span></span>`,
      false: undefined,
    }),
  },
  example: ({ typeClass, avatar, name, badge1, badge2, detail1, detail2, detail3 }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/profile-card/sh-user-images/web/sh-user-images.css">
<link rel="stylesheet" href="components/profile-card/sh-avatar-placeholder/web/sh-avatar-placeholder.css">
<link rel="stylesheet" href="components/sh-avatar/web/sh-avatar.css">
<link rel="stylesheet" href="components/profile-card/sh-info-detail/web/sh-info-detail.css">
<link rel="stylesheet" href="components/sh-button/web/sh-button.css">
<link rel="stylesheet" href="components/profile-card/sh-mini-card/web/sh-mini-card.css">

<article class="sh-mini-card${typeClass}">
  ${avatar}
  <div class="sh-mini-card__info">
    <p class="sh-mini-card__name-row">
      <span class="sh-mini-card__name sh-title-sm">${name}</span>
      <span class="sh-mini-card__badges">${badge1}${badge2}</span>
    </p>
    <p class="sh-mini-card__details">${detail1}${detail2}${detail3}</p>
  </div>
  <button class="sh-button sh-button--primary sh-button--sm sh-button--fill sh-mini-card__action" type="button">
    <span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span>
    <span class="sh-button__text"><span class="sh-button__label sh-button-sm">Connect Now</span></span>
  </button>
</article>`,
})
