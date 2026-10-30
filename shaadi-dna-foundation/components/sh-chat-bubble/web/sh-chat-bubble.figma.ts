// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2719-42995
// component=sh-chat-bubble
// Code Connect template · sh-chat-bubble → HTML/CSS
// Every variant: sh-chat-bubble.html · styles: sh-chat-bubble.css (needs tokens.css, sh-typo.css, sh-icon.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Status ticks are Filled sh-icon/check 12: one for Sent, two for Read, none for Received.

import figma from "figma"

const message = figma.selectedInstance.getString("Message")
const time = figma.selectedInstance.getString("Time")
const type = figma.selectedInstance.getEnum("Type", {
  Received: "",
  Sent: " sh-chat-bubble--sent",
  Read: " sh-chat-bubble--read",
})
const check = '<span class="sh-icon sh-icon--12" style="--icon:url(icons/filled/check.svg)"></span>'
const status = figma.selectedInstance.getEnum("Type", {
  Received: "",
  Sent: `\n    <span class="sh-chat-bubble__status" role="img" aria-label="Sent">${check}</span>`,
  Read: `\n    <span class="sh-chat-bubble__status" role="img" aria-label="Read">${check}${check}</span>`,
})

export default {
  id: "sh-chat-bubble",
  example: figma.code`<div class="sh-chat-bubble${type}">
  <p class="sh-chat-bubble__message sh-body-md">${message}</p>
  <p class="sh-chat-bubble__meta">
    <time class="sh-chat-bubble__time sh-support-meta">${time}</time>${status}
  </p>
</div>`,
}
