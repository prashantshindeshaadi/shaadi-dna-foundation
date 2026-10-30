// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13798
// component=sh-map-pin
// Code Connect template · sh-map-pin → HTML/CSS
// Every variant: sh-map-pin.html · styles: sh-map-pin.css (needs tokens.css, sh-typo.css, sh-user-images.css, sh-avatar.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// The photo is the nested sh-avatar: put the member's photo in the <img>. Position the pin on
// sh-map-background with position: absolute (tip = bottom centre).

import figma from "figma"

const state = figma.selectedInstance.getEnum("State", {
  Default: "",
  Selected: " sh-map-pin--selected",
  State3: "",
})
const pressed = figma.selectedInstance.getEnum("State", { Default: "false", Selected: "true", State3: "false" })
const avatarSize = figma.selectedInstance.getEnum("State", { Default: "sm", Selected: "md", State3: "sm" })

export default {
  id: "sh-map-pin",
  example: figma.code`<button class="sh-map-pin${state}" type="button" aria-pressed="${pressed}" aria-label="Sneha P, 2 km away">
  <span class="sh-map-pin__ring">
    <span class="sh-avatar sh-avatar--${avatarSize} sh-avatar--image" aria-hidden="true">
      <span class="sh-avatar__media"><span class="sh-user-image"><img src="member.jpg" alt=""></span></span>
    </span>
  </span>
  <span class="sh-map-pin__tail" aria-hidden="true"></span>
</button>`,
}
