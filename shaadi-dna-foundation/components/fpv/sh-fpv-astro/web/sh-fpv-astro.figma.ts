// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-20577
// component=sh-fpv-astro
// Code Connect template · sh-fpv-astro → HTML/CSS
// Every variant: sh-fpv-astro.html · styles: sh-fpv-section-title.css (+ sh-button, sh-fpv-asset-premium-badge) +
// sh-progress-ring.css + sh-divider.css + sh-list.css + sh-list-default.css + sh-list-report.css + sh-graphic.css +
// sh-blur-overlay.css + sh-fpv-astro.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Score only when both added and 18/36 or more (South 6/10). Ring amount: stroke-dasharray="<percent> 100".
// See full match → Astro match sheet · Unlock → premium plans · download (Premium, 10 a day).
// The badge and Astro art are not in the repo.

import figma from "figma"

const verdict = figma.selectedInstance.getBoolean("Verdict")
const state = figma.selectedInstance.getEnum("State", {
  "Both added · Free": "free",
  "She hasn't added": "she-hasnt-added",
  "You haven't added": "you-havent-added",
  "Neither added": "neither-added",
  "Request sent": "request-sent",
  "Both added · Premium": "premium",
})
const chart = figma.selectedInstance.getEnum("Chart", {
  North: { mod: "", score: "28", total: "36", pct: "78", name: "Guna match", unit: "gunas" },
  South: { mod: " sh-fpv-astro--south", score: "7", total: "10", pct: "70", name: "Porutham match", unit: "poruthams" },
})

const premium = state === "premium"
const badge = premium
  ? '<span class="sh-fpv-section-title__badge sh-fpv-asset-premium-badge"><img class="sh-fpv-asset-premium-badge__art" src="premium-badge-art.png" alt="Premium feature"></span>'
  : ""
const action = `<button class="sh-fpv-section-title__action sh-button sh-button--${premium ? "tertiary" : "premium-soft"} sh-button--sm" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-sm">${premium ? "View" : "Unlock"}</span></span></button>`
const title = `<div class="sh-fpv-section-title"><div class="sh-fpv-section-title__top"><div class="sh-fpv-section-title__title-group"><div class="sh-fpv-section-title__title-row"><h2 class="sh-fpv-section-title__title sh-heading-sm" id="astro-title">Astro Compatibility</h2>${badge}</div></div>${action}</div></div>`

const report = (t: string, sub: string) =>
  premium
    ? `<div class="sh-fpv-astro__report"><div class="sh-list sh-list--report"><div class="sh-list-report sh-list-report--download"><button class="sh-list-default__row" type="button"><span class="sh-list-default__content"><span class="sh-list-default__title-row"><span class="sh-list-default__title sh-body-lg">${t}</span></span><span class="sh-list-default__subtitle sh-body-md">${sub}</span></span><span class="sh-list-default__trailing"><span class="sh-list-default__icon sh-icon sh-icon--20" style="--icon:url(icons/line/download.svg)" role="img" aria-label="Download"></span></span></button></div></div></div>`
    : `<div class="sh-fpv-astro__report"><div class="sh-list sh-list--report"><div class="sh-list-report sh-list-report--premium-lock"><div class="sh-list-default__row"><span class="sh-list-default__content"><span class="sh-list-default__title-row"><span class="sh-list-default__title sh-body-lg">${t}</span></span><span class="sh-list-default__subtitle sh-body-md">${sub}</span></span><span class="sh-list-default__trailing"><span class="sh-list-report__lock sh-icon sh-icon--16" style="--icon:url(icons/filled/lock.svg)" role="img" aria-label="Locked"></span></span></div></div></div></div>`

const missing: Record<string, string[]> = {
  "she-hasnt-added": ["Meher hasn’t added her birth details yet", "Ask Meher to add", ""],
  "you-havent-added": ["Add your birth details to see your Astro match with Meher", "Add my birth details", ""],
  "neither-added": ["Add your birth details, then ask Meher to add hers", "Add my birth details", ""],
  "request-sent": ["Waiting on Meher to add her birth details", "Sent", "check"],
}
const lock = (m: string[]) =>
  `<section class="sh-fpv-astro__lock sh-blur-overlay" aria-label="Astro Compatibility locked"><div class="sh-blur-overlay__visual"><div class="sh-blur-overlay__backdrop sh-graphic sh-graphic--backdrop" aria-hidden="true"></div><div class="sh-blur-overlay__graphic sh-graphic"><img class="sh-graphic__art" src="astro-art.png" alt=""></div></div><div class="sh-blur-overlay__message"><p class="sh-blur-overlay__reason sh-body-lg">${m[0]}</p><button class="sh-button sh-button--tertiary sh-button--md" type="button"${m[2] ? ' aria-disabled="true"' : ""}>${m[2] ? `<span class="sh-button__icon sh-icon" style="--icon:url(icons/filled/${m[2]}.svg)" aria-hidden="true"></span>` : ""}<span class="sh-button__text"><span class="sh-button__label sh-button-md">${m[1]}</span></span></button></div></section>`

const c = chart || { mod: "", score: "28", total: "36", pct: "78", name: "Guna match", unit: "gunas" }
const both =
  `<div class="sh-fpv-astro__score"><div class="sh-fpv-astro__ring sh-progress-ring" role="meter" aria-label="Astro match" aria-valuemin="0" aria-valuemax="${c.total}" aria-valuenow="${c.score}"><svg class="sh-progress-ring__arcs" aria-hidden="true"><circle class="sh-progress-ring__track"></circle><circle class="sh-progress-ring__progress" pathLength="100" stroke-dasharray="${c.pct} 100"></circle></svg><span class="sh-progress-ring__value" aria-hidden="true"><span class="sh-progress-ring__number sh-heading-md">${c.score}</span><span class="sh-progress-ring__total sh-body-sm-tight">of ${c.total}</span></span></div><div class="sh-fpv-astro__summary"><p class="sh-fpv-astro__summary-title sh-title-lg">${c.name}</p><p class="sh-fpv-astro__summary-text sh-body-md">Based on the birth details you and Meher shared</p></div></div>` +
  (verdict ? '<div class="sh-fpv-astro__verdict"><p class="sh-fpv-astro__verdict-title sh-title-lg">Excellent Match</p><p class="sh-fpv-astro__verdict-text sh-body-md">Strong in Health, Mindset and Destiny</p></div>' : "") +
  `<div class="sh-fpv-astro__reports">${report("Meher’s Kundali", "Her birth chart and planets")}<hr class="sh-divider sh-divider--soft">${report("Compatibility report", `${c.score} of ${c.total} ${c.unit} match`)}</div>` +
  (premium ? '<p class="sh-fpv-astro__downloads sh-body-sm">8 of 10 downloads left today</p>' : "") +
  '<div class="sh-fpv-astro__more"><button class="sh-button sh-button--tertiary sh-button--md" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-md">See full match</span></span><span class="sh-button__icon sh-icon" style="--icon:url(icons/line/arrow-down-01.svg)" aria-hidden="true"></span></button></div>'

const isMissing = state !== "free" && state !== "premium"
const body = isMissing ? lock(missing[state as string]) : both
const mods = isMissing ? ` sh-fpv-astro--${state}` : (premium ? " sh-fpv-astro--premium" : "") + c.mod

export default {
  id: "sh-fpv-astro",
  example: figma.code`<section class="sh-fpv-astro${mods}" aria-labelledby="astro-title">${title}${body}</section>`,
}
