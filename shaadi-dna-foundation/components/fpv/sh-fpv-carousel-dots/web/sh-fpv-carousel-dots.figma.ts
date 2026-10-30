// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-15734
// component=sh-fpv-carousel-dots
// Code Connect template · sh-fpv-carousel-dots → HTML/CSS
// Every variant: sh-fpv-carousel-dots.html · styles: sh-carousel-dots.css + sh-fpv-carousel-dot.css + sh-fpv-carousel-dots.css
// (needs tokens.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// No Figma properties. Render one dot per photo and add sh-carousel-dots__dot--selected to the current one;
// keep aria-label ("Photo 2 of 6") in step with the carousel.

import figma from "figma"

export default {
  id: "sh-fpv-carousel-dots",
  example: figma.code`<div class="sh-carousel-dots sh-fpv-carousel-dots" role="img" aria-label="Photo 2 of 6"><span class="sh-carousel-dots__dot sh-fpv-carousel-dot"></span><span class="sh-carousel-dots__dot sh-carousel-dots__dot--selected sh-fpv-carousel-dot"></span><span class="sh-carousel-dots__dot sh-fpv-carousel-dot"></span><span class="sh-carousel-dots__dot sh-fpv-carousel-dot"></span><span class="sh-carousel-dots__dot sh-fpv-carousel-dot"></span><span class="sh-carousel-dots__dot sh-fpv-carousel-dot"></span></div>`,
}
