# Profile card contact icons follow sh-action-row

**2026-10-26**

## What changed

- **Why the example didn't update:** the "Shaadi Chat / WhatsApp / Call" buttons inherit through three levels: `sh-action-row` → `sh-profile-card` / Type=Connected (main) → the Connected example. Two levels had icon swaps set by hand. An instance swap is an override, so later icon changes in `sh-action-row` stopped there.
  - `sh-profile-card` / Type=Connected (main) swapped WhatsApp → `sh-icon/whatsapp` and Call → `sh-icon/phone`.
  - The Connected example (Profile Card page, "02 Examples") also swapped all three icons (Chat → `sh-icon/chat`, the bubble with dots), plus the glyph stroke.
- Both were reset. Every level now uses the `sh-action-row` icons: `chat-bubble`, `whatsapp-02` and `call` (Line 20, with stroke and colour from the component). The example's other overrides (name, tags, details, note) are kept.
- **Scan:** every `sh-action-row` use in the file was checked. 0 icons are now different from `sh-action-row`.

## Why

Examples must show the current component. Hand swaps freeze an old icon.

## Who needs to do something

- **Designers:** to change a contact icon, change it in `sh-action-row`, not in a card or an example.

## Checks

- [x] 0 `sh-action-row` icon buttons in the file differ from the main
- [x] The Connected example renders with chat-bubble / whatsapp-02 / call
