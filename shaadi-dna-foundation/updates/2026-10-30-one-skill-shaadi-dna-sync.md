# One skill: /shaadi-dna-sync

**2026-10-30**

## What changed
- `/shaadi-dna-update`, `/shaadi-dna-push` and `/shaadi-code-connect` are merged into one skill, `/shaadi-dna-sync`, and the three old ones are removed.
- By default it syncs everything in one go: Figma tokens and components (the selection, or everything that changed) → blueprints, web code and Code Connect → checks → update log → commit and push to GitLab → publish to Figma Dev Mode → refresh and open the Shaadi Vision App preview → hand off to the developers' repo.
- It only stops to ask on a removed token, a failing check or a design decision. One job on its own still works: "import this export", "set code syntax", "push it", "publish code connect".
- The developer handoff step is written but switched off until the developers' Shaadi DNA repo is connected (MG-1034, P3); until then the report lists what's waiting.
- It pushes to GitLab only; the GitHub mirror is no longer pushed.

## Why
One call, and everything lands where it belongs: the designer doesn't have to know which step or which repo.

## Who needs to do something
- **Designers:** use `/shaadi-dna-sync`, with components selected in Figma or nothing selected for everything.
- **Everyone else:** nothing.

## Checks
- [x] `python3 tools/check.py` passes
- [ ] FOUNDATION.md updated if a rule changed (no rule changed)
