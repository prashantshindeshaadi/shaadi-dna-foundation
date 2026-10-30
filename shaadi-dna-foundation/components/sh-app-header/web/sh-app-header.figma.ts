// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13153
// component=sh-app-header
// Code Connect template · sh-app-header → HTML/CSS
// Every variant: sh-app-header.html · styles: sh-app-header.css (needs tokens.css, sh-typo.css, sh-icon.css,
// sh-icon-button.css, sh-status-bar.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Actions slot renders the nested sh-icon-button snippets (Title and Back). Overlay's Back / Photo / More are fixed.
// The status bar is for mock-ups only: a real page leaves it out.

import figma from "figma"

const actionsSlot = figma.selectedInstance.getSlot("Actions slot")
const title = figma.selectedInstance.getString("Title")
const showStatusBar = figma.selectedInstance.getBoolean("Show status bar")
const type = figma.selectedInstance.getEnum("Type", {
  Overlay: {
    modifier: "",
    statusBar: "sh-status-bar sh-status-bar--dark",
    navigation: '<button class="sh-icon-button sh-icon-button--translucent sh-icon-button--sm" type="button" aria-label="Go back"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/arrow-left-01.svg)" aria-hidden="true"></span></button>',
    titleClass: "",
  },
  Title: {
    modifier: " sh-app-header--title",
    statusBar: "sh-status-bar",
    navigation: '<button class="sh-icon-button sh-icon-button--tertiary sh-icon-button--md" type="button" aria-label="Open menu"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/menu.svg)" aria-hidden="true"></span></button>',
    titleClass: "sh-heading-sm",
  },
  Back: {
    modifier: " sh-app-header--back",
    statusBar: "sh-status-bar",
    navigation: '<button class="sh-icon-button sh-icon-button--tertiary sh-icon-button--md" type="button" aria-label="Go back"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/arrow-left-01.svg)" aria-hidden="true"></span></button>',
    titleClass: "sh-title-lg",
  },
})
const isOverlay = figma.selectedInstance.getEnum("Type", { Overlay: true })

const statusBar = showStatusBar
  ? `\n  <div class="${type?.statusBar}" aria-hidden="true"><span class="sh-status-bar__time sh-body-md">12:30</span><span class="sh-status-bar__camera"></span><span class="sh-status-bar__icons"><span class="sh-icon sh-icon--16" style="--icon:url(icons/filled/signal.svg)"></span><span class="sh-icon sh-icon--16" style="--icon:url(icons/filled/battery.svg)"></span></span></div>`
  : ""
const titleHtml = isOverlay ? "" : `\n    <h1 class="sh-app-header__title ${type?.titleClass}">${title}</h1>`
const overlayActions = isOverlay
  ? '<button class="sh-icon-button sh-icon-button--translucent sh-icon-button--sm" type="button" aria-label="View photos"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/image.svg)" aria-hidden="true"></span></button><button class="sh-icon-button sh-icon-button--translucent sh-icon-button--sm" type="button" aria-label="More options"><span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/more-vertical.svg)" aria-hidden="true"></span></button>'
  : ""

export default {
  id: "sh-app-header",
  example: figma.code`<header class="sh-app-header${type?.modifier}">${statusBar}
  <div class="sh-app-header__bar">
    <div class="sh-app-header__navigation">${type?.navigation}</div>${titleHtml}
    <div class="sh-app-header__actions">${overlayActions}${isOverlay ? "" : actionsSlot}</div>
  </div>
</header>`,
}
