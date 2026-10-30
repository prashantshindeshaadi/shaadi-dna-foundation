// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2715-10572
// component=sh-map-background
// Code Connect template · sh-map-background → HTML/CSS
// Every variant: sh-map-background.html · styles: sh-map-background.css (needs tokens.css; pins need sh-map-pin.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The map is one exported image (not in the repo yet: export "Map (image)" from Figma). Put sh-map-pin
// instances inside, positioned with left / top (the pin's tip lands on the spot).

import figma from "figma"

export default {
  id: "sh-map-background",
  example: figma.code`<div class="sh-map-background">
  <img class="sh-map-background__map" src="near-me-map.png" alt="">
  <!-- sh-map-pin instances: <button class="sh-map-pin" style="left: 42%; top: 31%" …>…</button> -->
</div>`,
}
