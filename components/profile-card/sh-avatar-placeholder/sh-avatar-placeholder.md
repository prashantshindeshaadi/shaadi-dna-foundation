# sh-avatar-placeholder

**Purpose:** Muted grey silhouette shown wherever a member has no photo (no photo added, or photo requested). Gender × Aspect Ratio: 1:1 for circular avatars and mini cards, 4:5 for tall slots, Full for the full photo slot with an overlay.

Profile card (migration, not yet core) · 6 variants · [Open in Figma](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2239-13257) (node `2239:13257`)

**Code:** Web (HTML/CSS): [sh-avatar-placeholder.css](web/sh-avatar-placeholder.css), [sh-avatar-placeholder.figma.ts](web/sh-avatar-placeholder.figma.ts), [sh-avatar-placeholder.html](web/sh-avatar-placeholder.html) · Jetpack Compose: [ShAvatarPlaceholder.figma.kt](compose/ShAvatarPlaceholder.figma.kt), [ShAvatarPlaceholder.kt](compose/ShAvatarPlaceholder.kt) · SwiftUI: [ShAvatarPlaceholder.figma.swift](swiftui/ShAvatarPlaceholder.figma.swift), [ShAvatarPlaceholder.swift](swiftui/ShAvatarPlaceholder.swift) · Assets: [female-1x1@3x.jpg](assets/female-1x1@3x.jpg), [female-4x5@3x.jpg](assets/female-4x5@3x.jpg), [female-full@3x.jpg](assets/female-full@3x.jpg), [male-1x1@3x.jpg](assets/male-1x1@3x.jpg), [male-4x5@3x.jpg](assets/male-4x5@3x.jpg), [male-full@3x.jpg](assets/male-full@3x.jpg)

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

Show silhouette off = background only, for a plain grey slot.

## Anatomy

Editable in Figma: the background and the silhouette are separate layers, so either can change on its own.

- root: column, clips content, content centred horizontally
  - 1:1 and 4:5: content centred vertically, no padding
  - Full: content at the top, padding top `sh-space/40`; the sh-overlay title starts just under the square
  - **Background**: rectangle, absolute, stretches to the frame. Linear gradient, top to bottom:
    - 1:1 and 4:5: `neutral/300` → `neutral/400`
    - Full: `neutral/300` → `neutral/400` (30%) → `neutral/600` (60%) → `neutral/800`, so white overlay text stays readable
  - **Silhouette** (visible = Show silhouette): square frame, clips content
    - 1:1 and 4:5: fills the width, aspect locked
    - Full: 160 × 160
    - **Art**: `sh-avatar-silhouette` (Gender) at 1×, filling the square, opacity `sh-opacity/strong`

`sh-avatar-silhouette` (Gender Female · Male) is the silhouette art: soft white vectors in a square. Each figure is centred, with an even margin (84% of the square), so nothing touches an edge and both genders are the same size. Change the art there and every placeholder and overlay updates.

## Code

Code uses the flattened images in `assets/` (one JPG per Gender × Aspect Ratio, @3x), not the layers. Export them again from Figma whenever the background or the silhouette changes. `sh-user-images` (Photo requested) is the Full image, silhouette included; the overlay adds only the title and button.

## Size

160 × 160 (1:1) · 160 × 200 (4:5) · 360 × 520 (Full). Any instance can be resized; the silhouette scales with the width.

## Tokens

| Layer | Property | Token |
|---|---|---|
| root | radius | Aspect Ratio=1:1 → sh-radius/full; 4:5 and Full → sh-radius/none |
| root | padding top | Full → sh-space/40; otherwise sh-space/0 |
| Background | fill | gradient on neutral/300, neutral/400, neutral/600, neutral/800 (see Anatomy) |
| Silhouette › Art | opacity | sh-opacity/strong |
