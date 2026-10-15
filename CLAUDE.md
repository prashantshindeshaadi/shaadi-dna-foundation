# Notes for AI agents

- Building or reviewing UI: follow `FOUNDATION.md`, and report against its §9
  self-check.
- Token values: `tokens/*.json` (source) or `dist/json/tokens.json` (resolved,
  after `python3 tools/build.py`). Never copy values into docs.
- Never edit `tokens/` or `dist/` by hand. Values change in Figma, then
  `/shaadi-dna-update`.
- No token fits? Stop and ask. Unspecified component? Build from the rules and
  flag it.
- Every change gets an entry in `updates/`.
