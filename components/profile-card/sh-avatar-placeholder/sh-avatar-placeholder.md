# sh-avatar-placeholder

**Purpose:** Muted grey silhouette shown wherever a member has no photo (no photo added, or photo requested). Gender × Aspect Ratio: 1:1 for circular avatars and mini cards, 4:5 for tall slots, Full for the full photo slot with an overlay.

Profile card (migration, not yet core) · 6 variants · [Open in Figma](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2239-13257) (node `2239:13257`)

**Code:** Web (HTML/CSS): [sh-avatar-placeholder.css](web/sh-avatar-placeholder.css), [sh-avatar-placeholder.figma.ts](web/sh-avatar-placeholder.figma.ts), [sh-avatar-placeholder.html](web/sh-avatar-placeholder.html) · Jetpack Compose: [ShAvatarPlaceholder.figma.kt](compose/ShAvatarPlaceholder.figma.kt), [ShAvatarPlaceholder.kt](compose/ShAvatarPlaceholder.kt) · SwiftUI: [ShAvatarPlaceholder.figma.swift](swiftui/ShAvatarPlaceholder.figma.swift), [ShAvatarPlaceholder.swift](swiftui/ShAvatarPlaceholder.swift) · Art: [sh-avatar-silhouette](../sh-avatar-silhouette/sh-avatar-silhouette.md)

## Quick use (no photo)

| Where | Use | Background | Silhouette |
|---|---|---|---|
| Avatar, mini card | `sh-avatar-placeholder` 1:1 (round) or 4:5 | `sh-gradient/placeholder/avatar` | `sh-avatar-silhouette`, fills the width, centred |
| Full photo slot (profile card, FPV) | `sh-overlay` No photo / Photo requested (its Background is this component, Full, silhouette off) | `sh-gradient/placeholder/photo` | in the overlay: 160, `sh-space/40` from the top, title 8 under it (gap −8) |

Pick Female or Male to match the member. There is no photo layer and no image file for the background.

*Hand-written 2026-10-29 after the grey rebuild; regenerate with `tools/components.py` on the next export.*

## Types

### Gender=Female / Male, Aspect Ratio=1:1

**Purpose:** square, for circular avatars and mini cards; the whole silhouette, centred.

### Gender=Female / Male, Aspect Ratio=4:5

**Purpose:** tall slot; the silhouette square centred in it.

### Gender=Female / Male, Aspect Ratio=Full

**Purpose:** the full photo slot (profile card, FPV photo). The silhouette square sits near the top, leaving room below for the sh-overlay title and button.

## Properties

| Property | Type | Values | Default |
|---|---|---|---|
| Gender | variant | Female, Male | Female |
| Aspect Ratio | variant | 1:1, 4:5, Full | 1:1 |
| Show silhouette | boolean | on, off | on |

Show silhouette off = background only. `sh-overlay` No photo / Photo requested uses it as its own solid **Background** (no opacity, no blur), then draws the silhouette in its icon slot, so it is never drawn twice and never depends on the photo underneath. `sh-user-images` has no "requested" photo any more.

## Anatomy

Editable in Figma: the background and the silhouette are separate layers, so either can change on its own.

- root: column, clips content, content centred horizontally
  - 1:1 and 4:5: content centred vertically, no padding
  - Full: content at the top, padding top `sh-space/40`; the sh-overlay title starts just under the square
  - **Background**: rectangle, absolute, stretches to the frame. Linear gradient, top to bottom:
    - Every size: two stops, `placeholder/background/start` (`neutral/400`) → `placeholder/background/end` (`neutral/black`). Same slate hue all the way down (no dull grey band), pure black at the bottom so white overlay text stays readable.
    - 1:1 and 4:5: the same gradient, stretched so the silhouette square shows the slice of Full that sits behind its silhouette (8%–38% of the Full height). A mini card looks like the big card, made small, not darker.
  - **Silhouette** (visible = Show silhouette): square frame, clips content
    - 1:1 and 4:5: fills the width, aspect locked
    - Full: 160 × 160
    - **Art**: `sh-avatar-silhouette` (Gender) at 1×, filling the square, opacity `sh-opacity/full`

`sh-avatar-silhouette` (Gender Female · Male) is the silhouette art: soft white vectors in a square. Each figure is centred, with an even margin (84% of the square), so nothing touches an edge and both genders are the same size. Change the art there and every placeholder and overlay updates.

## Code

No images for the background: code draws the same two layers as Figma.
- **Background:** the token style. `sh-gradient/placeholder/photo` for Full; `sh-gradient/placeholder/avatar` for 1:1 and 4:5. The avatar style is the photo gradient stretched (handles outside the frame), so it shows the slice behind the silhouette. Web, Compose and SwiftUI all get that stretch from the build: web stop positions -25% / 300%, Compose and SwiftUI start/end points.
- **Silhouette:** the `sh-avatar-silhouette` art (SVG on web and iOS, @3x PNG on Android), square, centred; Full: 160, `sh-space/40` from the top.
- **Show silhouette** off: draw the background only.

Change a colour or the gradient in Figma, run `/shaadi-dna-update`, and every size follows.

## Size

160 × 160 (1:1) · 160 × 200 (4:5) · 360 × 520 (Full). Any instance can be resized; the silhouette scales with the width.

## Tokens

| Layer | Property | Token |
|---|---|---|
| root | radius | Aspect Ratio=1:1 → sh-radius/full; 4:5 and Full → sh-radius/none |
| root | padding top | Full → sh-space/40; otherwise sh-space/0 |
| Background | fill | Full → sh-gradient/placeholder/photo; 1:1 and 4:5 → sh-gradient/placeholder/avatar |
| Silhouette › Art | opacity | sh-opacity/full |
