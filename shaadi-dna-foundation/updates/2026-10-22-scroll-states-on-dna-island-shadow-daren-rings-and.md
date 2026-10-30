# Scroll States on DNA, island shadow, Daren rings and astro

**2026-10-22**

## What changed

### Scroll States adopted (FPV page)
- The "Scroll States" section (First Fold, On Scroll, Last Scroll) was Daren's flow pasted as is: 75 instances from his library plus detached frames. It is now built only from DNA components:
  - Content widgets (47) → `sh-fpv-header`, `-compatibility`, `-about`, `-section-divider`, `-lifestyle`, `-photo-break`, `-contact`, `-education-career`, `-family-details`, `-astro`, `-photo-album`, `-footer`. Variants match the free-viewer case: Free / Gated, Visible RI, Album 4+.
  - First Fold: the photo is `sh-fpv-photo-area` (Visible), with `sh-app-header` Overlay on top. The status bar comes from the header, so it shows once.
  - On Scroll / Last Scroll: the detached status bar, app header and tab strip were replaced by `sh-fpv-app-header` (Onscroll), which carries the status bar, app header and tab strip. The off-screen photo frame and the hidden "Share, Shortlist & Footer" copy were removed.
  - The detached "Floating Connect" frames (sticky at the bottom, and inline at the end of the content) are now `sh-action-island` Floating.
  - 0 library instances from Daren's file left in the section.
- **Assumed:** Daren's Astro "Details missing" became `sh-fpv-astro` "You haven't added" (North). Change the variant if it should be another state.
- **Not reproduced:** on Last Scroll, the tab strip's highlight on "Photo Album". `sh-fpv-app-header` has a fixed tab strip (About selected).

### `sh-fpv-app-header`
- **Common component change:** the status bar in both states (Onscroll, Alternate) is now Theme=Light (dark icons), because the header is white. It was Dark, which gave white icons on white.

### Island shadow
- The sticky `sh-action-island` shadow was cut off by clipping wrapper frames. Clip content is now off on the 47 "Action bar · floats at the bottom" wrappers and the showcase rows / cases, so the shadow fades out on every side.
- Phone screens, `sh-profile-card` (rounded corners over the photo) and the FPV bottom sheets keep clipping.

### Icon pack: Daren's exact rings and astro
- `sh-icon/link-rings` is now Daren's tabler "circles-relation": two open interlocking rings.
- `sh-icon/astro` is now Daren's Astro cue: an orbit with a centre dot.
- Both are redrawn on `sh-icon/stroke/{size}` for Line 24–12. Filled = the strokes outlined, with the centre dot filled.
- They were rebuilt in place, so every use updates and keeps its colour. That includes 24 Profile Card tags and 2 Navigation tags (`link-rings`); Pratik should re-check them.


### Docked island shadow
- When the sticky `sh-action-island` docks at the end of the content, the footer below it covered its shadow: in auto layout, a later layer paints on top. The 17 columns that hold a docked island (11 Content Sheets, 6 footer button-island frames) now use **Canvas stacking: first on top** (`itemReverseZIndex`), so the island and its shadow draw over the footer. Sections don't overlap, so nothing else changes.
- **For dev:** the sticky bar sits on a higher layer than the content, both floating and docked, and its containers don't clip (no `overflow: hidden`).

### Requests: free-viewer case (from Daren's latest file)
- **Common component change:** `sh-fpv-requests-card` has a new **Type = "Message · free viewer"**: "Meher sent you a message", then the start of her message ("“Hi, we liked your") followed by the gold mask (`sh-fpv-locked-text`, lock at the end), and an `sh-button` Premium Soft Small **Upgrade Now** that opens the premium plans. Built from the Message variant, so tokens and icon carry over.
- FPV section 03: the "Free viewer" row (it was a placeholder) now has 3 screens (1 request: message; 2: message + photo; 3: message + photo + birth details). The message card uses the free variant, and photo / birth details work as for Premium. Each case carries Daren's note.

### Icons scaled with the Scale tool
- An icon resized with the Scale tool multiplies its stroke (for example the requests Photo icon: `stroke/20` 1.4 showed as 1.75). All scaled sh-icon instances were reset to scale 1 and swapped to their Size variant:
  - requests Photo `image` 20 (it also had its stroke unlinked; now `stroke/20`, `icon/secondary`);
  - album-view `image` × 2, Filled 20;
  - `more-vertical` × 2 (they were at half scale);
  - 18 / 40 shown icons (no variant at that size).
- 0 scaled icons left; 0 colours changed.

## Why

Screens must be built only from DNA components so developers get one source. The island's shadow must look right in Figma. Icons must match Daren's design exactly.

## Who needs to do something

- **Pratik:** the `link-rings` shape changed on Profile Card tags.
- **Developers:** take the `link-rings` and `astro` paths from the Figma sets (custom drawings, no Hugeicons source).

## Checks

- [x] Scroll States renders on DNA components only (3 screens)
- [x] 0 remote instances left in Scroll States
- [x] The island shadow is not clipped by its wrappers; cards and sheets still clip
