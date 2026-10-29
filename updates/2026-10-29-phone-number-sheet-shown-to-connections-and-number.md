# Phone-number sheet: Shown to connections and Number hidden restored

**2026-10-29**

## What changed
- `sh-fpv-sheet-phone-number` has all four states again: Number shown · No tokens · **Shown to connections** · **Number hidden**. The two privacy states had been deleted by accident on 2026-10-27, after they were reviewed.
- They were rebuilt from the 27 Oct version history (same copy, buttons and layout) on today's "Number shown" sheet, so they carry every later fix:
  - **Shown to connections:**
    - Message: "Meher shares her phone number only with members she's connected to."
    - Buttons: **Shaadi Chat** (sh-button Primary Large, chat icon) and **Send SMS** (Ghost).
    - Below: a divider, then her email row (no phone row).
  - **Number hidden:**
    - Message: "Meher has chosen to keep her phone number hidden."
    - Buttons: Shaadi Chat and Send SMS only, with no details.
  - Both: "Connect Request Sent" and "This contact isn't counted as viewed" (privacy states never use a contact view).
- Each variant has its own "When:" description; the old ones were copied from Number shown by mistake. The blueprint is corrected to match.

## Why
When she hides her number, or shares it only with connections, the viewer can still reach her through Shaadi Chat or SMS. These states were part of the reviewed flow.

## Who needs to do something
- **Designers:** use State = Shown to connections / Number hidden on the phone-number sheet.
- **Developers:** two more sheet states; neither uses a contact view.

## Checks
- [x] Render checked against the 27 Oct version
- [x] `python3 tools/check.py` passes
