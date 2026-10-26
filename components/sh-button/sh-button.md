# Button (`sh-button`)

6 types × 3 sizes × 6 states. Horizontal auto-layout, hug content, radius `sh-radius/button`.

**Anatomy:** leading icon (optional) → label → trailing icon (optional); loader replaces all content in the Loading state.

### 1 Size

| Size | Height | Padding (Y/X) | Gap | Icon | Text style |
|---|---|---|---|---|---|
| Large | 48 | `12` / `20` | `4` | 20 | `sh-typo/Button/LG` |
| Medium | 40 | `10` / `16` | `2` | 16 | `sh-typo/Button/MD` |
| Small | 32 | `8` / `16` | `2` | 14 | `sh-typo/Button/SM` |

Min width 56 on every size (no `sh-space` token for 56 yet).

Large is for hero sections, modals and full-width containers. Medium is the everyday default. Small is for dense rows and compact toolbars. Small still needs a 48px touch target.

### 2 Type, and tokens per state

| Type | Default | Hover | Pressed | Label / icon |
|---|---|---|---|---|
| **Primary** | `sh-gradient/shaadi/default` | `sh-gradient/shaadi/hover` + `sh-shadow/<mode>/Default` | `sh-gradient/shaadi/pressed` | `button/primary/text/default`, `button/primary/icon/default` |
| **Secondary** | `button/secondary/background/default` | `/hover` | `/pressed` | `button/secondary/text/default`, `/icon/default` |
| **Tertiary** | `button/tertiary/background/default` | `/hover` | `/pressed` | `button/tertiary/text/default`, `/icon/default` |
| **Ghost** | `button/ghost/background/default` (transparent) | `/hover` | `/pressed` | `button/ghost/text/default`, `/icon/default` |
| **Premium Solid** | `premium/background/solid/default/*` | `/hover/*` + `sh-shadow/<mode>/Default` | `/pressed/*` | `premium/text/on-solid`, `premium/icon/on-solid` |
| **Premium Soft** | `premium/background/soft/default` | `/hover` | `/pressed` | `premium/text/on-soft`, `premium/icon/on-soft` |

**All types share these three states:**

- **Disabled:** the type's Default look with `sh-opacity/disabled` on the button root. No shadow, no pointer events.
- **Sublabel** (`Show sublabel`, off by default): `sh-typo/Support/Meta` at full opacity (`sh-opacity/full`), in the same colour token as the label (every type). The label wrapper keeps the label's height (24 / 20 / 16) with gap -2 and centred content, so turning the sublabel on lifts the label and adds the sublabel below without changing the button height. The sublabel sits in a frame with `sh-space/2` bottom padding and `sh-opacity/extra-strong` (88 %), shown with `Show sublabel`; the padding lifts the pair 1 px for optical centring.
- **Focus:** the ring from §7.2. The resting background does not change.
- **Loading:** label and both icons hidden; `sh-icon/line-icon/loader` shown at the size's icon size, inheriting the type's label colour; background stays default; input blocked.

### 3 Choosing a type

| Situation | Type |
|---|---|
| The one main action on the screen | Primary — exactly one per screen or section |
| A supporting action of real weight | Secondary |
| A neutral action, often alongside Secondary | Tertiary |
| A low-emphasis or repeated inline action | Ghost |
| A paid action, high emphasis | Premium Solid |
| A paid action, supporting emphasis | Premium Soft |

### 4 Do and don't

- **Do** keep labels to one or two words, in the voice defined by the Shaadi Content Design System.
- **Do** put the leading icon before the label for meaning, and the trailing icon for direction (chevron, external link).
- **Don't** place two Primary buttons in one view, stack a Premium Solid next to a Primary, override the radius, apply a shadow to Tertiary or Ghost, or recolour a label away from its type's token.

### 5 Not yet specified

Only `sh-button` is blueprinted in v1.0. For input, card, list row, status banner, chip, sheet, badge, avatar and tab bar, build from §2–§7 and **flag that the component is unspecified** rather than inventing a blueprint. Those are next.

---
