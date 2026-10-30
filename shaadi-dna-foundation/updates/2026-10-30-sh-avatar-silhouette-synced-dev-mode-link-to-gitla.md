# sh-avatar-silhouette synced, Dev Mode link to GitLab

**2026-10-30**

## What changed
- sh-avatar-silhouette Female and Male: re-read from Figma and compared byte for byte with the repo's
  SVGs. Identical, so the art, blueprint and web code from the earlier "Softer no-photo silhouettes"
  update stand unchanged.
- Status: Draft → Synced in `components/status.json`.
- Figma Dev Mode: the set now has a Markdown Code Connect link to its blueprint on GitLab (it had none).

## Why
The designer asked to push both silhouettes. They were already in the repo; what was missing was the
status and the Dev Mode link.

## Who needs to do something
- **Designers:** nothing
- **Web / Android / iOS:** nothing. The Web Code Connect snippet isn't published to Dev Mode yet: it
  needs a Figma token in the Terminal (`npx figma connect publish`).

## Checks
- [x] `python3 tools/check.py` passes
- [x] `python3 tools/build.py` run
- [ ] FOUNDATION.md updated if a rule changed (no rule changed)
