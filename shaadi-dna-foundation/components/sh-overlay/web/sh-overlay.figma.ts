// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2314-18393
// component=sh-overlay
// Code Connect template · sh-overlay → HTML/CSS
// Markup for every variant: sh-overlay.html · styles: sh-overlay.css (place it inside a positioned photo area or section)
// One connection per Surface × Type, because each variant has different parts.
// Needs: dist/css/tokens.css, dist/sh-typo-kit/developer/web/sh-typo.css, components/sh-icon/web/sh-icon.css,
//        components/sh-button/web/sh-button.css, components/profile-card/sh-user-images/web/sh-user-images.css,
//        components/sh-overlay/web/sh-overlay.css
// No photo / Photo requested: own background + the silhouette (Avatar: female.svg or male.svg). Figma keeps the Status row hidden.
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (
  figma.selectedInstance.getPropertyValue("Surface") === "Photo" &&
  figma.selectedInstance.getPropertyValue("Type") === "Message"
) {
  const icon = figma.selectedInstance.getBoolean("Show icon", {
    true: '<span class="sh-overlay__icon sh-icon sh-icon--24" style="--icon:url(icons/line/camera-off.svg)" aria-hidden="true"></span>',
    false: undefined,
  })
  const text = figma.selectedInstance.getString("Message")
  const textHidden = figma.selectedInstance.getBoolean("Show message", {
    true: "",
    false: " hidden",
  })
  const action = figma.selectedInstance.getBoolean("Show action", {
    true: figma.properties.children(["Action"]),
    false: undefined,
  })
  const __props: Record<string, unknown> = {}
  if (icon && icon.type !== "ERROR") {
    __props["icon"] = icon
  }
  if (text && text.type !== "ERROR") {
    __props["text"] = text
  }
  if (textHidden && textHidden.type !== "ERROR") {
    __props["textHidden"] = textHidden
  }
  if (action && action.type !== "ERROR") {
    __props["action"] = action
  }

  template = {
    id: "TODO",
    example: figma.code`
<div class="sh-overlay sh-overlay--photo sh-overlay--message">
  <div class="sh-overlay__content">
    ${_fcc_renderHtmlValue(icon)}
    <p class="sh-overlay__text sh-body-lg"${_fcc_renderHtmlValue(
      textHidden,
    )}>${_fcc_renderHtmlValue(text)}</p>
  </div>
  ${_fcc_renderHtmlValue(action)}
</div>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue("Surface") === "Photo" &&
  figma.selectedInstance.getPropertyValue("Type") === "No photo"
) {
  const slot = figma.selectedInstance.getBoolean("Show icon", {
    true: '<img class="sh-overlay__illustration" src="components/profile-card/sh-avatar-silhouette/assets/female.svg" alt="">',
    false: undefined,
  })
  const text = figma.selectedInstance.getString("Title")
  const textHidden = figma.selectedInstance.getBoolean("Show message", {
    true: "",
    false: " hidden",
  })
  const action = figma.selectedInstance.getBoolean("Show action", {
    true: figma.properties.children(["Action"]),
    false: undefined,
  })
  const __props: Record<string, unknown> = {}
  if (slot && slot.type !== "ERROR") {
    __props["slot"] = slot
  }
  if (text && text.type !== "ERROR") {
    __props["text"] = text
  }
  if (textHidden && textHidden.type !== "ERROR") {
    __props["textHidden"] = textHidden
  }
  if (action && action.type !== "ERROR") {
    __props["action"] = action
  }

  template = {
    id: "TODO",
    example: figma.code`
<div class="sh-overlay sh-overlay--photo sh-overlay--no-photo">
  <div class="sh-overlay__background" aria-hidden="true"></div>
  <div class="sh-overlay__content">
    ${_fcc_renderHtmlValue(slot)}
    <p class="sh-overlay__text sh-title-lg"${_fcc_renderHtmlValue(
      textHidden,
    )}>${_fcc_renderHtmlValue(text)}</p>
  </div>
  ${_fcc_renderHtmlValue(action)}
</div>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue("Surface") === "Photo" &&
  figma.selectedInstance.getPropertyValue("Type") === "Photo requested"
) {
  const slot = figma.selectedInstance.getBoolean("Show icon", {
    true: '<img class="sh-overlay__illustration" src="components/profile-card/sh-avatar-silhouette/assets/female.svg" alt="">',
    false: undefined,
  })
  const text = figma.selectedInstance.getString("Title")
  const textHidden = figma.selectedInstance.getBoolean("Show message", {
    true: "",
    false: " hidden",
  })
  const __props: Record<string, unknown> = {}
  if (slot && slot.type !== "ERROR") {
    __props["slot"] = slot
  }
  if (text && text.type !== "ERROR") {
    __props["text"] = text
  }
  if (textHidden && textHidden.type !== "ERROR") {
    __props["textHidden"] = textHidden
  }

  template = {
    id: "TODO",
    example: figma.code`
<div class="sh-overlay sh-overlay--photo sh-overlay--photo-requested">
  <div class="sh-overlay__background" aria-hidden="true"></div>
  <div class="sh-overlay__content">
    ${_fcc_renderHtmlValue(slot)}
    <p class="sh-overlay__text sh-title-lg"${_fcc_renderHtmlValue(
      textHidden,
    )}>${_fcc_renderHtmlValue(text)}</p>
  </div>
  <!-- optional status (Figma: hidden layer): <span class="sh-overlay__status sh-button-sm"><span class="sh-icon sh-icon--16" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span>Photo Requested</span> -->
</div>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue("Surface") === "Photo full" &&
  figma.selectedInstance.getPropertyValue("Type") === "Message"
) {
  const icon = figma.selectedInstance.getBoolean("Show icon", {
    true: '<span class="sh-overlay__icon sh-icon sh-icon--40" style="--icon:url(icons/line/camera-off.svg)" aria-hidden="true"></span>',
    false: undefined,
  })
  const text = figma.selectedInstance.getString("Message")
  const textHidden = figma.selectedInstance.getBoolean("Show message", {
    true: "",
    false: " hidden",
  })
  const action = figma.selectedInstance.getBoolean("Show action", {
    true: figma.properties.children(["Action"]),
    false: undefined,
  })
  const __props: Record<string, unknown> = {}
  if (icon && icon.type !== "ERROR") {
    __props["icon"] = icon
  }
  if (text && text.type !== "ERROR") {
    __props["text"] = text
  }
  if (textHidden && textHidden.type !== "ERROR") {
    __props["textHidden"] = textHidden
  }
  if (action && action.type !== "ERROR") {
    __props["action"] = action
  }

  template = {
    id: "TODO",
    example: figma.code`
<div class="sh-overlay sh-overlay--photo-full sh-overlay--message">
  <div class="sh-overlay__content">
    ${_fcc_renderHtmlValue(icon)}
    <p class="sh-overlay__text sh-body-lg"${_fcc_renderHtmlValue(
      textHidden,
    )}>${_fcc_renderHtmlValue(text)}</p>
  </div>
  ${_fcc_renderHtmlValue(action)}
</div>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue("Surface") === "Photo full" &&
  figma.selectedInstance.getPropertyValue("Type") === "No photo"
) {
  const text = figma.selectedInstance.getString("Title")
  const textHidden = figma.selectedInstance.getBoolean("Show message", {
    true: "",
    false: " hidden",
  })
  const action = figma.selectedInstance.getBoolean("Show action", {
    true: figma.properties.children(["Action"]),
    false: undefined,
  })
  const __props: Record<string, unknown> = {}
  if (text && text.type !== "ERROR") {
    __props["text"] = text
  }
  if (textHidden && textHidden.type !== "ERROR") {
    __props["textHidden"] = textHidden
  }
  if (action && action.type !== "ERROR") {
    __props["action"] = action
  }

  template = {
    id: "TODO",
    example: figma.code`
<div class="sh-overlay sh-overlay--photo-full sh-overlay--no-photo">
  <div class="sh-overlay__background" aria-hidden="true"></div>
  <div class="sh-overlay__content">
    <img class="sh-overlay__illustration" src="components/profile-card/sh-avatar-silhouette/assets/female.svg" alt="">
    <p class="sh-overlay__text sh-title-lg"${_fcc_renderHtmlValue(
      textHidden,
    )}>${_fcc_renderHtmlValue(text)}</p>
  </div>
  ${_fcc_renderHtmlValue(action)}
</div>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue("Surface") === "Photo full" &&
  figma.selectedInstance.getPropertyValue("Type") === "Photo requested"
) {
  const text = figma.selectedInstance.getString("Title")
  const textHidden = figma.selectedInstance.getBoolean("Show message", {
    true: "",
    false: " hidden",
  })
  const __props: Record<string, unknown> = {}
  if (text && text.type !== "ERROR") {
    __props["text"] = text
  }
  if (textHidden && textHidden.type !== "ERROR") {
    __props["textHidden"] = textHidden
  }

  template = {
    id: "TODO",
    example: figma.code`
<div class="sh-overlay sh-overlay--photo-full sh-overlay--photo-requested">
  <div class="sh-overlay__background" aria-hidden="true"></div>
  <div class="sh-overlay__content">
    <img class="sh-overlay__illustration" src="components/profile-card/sh-avatar-silhouette/assets/female.svg" alt="">
    <p class="sh-overlay__text sh-title-lg"${_fcc_renderHtmlValue(
      textHidden,
    )}>${_fcc_renderHtmlValue(text)}</p>
  </div>
  <!-- optional status (Figma: hidden layer): <span class="sh-overlay__status sh-button-sm"><span class="sh-icon sh-icon--16" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span>Photo Requested</span> -->
</div>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue("Surface") === "Content" &&
  figma.selectedInstance.getPropertyValue("Type") === "Message"
) {
  const icon = figma.selectedInstance.getBoolean("Show icon", {
    true: '<span class="sh-overlay__icon sh-icon sh-icon--24" style="--icon:url(icons/line/camera-off.svg)" aria-hidden="true"></span>',
    false: undefined,
  })
  const text = figma.selectedInstance.getString("Message")
  const textHidden = figma.selectedInstance.getBoolean("Show message", {
    true: "",
    false: " hidden",
  })
  const action = figma.selectedInstance.getBoolean("Show action", {
    true: figma.properties.children(["Action"]),
    false: undefined,
  })
  const __props: Record<string, unknown> = {}
  if (icon && icon.type !== "ERROR") {
    __props["icon"] = icon
  }
  if (text && text.type !== "ERROR") {
    __props["text"] = text
  }
  if (textHidden && textHidden.type !== "ERROR") {
    __props["textHidden"] = textHidden
  }
  if (action && action.type !== "ERROR") {
    __props["action"] = action
  }

  template = {
    id: "TODO",
    example: figma.code`
<div class="sh-overlay sh-overlay--content sh-overlay--message">
  <div class="sh-overlay__content">
    ${_fcc_renderHtmlValue(icon)}
    <p class="sh-overlay__text sh-body-md"${_fcc_renderHtmlValue(
      textHidden,
    )}>${_fcc_renderHtmlValue(text)}</p>
  </div>
  ${_fcc_renderHtmlValue(action)}
</div>`,
  }
} else {
  const icon = figma.selectedInstance.getBoolean("Show icon", {
    true: '<span class="sh-overlay__icon sh-icon sh-icon--24" style="--icon:url(icons/line/camera-off.svg)" aria-hidden="true"></span>',
    false: undefined,
  })
  const text = figma.selectedInstance.getString("Message")
  const textHidden = figma.selectedInstance.getBoolean("Show message", {
    true: "",
    false: " hidden",
  })
  const action = figma.selectedInstance.getBoolean("Show action", {
    true: figma.properties.children(["Action"]),
    false: undefined,
  })
  const __props: Record<string, unknown> = {}
  if (icon && icon.type !== "ERROR") {
    __props["icon"] = icon
  }
  if (text && text.type !== "ERROR") {
    __props["text"] = text
  }
  if (textHidden && textHidden.type !== "ERROR") {
    __props["textHidden"] = textHidden
  }
  if (action && action.type !== "ERROR") {
    __props["action"] = action
  }

  template = {
    id: "TODO",
    example: figma.code`
<div class="sh-overlay sh-overlay--content sh-overlay--message">
  <div class="sh-overlay__content">
    ${_fcc_renderHtmlValue(icon)}
    <p class="sh-overlay__text sh-body-md"${_fcc_renderHtmlValue(
      textHidden,
    )}>${_fcc_renderHtmlValue(text)}</p>
  </div>
  ${_fcc_renderHtmlValue(action)}
</div>`,
  }
}

export default template
