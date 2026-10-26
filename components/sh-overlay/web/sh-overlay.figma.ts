// Code Connect · sh-overlay → HTML/CSS
// Markup for every variant: sh-overlay.html · styles: sh-overlay.css (place it inside a positioned photo area or section)
// One connection per Surface × Type, because each variant has different parts.
// Needs: dist/css/tokens.css, dist/sh-typo-kit/developer/web/sh-typo.css, components/sh-icon/web/sh-icon.css,
//        components/sh-button/web/sh-button.css, components/profile-card/sh-user-images/web/sh-user-images.css,
//        components/sh-overlay/web/sh-overlay.css
// Figma keeps the No photo Avatar and the Photo requested Status hidden; both are optional in code (see sh-overlay.html).
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)

import figma, { html } from "@figma/code-connect/html"

// Surface=Photo, Type=Message
figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2314-18393", {
  variant: { Surface: "Photo", Type: "Message" },
  props: {
    icon: figma.boolean("Show icon", {
      true: html`<span class="sh-overlay__icon sh-icon sh-icon--24" style="--icon:url(icons/line/camera-off.svg)" aria-hidden="true"></span>`,
      false: undefined,
    }),
    text: figma.string("Message"),
    textHidden: figma.boolean("Show message", { true: "", false: " hidden" }),
    action: figma.boolean("Show action", { true: figma.children("Action"), false: undefined }),
  },
  example: ({ icon, text, textHidden, action }) => html`
<div class="sh-overlay sh-overlay--photo sh-overlay--message">
  <div class="sh-overlay__content">
    ${icon}
    <p class="sh-overlay__text sh-body-lg"${textHidden}>${text}</p>
  </div>
  ${action}
</div>`,
})

// Surface=Photo, Type=No photo
figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2314-18393", {
  variant: { Surface: "Photo", Type: "No photo" },
  props: {
    slot: figma.boolean("Show icon", {
      true: html`<span class="sh-overlay__illustration" aria-hidden="true"></span>`,
      false: undefined,
    }),
    text: figma.string("Title"),
    textHidden: figma.boolean("Show message", { true: "", false: " hidden" }),
    action: figma.boolean("Show action", { true: figma.children("Action"), false: undefined }),
  },
  example: ({ slot, text, textHidden, action }) => html`
<div class="sh-overlay sh-overlay--photo sh-overlay--no-photo">
  <div class="sh-overlay__content">
    ${slot}
    <p class="sh-overlay__text sh-body-lg"${textHidden}>${text}</p>
  </div>
  ${action}
</div>`,
})

// Surface=Photo, Type=Photo requested
figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2314-18393", {
  variant: { Surface: "Photo", Type: "Photo requested" },
  props: {
    slot: figma.boolean("Show icon", {
      true: html`<span class="sh-overlay__illustration" aria-hidden="true"></span>`,
      false: undefined,
    }),
    text: figma.string("Title"),
    textHidden: figma.boolean("Show message", { true: "", false: " hidden" }),
  },
  example: ({ slot, text, textHidden }) => html`
<div class="sh-overlay sh-overlay--photo sh-overlay--photo-requested">
  <div class="sh-overlay__content">
    ${slot}
    <p class="sh-overlay__text sh-body-lg"${textHidden}>${text}</p>
  </div>
  <!-- optional status (Figma: hidden layer): <span class="sh-overlay__status sh-button-sm"><span class="sh-icon sh-icon--16" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span>Photo Requested</span> -->
</div>`,
})

// Surface=Photo full, Type=Message
figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2314-18393", {
  variant: { Surface: "Photo full", Type: "Message" },
  props: {
    icon: figma.boolean("Show icon", {
      true: html`<span class="sh-overlay__icon sh-icon sh-icon--40" style="--icon:url(icons/line/camera-off.svg)" aria-hidden="true"></span>`,
      false: undefined,
    }),
    text: figma.string("Message"),
    textHidden: figma.boolean("Show message", { true: "", false: " hidden" }),
    action: figma.boolean("Show action", { true: figma.children("Action"), false: undefined }),
  },
  example: ({ icon, text, textHidden, action }) => html`
<div class="sh-overlay sh-overlay--photo-full sh-overlay--message">
  <div class="sh-overlay__content">
    ${icon}
    <p class="sh-overlay__text sh-body-lg"${textHidden}>${text}</p>
  </div>
  ${action}
</div>`,
})

// Surface=Photo full, Type=No photo
figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2314-18393", {
  variant: { Surface: "Photo full", Type: "No photo" },
  props: {
    text: figma.string("Title"),
    textHidden: figma.boolean("Show message", { true: "", false: " hidden" }),
    action: figma.boolean("Show action", { true: figma.children("Action"), false: undefined }),
  },
  example: ({ text, textHidden, action }) => html`
<div class="sh-overlay sh-overlay--photo-full sh-overlay--no-photo">
  <div class="sh-overlay__portrait sh-user-image sh-user-image--top"><img src="components/profile-card/sh-user-images/assets/requested-female.jpg" alt=""></div>
  <div class="sh-overlay__content">
    <p class="sh-overlay__text sh-body-lg"${textHidden}>${text}</p>
  </div>
  ${action}
</div>`,
})

// Surface=Photo full, Type=Photo requested
figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2314-18393", {
  variant: { Surface: "Photo full", Type: "Photo requested" },
  props: {
    text: figma.string("Title"),
    textHidden: figma.boolean("Show message", { true: "", false: " hidden" }),
  },
  example: ({ text, textHidden }) => html`
<div class="sh-overlay sh-overlay--photo-full sh-overlay--photo-requested">
  <div class="sh-overlay__portrait sh-user-image sh-user-image--top"><img src="components/profile-card/sh-user-images/assets/requested-female.jpg" alt=""></div>
  <div class="sh-overlay__content">
    <p class="sh-overlay__text sh-body-lg"${textHidden}>${text}</p>
  </div>
  <!-- optional status (Figma: hidden layer): <span class="sh-overlay__status sh-button-sm"><span class="sh-icon sh-icon--16" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span>Photo Requested</span> -->
</div>`,
})

// Surface=Content, Type=Message
figma.connect("https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2314-18393", {
  variant: { Surface: "Content", Type: "Message" },
  props: {
    icon: figma.boolean("Show icon", {
      true: html`<span class="sh-overlay__icon sh-icon sh-icon--24" style="--icon:url(icons/line/camera-off.svg)" aria-hidden="true"></span>`,
      false: undefined,
    }),
    text: figma.string("Message"),
    textHidden: figma.boolean("Show message", { true: "", false: " hidden" }),
    action: figma.boolean("Show action", { true: figma.children("Action"), false: undefined }),
  },
  example: ({ icon, text, textHidden, action }) => html`
<div class="sh-overlay sh-overlay--content sh-overlay--message">
  <div class="sh-overlay__content">
    ${icon}
    <p class="sh-overlay__text sh-body-md"${textHidden}>${text}</p>
  </div>
  ${action}
</div>`,
})
