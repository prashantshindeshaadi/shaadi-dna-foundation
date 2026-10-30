// Code Connect · sh-profile-card → HTML/CSS
// Full markup for every Type: sh-profile-card.html · layout: sh-profile-card.css (+ each part's own CSS)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)

import figma, { html } from "@figma/code-connect/html"

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2579-25592", {
  props: {
    type: figma.enum("Type", {
      Connect: "connect",
      Received: "received",
      "Post-Connect": "post-connect",
      Gated: "gated",
      "No photo": "no-photo",
      "Photo requested": "photo-requested",
      Blocked: "blocked",
      VIP: "vip",
      "With Overlay": "with-overlay",
      Declined: "declined",
    }),
    topTags: figma.boolean("Show top tags", {
      true: html`<div class="sh-profile-card__top-tags"><span class="sh-tag sh-tag--sm sh-tag-profile sh-tag-profile--promoted"><span class="sh-icon sh-icon--12 sh-tag__icon" style="--icon:url(icons/filled/megaphone-02.svg)" aria-hidden="true"></span><span class="sh-tag__label sh-support-label">Promoted</span></span></div>`,
      false: undefined,
    }),
    photoActions: figma.boolean("Show photo actions", {
      true: html`<div class="sh-profile-card__top-actions"><button class="sh-icon-button sh-icon-button--translucent sh-icon-button--sm" type="button" aria-label="View photos"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/filled/image.svg)" aria-hidden="true"></span><span class="sh-icon-button__badge sh-body-sm">10</span></button><button class="sh-icon-button sh-icon-button--translucent sh-icon-button--sm" type="button" aria-label="More options"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/more-vertical.svg)" aria-hidden="true"></span></button></div>`,
      false: undefined,
    }),
    // sh-action-island per Type (see components/sh-action-island/web/sh-action-island.html for every Type)
    island: figma.enum("Type", {
      Connect: html`<div class="sh-action-island sh-action-island--normal sh-action-island--message-primary"><div class="sh-action-note sh-action-note--edit sh-action-note--normal"><span class="sh-action-note__text sh-body-sm">Pre-written message</span><span class="sh-action-note__link"><button class="sh-text-link sh-text-link--inverse sh-text-link--sm" type="button"><span class="sh-text-link__label sh-button-sm">Edit</span></button></span></div><div class="sh-action-island__actions"><p class="sh-action-island__message sh-body-md-tight">Like this profile?</p><button class="sh-button sh-button--primary sh-button--md sh-button--fill" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/connect.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Connect Now</span></span></button></div></div>`,
      Received: html`<div class="sh-action-island sh-action-island--normal sh-action-island--tertiary-primary"><div class="sh-action-island__actions"><button class="sh-button sh-button--tertiary sh-button--md sh-button--fill" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/line/close.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Decline</span></span></button><button class="sh-button sh-button--primary sh-button--md sh-button--fill" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Accept</span></span></button></div></div>`,
      "Post-Connect": html`<div class="sh-action-island sh-action-island--normal sh-action-island--three-actions"><div class="sh-action-note sh-action-note--upgrade sh-action-note--normal"><span class="sh-action-note__text sh-body-sm">To contact her directly</span><span class="sh-action-note__link"><button class="sh-text-link sh-text-link--premium sh-text-link--sm" type="button"><span class="sh-text-link__label sh-button-sm">Upgrade Now</span></button></span></div><div class="sh-action-island__actions"><!-- 3 × sh-icon-button-with-label: Shaadi Chat (line/chat-bubble), WhatsApp (line/whatsapp-02), Call (line/call) --></div></div>`,
      Gated: html`<div class="sh-action-island sh-action-island--normal sh-action-island--message-premium"><div class="sh-action-island__actions"><p class="sh-action-island__message sh-body-md-tight">Like this profile?</p><button class="sh-button sh-button--premium-solid sh-button--md sh-button--fill" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Upgrade to Connect</span></span></button></div></div>`,
      "No photo": html`<div class="sh-action-island sh-action-island--normal sh-action-island--message-primary"><div class="sh-action-island__actions"><p class="sh-action-island__message sh-body-md-tight">Like this profile?</p><button class="sh-button sh-button--primary sh-button--md sh-button--fill" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Connect Now</span></span></button></div></div>`,
      "Photo requested": html`<div class="sh-action-island sh-action-island--normal sh-action-island--message-primary"><div class="sh-action-island__actions"><p class="sh-action-island__message sh-body-md-tight">Like this profile?</p><button class="sh-button sh-button--primary sh-button--md sh-button--fill" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Connect Now</span></span></button></div></div>`,
      Blocked: html`<div class="sh-action-island sh-action-island--normal sh-action-island--message-tertiary"><div class="sh-action-island__actions"><p class="sh-action-island__message sh-body-md-tight">You blocked her</p><button class="sh-button sh-button--tertiary sh-button--md sh-button--fill" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Unblock</span></span></button></div></div>`,
      VIP: html`<div class="sh-action-island sh-action-island--normal sh-action-island--secondary-primary"><div class="sh-action-note sh-action-note--edit sh-action-note--normal"><span class="sh-action-note__text sh-body-sm">Pre-written message</span><span class="sh-action-note__link"><button class="sh-text-link sh-text-link--inverse sh-text-link--sm" type="button"><span class="sh-text-link__label sh-button-sm">Edit</span></button></span></div><div class="sh-action-island__actions"><button class="sh-button sh-button--secondary sh-button--md sh-button--fill" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">Call Consultant</span><span class="sh-button__sublabel sh-support-meta">VIP Managed Profile</span></span></button><button class="sh-button sh-button--primary sh-button--md sh-button--fill" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Connect</span></span></button></div></div>`,
      "With Overlay": html`<div class="sh-action-island sh-action-island--normal sh-action-island--message-primary"><div class="sh-action-note sh-action-note--edit sh-action-note--normal"><span class="sh-action-note__text sh-body-sm">Pre-written message</span><span class="sh-action-note__link"><button class="sh-text-link sh-text-link--inverse sh-text-link--sm" type="button"><span class="sh-text-link__label sh-button-sm">Edit</span></button></span></div><div class="sh-action-island__actions"><p class="sh-action-island__message sh-body-md-tight">Like this profile?</p><button class="sh-button sh-button--primary sh-button--md sh-button--fill" type="button"><span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/connect.svg)" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-md">Connect Now</span></span></button></div></div>`,
      Declined: html`<div class="sh-action-island sh-action-island--normal sh-action-island--message-only"><div class="sh-action-island__actions"><p class="sh-action-island__message sh-body-md-tight">She declined your Request to Connect</p></div></div>`,
    }),
  },
  example: ({ type, topTags, photoActions, island }) => html`
<article class="sh-profile-card" data-type="${type}" aria-label="Name, age">
  <div class="sh-photo-wrapper sh-profile-card__photo">
    <div class="sh-photo-wrapper__image sh-user-image"><img src="photo.jpg" alt=""></div>
    <div class="sh-photo-wrapper__scrim sh-photo-wrapper__scrim--bottom"></div>
    <div class="sh-photo-wrapper__scrim sh-photo-wrapper__scrim--top"></div>
    <!-- No photo / Photo requested / With Overlay: an sh-overlay here (see components/sh-overlay/web/sh-overlay.html) -->
  </div>
  <div class="sh-profile-card__top">${topTags}${photoActions}</div>
  <div class="sh-profile-card__info">
    <section class="sh-profile-card-info"><!-- name row, details, tags, divider (see sh-profile-card-info.html) -->${island}</section>
  </div>
</article>`,
})
