# Six component stages, shown as a stepper

**2026-10-30**

## What changed
- Component status now has six stages instead of four:
  1. **Draft:** being designed in Figma.
  2. **Synced:** pulled from Figma into the repo, blueprint and web code.
  3. **Handed to dev:** sent to the developers' repo as a merge request.
  4. **In development:** a developer is building it.
  5. **In review:** the designer checks the developer's version.
  6. **Final:** released and Figma aligned.
- Ids in `components/status.json`: `draft`, `synced`, `handed-off`, `in-development`, `in-review`, `core`. Defaults: Core page = Synced (71), migration pages = Draft (59).
- Vision App:
  - every component page has a "Where it is" stepper, built from sh-stepper;
  - badges are coloured by phase (design, repo, dev, final);
  - status filters and the Home counts cover all six.
- `FOUNDATION.md` §8 and `/shaadi-dna-sync` use the new stages.

## Why
Everyone can see exactly where a component is, from the first Figma pull to the final released version.

## Who needs to do something
- **Developers:** move a component to `in-development` when you start, and to `in-review` when it's ready for design review. `core` comes only after the release and the Figma alignment.

## Checks
- [x] `python3 tools/check.py` passes
- [x] Checked in the browser
- [x] FOUNDATION.md updated (§8)
