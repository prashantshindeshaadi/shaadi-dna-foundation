// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-15742
// component=sh-list-info
// Code Connect template · sh-list-info → HTML/CSS
// Every variant: sh-list-info.html · styles: sh-list-info.css (needs tokens.css, sh-typo.css, sh-icon.css,
// sh-fpv-locked-text.css for the masked values)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The icon and text are per-variant defaults in Figma (diet, income, call, email, university, calendar-range):
// swap the --icon URL and write the member's detail. Masked values keep ONE lock, always last.

import figma from "figma"

const lines = figma.selectedInstance.getEnum("Lines", { Single: "", Double: " sh-list-info--double" })
const contentType = figma.selectedInstance.getEnum("Content", {
  Text: "text",
  "Masked Phone": "masked-phone",
  "Masked Email": "masked-email",
  Masked: "masked",
  "Masked Value": "masked-value",
})

const dot = '<span class="sh-fpv-locked-text__dot sh-icon"></span>'
const sep = '<span class="sh-fpv-locked-text__separator"></span>'
const lock = '<span class="sh-fpv-locked-text__lock sh-icon sh-icon--12" style="--icon:url(icons/filled/lock.svg)" aria-hidden="true"></span>'
const mask = (inner: string) =>
  `<span class="sh-fpv-locked-text__mask" style="--icon:url(icons/filled/asterisk.svg)" aria-hidden="true">${inner}</span>`
const text = (t: string) => `<span class="sh-list-info__text sh-body-lg-tight">${t}</span>`
const icon = (n: string) => `<span class="sh-list-info__icon sh-icon sh-icon--20" style="--icon:url(icons/line/${n}.svg)" aria-hidden="true"></span>`

const iconName =
  contentType === "masked-phone" ? "call"
  : contentType === "masked-email" ? "email"
  : contentType === "masked" ? "university"
  : contentType === "masked-value" ? "calendar-range"
  : lines === "" ? "diet" : "income"
const leading = lines === "" ? icon(iconName) : `<span class="sh-list-info__icon-box">${icon(iconName)}</span>`
const body =
  contentType === "masked-phone"
    ? text("+91 8042") + `<span class="sh-fpv-locked-text" role="img" aria-label="Rest of the number hidden. Upgrade to view">${mask(dot.repeat(6))}${lock}</span>`
    : contentType === "masked-email"
      ? `<span class="sh-fpv-locked-text" role="img" aria-label="Email hidden, at gmail.com. Upgrade to view">${mask(dot.repeat(6))}${text("@gmail.com")}${lock}</span>`
      : contentType === "masked"
        ? text("B.E. Computer Science") + `<span class="sh-fpv-locked-text" role="img" aria-label="College name hidden. Upgrade to view">${mask(dot.repeat(6))}${lock}</span>`
        : contentType === "masked-value"
          ? text("Born on") + `<span class="sh-fpv-locked-text sh-fpv-locked-text--date-of-birth" role="img" aria-label="Date of birth hidden. Upgrade to view">${mask(dot + dot + sep + dot + dot + sep + dot + dot)}${lock}</span>`
          : lines === ""
            ? text("Non-Vegetarian")
            : text("Earns ₹15 – 20 Lakh") + '<span class="sh-list-info__support sh-body-md-tight">Annual income</span>'
const mod = contentType === "text" ? "" : ` sh-list-info--${contentType}`

export default {
  id: "sh-list-info",
  example: figma.code`<div class="sh-list-info${lines}${mod}">${leading}<span class="sh-list-info__content">${body}</span></div>`,
}
