// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41740
// component=sh-menu
// Code Connect template · sh-menu → HTML/CSS
// Every variant: sh-menu.html · styles: sh-menu.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-menu-item.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// sh-menu has no properties of its own. The rows are sh-menu-item instances; the snippet shows Figma's
// default rows. Edit labels, icons and Type (destructive) to match the design; add or remove rows as needed.

import figma from "figma"

export default {
  id: "sh-menu",
  example: figma.code`<div class="sh-menu" role="menu" aria-label="More options">
  <button class="sh-menu-item" type="button" role="menuitem"><span class="sh-menu-item__icon sh-icon sh-icon--20" style="--icon:url(icons/line/bookmark.svg)" aria-hidden="true"></span><span class="sh-menu-item__label sh-body-md">Shortlist</span></button>
  <button class="sh-menu-item" type="button" role="menuitem"><span class="sh-menu-item__icon sh-icon sh-icon--20" style="--icon:url(icons/line/share.svg)" aria-hidden="true"></span><span class="sh-menu-item__label sh-body-md">Share profile</span></button>
  <button class="sh-menu-item sh-menu-item--destructive" type="button" role="menuitem"><span class="sh-menu-item__icon sh-icon sh-icon--20" style="--icon:url(icons/line/flag.svg)" aria-hidden="true"></span><span class="sh-menu-item__label sh-body-md">Report</span></button>
  <button class="sh-menu-item sh-menu-item--destructive" type="button" role="menuitem"><span class="sh-menu-item__icon sh-icon sh-icon--20" style="--icon:url(icons/line/user-block.svg)" aria-hidden="true"></span><span class="sh-menu-item__label sh-body-md">Block</span></button>
</div>`,
}
