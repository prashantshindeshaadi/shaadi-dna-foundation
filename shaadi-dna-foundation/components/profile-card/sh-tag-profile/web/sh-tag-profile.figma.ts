// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2813-41954
// component=sh-tag-profile
// Code Connect template · sh-tag-profile → HTML/CSS
// All types: sh-tag-profile.html · styles: sh-tag.css + sh-tag-profile.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs a Figma access token in FIGMA_ACCESS_TOKEN)
//
// Each type is an sh-tag with fixed mode, size, shape, icon and paint. Only the label may change
// (Distance shows the member's distance, e.g. "2 km").

import figma from "figma"

const tag = figma.selectedInstance.getEnum("Type", {
  Online:
    '<span class="sh-tag sh-tag--translucent-light sh-tag--sm sh-tag--pill sh-tag-profile sh-tag-profile--online"><img class="sh-icon sh-icon--12 sh-tag__icon" src="icons/tag/online.svg" alt=""><span class="sh-tag__label sh-support-label">Online</span></span>',
  "You & Her":
    '<span class="sh-tag sh-tag--translucent-light sh-tag--sm sh-tag--no-border sh-tag-profile sh-tag-profile--you-and-her"><span class="sh-icon sh-icon--12 sh-tag__icon sh-icon--brand" style="--icon:url(icons/line/link-rings.svg)" aria-hidden="true"></span><span class="sh-tag__label sh-support-label">You &amp; Her</span></span>',
  Astro:
    '<span class="sh-tag sh-tag--translucent-light sh-tag--sm sh-tag--no-border sh-tag-profile sh-tag-profile--astro"><span class="sh-icon sh-icon--12 sh-tag__icon sh-icon--premium" style="--icon:url(icons/line/astro.svg)" aria-hidden="true"></span><span class="sh-tag__label sh-support-label">Astro</span></span>',
  Promoted:
    '<span class="sh-tag sh-tag--sm sh-tag-profile sh-tag-profile--promoted"><span class="sh-icon sh-icon--12 sh-tag__icon" style="--icon:url(icons/filled/megaphone-02.svg)" aria-hidden="true"></span><span class="sh-tag__label sh-support-label">Promoted</span></span>',
  "Top Profile":
    '<span class="sh-tag sh-tag--sm sh-tag-profile sh-tag-profile--top-profile"><img class="sh-tag-profile__wing" src="icons/tag/left-wing@2x.png" alt=""><span class="sh-tag__label sh-support-label">Top Profile</span><img class="sh-tag-profile__wing" src="icons/tag/right-wing@2x.png" alt=""></span>',
  Distance:
    '<span class="sh-tag sh-tag--sm sh-tag-profile sh-tag-profile--distance"><span class="sh-icon sh-icon--12 sh-tag__icon" style="--icon:url(icons/tag/pin-location-01.svg)" aria-hidden="true"></span><span class="sh-tag__label sh-support-label">20 km</span></span>',
  Offline:
    '<span class="sh-tag sh-tag--translucent-light sh-tag--sm sh-tag--pill sh-tag-profile sh-tag-profile--offline"><img class="sh-icon sh-icon--12 sh-tag__icon" src="icons/tag/offline.svg" alt=""><span class="sh-tag__label sh-support-label">Offline</span></span>',
})
const __props: Record<string, unknown> = {}
if (tag && tag.type !== "ERROR") {
  __props["tag"] = tag
}

export default {
  id: "TODO",
  example: figma.code`
<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-tag/web/sh-tag.css">
<link rel="stylesheet" href="components/profile-card/sh-tag-profile/web/sh-tag-profile.css">

${_fcc_renderHtmlValue(tag)}`,
}
