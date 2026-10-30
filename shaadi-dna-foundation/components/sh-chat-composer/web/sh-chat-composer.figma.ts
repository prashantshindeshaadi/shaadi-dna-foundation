// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2719-43030
// component=sh-chat-composer
// Code Connect template · sh-chat-composer → HTML/CSS
// Every variant: sh-chat-composer.html · styles: sh-chat-composer.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-icon-button.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// "Text" is the placeholder when State=Empty and the typed message when State=Typing.
// Send is disabled while the input is empty; toggle it from the input's value in your code.

import figma from "figma"

const text = figma.selectedInstance.getString("Text")
const typing = figma.selectedInstance.getEnum("State", { Empty: false, Typing: true })

const inputHtml = typing
  ? `<input class="sh-chat-composer__input sh-body-md" type="text" placeholder="Type a message" aria-label="Message" value="${text}">`
  : `<input class="sh-chat-composer__input sh-body-md" type="text" placeholder="${text}" aria-label="Message">`
const sendDisabled = typing ? "" : " disabled"

export default {
  id: "sh-chat-composer",
  example: figma.code`<form class="sh-chat-composer">
  <button class="sh-icon-button sh-icon-button--ghost sh-icon-button--md" type="button" aria-label="Attach">
    <span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/attachment.svg)" aria-hidden="true"></span>
  </button>
  <label class="sh-chat-composer__field">
    ${inputHtml}
    <button class="sh-chat-composer__sticker" type="button" aria-label="Stickers">
      <span class="sh-icon sh-icon--20" style="--icon:url(icons/line/sticker.svg)" aria-hidden="true"></span>
    </button>
  </label>
  <button class="sh-icon-button sh-icon-button--primary sh-icon-button--md" type="submit" aria-label="Send"${sendDisabled}>
    <span class="sh-icon-button__icon sh-icon" style="--icon:url(icons/line/send.svg)" aria-hidden="true"></span>
  </button>
</form>`,
}
