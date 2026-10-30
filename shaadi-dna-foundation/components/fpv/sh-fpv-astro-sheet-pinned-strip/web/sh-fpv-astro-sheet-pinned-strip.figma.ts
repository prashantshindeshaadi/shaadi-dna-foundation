// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2891-65943
// component=sh-fpv-astro-sheet-pinned-strip
// Code Connect template · sh-fpv-astro-sheet-pinned-strip → HTML/CSS
// Every variant: sh-fpv-astro-sheet-pinned-strip.html · styles: sh-text-link.css + sh-fpv-astro-sheet-pinned-strip.css
// (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// No Figma properties. Put her first name in the message; "Ask her" sends the birth-details request.

import figma from "figma"

export default {
  id: "sh-fpv-astro-sheet-pinned-strip",
  example: figma.code`<div class="sh-fpv-astro-sheet-pinned-strip"><p class="sh-fpv-astro-sheet-pinned-strip__strip"><span class="sh-fpv-astro-sheet-pinned-strip__icon sh-icon sh-icon--20" style="--icon:url(icons/line/unlock.svg)" aria-hidden="true"></span><span class="sh-fpv-astro-sheet-pinned-strip__message sh-body-sm">Ananya hasn’t added her birth details yet.</span><button class="sh-fpv-astro-sheet-pinned-strip__link sh-text-link sh-text-link--sm sh-text-link--no-border" type="button"><span class="sh-text-link__label sh-button-sm">Ask her</span></button></p></div>`,
}
