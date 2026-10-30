# The Vision App gets a live link (GitLab Pages)

**2026-10-30**

## What changed
- New `.gitlab-ci.yml` at the repo root:
  - **Every push:** the foundation checks run (`check.py`, `build.py`), and `web_check.py` reports known gaps as a warning that doesn't block anything.
  - **Every push to `main`:** the Vision App is rebuilt and published with GitLab Pages, so its link always shows the latest components, their web builds and their stages.

## Why
The app is what we show the design VP, the CEO and others: "this is the process, this is how each component looks right now". It has to be current without anyone remembering to update it.

## Who needs to do something
- **Prashant:** once, in GitLab, open Deploy → Pages to find the link, and choose who can open it (project members only, or everyone with the link).
- **Everyone else:** open the link. It updates by itself after every sync.

## Checks
- [x] The CI steps were run on a clean copy of the repo; the built site serves every file the app needs
