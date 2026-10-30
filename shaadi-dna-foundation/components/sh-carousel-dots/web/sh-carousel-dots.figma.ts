// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2225-4974
// component=sh-carousel-dots
// Code Connect template · sh-carousel-dots → HTML/CSS
// Every variant: sh-carousel-dots.html · styles: sh-carousel-dots.css (needs tokens.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// No Figma properties. Render one __dot per page and add __dot--selected to the current one;
// keep aria-label ("Photo 2 of 6") in step with the carousel.

import figma from "figma"

export default {
  id: "sh-carousel-dots",
  example: figma.code`<div class="sh-carousel-dots" role="img" aria-label="Photo 2 of 6"><span class="sh-carousel-dots__dot"></span><span class="sh-carousel-dots__dot sh-carousel-dots__dot--selected"></span><span class="sh-carousel-dots__dot"></span><span class="sh-carousel-dots__dot"></span><span class="sh-carousel-dots__dot"></span><span class="sh-carousel-dots__dot"></span></div>`,
}
