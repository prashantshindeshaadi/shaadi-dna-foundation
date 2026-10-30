// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2719-42965
// component=sh-date-picker
// Code Connect template · sh-date-picker → HTML/CSS
// Every variant: sh-date-picker.html · styles: sh-date-picker.css (needs tokens.css, sh-typo.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The row values are layer text in Figma (no properties), so the snippet shows the Figma defaults. Fill each column
// with the real range; scrolling the checked row to the band is the app's job.

import figma from "figma"

const type = figma.selectedInstance.getEnum("Type", {
  Date: "date",
  Time: "time",
})

function column(name: string, label: string, values: string[], checked: string, extra = "") {
  const rows = values
    .map(
      (v) =>
        `<label class="sh-date-picker__option"><input type="radio" name="${name}" value="${v}"${v === checked ? " checked" : ""}><span class="sh-body-md">${v}</span></label>`,
    )
    .join("\n    ")
  return `
  <fieldset class="sh-date-picker__column${extra}" aria-label="${label}">${extra ? `
    <span class="sh-date-picker__spacer" aria-hidden="true"></span><span class="sh-date-picker__spacer" aria-hidden="true"></span>` : ""}
    ${rows}
  </fieldset>`
}

const columns =
  type === "time"
    ? column("call-hour", "Hour", ["08", "09", "10", "11", "12"], "10") +
      column("call-minute", "Minute", ["20", "25", "30", "35", "40"], "30") +
      column("call-period", "AM or PM", ["AM", "PM"], "AM", " sh-date-picker__column--period")
    : column("dob-day", "Day", ["12", "13", "14", "15", "16"], "14") +
      column("dob-month", "Month", ["Jun", "Jul", "Aug", "Sep", "Oct"], "Aug") +
      column("dob-year", "Year", ["1994", "1995", "1996", "1997", "1998"], "1996")
const groupLabel = type === "time" ? "Preferred call time" : "Date of birth"

export default {
  id: "sh-date-picker",
  example: figma.code`<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-date-picker/web/sh-date-picker.css">

<div class="sh-date-picker" role="group" aria-label="${groupLabel}">
  <span class="sh-date-picker__band" aria-hidden="true"></span>${columns}
</div>`,
}
