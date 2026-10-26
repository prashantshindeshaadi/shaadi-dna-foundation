# Masked value: gap 2 between text and the asterisk lock

**2026-10-23**

## What changed

- Wherever `sh-fpv-locked-text` (asterisks + lock) sits next to text, the gap between them is now `sh-space/2`. It was `sh-space/4`. The change is in the main components, so every use follows:
  - `sh-fpv-info-item` Lines=Single, Content=Masked Email (`****** @gmail.com 🔒`; the trailing lock also sits 2 after the email).
  - `sh-fpv-info-item` Lines=Single, Content=Masked Phone (`+91 8042 ****** 🔒`).
  - `sh-fpv-info-item` Lines=Single, Content=Masked Value ("Birth Date ****** 🔒").
  - `sh-fpv-info-item` Lines=Double, Content=Masked ("Works at / College 1 / College 2 / Graduated from ****** 🔒").
  - `sh-fpv-requests-card` Type=Message · free viewer ("“Hi, we liked your ****** 🔒").
- 101 uses checked: 101 / 101 at 2. No instance had its own gap override.
- Inside `sh-fpv-locked-text`, the gap between the asterisks and its lock is unchanged (4).

## Why

The mask reads as part of the value it hides, so it sits tight to the text.

## Who needs to do something

- **Developers:** 2 px between the value text and the masked part.

## Checks

- [x] 101 / 101 uses at `sh-space/2`
- [x] Renders checked for email, phone, value, double-line and request rows
