// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2643-35319
// component=sh-list-default
// Code Connect template · sh-list-default → HTML/CSS
// Every variant: sh-list-default.html · styles: sh-list-default.css (needs tokens.css, sh-typo.css, sh-icon.css,
// sh-divider.css, plus the slot's part: sh-checkbox / sh-avatar / sh-tag / sh-toggle / sh-button / sh-indicator)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// "Title icon", "Leading icon", "Trailing icon", "Pictogram", "Control" and "Action" are instance swaps; the snippet
// shows each default — swap the --icon URL / part markup for what is picked in Figma.

import figma from "figma"

const title = figma.selectedInstance.getString("Title")
const showSubtitle = figma.selectedInstance.getBoolean("Show subtitle")
const subtitle = figma.selectedInstance.getString("Subtitle")
const showTitleIcon = figma.selectedInstance.getBoolean("Show title icon")
const showValueCaption = figma.selectedInstance.getBoolean("Show value caption")
const valueCaption = figma.selectedInstance.getString("Value caption")
const value = figma.selectedInstance.getString("Value")
const showDivider = figma.selectedInstance.getBoolean("Show divider")
const leading = figma.selectedInstance.getEnum("Leading", {
  None: "none",
  Icon: "icon",
  "Icon circle": "icon-circle",
  Pictogram: "pictogram",
  Avatar: "avatar",
  Control: "control",
})
const trailing = figma.selectedInstance.getEnum("Trailing", {
  None: "none",
  Chevron: "chevron",
  Value: "value",
  Tag: "tag",
  Toggle: "toggle",
  Action: "action",
  Meta: "meta",
})
const style = figma.selectedInstance.getEnum("Style", { Default: "", Inline: " sh-list-default--inline" })

const icon = (name: string, size: number, cls: string) =>
  `<span class="${cls} sh-icon sh-icon--${size}" style="--icon:url(icons/line/${name}.svg)" aria-hidden="true"></span>`

const leadingMarkup =
  leading === "icon"
    ? icon("contact", 20, "sh-list-default__icon")
    : leading === "icon-circle"
      ? `<span class="sh-list-default__icon-circle">${icon("contact", 20, "sh-list-default__icon")}</span>`
      : leading === "pictogram"
        ? '<img class="sh-list-default__pictogram sh-icon" src="icons/pictogram/premium-crown@2x.png" alt="">'
        : leading === "avatar"
          ? '<span class="sh-avatar sh-avatar--md sh-avatar--image" aria-hidden="true"><span class="sh-avatar__media"><span class="sh-user-image"><img src="member.jpg" alt=""></span></span></span>'
          : leading === "control"
            ? '<label class="sh-checkbox"><input class="sh-checkbox__input" type="checkbox" aria-labelledby="row-title"><span class="sh-checkbox__box" aria-hidden="true"><span class="sh-icon sh-icon--16 sh-checkbox__icon" style="--icon:url(icons/filled/check.svg)"></span></span></label>'
            : ""

const caption = showValueCaption ? `<span class="sh-list-default__value-caption sh-body-sm">${valueCaption}</span>` : ""
const trailingMarkup =
  trailing === "chevron"
    ? icon("arrow-right-01", 20, "sh-list-default__icon")
    : trailing === "value"
      ? `${caption}<span class="sh-list-default__value sh-title-md">${value}</span>`
      : trailing === "tag"
        ? '<span class="sh-tag sh-tag--sm"><span class="sh-tag__label sh-support-label">New</span></span>'
        : trailing === "toggle"
          ? '<label class="sh-toggle"><input class="sh-toggle__input" type="checkbox" role="switch" aria-labelledby="row-title"><span class="sh-toggle__track" aria-hidden="true"><span class="sh-toggle__thumb"><span class="sh-icon sh-icon--16 sh-toggle__icon" style="--icon:url(icons/filled/check.svg)"></span></span></span></label>'
          : trailing === "action"
            ? '<button class="sh-button sh-button--ghost sh-button--sm" type="button"><span class="sh-button__text"><span class="sh-button__label sh-button-sm">Edit</span></span></button>'
            : trailing === "meta"
              ? `<span class="sh-list-default__value-caption sh-body-sm">${valueCaption}</span><span class="sh-indicator"><span class="sh-indicator__count sh-support-label">3</span></span>`
              : ""

const mods =
  (leading === "none" ? "" : ` sh-list-default--${leading}`) + (trailing === "none" ? "" : ` sh-list-default--${trailing}`) + style
const tappable = trailing === "chevron" || trailing === "meta"
const open = tappable ? '<a class="sh-list-default__row" href="#">' : '<div class="sh-list-default__row">'
const close = tappable ? "</a>" : "</div>"
const titleStyle = style !== "" && leading === "icon" ? "sh-body-lg" : "sh-body-md"
const titleIcon = showTitleIcon ? icon("information-circle", 16, "sh-list-default__title-icon") : ""
const sub = showSubtitle ? `<span class="sh-list-default__subtitle sh-body-sm">${subtitle}</span>` : ""
const lead = leadingMarkup ? `<span class="sh-list-default__leading">${leadingMarkup}</span>` : ""
const trail = trailingMarkup ? `<span class="sh-list-default__trailing">${trailingMarkup}</span>` : ""
const divider = showDivider ? '<hr class="sh-list-default__divider sh-divider sh-divider--soft">' : ""

export default {
  id: "sh-list-default",
  example: figma.code`<div class="sh-list-default${mods}">${open}${lead}<span class="sh-list-default__content"><span class="sh-list-default__title-row"><span class="sh-list-default__title ${titleStyle}" id="row-title">${title}</span>${titleIcon}</span>${sub}</span>${trail}${close}${divider}</div>`,
}
