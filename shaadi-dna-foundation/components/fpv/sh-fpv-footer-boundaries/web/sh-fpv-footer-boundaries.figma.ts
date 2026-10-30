// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=3237-88209
// component=sh-fpv-footer-boundaries
// Code Connect template · sh-fpv-footer-boundaries → HTML/CSS
// Every variant: sh-fpv-footer-boundaries.html · styles: sh-text-link.css + sh-fpv-footer-boundaries.css
// (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The link opens sh-fpv-sheet-manage-boundaries (Step=Choose).

import figma from "figma"

export default {
  id: "sh-fpv-footer-boundaries",
  example: figma.code`<div class="sh-fpv-footer-boundaries">
  <p class="sh-fpv-footer-boundaries__title sh-title-sm">Manage your boundaries</p>
  <button class="sh-fpv-footer-boundaries__link sh-text-link sh-text-link--neutral sh-text-link--sm" type="button" aria-haspopup="dialog"><span class="sh-text-link__label sh-button-sm">Hide, Report or Block Profile</span></button>
</div>`,
}
