---
name: shaadi-code-connect
description: Use when connecting the Shaadi DNA Foundation to Figma Dev Mode — setting variable code syntax so tokens show as var(--sh-...), or writing and publishing Figma Code Connect files for components. Triggers on "/shaadi-code-connect", "code connect", "set code syntax", "Dev Mode shows hex instead of tokens", "connect the button component to Figma", or a new component becoming ready to connect.
---

# Connecting Shaadi DNA Foundation to Figma Dev Mode

Two separate layers. Work out which one is being asked for before doing anything.

| Layer | Question it answers | Needs |
|---|---|---|
| **Variable code syntax** | "What do I write instead of `#0F172A`?" | Only tokens. Ready now |
| **Code Connect → blueprint** | "Where is the spec for this component?" | Only blueprints. Done for all 86 |
| **Code Connect → code** | "What do I write instead of this frame?" | Real code components |

---

## Layer 1 — Variable code syntax

Sets the WEB, ANDROID and iOS name Dev Mode shows next to each variable. A
platform name is only set where `build.py` generates it; shadows, font-family
strings and blur are web-only, and native typography comes from the type kit.

### Steps

```bash
python3 tools/codesyntax.py --plugin
```

Writes two files:

- `dist/figma/code-syntax.json` — every token's three platform names
- `dist/figma/apply-code-syntax.js` — a script that applies all of them

Apply it through the Figma MCP (`use_figma`) or a plugin console. Figma has no
import UI for code syntax, so a script is the only practical route.

### After it runs

Report how many variables were set and list anything the script reported as
unmapped. Unmapped usually means a variable exists in Figma but not in
`tokens/` — that is a real drift signal, so surface it rather than ignoring it.

### Rules

- Never hand-type code syntax into Figma. It will drift from `dist/`.
- Names come from `var_name()` in `tools/lib.py`, the same function the build
  uses. If a name looks wrong, fix it there and regenerate both — never patch
  one side.
- `sh-color-basic` is deliberately excluded. Primitives have no code name
  because they must never be used directly.
- Re-run after any import that adds or renames tokens.

---

## Layer 2a — Code Connect to the blueprint (until code exists)

Every `sh-*` component in Figma links to its own blueprint with label
**Markdown**, so Dev Mode and the Figma MCP (`get_code_connect_map`) point to
`components/<sh-name>/<sh-name>.md`.

For a new component: regenerate blueprints (`/shaadi-dna-update`, step 1c),
push, then map it with the Figma MCP:

    add_code_connect_map(fileKey, nodeId = <component set id>, label = "Markdown",
      componentName = "<sh-name>",
      source = "https://github.com/prashantshindeshaadi/shaadi-dna-foundation/blob/main/components/<path>/<sh-name>.md")

Node ids are in `components/README.md`. Or link it by hand in Figma: Dev Mode →
Code Connect → the component → enter the path.

## Component handoff — one folder holds everything

Every component is handed off through its own folder. The folder is the single
place where its logic, data and code live; nothing about a component is kept
anywhere else.

```
components/<group>/<sh-name>/          (<group> only for migration pages, e.g. fpv/)
  <sh-name>.md                 blueprint: purpose, switches, rules, taps, properties,
                               anatomy, tokens. Generated from Figma by tools/components.py;
                               the prose comes from the Figma component + variant descriptions
  web/                         HTML + CSS, and <sh-name>.figma.ts   (Code Connect, html parser)
  compose/                     Jetpack Compose, and Sh<Name>.figma.kt
  swiftui/                     SwiftUI, and Sh<Name>.figma.swift
```

Platforms are **Web (HTML/CSS), Jetpack Compose and SwiftUI only**. No XML
views, no UIKit.

### Steps

1. **Logic in Figma first.** The component and every variant carry their
   description: name line, `Purpose:`, `Built from:`, `Switches:`, `Rules:`,
   `Taps:`; each variant starts with `When: …` (which case uses it). This is the
   behaviour spec — write it in Figma, never only in code.
2. **Regenerate the blueprint** (`/shaadi-dna-update`, step 1c) so the folder's
   `<sh-name>.md` carries that logic plus properties, anatomy and tokens. Remove
   folders for components that no longer exist in Figma.
3. **Tokens are shared.** Platform code uses the code syntax names from Layer 1
   (`var(--sh-…)` on web, the Android and iOS names on Compose and SwiftUI). Never
   hard-code values.
4. **One Code Connect config per platform**, each scoped to its own subfolders:
   - Web — `figma.config.json` with the `html` parser, include `components/**/web/*`;
     publish `npx figma connect publish`.
   - Compose — Figma's Gradle plugin, `*.figma.kt` with `@FigmaConnect`;
     publish `./gradlew figmaCodeConnectPublish`.
   - SwiftUI — Figma's Swift package, `*.figma.swift`;
     publish `swift run figma-connect publish`.
5. **Map component properties, never layer names:** variant → enum, boolean →
   Bool, text → String, instance swap → nested component.
6. **Labels in Dev Mode:** Markdown (blueprint) stays; add Web, Compose and
   SwiftUI next to it.
7. **Order:** core components first (button, chip, tag, icon, app header, bottom
   sheet), then feature components such as `sh-fpv-*`, which only map cleanly
   once their parts are connected.
8. **Token:** publishing needs a Figma personal access token with Code Connect
   write access. Publish from CI on merge.

---

## Layer 2 — Code Connect for components

Maps a Figma component to the real code component, so Dev Mode shows the
component's own JSX.

### Before starting, check all three exist

1. A blueprint in `components/<sh-name>/<sh-name>.md`
2. A built component in the catalogue app
3. A published Figma component with proper component **properties**

If any is missing, say so and stop. Connecting a component that isn't
blueprinted bakes in whatever was built, which is how an accidental standard
becomes the standard.

### Steps

1. The component's folder already exists: `components/<sh-name>/`.
2. One file per component, `<sh-name>.figma.tsx`, using the pattern below.
3. Map props to Figma **component properties**, never layer names. Layer names
   get renamed in a tidy-up; properties are the contract.
4. Cover every variant the blueprint defines. A partially mapped component is
   worse than an unmapped one, because it looks authoritative.
5. Publish:

```bash
npx figma connect publish --token $FIGMA_TOKEN
```

Publish from CI on merge, not from a laptop, so the mapping always matches the
merged code.

Put the code and its connect file in the platform subfolder of the component's
own folder (`web/`, `compose/`, `swiftui/` — see Component handoff above), and add
a mapping with the code label (Web, Compose, SwiftUI) next to the Markdown one.
The pattern below shows the mapping shape; on web the same props map to the
HTML/CSS snippet.

Pattern (Button; Figma property names come from `components/sh-button/sh-button.md`):

```tsx
import figma from "@figma/code-connect";
import { Button } from "@shaadi/catalogue";   // the real component

figma.connect(Button, "<Figma URL of the sh-button component set>", {
  props: {
    variant: figma.enum("Type", { Primary: "primary", Secondary: "secondary",
      Tertiary: "tertiary", Ghost: "ghost", "Premium Solid": "premium-solid",
      "Premium Soft": "premium-soft" }),
    size: figma.enum("Size", { Large: "lg", Medium: "md", Small: "sm" }),
    label: figma.string("Label"),
  },
  example: (p) => <Button variant={p.variant} size={p.size}>{p.label}</Button>,
});
```

### When code and blueprint disagree

The blueprint wins, unless the code is right and the blueprint is stale. Decide
explicitly with the user, fix one of them, and record it in `updates/`. Never
leave the two disagreeing — the whole point is that Figma and code say the same
thing.

---

## Reporting back

Say which layer was touched, how many variables or components were affected,
and anything that couldn't be mapped. Don't claim Dev Mode is updated until the
script or the publish command has actually run.
