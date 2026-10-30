// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2470-15412
// component=sh-data-point
// Code Connect template · sh-data-point → HTML/CSS
// Every variant: sh-data-point.html · styles: sh-data-point.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// "Icon" / "Trailing icon" are instance swaps of sh-icon. The snippet shows the defaults (sh-icon/trelation,
// sh-icon/check-circle); swap the --icon URL for the one picked in Figma.

import figma from "figma"

const label = figma.selectedInstance.getString("Label")
const showIcon = figma.selectedInstance.getBoolean("Show icon")
const subtext = figma.selectedInstance.getString("Subtext")
const showSubtext = figma.selectedInstance.getBoolean("Show subtext")
const showMaskBefore = figma.selectedInstance.getBoolean("Show mask before")
const showMaskAfter = figma.selectedInstance.getBoolean("Show mask after")
const showLock = figma.selectedInstance.getBoolean("Show lock")
const overline = figma.selectedInstance.getString("Overline")
const showOverline = figma.selectedInstance.getBoolean("Show overline")
const showTrailingIcon = figma.selectedInstance.getBoolean("Show trailing icon")
const value = figma.selectedInstance.getString("Value")
const showValue = figma.selectedInstance.getBoolean("Show value")
const size = figma.selectedInstance.getEnum("Size", { sm: "", md: " sh-data-point--md", lg: " sh-data-point--lg" })
const labelStyle = figma.selectedInstance.getEnum("Size", { sm: "sh-body-sm", md: "sh-body-md", lg: "sh-body-lg" })
const overlineStyle = figma.selectedInstance.getEnum("Size", { sm: "sh-support-micro", md: "sh-body-sm", lg: "sh-body-sm" })
const subtextStyle = figma.selectedInstance.getEnum("Size", { sm: "sh-body-sm", md: "sh-body-sm", lg: "sh-body-md" })
const iconStyle = figma.selectedInstance.getEnum("Icon style", { Plain: "", Circle: " sh-data-point--circle" })
const state = figma.selectedInstance.getEnum("State", { Included: "", Excluded: " sh-data-point--excluded" })
const excluded = figma.selectedInstance.getEnum("State", { Included: false, Excluded: true })

const star = '<span class="sh-icon" style="--icon:url(icons/filled/asterisk.svg)"></span>'
const mask = `<span class="sh-data-point__mask" aria-hidden="true">${star.repeat(6)}</span>`
const iconHtml = showIcon
  ? `\n  <span class="sh-data-point__icon-box"><span class="sh-data-point__icon sh-icon" style="--icon:url(icons/line/trelation.svg)" aria-hidden="true"></span></span>`
  : ""
const overlineHtml = showOverline ? `\n    <p class="sh-data-point__overline ${overlineStyle}">${overline}</p>` : ""
const subtextHtml = showSubtext ? `\n    <p class="sh-data-point__subtext ${subtextStyle}">${subtext}</p>` : ""
const lockHtml = showLock
  ? '<span class="sh-data-point__lock sh-icon" style="--icon:url(icons/line/lock.svg)" role="img" aria-label="Hidden"></span>'
  : ""
const hiddenHtml = excluded ? ' <span class="sh-visually-hidden">(not included)</span>' : ""
const valueHtml = showValue ? `\n  <span class="sh-data-point__value ${labelStyle}">${value}</span>` : ""
const trailingHtml = showTrailingIcon
  ? '\n  <span class="sh-data-point__trailing sh-icon" style="--icon:url(icons/line/check-circle.svg)" aria-hidden="true"></span>'
  : ""

export default {
  id: "sh-data-point",
  example: figma.code`<div class="sh-data-point${size}${iconStyle}${state}">${iconHtml}
  <div class="sh-data-point__content">${overlineHtml}
    <div class="sh-data-point__row">${showMaskBefore ? mask : ""}<span class="sh-data-point__label ${labelStyle}">${label}</span>${showMaskAfter ? mask : ""}${lockHtml}${hiddenHtml}</div>${subtextHtml}
  </div>${valueHtml}${trailingHtml}
</div>`,
}
