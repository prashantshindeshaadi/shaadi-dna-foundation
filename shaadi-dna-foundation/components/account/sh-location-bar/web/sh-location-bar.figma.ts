// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13770
// component=sh-location-bar
// Code Connect template · sh-location-bar → HTML/CSS
// Every variant: sh-location-bar.html · styles: sh-location-bar.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-text-link.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Change opens the location sheet: wire its click.

import figma from "figma"

const location = figma.selectedInstance.getString("Location")
const distance = figma.selectedInstance.getString("Distance")
const showDistance = figma.selectedInstance.getBoolean("Show distance")

const distanceHtml = showDistance ? `<span class="sh-location-bar__distance sh-body-sm">${distance}</span>` : ""

export default {
  id: "sh-location-bar",
  example: figma.code`<div class="sh-location-bar">
  <span class="sh-icon sh-icon--16 sh-location-bar__icon" style="--icon:url(icons/filled/location-pin.svg)" aria-hidden="true"></span>
  <p class="sh-location-bar__text"><span class="sh-location-bar__location sh-title-sm">${location}</span>${distanceHtml}</p>
  <button class="sh-text-link sh-text-link--neutral sh-text-link--sm sh-text-link--no-border" type="button" aria-label="Change location">
    <span class="sh-text-link__label sh-button-sm">Change</span>
  </button>
</div>`,
}
