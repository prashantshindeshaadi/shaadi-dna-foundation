# sh-blur-overlay: one blur lock for every gated FPV section

**2026-10-27**

## What changed
- `sh-fpv-tit-for-tat-card` is now **`sh-blur-overlay`**, a core component (Core Component page, "06 Sheets & overlays"). Blueprint moved to `components/sh-blur-overlay/`.
- New **Unlock** switch:
  - **Self**: Tertiary button. Add yours, connect, ask her.
  - **Upgrade**: Premium Soft button. Pay to see.
- New **Graphic** slot: full width, 3:1. This is where each section's own graphic will go. For now it holds the old art circle.
- The **Art** and **CTA** properties are removed. Figma can't link either one into a slot or a nested button. Change the graphic in the slot and the label on the button.
- Layout follows the Education & Career mock-up:
  - **Blur**: holds **Sample**, the section's own visible state, with its title hidden.
  - **Content**: fades from clear to `background/default`. Holds **Graphic**, then **Message** (Reason + Button).
- Every layer is bound to `sh-space` tokens. The card hugs its content, so a long reason no longer crops the graphic.
- **Blur bleeds 20 px past each side.** The blurred sample is a whole section with its own 20 side padding, so this puts the blurred content exactly where the real content sits (photos line up with the Visible state).
- `sh-fpv-photo-break` (Accept gated, Upgrade gated, Tit for tat) and `sh-fpv-photo-album` (all 15 gated variants) now use `sh-blur-overlay` instead of hand-built copies:
  - Blurred sample = the section's own photos (photo break Gate=Visible, or the matching album stack).
  - Upgrade gates use Unlock=Upgrade.
- All 28 existing uses keep their art, reason and button label. Uses of the photo sets had no text overrides, so they follow the mains.

## Why
One lock component, built one way, wherever a section is gated, instead of a tit-for-tat card plus hand-built photo copies. Section graphics can be dropped into one slot later.

## Who needs to do something
- **Designers:** for any gated section, place `sh-blur-overlay`, pick Unlock, swap Blurred sample to that section's visible state, write the Reason and the button label.
- **Web / Android / iOS:** one `BlurOverlay(unlock: self|upgrade, sample, graphic, reason, cta)`. Blur the section's real content at `background/blur/soft`. Fade to the page colour from 60%. Hide the section title inside the sample.

## Open
- `sh-overlay` still has an unused **Surface=Content, Type=Message** variant (0 uses) doing the same job. Proposed: remove it.
- Section graphics (3:1) for Astro, Lifestyle, Education & Career, Family, Contact and Photos are still to come. The Education & Career mock-up's date/clock/pin art fits Astro.

## Checks
- [x] `python3 tools/check.py` passes
- [x] Renders checked: Astro, Photo break (Tit for tat, Upgrade), Photo album (Accept, Upgrade 4+)

## Later: sh-graphic, one library of section graphics
- New core **`sh-graphic`**: 3:1, with a **Graphic** dropdown: Astro · Lifestyle · Education & Career · Family · Contact · Photos · Placeholder. It fills any width and keeps 3:1.
  - **Astro** has the final art: date, clock and pin, soft gradient.
  - The other sections show their old circle + pictogram as a stand-in until the final art lands. Then only that variant changes.
- The `sh-blur-overlay` **Graphic** slot now holds an `sh-graphic` instance in all 59 places: the 2 mains (Astro, as the example), Astro 14, Photos 36, Family 3, Contact 2, Education & Career 2, Lifestyle 2. Each use keeps the art it had.
- Removed, now unused and replaced by sh-graphic: `sh-fpv-asset/astro-card-art`, `sh-fpv-asset/ask-banner`, "Art · Astro · reference", "Art · placeholder" (and their blueprints).
- **Visual design:** add the final 3:1 art for a section to its Graphic variant (art fills the frame, no circle), and every overlay updates.
- **Developers:** `Graphic(section)` image at 3:1, full width of the overlay.
