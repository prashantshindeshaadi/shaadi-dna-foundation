# FPV sections get types: section title Type, Astro by Viewer and Birth details

**2026-10-28**

## What changed
- `sh-fpv-section-title` is now a set with **Type: Default · Premium · Premium · View · Locked · Action**. It replaces the Show badge / Show action switches.
  - Premium = badge only.
  - Premium · View = badge + View (sh-button Tertiary).
  - Locked = Unlock (sh-button Premium Soft), no badge.
  - Action = a Tertiary button, no badge, e.g. Add details.
  - All 202 uses were moved to the matching Type, keeping their titles and labels. The one stray badge + Premium Soft "View" became Premium · View.
- `sh-fpv-astro` is rebuilt as **Viewer (Free · Premium) × Birth details (Both added · She hasn't added · You haven't added · Neither added · Request sent)**, 10 variants. It was State × Chart.
  - Viewer sets the title: Free → Locked (Unlock), Premium → Premium · View.
  - For Both added, Viewer also sets the reports: Free → premium-locked, Premium → download.
  - The chart moved into the section: the exposed **Score** part has Chart North (Guna, of 36) / South (Porutham, of 10).
- New parts: **`sh-fpv-astro-score`** (Chart North · South, was "astro score row") and **`sh-fpv-astro-reports`** (Viewer Free · Premium, was "Reports card", whose two variants had the same name).
- Screens keep their look: the old South variants were folded into Both added, with Score set to South on those two screens. The Premium Both-added title now shows View, as the rule says.

- **Viewer = Free user · Premium user on every FPV section.** Each set is laid out as a grid, Free user on the left and Premium user on the right.
  - **Astro:** Viewer × Birth details (above).
  - **Photo album:** Viewer × Gate (Visible · Accept gated · Upgrade gated (Free user only) · Tit for tat). There were 20 variants; now 7. The photo count moved into the exposed `sh-fpv-photo-album-stack` (Count). The 16 old Overflow variants had no uses and were deleted.
  - **Education & career:** Free user (Gated, Tit for tat) · Premium user (Visible, Tit for tat).
  - **Contact:** Plan renamed to Viewer. Its own titles stay, because Free user · Unlock is the Plus-member free views case.
  - **Family, Lifestyle, About, You & her:** Viewer added; both viewers look the same.
  - **Requests:** Viewer × Count. The Free user's message card is the masked "Message · free viewer".
- **Titles follow the viewer** on premium sections (Astro, Photo album, Education & career): Free user → Locked (Unlock, Premium Soft), Premium user → Premium · View (Tertiary).
- **Screens:** uses whose screen name says Premium or Plus moved to the Premium user variant (same look). Requests screens that showed the masked message moved to Free user.
- **Section layout:** the "F · Widgets · every case" section was re-flowed so the wider sets don't overlap.

## Why
Each FPV section should be one component: pick the type at the top, then edit its parts. A new edge case is then one new variant on a part, not a rebuilt screen. Rule (user): a Free viewer sees Unlock (Premium Soft); a Premium viewer sees the badge + View (Tertiary).

## Who needs to do something
- **Designers:** in sh-fpv-section-title pick a Type instead of switching badge/action. In sh-fpv-astro pick Viewer and Birth details, then pick the Chart under Score.
- **Developers:** the section title takes a type. Astro takes viewer + birthDetails, with chart on the score.

## Checks
- [x] Renders checked: section title types, sh-fpv-contact (unchanged), all 10 Astro variants, a South-chart screen
- [ ] Blueprints and code for sh-fpv-section-title / sh-fpv-astro: next refresh

## Later: new section graphics
- `sh-graphic` now uses the round-3 hand art for all 6 sections: Astro (pocket watch), Lifestyle (paintbrush), Education & Career (book), Family (house), Contact (phone), Photos (print). The interim circles are gone. Every blur-lock overlay that uses them updated: 138 uses.
- Each graphic has a **Fade** mask: the bottom 30% fades out, so there is no hard edge where the art meets the section's own blur.
- Known gap: the art has a white background and a generic blurred card baked in. On Photo album that card shows above the blurred photos. Ask visual design for transparent PNGs (hand + object only).
- Spacing fix in `sh-blur-overlay`: Content top padding went from 0 to `sh-space/16`, and the art-to-message gap from 8 to `sh-space/16`; bottom stays 24. The art no longer touches the section title or crowds the message. Every locked section grows 24 taller.

## Later: grouped parts and a tidy FPV page
- Look-alike parts merged into one set each, picked from a dropdown:
  - `sh-fpv-footer` gained **State=Sealed teaser** (was the separate `sh-fpv-footer-sealed`).
  - `sh-fpv-lifestyle` gained **State=Tit for tat** for both viewers. It replaces the loose `sh-fpv-lifestyle/Free/Tit for tat`, whose 1 use moved over before it was deleted.
  - `sh-fpv-locked-text`: `Property 1` renamed to **Type** (Default · Date of birth).
  - Already grouped: `sh-fpv-astro-score` (Chart), `sh-fpv-astro-reports` (Viewer), `sh-fpv-section-title` (Type).
- `sh-blur-overlay`'s default blurred background is now the photo stack (`sh-fpv-photo-album-stack`, Count=4+) instead of a Lifestyle section. This removes a cycle that stopped any overlay from living inside Lifestyle. The 4 uses that relied on the old default were pinned to Lifestyle, so they look the same.
- FPV page, "Part 2 · Edit here · design system", re-organised (Part 1 screens untouched):
  - Row 1: **A · Foundations**, compacted to one row.
  - Row 2, one section per feature, side by side: **B · Photos · C · Header, about & match · D · Requests · E · Profile details · F · Astro · G · Footer & action bar · H · Sheets**.
  - Row 3: **Z · Drafts & notes**, with the loose Astro drafts, notes and examples. The unused draft is renamed `_draft · sh-fpv-astro (old layout)`.
  - The old "F · Widgets · every case" section was emptied by these moves and then deleted by exact ID.
