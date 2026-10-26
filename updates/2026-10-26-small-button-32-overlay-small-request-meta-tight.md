# Small button 32, overlay action Small, request meta on Tight

**2026-10-26**

## What changed

- **Common component change:** `sh-button` Size=Small is now **32 tall**, with top and bottom padding `sh-space/8` (it was 28 tall with 6). That covers all 36 Small variants; side padding stays 16, and focus rings stretch with the button.
  - 253 Small copies across the file had their height pinned to 28 and are now 32. Most are on the FPV page (173), plus Overview (9), Sunil's page (4) and many FPV / profile-card components.
- **`sh-overlay`**: the Action button is now **Small** in every variant (Photo · Message, Photo full · Message / No photo were Medium). Every use follows.
- **`sh-fpv-requests-card`**: the meta line ("Meher sent you a message") is now `sh-typo/Body/SM/Tight` (12 / 16), as in Prashant's proposal card. It was Body/SM/Default (12 / 18). All 4 variants changed; no copy overrides it.
- The `sh-button` blueprint now lists Small as 32 tall with 8 / 16 padding.

## Why

Small buttons get a more comfortable height. The overlay call to action is lighter, and the request card's meta line sits tighter to its content.

## Who needs to do something

- **Developers:** small button height 32 with padding 8 / 16. The overlay action is the small button.
- **Open:** `sh-semantic-button` Small is still 28 tall; should it match?

## Checks

- [x] 36 / 36 Small variants at 32 with `sh-space/8`; 0 Small copies off 32
- [x] The Locked card renders with the Small "Upgrade to View"
- [x] All 4 request cards render with the Tight meta line
