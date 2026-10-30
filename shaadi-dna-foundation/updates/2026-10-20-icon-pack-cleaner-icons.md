# Icon pack: cleaner icons, rounded style

**2026-10-20**

## What changed

- **The pack stays Hugeicons Rounded.** "Clean" means simple, open shapes, not square corners. A Sharp-style test from earlier the same day was reverted. Every Line icon has round ends and soft round joins.
  - All 266 Hugeicons sets (Line and Filled, sizes 24 / 20 / 16 / 14 / 12) were rebuilt from `core-stroke-rounded` / `core-solid-rounded`.
  - Arrows and chevrons keep their Sharp shapes, drawn with round ends, as before.
- **Line icons are live strokes.** Their stroke weight stays bound to `sh-icon/stroke/{size}`. Hugeicons ships two Rounded strokes as filled shapes: the search handle and the zodiac-leo tail. Both were redrawn as real strokes so they follow the token too.
- **Simpler, cleaner icons**, used for both Line and Filled:
  - download → Download01 (twin of upload)
  - gift-card → GiftCard02
  - speaker → Speaker01
  - voice → AudioWave01 (no box)
  - film → Film02
  - language → Languages (no box)
- **`sh-icon/crown` is now `sh-icon/premium`** (the Premium icon). Its centre dot was removed from every variant (Line and Filled, 24–12). Instances keep their link; only the name changed.
- **New icon `sh-icon/chat-bubble`:** a plain round chat bubble with no dots (Hugeicons MessageCircle). Use it where the dotted `sh-icon/chat` is too busy, for example the chat action on cards.
- **One tick style everywhere.** Ticks look like `sh-icon/check`: a straight tick with round ends and a sharp corner. The tick inside check-circle, user-check, shield-check, security-check, heart-check and chat-done was redrawn to match. Checkbox, toggle and radio were not touched.
- **Icon colours on the FPV page:** every icon inside `sh-icon-button` and `sh-button` now uses its own variant's icon token. The disabled Super Connect icon, for example, was using Secondary's maroon instead of `icon/disabled`. 7 icons were fixed.
- **Badges renamed (2026-10-21):** `sh-icon/badge/verified` → `sh-icon/verified-badge`, `sh-icon/badge/premium` → `sh-icon/premium-badge`, `sh-icon/badge/vip` → `sh-icon/vip-badge`. Instances keep their link.
- **Badge icons fill their frame:** the verified and premium badges (Medium 20, Small 14) no longer have an inner margin. The VIP badge lost its 1 px padding, so the pill is now 20 tall; the VIP label is not scaled. These badges are used 25 times on the Profile Card page and 2 times on Navigation, where they now look slightly bigger.
- **Unchanged:** the custom and brand icons (check, checkmark-badge, asterisk, shaadi, link-rings, trelation, photo-locked) and the pictograms.
- **Instances** update on their own. One scaled 24 → 14 `plus` on Foundation was swapped to the real Size 14 variant.
- **Action bar fix (FPV):** in the "Action bar states" row and in F · Widgets, `sh-action-island` was set to Fill inside frames that hug their content, so it collapsed to 211 px and its labels clipped. Those frames are now a fixed 344 px wide.

## Why

Some icons were heavy or boxed. Simpler shapes read better at 12–16 px, and round ends keep the pack soft and consistent.

## Who needs to do something

- **Designers:** nothing. Use `sh-icon/chat-bubble` and the swapped icons where they apply.
- **Developers:** take each icon's style from the source maps. Line uses SR (stroke rounded), with SS for arrows. Filled uses SO (solid rounded), with XS for arrows.

## Checks

- [x] 266 sets rebuilt, 0 missing, no glyph outside its frame
- [x] Every Line master keeps its stroke bound to `sh-icon/stroke/{size}` (the custom shaadi and trelation icons were unbound before this change and are unchanged)
- [x] Contact sheet reviewed (round ends and joins throughout)
- [ ] Figma change-log table: the "Migration - FPV · Notes" page is no longer in the file, so this change is logged here only
