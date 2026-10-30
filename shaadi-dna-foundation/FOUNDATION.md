# Shaadi DNA Foundation — Rules

The decisions behind every Shaadi screen, written so designers, developers and
AI agents produce the same result from the same request.

**479 variables · 10 collections · v1.1 · October 2026**

Figma is the source of truth for **values** (`tokens/`). This file is the source
of truth for **rules**: which token to pick, what may sit on what, what is not
allowed. Values are never copied into this file.

---

## 1. How to use this

For every UI task, in order:

1. Read these rules.
2. Pick every value through the tables below. Never choose by eye.
3. Use the blueprint in `components/` if the component has one.
4. Run the self-check in §9 before handing anything over.

**Non-negotiables**

- No raw hex, px, gradients or shadows. Every value is a token or a published style.
- Never use `sh-color-basic` directly. Primitives feed the semantic tokens only.
  They are visible in Figma pickers, but excluded from code.
- If no token fits, **stop and ask**. Never invent one or take the nearest value.
- One Figma library only: **Shaadi DNA – Design System for Designer, Developer
  and AI Agents**. "Playground v1.0" and "{Sh-typo 1.1}" are deprecated.

---

## 2. What Shaadi UI feels like

1. **Neutral carries the page; brand marks the action.** Brand on the primary
   action, selection and small accents. If brand fills more than about a
   quarter of a screen, it's wrong.
2. **One clear next step.** One Primary button per screen or section.
3. **Warm, not loud.** Soft surfaces, generous corners, gentle elevation.
4. **Legible before decorative.** Text on imagery always gets a scrim or glass.
5. **Same intent, same tokens.** Two cards in two flows never differ in padding
   or radius.

---

## 3. The collections

| Collection | Holds | Modes |
|---|---|---|
| `sh-typo` | Typeface, weights, tracking, 22 text styles | Mobile / Tablet / Desktop |
| `sh-color-basic` | Raw colour scales. Sources for aliases only | — |
| `sh-color-common` | Semantic colour roles for product UI | Light / Dark |
| `sh-translucent` | Glass backgrounds, glass borders, blur | — |
| `sh-stroke` | Outline thicknesses | — |
| `sh-space` | Spacing steps, gaps, padding, page margins | Mobile / Tablet / Desktop |
| `sh-radius` | Corner steps and corner roles per component | — |
| `sh-icon` | Icon sizes, paired strokes, pictogram and brand sizes, target | — |
| `sh-shadow` | Elevation, including Brand, Premium and Sia | Light / Dark |
| `sh-opacity` | Hidden, extra-soft, soft, disabled, strong, extra-strong, full | — |

---

## 4. Colour

### 4.1 Choose the family by intent

| Intent | Family |
|---|---|
| Ordinary content and surfaces | `background/*`, `text/*`, `icon/*`, `border/*` |
| Main action, selection, brand accent | `background/brand`, `text/brand`, `border/selected`, `button/primary/*` |
| Feedback about what happened | `semantic/{success,warning,error,information}/*` |
| Subscription and paid features | `premium/*` |
| Sia and AI features | `sia/*` (`sia/top-match/*` for the Top Match treatment) |
| Content over imagery | `overlay/*`, `text/on-image`, `icon/on-image`, `sh-translucent/*` |

Never use a status colour for non-status meaning.

### 4.2 Pairings — what may sit on what

Only these. `tools/check.py` verifies them on every import.

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
| Image + `overlay/*` scrim | `text/on-image` | `icon/on-image` | — |
| `sh-gradient/placeholder/*` (no photo) | `text/on-image` | `icon/on-image` | — |

**Forbidden, most common first**

- `text/inverse` on `background/brand` — fails in Dark. Use `text/on-brand`.
- Any `sh-color-basic` step used directly.
- `text/tertiary` on `background/strong` in Dark (2.96:1).
- Status text on a different status's background.
- Text over an unscrimmed photo.

### 4.3 State ladder

| State | How it's expressed |
|---|---|
| Default | The family's `/default` token |
| Hover | The family's `/hover` token. Filled and gradient buttons add `sh-shadow/<mode>/Default` |
| Pressed | The family's `/pressed` token. No shadow |
| Focus | A separate ring, never a background change (§7.2) |
| Disabled | The Default look with `sh-opacity/disabled` on the component root. No shadow, no pointer events. (`background/disabled`, `text/disabled` for disabled content that isn't a whole component) |
| Loading | Content hidden, loader shown, background stays default, input blocked |
| Selected | `background/selected` + `border/selected` **plus a non-colour cue** (§7.4) |

---

## 5. Type, space, shape

### 5.1 Typeface

**Lexend-SH VF**, Shaadi's build of Lexend. Weights are custom (Regular,
Medium, Bold, Black in `sh-typo/weight/*`) — use the token, never round to
400/500/600/700. Files, platform setup and the shareable kit: `fonts/README.md`.

### 5.2 Text styles

22 styles under `sh-typo/*`: Display · Heading LG/MD/SM · Title LG/MD/SM ·
Body LG/MD/SM (each Default, Tight, Loose) · Support Label/Micro/Meta ·
Button LG/MD/SM.

| Weight | Used by |
|---|---|
| Black | Display only |
| Bold | Headings, Buttons, Support Micro (uppercase) |
| Medium | Titles, Support Label |
| Regular | Body, Support Meta |

- One Display per screen. Never skip more than one heading level.
- Never override a style locally (weight, size, tracking).
- **`support/meta` is restricted** to timestamps, counts and "last seen". Never
  errors, prices, form help or legal copy. Form help uses `body/sm`.
- Only Display and Heading change across breakpoints.

### 5.3 Spacing

Use the semantic token whenever one exists: `page/margin`, `padding/card`,
`padding/sheet-relaxed`, `padding/sheet-compact`, `padding/dialog`, `gap/section`, `gap/card`, `gap/form`, `gap/list`.
Raw steps are for component internals only.

Breakpoints: Mobile below 768, Tablet 768–1023, Desktop 1024 and up.

### 5.4 Radius

Use the **role token** for the component; use a step only when no role exists.

| Role | Component |
|---|---|
| `button`, `avatar` | Buttons, avatars (pill / circle) |
| `chip`, `tag`, `tooltip` | Chips, tags, tooltips |
| `input` | Inputs and selects |
| `card`, `media` | Cards, containers, images |
| `sheet` | Sheets and dialogs |
| `hero` | Hero surfaces |

Steps: `none` · `xxs` · `xs` · `sm` · `md` (= `default`) · `lg` · `xl` · `xxl` · `full`.

### 5.5 Icons

Sizes 12, 16, 20, 24, each with its own stroke token
(`sh-icon/stroke/<size>`). **Always pair a size with its stroke.** Larger is a
pictogram (`pictogram/size/*`). Brand marks use `brand/size/*`. Touch target is
`target/default` regardless of the visible icon.

### 5.6 Elevation

Flat page → `Soft` cards → `Default` menus, popovers, hovered filled buttons →
`Strong` dialogs and sheets → `Floating` persistent CTAs. Never skip two levels
on one screen. No shadow on a flat list row.

### 5.7 Gradients, shadows and glass

Never hand-build. Gradients come from the 30 `sh-gradient/*` colour styles
(`tokens/sh-gradient.json`, every stop a colour token; in code
`var(--sh-gradient-*)`, `@drawable/sh_gradient_*`, `SH.Gradient.*`). Shadows from
`sh-shadow/Light/*` and `sh-shadow/Dark/*`. Glass is a
`sh-translucent/background/{light,dark,brand}/<level>` start/end pair, its
matching edge (light glass → `border/light/*`, dark → `border/dark/*`, brand →
`border/brand/*`), and the blur of the same level
(`sh-translucent/background/blur/<level>`). Glass goes over imagery only.

### 5.8 Dark mode

Every semantic colour resolves in Light and Dark, so a correctly built screen
themes itself. Never hard-code a mode — writing "in dark mode use X" means the
wrong token was picked. `sh-translucent` has one mode: choose light or dark
glass by what's underneath, not by theme.

---

## 6. Brand expression budget (per screen)

| Treatment | Budget |
|---|---|
| Gradient surface | One. Normally the Primary button |
| Premium treatment | Only on Premium entry points where the action is paid |
| Sia treatment | Only on Sia and AI features |
| Glass / translucent | Only over imagery |
| Brand, Premium or Sia tinted shadow | One element, already the brand moment |
| Display typography | One |

If two treatments compete, remove one. The neutral version is always safe.

---

## 7. Accessibility

1. **Contrast.** Text and icons 4.5:1. Boundaries a member must find (input
   edges, selection outlines) 3:1. Following §4.2 satisfies both.
   Exception: `indicator/*` colours are bright marks (ticks, status dots,
   tier badges) held to 3:1. Use them only beside a label or another cue,
   never as text.
2. **Focus.** 2px ring in `border/focus`, 4px outside the element, radius
   matching the element, at `sh-opacity/strong`. Added, never substituted.
3. **Targets.** 48×48 minimum, including icon-only buttons and Small buttons.
4. **Selection needs a second cue.** A check, a filled control, a label change,
   or `aria-selected` / `aria-checked` in code. Colour alone never carries it.
5. **Never:** `support/meta` for anything actionable · colour as the only
   signal · text over imagery without a scrim or glass · disabled styling on
   something interactive.

---

## 8. Components

Blueprints live in `components/`, one folder per component named like Figma:
`components/sh-chip/sh-chip.md`. A component is "in the system" only when its
blueprint is complete. Figma Code Connect links each component to its blueprint.

**Specified:** every `sh-*` component on the Core page, generated from Figma
(`components/README.md` is the index; `sh-button.md` is hand-written). Components
from the migration pages (profile card, full profile view, account) are included
but still in progress. Icons: `components/icons.md`, SVGs in `icons/`.

Need something that has no blueprint? Build from these rules and **flag it** —
don't invent one.

**Status: Draft → Synced → Handed to dev → In development → In review → Final.**
Every component has one, in `components/status.json` (ids `draft`, `synced`,
`handed-off`, `in-development`, `in-review`, `core`; unlisted: Core page =
Synced, migration pages = Draft). The Shaadi Vision App shows it.
- **Draft:** the designer is still designing it in Figma.
- **Synced:** marked Ready for dev and pulled into this repo: blueprint and
  web code.
- **Handed to dev:** sent to the developers' repo as a merge request.
- **In development:** a developer builds the real component there (API, every
  state, accessibility, tests).
- **In review:** the designer checks the developer's version in the Vision App;
  changes go back to the developer.
- **Final (`core`):** released in the developers' library **and** the Figma
  component aligned to what shipped, then moved to the Core page.

Every interactive element defines default, hover, pressed, focus, disabled,
and loading where async. Pressed must differ visibly from hover.

**No photo (one way, everywhere).** A member without a photo has no photo layer.
- Avatars and mini cards use `sh-avatar-placeholder` (1:1 or 4:5).
- A full photo slot (profile card, FPV photo) uses `sh-overlay` Type No photo or Photo requested, which brings its own background.
- Either way it is two layers and nothing else:
  - the `sh-gradient/placeholder/*` background;
  - the `sh-avatar-silhouette` art (Female or Male, matching the member).
- No JPEG, no "requested" photo, no blur, no scrim.
- Blueprints: `sh-avatar-placeholder`, `sh-avatar-silhouette`, `sh-overlay`.

---

## 9. Self-check before output

Report against every line.

1. Every colour, size, space, radius, stroke, shadow and text style is a token
   or a published DNA style.
2. No `sh-color-basic` used directly.
3. Every foreground/background pair is in §4.2.
4. Every interactive element defines all its states.
5. Gradients, shadows and glass come from styles and tokens, not hand-built.
6. Semantic spacing and radius role tokens used wherever one exists.
7. Icon size and stroke match; touch targets at least 48.
8. Selected states carry a non-colour cue.
9. §6 budget respected; exactly one Primary button.
10. Themes correctly in Light and Dark, no mode hard-coded.
11. `support/meta` carries nothing actionable.
12. Anything not resolvable with a token is named in the output, not approximated.

---

## 10. Open decisions — ask, don't build on these

| Item | Status |
|---|---|
| **Devanagari.** Lexend has none; Hindi and Marathi fall back to a system font, which now also sits 3% lower than Lexend-SH | Picking a companion family |
| **Dark raised surfaces.** No raised-surface token; `text/tertiary` on `background/strong` is 2.96:1 in Dark | Team decision |
| **Primary button, Light.** White on the gradient's orange end is 4.48:1 | Team decision |
| **Status pressed, Light.** Success, error and information text on their soft **pressed** background are below 4.5:1 (default and hover pass); kept one step lighter by choice. `check.py` reports them as warnings | Accepted for now |
| **Palette naming.** `orange` is a true red and `red` is orange-red | Needs a migration |
| **Text on glass.** Which text token sits on each glass level; until decided, put text on a scrim, not on glass | Team decision |
| **Glass fallback** when blur isn't supported | Backlog |
| **Code Connect** for components | After the catalogue app has real components |
| **Components** beyond Button | Next |
