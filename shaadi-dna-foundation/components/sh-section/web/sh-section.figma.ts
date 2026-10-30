// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2613-34398
// component=sh-section
// Code Connect template · sh-section → HTML/CSS
// Every variant: sh-section.html · styles: sh-section.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-button.css,
// sh-section-header.css, and the CSS of the content)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The Header is a nested sh-section-header: the snippet shows its default (title + Premium Soft "Unlock"); use the
// title, badge and action set in Figma. "Content slot" holds any DNA content; put its markup in __content.

import figma from "figma"

const showHeader = figma.selectedInstance.getBoolean("Show header")

const headerHtml = showHeader
  ? `\n  <header class="sh-section-header">
    <div class="sh-section-header__title-group"><h2 class="sh-section-header__title sh-heading-sm">Section title</h2></div>
    <button class="sh-section-header__action sh-button sh-button--premium-soft sh-button--sm" type="button">
      <span class="sh-button__text"><span class="sh-button__label sh-button-sm">Unlock</span></span>
    </button>
  </header>`
  : ""

export default {
  id: "sh-section",
  example: figma.code`<section class="sh-section">${headerHtml}
  <div class="sh-section__content">
    <!-- Content slot: any DNA content -->
  </div>
</section>`,
}
