# Code Connect

Maps Figma components to the real code components, so Dev Mode shows your JSX
instead of generated markup.

**Not active yet.** Code Connect needs code components to point at, and those
arrive with the catalogue app. The order is: blueprint in `../components/` →
build it in the catalogue app → connect it here.

## Two layers, don't confuse them

| Layer | What it does | Status |
|---|---|---|
| **Variable code syntax** | Dev Mode shows `var(--sh-text-primary)` next to a token instead of a hex | Ready — run `tools/codesyntax.py` |
| **Code Connect** | Dev Mode shows `<Button variant="primary" />` for a component | Waiting on the catalogue app |

## Applying variable code syntax now

```bash
python3 tools/codesyntax.py --plugin
```

Writes `dist/figma/code-syntax.json` (336 tokens, every platform name) and
`dist/figma/apply-code-syntax.js`, which sets all of them in one pass. Run the
script through the Figma MCP or a plugin console. Names come from the same
function the build uses, so Dev Mode and `dist/` can't disagree.

Re-run it after any import that adds or renames tokens.

## Connecting components later

One `.figma.tsx` per component, next to this file. `button.figma.tsx` is a
template — replace the import and the Figma node URL when the component exists.

```bash
npx figma connect publish --token $FIGMA_TOKEN
```

Rules when you get there:

- Map props to Figma component properties, never to layer names. Layer names
  change; properties are the contract.
- One file per component, named after the component.
- Publish from CI on merge, not from someone's laptop.
- If a blueprint in `../components/` and the connected code disagree, the
  blueprint is wrong — fix it and log the change in `../updates/`.
