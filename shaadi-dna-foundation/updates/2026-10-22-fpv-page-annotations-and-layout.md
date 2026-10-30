# FPV page annotations and layout

**2026-10-22**

## What changed

- **Daren's annotations are on the DNA FPV page**, taken from his "For review" page (his file was only read, never edited) and set in DNA type styles and colour tokens. Our screens and components were not touched.
  - Sections 01–09: each gets Daren's section title, intro, row headers ("Her profile", "Premium viewer", "Free viewer" …), case labels, per-case notes and the rules / notes blocks, in the same frames as his, next to the DNA screens. Coverage is 100 %, except 2 texts in 02 that belong to a Premium "she has no photos" case the DNA page doesn't have.
  - New sections built from his: **00 · Read me · FPV handoff** (how to read the page, state model, where to change things, section list), **10 · Behaviours, rules, copy and open questions** (278 texts, every user-facing string by widget, open questions) and **11 · Every state and where it is shown** (the full state table: header, 122 rows, 797 cells).
  - Type mapping: titles → `sh-typo/Heading/LG`, row headings → Heading/MD, case labels → Title/LG, intros → Body/LG, notes and cells → Body/MD, small labels → Title/SM or Support/Label.
  - Colour mapping: on the dark sections, text is `text/inverse` / `text/disabled`; inside light cards it's `text/primary` / `secondary` / `tertiary`; "Shown" / "Not drawn" use the success / warning text tokens. Card fills and strokes are bound to the nearest `background/` / `border/` token.
- **New section "Design system Q&A"** (after 11 in the Part 1 strip, separate from Daren's section 10) with two cards:
  - **Design system questions — Prashant Shinde:**
    1. Line vs filled buttons: what is the fixed logic?
    2. Icon-only / icon + label / label-only buttons: a fixed rule, or the designer's call?
    3. Components are small Lego parts, not whole screens or sections: where is the line between a reusable component and a feature composition?
    4. Design to code isn't automatic: developers decide platform and structure. How is that signed off?
    5. The roughly three-day pipeline: how does a change get to a merge request that is ready?
  - **Design system → code pipeline**, written up from the whiteboard: Prashant's Claude → (bridge) → Figma Desktop (Prashant, DS v1.2.4 production) → duplicate → Figma Desktop (Mac mini) → (bridge) → GitLab → repo / MR → API → design catalog ✓ · CodeRabbit review ✓ → developer review → Live 1.2.5 (ready to deploy, pre-release) → Shaadi Android UI module 1.2.5 → Play Store. Unclear readings are marked "?".
- **Page layout cleaned:** every section fits its content with 80 px padding. Two strips, each with a header bar like Daren's:
  - **Part 1 · The app, flow by flow:** 00, 01, Scroll States, 02–09, 10, 11, left to right in reading order.
  - **Part 2 · Edit here · design system:** A · Foundations, F · Widgets, G · Sheets.
  - No section overlaps and nothing sits loose on the page.
- Section 03's "Free viewer" row moved into the section's content column, under Premium.

## Why

Developers and reviewers need the flow explanation next to the DNA screens, in one tidy page.

## Who needs to do something

- **Designers / devs:** read FPV from 00 · Read me, left to right.

## Checks

- [x] Every Daren annotation text is present in its matching section (except the 2 noted)
- [x] 0 overlapping sections; 0 loose nodes on the page
