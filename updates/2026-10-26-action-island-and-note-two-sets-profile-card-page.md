# Action island and note: two sets; Profile Card page organised

**2026-10-26**

## What changed

### `sh-action-island`: every button case in one set (common component change)
- New variant property **`Type`** with the 8 button combos found in the file. Each is built from core components placed directly in the island (`sh-button`, `sh-icon-button-with-label`):

  | Type | Buttons | Example |
  |---|---|---|
  | Message + primary | message + Primary | Like this profile? · Connect |
  | Message + premium | message + Premium Solid | Upgrade to Connect |
  | Message + tertiary | message + Tertiary | You hid her profile · Unhide Her |
  | Message only | status, no button | We're reviewing your report |
  | Primary only | Primary, centred, max 200 | See similar profiles |
  | Secondary + primary | Secondary + Primary | Super Connect / View Contact / Shaadi Chat / Call Consultant + Connect |
  | Tertiary + primary | Tertiary + Primary | Decline / Accept |
  | Three actions | 3 labelled icon buttons | Shaadi Chat / WhatsApp / Call |

- **`Style`** is now **Normal / Floating** (it was In card / Floating). 16 variants in total.
- Properties: `Type`, `Style`, `Show note`, `Message` (message text), `Status` (text for Message only). Button labels and icons are edited on the buttons inside.
- **`sh-action-row` is deleted.** Its job is now `sh-action-island` Type. The one loose row on a page (a "Clear All / Show 406 Matches" bar) is now an island, Secondary + primary · Floating, with no note.
- **Migration:** before the change, every island use was recorded (style, note, message, each button's type, label, icons, state), then re-applied on the new structure. All 112 uses still in the file match their recorded content: 0 differences.
  - 27 other recorded uses were inside loose working cards on the Profile Card page. Those cards are no longer in the file: they were on the page in the 06:50 autosave and gone before the page was reorganised. Restore from version history if they were still needed.

### `sh-action-note`: CTA = Edit / Upgrade
- `Type` is renamed **`CTA`**: Pre-written message → **Edit**, Action → **Upgrade**.
- `Style` In card → **Normal**. These are renames only; all uses keep their variant.

### Profile Card page, organised like the FPV page
- Two strips with header bars:
  - **Part 1 · The card, case by case:** 01 · Every card type and combination (the examples), 02 · Working copies (the 5 loose cards, "Jagi", a loose `sh-text-link`), 03 · Requests · icons to add (Pratik's section, comment kept).
  - **Part 2 · Edit here · design system:** A · sh-profile-card, B · Info box, C · Action area, D · Photo area (`sh-avatar-placeholder`, `sh-user-images`), E · sh-mini-card.
- **C · Action area** shows both sets as labelled grids. Rows are Type / CTA with a one-line use, columns are Normal / Floating. A footer explains how to add a case and how to suggest an edit (pin a comment on the variant or its row label).
- Every section fits its content with 80 px padding and uses the FPV section fill. Nothing is loose on the page.
- The old "01 Lego set" captions were removed. Some were stale, for example "sh-photo-blur-overlay", which is now `sh-overlay`.

### Docs
- Blueprints regenerated: `components/profile-card/sh-action-island`, `sh-action-note`.
- `components/profile-card/sh-action-row` was removed, along with its index row.

### Page tidy-up (later the same day)
- 01 · Every card type: the cards now follow the `sh-profile-card` variant order (Connect … VIP) and are renumbered 1–10 from each card's real Type: 1 Connect, 2 VIP / Premium (Connect), 3 Working copy (Connect), 4 Received, 5 Post-Connect, 6 Gated, 7 No photo, 8 Photo requested, 9 Blocked, 10 VIP. They are evenly spaced, with titles and notes on one baseline. This follows the cards Prashant removed (Locked, Hidden).
- A loose white rectangle with an info box copy on it moved into B · Info box.
- All sections were refitted (80 padding) and the Part 1 / Part 2 strips re-laid out. No overlaps, nothing loose. Script: `scripts/pc-organise.js`.

## Why

Two clear sets instead of three nested ones: one island with every button case, one note. Designers pick a Type rather than digging into a nested row. The page reads like FPV: cases first, then the parts to edit.

## Who needs to do something

- **Designers / Pratik:** pick `Type` on `sh-action-island`. `sh-action-row` no longer exists. Note `Type` is now `CTA`.
- **Developers:** at the next profile-card code sync, rename the `sh-action-row` part to the island's types (web CSS `.sh-action-row--single/--two/--three`, Compose `ActionRow`, SwiftUI `actionRow`). Contact icons are now `chat-bubble` / `whatsapp-02` / `call`.

## Checks

- [x] 16 island variants, each built from core buttons; note 4 variants
- [x] 112 / 112 island uses match their recorded content
- [x] 0 `sh-action-row` uses before delete
- [x] Profile Card page: 0 loose nodes, sections fitted, no overlaps
