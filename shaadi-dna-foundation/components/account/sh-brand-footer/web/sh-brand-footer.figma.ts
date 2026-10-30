// url=https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13754
// component=sh-brand-footer
// Code Connect template · sh-brand-footer → HTML/CSS
// Every variant: sh-brand-footer.html · styles: sh-brand-footer.css (needs tokens.css, sh-typo.css, sh-icon.css, sh-divider.css)
// Publish: npx figma connect publish   (needs FIGMA_ACCESS_TOKEN)
//
// Story slot: the snippet shows the default success-story card; put the story's photo, couple and line in it,
// or replace the slot's content with what the designer placed there.

import figma from "figma"

const showStory = figma.selectedInstance.getBoolean("Show story")

const storyHtml = showStory
  ? `
  <div class="sh-brand-footer__story-slot">
    <figure class="sh-brand-footer__story">
      <img class="sh-brand-footer__photo" src="story.jpg" width="144" height="120" alt="Radhika and Yash">
      <figcaption>
        <span class="sh-brand-footer__couple sh-title-md">Radhika &amp; Yash</span>
        <span class="sh-brand-footer__found sh-support-label">Found love on Shaadi</span>
      </figcaption>
    </figure>
  </div>`
  : ""

export default {
  id: "sh-brand-footer",
  example: figma.code`<footer class="sh-brand-footer">${storyHtml}
  <p class="sh-brand-footer__tagline sh-heading-lg">Every <span class="sh-brand-footer__accent">Story</span><br>Begins Here</p>
  <hr class="sh-divider sh-divider--soft">
  <p class="sh-brand-footer__crafted sh-body-md">Crafted with
    <span class="sh-icon sh-icon--16 sh-brand-footer__heart" style="--icon:url(icons/filled/favourite.svg)" role="img" aria-label="love"></span>
    in <span lang="mr">आमची मुंबई</span></p>
</footer>`,
}
