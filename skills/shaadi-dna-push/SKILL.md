---
name: shaadi-dna-push
description: Use when the user wants the Shaadi DNA Foundation repo pushed — "/shaadi-dna-push", "push it", "push on DNA", "commit and push", "update the GitLab repo", "update Shaadi Vision", "update the GitHub repo", "is it on GitLab/GitHub". Checks the repo, makes sure every change has an update-log entry, commits, pushes main to GitLab (Shaadi Vision) and mirrors it to GitHub through the user's Terminal (keychain auth), and confirms what landed.
---

# Push the Shaadi DNA Foundation to GitLab (Shaadi Vision)

The repo is the single source of truth for tokens, blueprints, icons and component code, refreshed from Figma every time. Push each finished step promptly: partial component code is fine if the commit message says what's still in progress.

Remotes, branch `main` on both:

- `origin` — GitLab **Shaadi Vision**, `https://gitlab.com/shaadi/shaadi-app/ai/vision` (source of truth).
- `github` — `https://github.com/prashantshindeshaadi/shaadi-dna-foundation` (public mirror during the move; retired once GitLab is settled — then drop step 7's second push).

## Steps

1. **See what's there.**
   - `git status --short` and `git fetch origin github`.
   - If `origin/main` or `github/main` has commits you don't have, **stop**: tell the user and merge them first. Never force-push and never rewrite history.
2. **Check for another session.**
   - `ListAgents`: is another Claude session (e.g. "Shaadi DNA Plugin") **busy** in this repo?
   - If one is busy, files it touched in the last few minutes may be half-written. Leave those out of the commit and say which ones, unless the user says to include everything.
3. **Run the checks. If one fails, stop.**
   - `python3 tools/check.py`: must end "All checks passed" (warnings are fine; list them).
   - `python3 tools/order.py --check`.
   - `python3 tools/build.py` (`dist/` is git-ignored, but the build must still work).
   - If any component has `swiftui/` code, typecheck it all together, leaving out `*.figma.swift`:
     `xcrun --sdk iphonesimulator swiftc -typecheck -target arm64-apple-ios17.0-simulator dist/ios/SHTokens.swift dist/sh-typo-kit/developer/ios/ShTypography.swift $(find components -path '*/swiftui/*.swift' ! -name '*.figma.swift')`.
     Report errors. Don't push code that fails, unless the user accepts pushing it marked "in progress".
4. **Scan for stray files.**
   - Nothing that isn't source: `*.inlined.html`, screenshots outside `assets/`, `.DS_Store`, scratch files, files over 5 MB.
   - Never commit tokens, keys or credentials.
5. **Log entry.** Every change gets an entry in `updates/` (CLAUDE.md). If something changed since the last commit and no entry describes it, write one with `python3 tools/new_update.py "<title>"`, in plain language.
6. **Commit.**
   - Stage the chosen files.
   - Write a short subject, then a body listing what landed, taken from the new `updates/` entries, plus what's still in progress.
   - End with the attribution lines from the current system reminder, if one is given.
7. **Push through the Terminal panel.**
   - Run `mcp__terminal__run_in_terminal` with `git push origin main && git push github main`; reuse your own idle tab if you have one. GitLab first: it's the source of truth.
   - The user's macOS keychain handles login. Never ask for, type or paste a password or token. Never use a token in an API call.
   - Read the tab: success shows `<old>..<new>  main -> main` once per remote.
   - If GitLab worked but GitHub failed, GitLab still counts as pushed; report the GitHub failure.
   - If the push is rejected (remote ahead, auth), report it exactly and stop.
8. **Report.** Give the commit hash, the GitLab range (and GitHub mirror), what landed (short table), what was left out and why, and any check warnings. Link the terminal tab.

## Don'ts

- Don't push to any branch other than `main`, and don't change the remotes.
- Don't edit `tokens/` or `dist/` by hand to make a check pass. Fix the source (Figma, then `/shaadi-dna-update`).
- Don't publish the Figma library or Code Connect from here; those are separate (`/shaadi-code-connect`).
