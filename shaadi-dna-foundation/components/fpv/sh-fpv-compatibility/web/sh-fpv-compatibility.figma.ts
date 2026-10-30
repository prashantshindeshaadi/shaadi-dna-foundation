// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-19517
// component=sh-fpv-compatibility
// Code Connect template · sh-fpv-compatibility → HTML/CSS
// Every variant: sh-fpv-compatibility.html · styles: sh-user-images.css + sh-avatar.css + sh-text-link.css +
// sh-fpv-compatibility.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Pass both photos (viewer, then her). Astro cue only when both added birth details and the score is 18/36 or more
// (South 6/10). Phase 2 AI summary is off in v1; its "Read more" is sh-text-link Neutral Medium, no border.

import figma from "figma"

const astroCue = figma.selectedInstance.getBoolean("Astro cue")
const version = figma.selectedInstance.getEnum("Version", { "v1 · Keywords": "keywords", "Phase 2 · AI summary": "ai" })

const ai = version === "ai"
const photo = (label: string, src: string) =>
  `<span class="sh-avatar sh-avatar--md sh-avatar--image" role="img" aria-label="${label}"><span class="sh-avatar__media"><span class="sh-user-image"><img src="${src}" alt=""></span></span></span>`
const cue = (icon: string, t: string) =>
  `<li class="sh-fpv-compatibility__cue"><span class="sh-icon sh-icon--12" style="--icon:url(icons/line/${icon}.svg)" aria-hidden="true"></span><span class="sh-body-sm">${t}</span></li>`
const summary = ai
  ? "You both grew up in Mumbai, speak Punjabi at home and plan weekends around the outdoors…"
  : "Living in Mumbai · Speaks Punjabi · Enjoys hiking, travelling"
const more = ai
  ? '<button class="sh-text-link sh-text-link--neutral sh-text-link--md sh-text-link--no-border" type="button" aria-expanded="false"><span class="sh-text-link__label sh-button-md">Read more</span><span class="sh-text-link__icon sh-icon" style="--icon:url(icons/line/arrow-down-01.svg)" aria-hidden="true"></span></button>'
  : ""
const cues = cue("link-rings", "7/9 Preference match") + (astroCue ? cue("astro", "28/36 Astro match") : "")

export default {
  id: "sh-fpv-compatibility",
  example: figma.code`<section class="sh-fpv-compatibility${ai ? " sh-fpv-compatibility--ai-summary" : ""}" aria-labelledby="compat-title"><div class="sh-fpv-compatibility__card"><div class="sh-fpv-compatibility__header"><h2 class="sh-fpv-compatibility__title sh-heading-sm" id="compat-title">Compatibility</h2><span class="sh-fpv-compatibility__photos" aria-hidden="true">${photo("You", "viewer.jpg")}${photo("Meher", "her.jpg")}</span></div><div class="sh-fpv-compatibility__body"><p class="sh-fpv-compatibility__summary sh-body-md">${summary}</p>${more}<ul class="sh-fpv-compatibility__cues" role="list">${cues}</ul></div></div></section>`,
}
