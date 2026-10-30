# Repo split into Shaadi DNA Foundation and Shaadi Vision App

**2026-10-30**

## What changed
- The repo now has two folders. `shaadi-dna-foundation/` holds the design system exactly as before: tokens, components, icons, fonts, tools, skills and this update log. `shaadi-vision-app/` is new.
- Shaadi Vision App (web): a Catalog of every token (colours Light + Dark, gradients, text styles, spacing, radius, stroke, opacity, shadows), the whole icon pack, and all 130 `sh-*` components, each with its purpose, variant count, platforms that have code, Figma and GitLab links, and its live web build where one exists (20 today).
- Stories: phone screens per Jira story, put together live from the components' web code. MG-1034 (Vision pipeline) has three: Matches, Requests and Privacy states, all from `sh-profile-card`.
- `tools/vision.py` (run by `tools/build.py`) writes `dist/vision/catalog.json`, the app's list of components and icons.
- Skills, `CLAUDE.md`, the root README and the GitHub CI now point at the new folder. New Code Connect links use `.../blob/main/shaadi-dna-foundation/components/...`.

## Why
The design system and the app that proves it get one home each. The app holds no tokens or component code, so it can only show what the foundation really ships (DL-7).

## Who needs to do something
- **Designers:** run the app: from the repo root, `python3 shaadi-dna-foundation/tools/build.py`, then `python3 -m http.server 8765`, and open http://localhost:8765/shaadi-vision-app/.
- **Everyone:** run the foundation's tools from `shaadi-dna-foundation/` from now on.
- **Code Connect:** links already published in Figma point to the old paths on GitHub. Re-map them before the GitHub mirror gets this change.

## Checks
- [x] `python3 tools/check.py` passes
- [x] `python3 tools/build.py` run
- [ ] FOUNDATION.md updated if a rule changed (no rule changed)
