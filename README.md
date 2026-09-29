# Shaadi DNA Foundation

Design tokens and rules for Shaadi.com. One source of truth for designers,
developers and AI agents.

**438 variables · 10 collections · v1.0**

## Start here

| If you are | Read | Then |
|---|---|---|
| Building UI | `FOUNDATION.md` | Use `dist/` for your platform |
| Changing tokens | `README.md` § Changing it | Export from Figma, run the tools |
| Setting up fonts | `fonts/README.md` | Install `LexendSH-VF.ttf` |
| Looking for what changed | `updates/` | Newest entry first |

## Layout

```
FOUNDATION.md     The rules. Read before building any UI.
tokens/           The values. One file per collection, every mode inside it.
fonts/            Lexend-SH VF + static fallbacks.
components/       Blueprints, one file per component. Button is done.
features/         Specs for the catalogue app and the demo app.
updates/          What changed and why, in plain language.
skills/           Claude Code workflows.
code-connect/     Figma Dev Mode: token code syntax now, components later.
tools/            The five scripts below.
dist/             Generated. Git-ignored.
  css · json · android · ios      platform files (tools/build.py)
  figma/variables/                importable Figma variable files (tools/export_figma.py)
  figma/code-syntax.json          Dev Mode names (tools/codesyntax.py)
```

## Using it

Generate the platform files first: `python3 tools/build.py`

**Web** — include `dist/css/tokens.css`:

```css
.card {
  background: var(--sh-background-default);
  color: var(--sh-text-primary);
  padding: var(--sh-space-padding-card);
  border-radius: var(--sh-radius-md);
}
```

Dark mode follows the system, or force it with `data-theme="dark"` on a parent.
Breakpoint values switch at 768px and 1024px.

**Android** — copy `dist/android/` into `app/src/main/res/`. Night colours and
sw600dp / sw840dp dimensions are already split out.

**iOS** — add `dist/ios/SHTokens.swift`: `SH.Color.backgroundDefault`,
`SH.Space.paddingCard`, `SH.Radius.md`.

**AI agents** — `FOUNDATION.md` for the rules, `dist/json/tokens.json` for
resolved values with descriptions.

**Figma** — `python3 tools/export_figma.py` writes `dist/figma/variables/`, one
nested file per collection per mode, in the exact shape Figma imports. Use it to
push the foundation into a new file, restore a collection, or hand the variables
to another team. It reproduces the original export byte for byte, variable IDs
and alias links included.

**Fonts** — see `fonts/README.md`. The primary font is `LexendSH-VF.ttf`
(family **Lexend-SH VF**), with static fallbacks in the **Lexend-SH** family.

## Changing it

Values change in Figma, never here.

```bash
python3 tools/import.py ~/Downloads/sh-color-common.zip   # shows the diff, asks first
python3 tools/check.py                                     # aliases, scopes, fonts, contrast
python3 tools/build.py                                     # regenerate dist/
python3 tools/new_update.py "Short title"                  # write the log entry
```

Commit the token file, the update entry, and any `FOUNDATION.md` change together.

## Tools

| Script | Does |
|---|---|
| `tools/import.py` | Merges a Figma export into `tokens/`, showing the diff first |
| `tools/check.py` | Aliases, descriptions, scopes, font files, 64 contrast pairings |
| `tools/build.py` | Generates `dist/` for web, Android and iOS |
| `tools/codesyntax.py` | Figma Dev Mode code syntax for every token |
| `tools/export_figma.py` | Writes the tokens back out as Figma variable files |
| `tools/new_update.py` | Starts an entry in `updates/` |

Python 3, standard library only. No package manager, no build system.

## Claude Code

```bash
mkdir -p .claude && ln -s ../skills .claude/skills
```

Then `/shaadi-dna-update` runs the import sequence and `/shaadi-code-connect`
handles Figma Dev Mode.

## Where this is going

1. **Foundation** — tokens. Done.
2. **Components** — blueprints in `components/`. Button done.
3. **Catalogue app** — every component and state, built from tokens. Anything
   that can't be built from tokens alone is a gap in the foundation.
4. **Demo app** — real features assembled from catalogue components.

## Licence

Internal to People Interactive. Lexend-SH is a derivative of Lexend under the
SIL Open Font License 1.1 — see `fonts/README.md`.
