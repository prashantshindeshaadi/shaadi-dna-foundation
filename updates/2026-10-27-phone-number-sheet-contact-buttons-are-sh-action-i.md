# Phone number sheet: contact buttons are sh-action-island

**2026-10-27**

## What changed
- The Shaadi Chat / WhatsApp / Call row in the phone-number sheet is now `sh-action-island` Type = Three actions, Style = Normal, Show note off. It is the same island the Profile Card page uses.
- Replaced in 4 places:
  - the `sh-fpv-sheet-phone-number` main
  - its 2 screen copies (each sheet keeps its own slot content)
  - the loose "Sheet / Phone number" frame, which used a non-DNA "Button Row" component
- On the white sheet, the island labels are text/primary. The Normal island's labels are white because it sits on the profile card's dark info area.
- Call is the Primary icon button, with its glyph on `button/primary/icon/default`, matching the floating FPV islands.

## Why
One contact-button pattern everywhere: no hand-built rows and no outside components.

## Who needs to do something
- **Designers:** nothing.
- **Open question:** the island's Normal style assumes a dark surface. If it is used on more white surfaces, a light option may be worth adding rather than overriding the label colour each time.

## Later: Connect Request Sent + two privacy states
- Opening the phone-number sheet sends her a Connect request. **Every state** now shows **✓ Connect Request Sent** above the footer line.
  - Built from `sh-icon/check` Filled 16 + Body/MD, in `semantic/success/icon/on-soft` and `semantic/success/text/on-soft`.
  - Added to the main and to every screen copy (the 3 instances and the loose "Sheet / Phone number" frame).
- New `State` values on `sh-fpv-sheet-phone-number`, matching the current app's cases:
  - **Shown to connections:**
    - message "Meher shares her phone number only with members she's connected to." (Body/SM/Italic, text/secondary, centred)
    - **Shaadi Chat**: `sh-button` Primary Large with the chat icon. It is a lone button, so its width is capped at 200.
    - **Send SMS**: Ghost Medium
    - the email row
    - footer "This contact isn't counted as viewed"
  - **Number hidden:**
    - message "Meher has chosen to keep her phone number hidden."
    - Shaadi Chat and Send SMS
    - no detail rows
    - the same footer line
- The footer line uses text/tertiary, not the old app's red, because it is information, not an error.
- The set is now a 2×2 grid. The astro sheet parts below it moved down to make room; nothing overlaps.
