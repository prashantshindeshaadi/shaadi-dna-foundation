# Repo moves to GitLab Shaadi Vision; GitHub becomes a mirror

**2026-10-30**

## What changed
- The foundation now lives on GitLab: https://gitlab.com/shaadi/shaadi-app/ai/vision (remote `origin`). This is the source of truth from today.
- GitHub (`prashantshindeshaadi/shaadi-dna-foundation`, remote `github`) stays as a mirror and gets every push until we retire it.
- Full history moved across. GitLab's starter README was merged in (no force-push); our README is kept.
- `/shaadi-dna-push` pushes GitLab first, then GitHub.
- `/shaadi-code-connect` now links new blueprints to GitLab. Links published earlier still point to GitHub.

## Why
One home for the design system inside the Shaadi GitLab, next to the app code. GitHub stays live during the move so nothing breaks.

## Who needs to do something
- **Designers:** nothing yet. Before GitHub is retired, Code Connect links in Figma must be re-mapped to GitLab.
- **Web / Android / iOS:** clone or pull from GitLab from now on: `git clone https://gitlab.com/shaadi/shaadi-app/ai/vision.git`.

## Checks
- [x] `python3 tools/check.py` passes
- [x] `python3 tools/build.py` run
- [ ] FOUNDATION.md updated if a rule changed (no rule changed)
