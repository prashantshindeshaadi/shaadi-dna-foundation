---
name: shaadi-dna-update
description: Use when the user has a new Figma variables export to bring into the Shaadi DNA Foundation repo, or says "/shaadi-dna-update", "update the foundation", "I changed tokens in Figma", "import this collection", or drops a sh-*.zip export. Imports the export, reports what changed, runs the checks, rebuilds dist, and writes the update-log entry.
---

# Updating the Shaadi DNA Foundation

The Figma file is the source of truth. This repo mirrors it. Never edit values in
`tokens/*.json` by hand — change them in Figma, export, and import.

## Steps

### 1. Import

```bash
python3 tools/import.py <path to the export>
```

Works with a single collection zip, a folder of mode files, or a whole-foundation
zip. It prints every change before writing anything, then asks to confirm.

Read that output carefully. It is the basis for the update-log entry, and it is
the only place an unintended change will show up.

### 1b. Colour styles (when `sh-gradient/*` changed)

Variable exports don't include styles. Run `tools/read_styles.js` through the
Figma MCP (`figma_execute`) in the Shaadi DNA file, save the returned JSON, then
`python3 tools/import.py <that file>`.

### 2. Check

```bash
python3 tools/check.py
```

Verifies that every alias resolves, every token has a description, no token is
on `ALL_SCOPES`, every `sh-gradient` stop is a real token, and all approved colour
pairings still meet WCAG AA.

**If contrast fails, stop.** Don't build, don't commit. Take the failing pair
back to Figma. A failing pair means a real screen is now hard to read.

### 3. Rebuild

```bash
python3 tools/build.py
```

Regenerates `dist/` for web, Android and iOS. `dist/` is git-ignored — it is
derived, never a second copy of the data.

### 3b. Regenerate the Figma variable files (only if asked)

```bash
python3 tools/export_figma.py
```

Writes `dist/figma/variables/` in the shape Figma imports. Needed only when
pushing the foundation into another Figma file or restoring a collection — not
part of a routine update, since Figma is already the source.

### 4. Write the update log

```bash
python3 tools/new_update.py "Short title"
```

Fill in the entry:

- **What changed** — plain language, one line per change, naming the tokens.
  "Selected borders are softer (`border/selected` brand/400 → brand/300)", not
  "updated border tokens".
- **Why** — the reason, not the mechanics. Someone reading it in six months
  should understand the decision.
- **Who needs to do something** — per audience. Most updates need nothing from
  anyone, and saying so is useful.

Write for a colleague who wasn't in the room. No jargon, no token-speak in the
summary line.

### 5. Update FOUNDATION.md if a rule changed

Token values live in `tokens/`. FOUNDATION.md holds the rules. Update it when:

- a pairing becomes valid or invalid (§ Colour rules)
- a token's intended use changes (§ Collections)
- a component blueprint changes (§ Components)
- a new constraint appears (§ Accessibility)

Don't copy token values into FOUNDATION.md. They go stale, and `tokens/` is
already the answer.

### 6. Commit

One commit: the token files, the update-log entry, and any FOUNDATION.md change
together. Message: the update title.

## Rules

- Never hand-edit `tokens/*.json` or anything in `dist/`.
- Never add a token that only exists here and not in Figma.
- Never skip the check step, even for a one-value change. Contrast failures come
  from single-value changes more often than from large ones.
- If the import reports a removed token, confirm with the user that the removal
  was intentional before writing. Removals break bindings downstream.
- If a collection is new, say so explicitly in the update entry — consumers need
  to know a new namespace exists.

## When someone asks what changed

Read `updates/README.md` for the list, then the specific entry. Don't diff the
JSON to answer a question the log already covers.
