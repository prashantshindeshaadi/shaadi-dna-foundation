// Code Connect · sh-profile-card → HTML/CSS
// Full markup for every Type: sh-profile-card.html · styles: sh-profile-card.css
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)

import figma, { html } from "@figma/code-connect/html"

figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2579-25592", {
  props: {
    type: figma.enum("Type", {
      Connect: "connect",
      Received: "received",
      Connected: "connected",
      Locked: "locked",
      "No photo": "no-photo",
      "Photo requested": "photo-requested",
      Blocked: "blocked",
      Hidden: "hidden",
      VIP: "vip",
    }),
    topTags: figma.boolean("Show top tags", {
      true: html`<div class="sh-profile-card__top-tags"><span class="sh-tag sh-tag--white sh-support-label"><span class="sh-icon" style="--icon:url(icons/tag/megaphone-03.svg)" aria-hidden="true"></span>Promoted</span></div>`,
      false: undefined,
    }),
    photoActions: figma.boolean("Show photo actions", {
      true: html`<div class="sh-profile-card__top-actions">
        <button class="sh-icon-button sh-glass" type="button" aria-label="View photos"><span class="sh-icon" style="--icon:url(icons/filled/image.svg)" aria-hidden="true"></span><span class="sh-icon-button__badge sh-body-sm">10</span></button>
        <button class="sh-icon-button sh-glass" type="button" aria-label="More options"><span class="sh-icon" style="--icon:url(icons/line/more-vertical.svg)" aria-hidden="true"></span></button>
      </div>`,
      false: undefined,
    }),
    // Note + action row: Type decides them (see "## Types" in ../sh-profile-card.md).
    actions: figma.enum("Type", {
      Connect: html`<p class="sh-action-note sh-action-note--message"><span class="sh-action-note__text sh-body-sm">Pre-written message</span><button class="sh-text-link sh-button-sm" type="button">Edit</button></p>
        <div class="sh-action-row sh-action-row--single"><p class="sh-action-row__message sh-body-md-tight">Like this profile?</p><button class="sh-button sh-button--primary" type="button"><span class="sh-button__label"><span class="sh-icon" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span><span class="sh-button-md">Connect</span></span></button></div>`,
      Received: html`<div class="sh-action-row sh-action-row--two"><button class="sh-button sh-button--tertiary" type="button"><span class="sh-button__label"><span class="sh-icon" style="--icon:url(icons/line/close.svg)" aria-hidden="true"></span><span class="sh-button-md">Decline</span></span></button><button class="sh-button sh-button--primary" type="button"><span class="sh-button__label"><span class="sh-icon" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span><span class="sh-button-md">Accept</span></span></button></div>`,
      Connected: html`<p class="sh-action-note sh-action-note--action"><span class="sh-body-sm">To contact her directly</span><button class="sh-text-link sh-text-link--premium sh-button-sm" type="button">Upgrade Now</button></p>
        <div class="sh-action-row sh-action-row--three"><button class="sh-labelled-action" type="button"><span class="sh-labelled-action__icon"><span class="sh-icon sh-icon--20" style="--icon:url(icons/line/chat.svg)" aria-hidden="true"></span></span><span class="sh-support-label">Shaadi Chat</span></button><button class="sh-labelled-action" type="button"><span class="sh-labelled-action__icon"><span class="sh-icon sh-icon--20" style="--icon:url(icons/line/whatsapp.svg)" aria-hidden="true"></span></span><span class="sh-support-label">WhatsApp</span></button><button class="sh-labelled-action" type="button"><span class="sh-labelled-action__icon"><span class="sh-icon sh-icon--20" style="--icon:url(icons/line/phone.svg)" aria-hidden="true"></span></span><span class="sh-support-label">Call</span></button></div>`,
      Locked: html`<div class="sh-action-row sh-action-row--single"><p class="sh-action-row__message sh-body-md-tight">Like this profile?</p><button class="sh-button sh-button--premium-solid" type="button"><span class="sh-button__label"><span class="sh-button-md">Upgrade to Connect</span></span></button></div>`,
      "No photo": html`<div class="sh-action-row sh-action-row--single"><p class="sh-action-row__message sh-body-md-tight">Like this profile?</p><button class="sh-button sh-button--primary" type="button"><span class="sh-button__label"><span class="sh-icon" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span><span class="sh-button-md">Connect Now</span></span></button></div>`,
      "Photo requested": html`<div class="sh-action-row sh-action-row--single"><p class="sh-action-row__message sh-body-md-tight">Like this profile?</p><button class="sh-button sh-button--primary" type="button"><span class="sh-button__label"><span class="sh-icon" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span><span class="sh-button-md">Connect Now</span></span></button></div>`,
      Blocked: html`<div class="sh-action-row sh-action-row--single"><p class="sh-action-row__message sh-body-md-tight">You blocked her</p><button class="sh-button sh-button--tertiary" type="button"><span class="sh-button__label"><span class="sh-button-md">Unblock</span></span></button></div>`,
      Hidden: html`<div class="sh-action-row sh-action-row--single"><p class="sh-action-row__message sh-body-md-tight">You hid her profile</p><button class="sh-button sh-button--tertiary" type="button"><span class="sh-button__label"><span class="sh-button-md">Unhide Her</span></span></button></div>`,
      VIP: html`<div class="sh-action-row sh-action-row--two"><button class="sh-button sh-button--secondary" type="button"><span class="sh-button__label"><span class="sh-button-md">Call Consultant</span></span></button><button class="sh-button sh-button--primary" type="button"><span class="sh-button__label"><span class="sh-icon" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span><span class="sh-button-md">Connect</span></span></button></div>`,
    }),
  },
  example: ({ type, topTags, photoActions, actions }) => html`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/profile-card/sh-profile-card/web/sh-profile-card.css">

<article class="sh-profile-card" data-type="${type}" aria-label="Name, age">
  <div class="sh-profile-card__photo">
    <img class="sh-profile-card__image" src="photo.jpg" alt="">
    <div class="sh-profile-card__scrim sh-profile-card__scrim--top"></div>
    <div class="sh-profile-card__scrim sh-profile-card__scrim--bottom"></div>
    <!-- Locked / No photo / Photo requested add <div class="sh-overlay sh-overlay--…"> here -->
  </div>
  <div class="sh-profile-card__top">${topTags}${photoActions}</div>
  <section class="sh-profile-card__info sh-glass">
    <div class="sh-profile-card__content">
      <div class="sh-profile-card__name-row">
        <div class="sh-profile-card__name-group">
          <h3 class="sh-profile-card__name sh-heading-sm">Name</h3>
          <span class="sh-profile-card__age sh-heading-sm">26</span>
        </div>
      </div>
      <div class="sh-profile-card__details">
        <p class="sh-profile-card__detail-row"><span class="sh-info-detail sh-body-md">Fact</span><span class="sh-info-detail sh-body-md">Fact</span></p>
      </div>
    </div>
    <hr class="sh-profile-card__divider">
    <div class="sh-profile-card__actions">${actions}</div>
  </section>
</article>`,
})
