# No-photo background is lighter: neutral 300 to 700

**2026-10-29**

## What changed
- The no-photo placeholder gradient is lighter: `placeholder/background/start` neutral/400 → **neutral/300**, `placeholder/background/end` neutral/black → **neutral/700** (Light and Dark).
  - Both styles follow: `sh-gradient/placeholder/photo` and `sh-gradient/placeholder/avatar`, so every profile card, mini card, avatar and `sh-overlay` No photo / Photo requested updates.
  - Code needs no edit: SwiftUI, Compose and web draw the styles by token name, so the rebuilt `dist/` carries the new colours.
- In Figma, 3 profile-card photo backgrounds that had the new colours set by hand are linked to the style again.
- `placeholder/background/end` description no longer says "pure black".
- `sh-avatar-placeholder` blueprint: no longer quotes the stop colours (they live in `tokens/`).

## Why
The design team wanted a softer, lighter grey for members without a photo.

## Known gap
- White overlay text ("No Photo added yet", "Photo request sent") sits about a third of the way down, where the gradient is still light: about 2.7:1, below AA (4.5:1 for body text, 3:1 for large text). `tools/check.py` does not test text on gradients, so it does not flag this. Fix options: darker stops, or the title lower in the overlay.

## Who needs to do something
- **Designers:** nothing; the styles updated everywhere. Don't set the placeholder colours by hand; change the two tokens.
- **Developers:** pull and rebuild the tokens; no component code changes.

## Checks
- [x] `python3 tools/check.py` passes
- [x] Web render of sh-avatar-placeholder and sh-overlay matches Figma
