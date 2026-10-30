// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-42776
// component=sh-select
// Code Connect template · sh-select → HTML/CSS
// Every variant: sh-select.html · styles: sh-select.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-menu-item.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The option rows are sh-menu-item (role="option"); edit them to the real list. Opening, closing and keyboard
// moves are the app's job: set aria-expanded on the control and aria-selected on the picked row.

import figma from "figma"

const label = figma.selectedInstance.getString("Label")
const value = figma.selectedInstance.getString("Value")
const helperText = figma.selectedInstance.getString("Helper text")
const showHelper = figma.selectedInstance.getBoolean("Show helper")
const state = figma.selectedInstance.getEnum("State", {
  Default: "",
  Filled: "",
  Open: "",
  Error: " sh-select--error",
  Disabled: "",
})
const empty = figma.selectedInstance.getEnum("State", { Default: true })
const open = figma.selectedInstance.getEnum("State", { Open: true })
const disabled = figma.selectedInstance.getEnum("State", { Disabled: " disabled" })
const invalid = figma.selectedInstance.getEnum("State", { Error: ' aria-invalid="true"' })

const support = showHelper
  ? `
  <div class="sh-select__support">
    <span class="sh-select__status sh-icon sh-icon--12" style="--icon:url(icons/line/help-circle.svg)" aria-hidden="true"></span>
    <span class="sh-select__helper sh-body-sm" id="select-help">${helperText}</span>
  </div>`
  : ""
const options = open
  ? `
  <ul class="sh-select__options" id="select-list" role="listbox" aria-label="${label}">
    <li class="sh-menu-item" role="option" aria-selected="true"><span class="sh-menu-item__label sh-body-md">${value}</span><span class="sh-menu-item__check sh-icon sh-icon--16" style="--icon:url(icons/filled/check.svg)" aria-hidden="true"></span></li>
    <li class="sh-menu-item" role="option" aria-selected="false"><span class="sh-menu-item__label sh-body-md">Muslim</span></li>
    <li class="sh-menu-item" role="option" aria-selected="false"><span class="sh-menu-item__label sh-body-md">Christian</span></li>
    <li class="sh-menu-item" role="option" aria-selected="false"><span class="sh-menu-item__label sh-body-md">Sikh</span></li>
  </ul>`
  : ""

export default {
  id: "sh-select",
  example: figma.code`<link rel="stylesheet" href="dist/css/tokens.css">
<link rel="stylesheet" href="dist/sh-typo-kit/developer/web/sh-typo.css">
<link rel="stylesheet" href="components/sh-icon/web/sh-icon.css">
<link rel="stylesheet" href="components/sh-menu-item/web/sh-menu-item.css">
<link rel="stylesheet" href="components/sh-select/web/sh-select.css">

<div class="sh-select${state}">
  <button class="sh-select__control" type="button" aria-haspopup="listbox" aria-expanded="${open ? "true" : "false"}" aria-controls="select-list"${showHelper ? ' aria-describedby="select-help"' : ""}${invalid || ""}${disabled || ""}>
    <span class="sh-select__content">
      <span class="sh-select__label sh-body-sm-loose">${label}</span>
      <span class="sh-select__value sh-body-md-tight">${empty ? "" : value}</span>
    </span>
    <span class="sh-select__chevron sh-icon sh-icon--16" style="--icon:url(icons/line/arrow-down-01.svg)" aria-hidden="true"></span>
  </button>${support}${options}
</div>`,
}
