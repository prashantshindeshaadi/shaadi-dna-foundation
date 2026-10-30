---
name: shaadi-code-connect
description: Use when connecting the Shaadi DNA Foundation to Figma Dev Mode — setting variable code syntax so tokens show as var(--sh-...), or writing and publishing Figma Code Connect files for components. Triggers on "/shaadi-code-connect", "code connect", "set code syntax", "Dev Mode shows hex instead of tokens", "connect the button component to Figma", a new component becoming ready to connect, or "add / update Compose, SwiftUI and HTML/CSS code for <component>".
---

# Connecting Shaadi DNA Foundation to Figma Dev Mode

The repo has two folders: `shaadi-dna-foundation/` (this design system) and `shaadi-vision-app/`.
Every path and command in this skill is relative to `shaadi-dna-foundation/`: `cd` there first.

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
      source = "https://gitlab.com/shaadi/shaadi-app/ai/vision/-/blob/main/shaadi-dna-foundation/components/<path>/<sh-name>.md")

Links published before 2026-10-30 point to the GitHub mirror
(`github.com/prashantshindeshaadi/shaadi-dna-foundation/blob/main/...`).
Re-map them to GitLab before GitHub is retired.

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

### Recipe: build or update one component's code

Use this when asked to "add / update the code for `<sh-name>`" (first done for
`sh-profile-card`, 2026-10-21). Work through the figma-console bridge.

1. **Read Figma live.**
   - Screenshot the set (`figma_capture_screenshot`).
   - Run `tools/read_component_deep.js` with `SET` set to the set's node id. It
     looks inside nested instances; the plain blueprint reader does not.
   - Turn the result into lines with `python3 tools/deep_lines.py <file>`.
2. **Clean Figma first** (save a version before any write).
   - Rebind any binding to another library to the DNA token with the same name.
     Text needs `setRangeBoundVariable`.
   - Write the set and variant descriptions (step 1 above).
   - Ask before changing a design decision. Fix only plain mistakes.
3. **Regenerate the blueprint.** Rebuild only this set's `<sh-name>.md`, not
   the index, by calling `blueprint()` from `tools/components.py`.
4. **Write the three platforms** in `web/`, `compose/` and `swiftui/`.
   - Use one shared model on every platform:
     - a `type` enum, one case per variant;
     - the content data;
     - the Figma booleans;
     - an actions object with one callback per tap.
   - Go through the deep-read lines variant by variant: fill per variant, blur on
     or off, opacity, gaps, alignment, icon paint (colour, gradient or own
     colours), hard line breaks (U+2028), and text styles.
   - Use tokens only:
     - Web: `var(--sh-*)`.
     - Compose: `colorResource` / `dimensionResource`, and
       `ResourcesCompat.getFloat` for opacity. Build gradients as a `Brush` from
       their start/end colours.
     - SwiftUI: `SH.*` and `.shTextStyle`.
   - Keep every tap target at 48.
   - Images the code needs (placeholders, portraits) go in the owning
     component's `assets/`, exported from Figma: SVG plus @3x PNG.
5. **Add Code Connect files.** Keep each file self-contained: no outside helpers,
   and declare any example values inside the file.
6. **Verify.**
   - SwiftUI: `xcrun --sdk iphonesimulator swiftc -typecheck -target
     arm64-apple-ios17.0-simulator dist/ios/SHTokens.swift
     dist/sh-typo-kit/developer/ios/ShTypography.swift <file>`.
   - Web: `python3 tools/web_preview.py <web/*.html> <out.png>` inlines the CSS, icons
     and images (CSS masks don't load from `file://`) and screenshots it in headless
     Chrome. Compare with the Figma screenshots.
   - Compose: compile in an Android project. Say so if you couldn't.
7. **Log and commit.**
   - Add an `updates/` entry and run `python3 tools/check.py`.
   - Commit locally. Push only when the user says so.
   - Report the Figma inconsistencies you found but didn't change.

### Shared code every component uses

- **`components/sh-icon/`** draws icons and badges: `ShIcon`, `ShIconSpec`, `ShIconPaint` (inherit,
  colour, gradient, own colours), `ShBadge`, and the web `.sh-icon` mask class.
- **Generated helpers** (`tools/build.py`, never hand-edited):
  - `dist/android/compose/ShTokens.kt`: `ShGradient.<name>()` brushes, `Modifier.shGlass`,
    `Modifier.shShadow(ShShadow.X, shape)`, `shOpacity(id)`, `shType()`.
  - `dist/ios/SHTokens.swift`: `.shShadow(SH.ShadowStyle.x)` and `.shGlass(fill:edge:cornerRadius:blur:)`.
- **Composites use the parts, never private copies.** The profile card calls `ShButton`, `ShTag`,
  `ShActionIsland` and so on, so a change to a part reaches every screen.

### Many components at once (a family, e.g. everything inside a card)

1. **Find every set live.** Don't use a stored id list. Look for `COMPONENT_SET` and standalone `COMPONENT`
   named `sh-*`, not `sh-icon/*`, across all pages.
2. **Deep-read every part.** One `read_component_deep.js` call can take several set ids; keep each call
   under 30 s with `timeout: 30000`, and run calls one at a time.
3. **Write a contract.** List the API names per platform, enums in Figma variant order, and the callback
   names. Builders work in parallel against it, and the composite is written against it before the parts
   exist.
4. **Build leaves first, then composites**, grouped so each builder owns its dependencies. Then
   typecheck everything together. Finally re-run `tools/components.py` on the saved reads, so every
   blueprint's **Code** line lists its new files.

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
