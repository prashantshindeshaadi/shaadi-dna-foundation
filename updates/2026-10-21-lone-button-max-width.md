# Lone buttons: max width 200

**2026-10-21**

## What changed

- **`sh-dialog`:**
  - New **Show secondary action** boolean (default on).
  - Both action buttons have a max width of 200, and the action row is centred.
  - With the secondary action off, the primary sits centred at up to 200 wide; it no longer stretches to the full 296.
- **`sh-bottom-sheet` (reverted):** sheet actions keep their original width. The primary action is full width and a side-by-side pair fills equally.
- **`sh-action-row` Type=Single action:** the button was a fixed width. It is now set to fill, with a max width of 200, centred. Next to a message ("Like this profile?") nothing changes. When it stands alone (for example "See similar profiles" in the action island) it is 200 wide and centred.
- **Width rule:** the container sets button width, not `sh-button`. This rule is now in the `sh-button`, `sh-bottom-sheet` and `sh-dialog` descriptions:
  - sheet primary action: full width
  - side-by-side pair: fill equally
  - alone in a dialog, card or photo overlay: hug, max 200, centred
  - inline: hug
  - action island: fill

## Why

A single button that stretches across a dialog looks heavy. When a button has no partner it should stay compact.

## Who needs to do something

- **Designers:** hide the second button with **Show secondary action**. Don't detach or resize the button.
- **Developers:** set the button's max width to 200 and centre it when it is alone in an action row.

## Checks

- [x] Dialog rendered with one and with two actions
- [x] Sheets, plan cards and album view stay full width (agreed)
