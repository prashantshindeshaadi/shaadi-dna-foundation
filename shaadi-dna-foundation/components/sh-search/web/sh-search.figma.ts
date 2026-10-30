// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2597-29917
// component=sh-search
// Code Connect template · sh-search → HTML/CSS
// Every variant: sh-search.html · styles: sh-search.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// "Leading icon" / "Trailing icon" are instance swaps of sh-icon (defaults sh-icon/search, sh-icon/close);
// swap the --icon URL for the one picked in Figma. The clear button hides itself while the field is empty.

import figma from "figma"

const text = figma.selectedInstance.getString("Text")
// State Default → the text is the placeholder; Filled → it is the typed value (and the clear button shows)
const filled = figma.selectedInstance.getEnum("State", { Filled: true })

export default {
  id: "sh-search",
  example: figma.code`<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-search/web/sh-search.css">

<label class="sh-search">
  <span class="sh-search__icon sh-icon sh-icon--16" style="--icon:url(icons/line/search.svg)" aria-hidden="true"></span>
  <input class="sh-search__field sh-body-md" type="search" ${filled ? `value="${text}"` : `placeholder="${text}"`} aria-label="Search">
  <button class="sh-search__clear" type="button" aria-label="Clear search">
    <span class="sh-search__icon sh-icon sh-icon--16" style="--icon:url(icons/line/close.svg)" aria-hidden="true"></span>
  </button>
</label>`,
}
