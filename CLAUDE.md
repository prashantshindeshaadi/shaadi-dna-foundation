# Notes for AI agents

The repo has two folders:

- `shaadi-dna-foundation/` — the design system (Shaadi DNA Foundation): tokens,
  component blueprints and code, icons, fonts, tools, skills, update log.
- `shaadi-vision-app/` — the Shaadi Vision App: Catalog + Stories, built only
  from the foundation. It holds no tokens or component code of its own.

Paths below are relative to `shaadi-dna-foundation/`; run its tools from there.

- Building or reviewing UI: follow `FOUNDATION.md`, and report against its §9
  self-check.
- Token values: `tokens/*.json` (source) or `dist/json/tokens.json` (resolved,
  after `python3 tools/build.py`). Never copy values into docs.
- Never edit `tokens/` or `dist/` by hand. Values change in Figma, then
  `/shaadi-dna-sync`.
- A Figma component's blueprint is `components/<sh-name>/<sh-name>.md` (Code
  Connect links point there). Read it before building that component.
- No token fits? Stop and ask. Unspecified component? Build from the rules and
  flag it.
- Every change gets an entry in `updates/`, the Vision App's too.
