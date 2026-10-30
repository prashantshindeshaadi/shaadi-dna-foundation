# Mic icons and masked email lock

**2026-10-22**

## What changed

- **`sh-icon/mic` is now the classic microphone** (Hugeicons Mic02, Rounded), for voice input and an active mic. It was the stage mic (MicVocal).
- **`sh-icon/mic-off` is now its pair** (Hugeicons MicOff02): the same mic with a slash, for a muted mic. It was MicOff01, which had a different mic shape.
- Both sets were rebuilt for Line and Filled at 24 / 20 / 16 / 14 / 12. Line strokes stay bound to `sh-icon/stroke/{size}`. The source maps and `icon-map.md` are updated.
- The 12 stage-mic uses (FPV Hobbies, "Singing") were swapped to `sh-icon/hobby-singing`, which is the same MicVocal shape, so they look unchanged.
- `sh-icon/mute` (speaker with a cross, for sound off) is unchanged; it is a different job from a muted mic.
- The pasted "Hobby option / Stand ups / mic 02" icon from another library was deleted from the Shaadi Icons page.
- **Masked email (final, matches Daren):** the row reads `****** @gmail.com 🔒`: masked part, then the visible domain, then one lock at the end, the same rule as the masked phone (`+91 8042 ****** 🔒`) and the double-line masked rows. In `sh-fpv-info-item` (Masked Email), the lock inside the asterisks is hidden and one `sh-icon/lock` Line 12 (`premium/500`, same as before) sits after "@gmail.com". All 18 uses follow the main. The Foundation example matches, and Daren's pasted copies are back to his original. (An earlier pass the same day had put the lock between the asterisks and the email; that is replaced.)

## Why

The stage mic reads as singing, not as a voice or mute control. Mic and mic-off now share one shape. One lock per masked value, always at the end: it reads as one locked field and keeps one rule for email, phone and other masked values.

## Who needs to do something

- **Designers:** nothing. Use `sh-icon/mic` / `sh-icon/mic-off` for mic on / off, and `sh-icon/hobby-singing` for singing.
- **Developers:** take the mic and mic-off glyphs from the source maps (Mic02 / MicOff02).

## Checks

- [x] Both sets render correctly at every size (Line and Filled)
- [x] No `sh-icon/mic` uses left in hobby rows
- [x] 0 masked-email rows with a lock after the email
