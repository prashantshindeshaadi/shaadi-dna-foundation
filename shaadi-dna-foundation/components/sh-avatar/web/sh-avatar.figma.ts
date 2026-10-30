// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2486-15378
// component=sh-avatar
// Code Connect template · sh-avatar → HTML/CSS
// Every variant: sh-avatar.html · styles: sh-avatar.css (needs tokens.css, sh-typo.css, sh-user-images.css, sh-avatar-glyph.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
//
// One connection per Type (Image / Initial / Icon); Size maps inside each.
// Type=Image: put the member's photo in the <img>. Type=Icon: the "Icon" swap renders its sh-avatar-glyph
// snippet; the avatar sizes the glyph (sm 16 · md 24 · lg 40), so use the matching sh-avatar-glyph--<size> class.

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Type") === "Image") {
  const size = figma.selectedInstance.getEnum("Size", {
    sm: "sm",
    md: "md",
    lg: "lg",
  })
  const __props: Record<string, unknown> = {}
  if (size && size.type !== "ERROR") {
    __props["size"] = size
  }

  template = {
    id: "TODO",
    example: figma.code`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="components/profile-card/sh-user-images/web/sh-user-images.css">
<link rel="stylesheet" href="components/sh-avatar/web/sh-avatar.css">

<span class="sh-avatar sh-avatar--${_fcc_renderHtmlValue(
      size,
    )} sh-avatar--image" role="img" aria-label="Member name">
  <span class="sh-avatar__media"><span class="sh-user-image"><img src="member.jpg" alt=""></span></span>
</span>`,
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "Initial") {
  const size = figma.selectedInstance.getEnum("Size", {
    sm: "sm",
    md: "md",
    lg: "lg",
  })
  const labelStyle = figma.selectedInstance.getEnum("Size", {
    sm: "sh-support-label",
    md: "sh-body-md",
    lg: "sh-heading-sm",
  })
  const label = figma.selectedInstance.getString("Label")
  const __props: Record<string, unknown> = {}
  if (size && size.type !== "ERROR") {
    __props["size"] = size
  }
  if (labelStyle && labelStyle.type !== "ERROR") {
    __props["labelStyle"] = labelStyle
  }
  if (label && label.type !== "ERROR") {
    __props["label"] = label
  }

  template = {
    id: "TODO",
    example: figma.code`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-avatar/web/sh-avatar.css">

<span class="sh-avatar sh-avatar--${_fcc_renderHtmlValue(
      size,
    )} sh-avatar--initial">
  <span class="sh-avatar__media"><span class="sh-avatar__label ${_fcc_renderHtmlValue(
    labelStyle,
  )}">${_fcc_renderHtmlValue(label)}</span></span>
</span>`,
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "Icon") {
  const size = figma.selectedInstance.getEnum("Size", {
    sm: "sm",
    md: "md",
    lg: "lg",
  })
  const icon = figma.selectedInstance
    .getInstanceSwap("Icon")
    ?.executeTemplate().example
  const __props: Record<string, unknown> = {}
  if (size && size.type !== "ERROR") {
    __props["size"] = size
  }
  if (icon && icon.type !== "ERROR") {
    __props["icon"] = icon
  }

  template = {
    id: "TODO",
    example: figma.code`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="components/sh-avatar-glyph/web/sh-avatar-glyph.css">
<link rel="stylesheet" href="components/sh-avatar/web/sh-avatar.css">

<span class="sh-avatar sh-avatar--${_fcc_renderHtmlValue(
      size,
    )} sh-avatar--icon" role="img" aria-label="No photo">
  <span class="sh-avatar__media">${_fcc_renderHtmlValue(icon)}</span>
</span>`,
  }
} else {
  const size = figma.selectedInstance.getEnum("Size", {
    sm: "sm",
    md: "md",
    lg: "lg",
  })
  const icon = figma.selectedInstance
    .getInstanceSwap("Icon")
    ?.executeTemplate().example
  const __props: Record<string, unknown> = {}
  if (size && size.type !== "ERROR") {
    __props["size"] = size
  }
  if (icon && icon.type !== "ERROR") {
    __props["icon"] = icon
  }

  template = {
    id: "TODO",
    example: figma.code`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="components/sh-avatar-glyph/web/sh-avatar-glyph.css">
<link rel="stylesheet" href="components/sh-avatar/web/sh-avatar.css">

<span class="sh-avatar sh-avatar--${_fcc_renderHtmlValue(
      size,
    )} sh-avatar--icon" role="img" aria-label="No photo">
  <span class="sh-avatar__media">${_fcc_renderHtmlValue(icon)}</span>
</span>`,
  }
}

export default template
