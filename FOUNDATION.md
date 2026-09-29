# Shaadi DNA Foundation

The shared decisions behind every Shaadi experience, written so designers,
developers and AI agents produce the same result from the same request.

**438 variables · 10 collections · v1.0 · September 2026**

The Figma file is the source of truth for values. This document is the source of
truth for **rules**: which token to pick, what may sit on what, and what is not
allowed. Values live in `tokens/`. Never copy them into this file.

---

## 1. How to use this

For every UI task, in order:

1. Read the rules here before opening any tool.
2. Pick every value through the tables below. Never choose by eye.
3. Use the component blueprint in `components/` if the component exists there.
4. Run the self-check in §9 before handing anything over.

**Non-negotiables:**

- No raw hex, px, gradients or shadows. Every value is a token or a published style.
- Never use `sh-color-basic` directly. Those are sources for semantic aliases,
  hidden from Figma pickers and excluded from `dist/`.
- If no token fits, **stop and ask**. Don't invent one or approximate with the
  nearest value.
- Only one Figma library is valid: **Shaadi DNA – Design System for Designer,
  Developer and AI Agents**. The libraries "Playground v1.0" and "{Sh-typo 1.1}"
  are deprecated — never pull from them.

---

## 2. What Shaadi UI feels like

Five principles, written as rules you can check.

1. **Neutral carries the page; brand marks the action.** Brand appears on the
   primary action, on selection, and on small accents. Large surfaces stay
   neutral. If brand fills more than about a quarter of a screen, it's wrong.
2. **One clear next step.** One Primary button per screen or section. Everything
   else is Secondary, Tertiary or Ghost.
3. **Warm, not loud.** Soft surfaces, generous corners, gentle elevation.
   Expressive treatments are reserved moments, budgeted in §6.
4. **Legible before decorative.** If a decorative choice costs contrast,
   legibility wins. Text on imagery always gets a scrim or a glass surface.
5. **Same intent, same tokens.** Two cards in two flows should never differ in
   padding or radius.

---

## 3. The collections

| Collection | Holds | Modes |
|---|---|---|
| `sh-typo` | Typeface, hierarchy, weights, spacing, responsive text | Mobile / Tablet / Desktop |
| `sh-color-basic` | Raw colour scales. Sources for aliases only | — |
| `sh-color-common` | Semantic colour roles for product UI | Light / Dark |
| `sh-translucent` | Frosted surfaces, blur, treatments over imagery | Light / Dark |
| `sh-stroke` | Outline thicknesses | — |
| `sh-space` | Spacing, gaps, padding, page margins | Mobile / Tablet / Desktop |
| `sh-radius` | Corner shapes | — |
| `sh-icon` | Icon size, optical stroke, pictogram scale, target | — |
| `sh-shadow` | Elevation, including Brand, Premium and Sia | Light / Dark |
| `sh-opacity` | Hidden, disabled, muted, full | — |

---

## 4. Colour rules

### 4.1 Choose the family by intent

| Intent | Family |
|---|---|
| Ordinary content and surfaces | `background/*`, `text/*`, `icon/*`, `border/*` |
| Main action, selection, brand accent | `background/brand`, `text/brand`, `border/selected`, `button/primary/*` |
| Feedback about what happened | `semantic/{success,warning,error,information}/*` |
| Subscription and paid features | `premium/*` |
| Sia and AI features | `sia/*` |
| Content over imagery | `overlay/*`, `sh-translucent/*` |

Never use a status colour for non-status meaning.

### 4.2 Pairing table — what may sit on what

Only these combinations are approved. `tools/check.py` verifies them on every
import.

| Background | Text | Icon | Border |
|---|---|---|---|
| `background/default` | `text/primary`, `secondary`, `tertiary`, `disabled`, `brand`, `inline-text` | matching `icon/*` | `border/soft`, `default`, `strong` |
| `background/soft` | same as above | same | `border/soft`, `default` |
| `background/strong` | `text/primary`, `text/secondary` only | `icon/primary`, `secondary` | `border/default` |
| `background/selected` | `text/primary`, `text/brand` | `icon/primary`, `icon/brand` | `border/selected` |
| `background/brand` | **`text/on-brand` only** | **`icon/on-brand` only** | `border/inverse` |
| `background/inverse` | `text/inverse` | `icon/inverse` | `border/inverse` |
| `background/disabled` | `text/disabled` | `icon/disabled` | `border/disabled` |
| `semantic/*/background/soft/*` | `semantic/*/text/on-soft` | `semantic/*/icon/on-soft` | `semantic/*/border/*` |
| `semantic/*/background/solid/*` | `semantic/*/text/on-solid` | `semantic/*/icon/on-solid` | — |
| `premium/background/soft/*` | `premium/text/on-soft` | `premium/icon/on-soft` | `premium/border/default` |
| `premium/background/solid/*` | `premium/text/on-solid` | `premium/icon/on-solid` | `premium/border/default` |
| `sia/card/background/*` | `text/primary`, `text/secondary` | `icon/primary` | `sia/card/border/*` |
| Translucent / glass | `text/primary` (decorative only) | `icon/primary` | `sh-gradient/glass/border` |

**Forbidden, most common first:**

- `text/inverse` on `background/brand` — fails badly in Dark. Use `text/on-brand`.
- Any `sh-color-basic` step used directly.
- `text/tertiary` on `background/strong` in Dark — 2.96:1.
- Status text on a different status's background.
- Body text on glass, or over an unscrimmed photo.

### 4.3 The state ladder

| State | How it's expressed |
|---|---|
| Default | The family's `/default` token |
| Hover | The family's `/hover` token. Filled and gradient buttons also gain `sh-shadow/<mode>/Default` |
| Pressed | The family's `/pressed` token. No shadow |
| Focus | A separate ring, never a background change. See §7.2 |
| Disabled | `background/disabled` + `text/disabled` + `icon/disabled`. No shadow, no pointer events |
| Loading | Content hidden, loader shown, background stays default, input blocked |
| Selected | `background/selected` + `border/selected` **plus a non-colour cue** (§7.4) |

Never fake a state with opacity or a tint.

---

## 5. Typography, layout and styles

### 5.1 Typeface

**Lexend-SH VF** (`LexendSH-VF.ttf`), Shaadi's build of Lexend, with the static
**Lexend-SH** family as fallback. Weights **360 / 480 / 600 / 720** — non-standard,
so use them as-is and never round to 400/500/600/700. The ss01 double-storey `a`
and `g` are the defaults; serifed `I` and `J` are kept for "Il1" clarity. Files
and platform setup: `fonts/README.md`.

### 5.2 Text styles

Published as Figma styles under `sh-typo/*`: Display, Heading LG/MD/SM,
Title LG/MD/SM, Body LG/MD/SM (each Tight and Loose), Button LG/MD/SM. Plus
`support/label` (11), `support/micro` (10, uppercase), `support/meta` (9).

Rules: one Display per screen. Never skip more than one heading level. Never
override a text style locally.

**`support/meta` is restricted** to non-essential metadata — timestamps, counts,
"last seen". Never form guidance, errors, prices, legal copy, or anything a
member must read in order to act. Form helper text uses `body/sm/default`.

**Line-height floor:** 1.30 below 16px, 1.25 at 16px and above.

### 5.3 Spacing

Semantic tokens change by breakpoint: `page/margin`, `padding/card`,
`padding/sheet-dialog`, `gap/section`, `gap/card`, `gap/form`, `gap/list`.

Raw steps are for component internals only. If a semantic token exists for what
you're spacing, using a raw step is an error.

Breakpoints: Mobile below 768, Tablet 768–1023, Desktop 1024 and up.

### 5.4 Radius

`full` buttons, chips, pills, avatars, badges · `sm` inputs and selects ·
`md` (= `default`) cards and containers · `lg` sheets and dialogs · `xl` hero
surfaces and large media · `xxs`/`xs` tight internal details · `none` flush edges.

### 5.5 Icons

Sizes 12, 14, 16, 20, 24, each with a paired optical stroke (1, 1.25, 1.5, 1.5,
1.75). **Always use the stroke that matches the size.** Anything larger is a
pictogram: 28, 40, 64. Touch target is 48 regardless of the visible icon.

### 5.6 Elevation

Flat page → `Soft` cards → `Default` menus, popovers, hovered filled buttons →
`Strong` dialogs and sheets → `Floating` persistent CTAs. Never skip two levels
on one screen. Never put a shadow on a flat list row.

### 5.7 Gradients and shadows are styles

Never hand-build either. Gradients come from `sh-gradient/*`
(shaadi default/hover/pressed/border, premium, sia, glass). Shadows come from
`sh-shadow/Light/*` and `sh-shadow/Dark/*`.

### 5.8 Dark mode

Every semantic token resolves in both modes, so a correctly built screen themes
itself. Never hard-code a mode — if you're writing "in dark mode use X", you
picked the wrong token. Elevation in Dark comes from shadow plus a change of
background token, since shadows read weakly on deep navy.

---

## 6. Brand expression budget

Per screen:

| Treatment | Budget |
|---|---|
| Gradient surface | One. Normally the Primary button |
| Premium treatment | Only on Premium entry points, and only where the action is paid |
| Sia treatment | Only on Sia and AI features |
| Glass / translucent | Only over imagery, never over a flat surface |
| Brand, Premium or Sia tinted shadow | One element, already the brand moment |
| `Display` typography | One |

If two treatments compete, remove one. The neutral version is always safe.

---

## 7. Accessibility

### 7.1 Minimums
Text and icons **4.5:1**. Boundaries a member must find — input edges, selection
outlines — **3:1**. Following §4.2 satisfies both; `tools/check.py` proves it on
every import.

### 7.2 Focus
A 2px ring in `border/focus`, 4px offset outside the element, radius matching
the element, at `muted` opacity. Added, never substituted — the resting
background stays as it is.

### 7.3 Targets
48×48 minimum, including icon-only buttons and Small buttons whose visible
height is 28.

### 7.4 Selection needs a second cue
`border/selected` is deliberately soft, so colour alone can't carry selection.
Every selected state also shows a check icon, a filled control, a label change,
or `aria-selected`/`aria-checked` in code.

### 7.5 Never
- `support/meta` for anything a member must read to act.
- Colour as the only signal for state, status or error.
- Text over imagery without an overlay or translucent surface.
- Disabled styling on something that is actually interactive.

---

## 8. Components

Blueprints live in `components/`, one file per component. A component is only
"in the system" when its file is complete.

**Specified:** Button (`components/button.md`).

**Not specified:** input, card, list row, status banner, chip, sheet, badge,
avatar, tab bar. Build from the rules above and **flag it** rather than inventing
a blueprint.

Every interactive element must define **default, hover, pressed, focus,
disabled**, and **loading** where an async action exists. Fewer than that is
incomplete. Pressed must be visibly different from hover.

---

## 9. Self-check before output

Report against every line.

1. Every colour, size, spacing, radius, stroke, shadow and text style is a token
   or a published style from the DNA library.
2. No `sh-color-basic` colour is used directly.
3. Every foreground/background pairing appears in §4.2.
4. Every interactive element defines all its states.
5. Gradients and shadows come from styles, not hand-built.
6. Semantic spacing tokens used wherever one exists.
7. Icon size and its paired stroke match; touch targets are at least 48.
8. Any selected state carries a non-colour cue.
9. The §6 budget is respected; exactly one Primary button.
10. It themes correctly in Light and Dark with no mode hard-coding.
11. `support/meta` carries nothing actionable.
12. Anything you couldn't resolve with a token is named in your output, not
    approximated.

---

## 10. Open decisions

Don't build on these. Ask instead.

| Item | Status |
|---|---|
| **Devanagari.** Lexend covers none of it, so Hindi and Marathi fall back to a system font | Picking a companion family |
| **Code syntax** on the Figma variables | Generated — run `tools/codesyntax.py --plugin`, apply in Figma |
| **Code Connect** for components | Waiting on the catalogue app. See `code-connect/` |
| **Dark raised surfaces.** No raised-surface token; `text/tertiary` on `background/strong` is 2.96:1 in Dark | Team decision |
| **Primary button, Light.** White on the gradient's orange end is 4.48:1, marginally under AA | Team decision |
| **Palette naming.** The `orange` scale is a true red and `red` is orange-red | Needs a migration |
| **Translucent.** No text-on-glass token, no fallback when blur is unsupported | Backlog |
| **Icon audit.** Canonical set and naming by intent | Next |
| **Components** beyond the button | Next |

---

## 11. Working on this repo

| Task | Command |
|---|---|
| Bring in a Figma export | `python3 tools/import.py <export>` |
| Verify everything | `python3 tools/check.py` |
| Generate platform files | `python3 tools/build.py` |
| Start an update-log entry | `python3 tools/new_update.py "Title"` |
| Generate Figma code syntax | `python3 tools/codesyntax.py --plugin` |
| Write Figma variable files | `python3 tools/export_figma.py` |

Values change in Figma, never here. `tokens/` is the only copy of the data;
`dist/` is generated and git-ignored. Every change gets an entry in `updates/`,
written in plain language.

Licence: internal to People Interactive. Lexend-SH is a derivative of Lexend
under the SIL Open Font License 1.1 — see `fonts/README.md`.
