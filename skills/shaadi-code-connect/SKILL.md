---
name: shaadi-code-connect
description: Use when connecting the Shaadi DNA Foundation to Figma Dev Mode — setting variable code syntax so tokens show as var(--sh-...), or writing and publishing Figma Code Connect files for components. Triggers on "/shaadi-code-connect", "code connect", "set code syntax", "Dev Mode shows hex instead of tokens", "connect the button component to Figma", or a new component becoming ready to connect.
---

# Connecting Shaadi DNA Foundation to Figma Dev Mode

Two separate layers. Work out which one is being asked for before doing anything.

| Layer | Question it answers | Needs |
|---|---|---|
| **Variable code syntax** | "What do I write instead of `#0F172A`?" | Only tokens. Ready now |
| **Code Connect** | "What do I write instead of this frame?" | Real code components |

---

## Layer 1 — Variable code syntax

Sets the WEB, ANDROID and iOS name Dev Mode shows next to each variable.

### Steps

```bash
python3 tools/codesyntax.py --plugin
```

Writes two files:

- `dist/figma/code-syntax.json` — every token's three platform names
- `dist/figma/apply-code-syntax.js` — a script that applies all of them

Apply it through the Figma MCP (`use_figma`) or a plugin console. Figma has no
import UI for code syntax, so a script is the only practical route for 336
tokens.

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

## Layer 2 — Code Connect for components

Maps a Figma component to the real code component, so Dev Mode shows the
component's own JSX.

### Before starting, check all three exist

1. A blueprint in `components/<name>.md`
2. A built component in the catalogue app
3. A published Figma component with proper component **properties**

If any is missing, say so and stop. Connecting a component that isn't
blueprinted bakes in whatever was built, which is how an accidental standard
becomes the standard.

### Steps

1. Copy `code-connect/button.figma.tsx` as the pattern.
2. One file per component, `<name>.figma.tsx`, in `code-connect/`.
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
