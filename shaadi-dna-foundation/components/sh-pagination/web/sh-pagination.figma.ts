// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41908
// component=sh-pagination
// Code Connect template · sh-pagination → HTML/CSS
// Every variant: sh-pagination.html · styles: sh-pagination.css (needs tokens.css, sh-typo.css, sh-icon.css,
// sh-icon-button.css, sh-pagination-item.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// sh-pagination has no properties of its own. The snippet shows Figma's default pages (1 selected · 2 · 3 · … · 10);
// build the page list from the result count, and disable Previous / Next on the first / last page.

import figma from "figma"

export default {
  id: "sh-pagination",
  example: figma.code`<nav class="sh-pagination" aria-label="Pages">
  <button class="sh-icon-button sh-icon-button--tertiary sh-icon-button--md" type="button" aria-label="Previous"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/arrow-left-01.svg)" aria-hidden="true"></span></button>
  <a class="sh-pagination-item" href="?page=1" aria-current="page"><span class="sh-pagination-item__label sh-body-md">1</span></a>
  <a class="sh-pagination-item" href="?page=2"><span class="sh-pagination-item__label sh-body-md">2</span></a>
  <a class="sh-pagination-item" href="?page=3"><span class="sh-pagination-item__label sh-body-md">3</span></a>
  <span class="sh-pagination-item sh-pagination-item--gap" aria-hidden="true"><span class="sh-pagination-item__label sh-body-md">…</span></span>
  <a class="sh-pagination-item" href="?page=10"><span class="sh-pagination-item__label sh-body-md">10</span></a>
  <button class="sh-icon-button sh-icon-button--tertiary sh-icon-button--md" type="button" aria-label="Next"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/arrow-right-01.svg)" aria-hidden="true"></span></button>
</nav>`,
}
