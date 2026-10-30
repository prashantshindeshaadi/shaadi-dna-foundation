// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2891-64631
// component=sh-fpv-astro-sheet-breakdown
// Code Connect template · sh-fpv-astro-sheet-breakdown → HTML/CSS
// Every variant: sh-fpv-astro-sheet-breakdown.html · styles: sh-tab-item.css + sh-segmented-control.css + sh-list-default.css +
// sh-list-score.css + sh-list.css + sh-fpv-astro-sheet-breakdown.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-divider.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Style North = 8 kootas (points of 36), South = 10 poruthams (each of 1). Render one sh-list Type=Score row per koota
// from the match; a 0-point row takes sh-list-score--no-match. Two sample rows are shown.

import figma from "figma"

const row = (title: string, art: string, value: string, state = "") =>
  `<li class="sh-list sh-list--score"><div class="sh-list-score${state}"><div class="sh-list-default__row"><span class="sh-list-default__leading"><img class="sh-list-default__pictogram sh-icon" src="icons/pictogram/${art}" alt=""></span><span class="sh-list-default__content"><span class="sh-list-default__title-row"><span class="sh-list-default__title sh-body-lg">${title}</span></span></span><span class="sh-list-default__trailing"><span class="sh-list-default__value sh-body-lg">${value}</span></span></div></div></li>`
const seg = (label: string, selected: boolean) =>
  `<button class="sh-tab-item sh-tab-item--segmented" type="button" role="tab" aria-selected="${selected}"><span class="sh-tab-item__label ${selected ? "sh-button-md" : "sh-body-md"}">${label}</span></button>`

const mod = figma.selectedInstance.getEnum("Style", {
  North: "",
  South: " sh-fpv-astro-sheet-breakdown--south",
})
const segments = figma.selectedInstance.getEnum("Style", {
  North: seg("North", true) + seg("South", false),
  South: seg("North", false) + seg("South", true),
})
const rows = figma.selectedInstance.getEnum("Style", {
  North: row("Work", "koota-varna@2x.png", "1/1") + row("Health", "koota-nadi.svg", "0/8", " sh-list-score--no-match"),
  South: row("Health", "koota-dina@2x.png", "1/1") + row("Children", "koota-mahendra@2x.png", "0/1", " sh-list-score--no-match"),
})

export default {
  id: "sh-fpv-astro-sheet-breakdown",
  example: figma.code`<section class="sh-fpv-astro-sheet-breakdown${mod}"><div class="sh-fpv-astro-sheet-breakdown__koota"><div class="sh-fpv-astro-sheet-breakdown__filters"><h3 class="sh-fpv-astro-sheet-breakdown__filters-title sh-title-sm">Compatibility details</h3><div class="sh-segmented-control" role="tablist" aria-label="Chart">${segments}</div></div><ul class="sh-fpv-astro-sheet-breakdown__rows" role="list">${rows}</ul></div></section>`,
}
