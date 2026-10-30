// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2877-20760
// component=sh-fpv-photo-album-stack
// Code Connect template · sh-fpv-photo-album-stack → HTML/CSS
// Every variant: sh-fpv-photo-album-stack.html · styles: sh-user-images.css + sh-fpv-photo-album-stack.css
// (needs tokens.css, sh-typo.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// One __photo per photo, back first, front last. 4+: "+N" = her album count − 4.

import figma from "figma"

const count = figma.selectedInstance.getEnum("Count", {
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "4+": "4+",
  Blurred: "Blurred",
})

const mod = {
  "1": "",
  "2": " sh-fpv-photo-album-stack--2",
  "3": " sh-fpv-photo-album-stack--3",
  "4": " sh-fpv-photo-album-stack--4",
  "4+": " sh-fpv-photo-album-stack--4-plus",
  Blurred: " sh-fpv-photo-album-stack--blurred",
}[count]
const n = { "1": 1, "2": 2, "3": 3, "4": 4, "4+": 4, Blurred: 4 }[count]
const blur = count === "Blurred" ? " sh-user-image--blur" : ""
const counter =
  count === "4+"
    ? '<span class="sh-fpv-photo-album-stack__counter"><span class="sh-fpv-photo-album-stack__count sh-heading-md">+4</span><span class="sh-fpv-photo-album-stack__count-label sh-title-sm">photos</span></span>'
    : ""

let photos = ""
for (let i = n; i >= 1; i--) {
  const extra = i === 1 ? counter : ""
  photos += `\n    <div class="sh-fpv-photo-album-stack__photo sh-user-image${blur}"><img src="photo-${i}.jpg" alt="">${extra}</div>`
}

export default {
  id: "sh-fpv-photo-album-stack",
  example: figma.code`<div class="sh-fpv-photo-album-stack${mod}">
  <div class="sh-fpv-photo-album-stack__frame">${photos}
  </div>
</div>`,
}
