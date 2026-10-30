---
name: shaadi-dna-sync
description: The one skill that syncs Shaadi DNA end to end, by default everything in one go — Figma tokens and components into the repo, web code and Code Connect, checks, update log, commit and push to GitLab, publish to Figma Dev Mode, refresh and open the Shaadi Vision App preview, and hand off to the developers' repo. Use for "/shaadi-dna-sync", "sync this component", "push the selected component", "push all components", "update the foundation", "I changed tokens in Figma", "import this collection", a dropped sh-*.zip export, "add / update the code for <component>", "code connect", "publish code connect", "set code syntax", "Dev Mode shows hex instead of tokens", "push it", "push on DNA", "commit and push", "update the GitLab repo", "is it on GitLab". Replaces /shaadi-dna-update, /shaadi-dna-push and /shaadi-code-connect.
---

# Shaadi DNA sync

The repo (GitLab, Shaadi Vision) has two folders: `shaadi-dna-foundation/` (the design system) and
`shaadi-vision-app/` (Catalog + Stories). Every path and command below is relative to
`shaadi-dna-foundation/`: `cd` there first.

**Figma is the source of truth for design. This repo mirrors it.** Never edit `tokens/*.json`,
`dist/` or a generated blueprint by hand: change Figma, then sync.

The flow this skill runs:

```
Figma (Shaadi DNA file) ──read──▶ tokens/ + components/ (blueprint, web code, Code Connect)
        ▲                                   │ check → log → commit → push (GitLab)
        └──────── Dev Mode ◀── publish Code Connect (Markdown + Web labels)
```

## 0. Default: sync everything, ask nothing

The designer calls this skill and expects everything to be in place afterwards. They should never
have to say where something goes. **Unless the request names one job, run every section in order,
1 → 9**, skipping only what has nothing to do:

| # | Section | Skipped when |
|---|---|---|
| 1 | Tokens | the live read shows no variable or style change |
| 2 | Components | nothing selected and no blueprint changed |
| 3 | Code syntax | no token was added or renamed |
| 4–6 | Check, log, commit + push to GitLab | never (stop if a check fails) |
| 7 | Publish Code Connect | nothing to publish |
| 8 | Vision App preview | never |
| 9 | Hand off to developers | the developers' repo isn't connected yet (report it) |

Only stop to ask when the rules say so: a removed token, a failing check, a design decision.

**Which components.**
- **Selected in Figma:** `figma_get_selection` through the figma-console bridge, then walk each node
  up to its `COMPONENT_SET` (or standalone `COMPONENT`) named `sh-*`.
- **Named by the user:** find them by name.
- **Nothing selected:** read every `sh-*` set and standalone component live, across all pages
  (not `sh-icon/*`; never a stored id list). Regenerate the blueprints, then build code only for
  components whose blueprint changed (`git diff --stat components/`) or that have no `web/` yet.

One job only, when the request names it: "import this export" = 1; "set code syntax" = 3;
"push it" = 4–6; "publish code connect" = 7.

---

## 1. Tokens

1. **Import.** `python3 tools/import.py <export>`: a collection zip, a folder of mode files, or a
   whole-foundation zip. It prints every change, then asks to confirm. Read that output: it is the
   basis of the log entry and the only place an unintended change shows up.
   - No export? Run `tools/read_variables.js` through the Figma MCP (`figma_execute`), save the
     result, pass that file to `import.py`.
   - `sh-gradient/*` changed? Variable exports don't include styles: run `tools/read_styles.js`,
     save, `import.py` it.
   - A **removed** token: confirm with the user before writing. Removals break bindings downstream.
2. **Order.** `python3 tools/order.py` slots new tokens into hierarchy order (low → high, light →
   strong). Order only.
3. Re-run **Code syntax** (section 3) when tokens were added or renamed.

## 2. Components

Each component lives in one folder; nothing about it is kept anywhere else:

```
components/<group>/<sh-name>/   (<group> only for migration pages, e.g. fpv/, profile-card/)
  <sh-name>.md    blueprint, generated from Figma by tools/components.py
  web/            <sh-name>.css · <sh-name>.html (every variant) · <sh-name>.figma.ts (Code Connect)
  compose/        drafts: Sh<Name>.kt · Sh<Name>.figma.kt
  swiftui/        drafts: Sh<Name>.swift · Sh<Name>.figma.swift
```

Platforms are Web (HTML/CSS), Jetpack Compose and SwiftUI only. No XML views, no UIKit.

1. **Logic in Figma first.** The set and every variant carry a description: name line, `Purpose:`,
   `Built from:`, `Switches:`, `Rules:`, `Taps:`; each variant starts with `When: …`. It is the
   behaviour spec: write it in Figma, never only in code. Save a Figma version before any write, ask
   before changing a design decision, fix only plain mistakes (e.g. a binding to another library →
   the DNA token of the same name; text needs `setRangeBoundVariable`).
2. **Read Figma.** `tools/read_components.js` with `SETS` = the set ids, and `tools/read_icons.js`
   when icons changed. For code work also `tools/read_component_deep.js` (it looks inside nested
   instances) → `python3 tools/deep_lines.py <file>`. Keep each call under 30 s
   (`timeout: 30000`), one at a time.
3. **Blueprints.** `python3 tools/components.py <reads…>` rewrites the blueprints, the index and the
   icon files (`components/sh-button/sh-button.md` is hand-written and kept). One component only:
   call `blueprint()` from `tools/components.py` instead of rebuilding the index. Remove folders of
   components that no longer exist in Figma.
4. **Web code + Code Connect**, exactly as `components/WEB.md` says: tokens only (`var(--sh-*)`),
   every variant and state, tap area 48, composites use their parts' classes, a v2 template whose
   first lines are `// url=<Figma link>` and `// component=<sh-name>`.
5. **Compose / SwiftUI drafts** (when asked): one shared model on every platform (a `type` enum per
   variant, the content data, the Figma booleans, one callback per tap). Tokens only: Compose
   `colorResource` / `dimensionResource` / `ResourcesCompat.getFloat`, gradients as a `Brush`;
   SwiftUI `SH.*` and `.shTextStyle`. Generated helpers: `ShGradient.<name>()`, `Modifier.shGlass`,
   `Modifier.shShadow`, `shOpacity(id)`, `shType()` (Android); `.shShadow`, `.shGlass` (iOS).
   Images the code needs go in the component's `assets/`, exported from Figma (SVG + @3x PNG).
6. **Status.** A component synced here as Ready for dev is `proposed` in `components/status.json`
   (Core-page components are proposed by default). Developers move it to `in-refinement` and `core`
   (FOUNDATION.md §8). Never mark something `core` yourself.

**Many at once:** build leaves first, then composites, grouped so each builder owns its parts. Write
the class/API contract first when builders run in parallel. Afterwards re-run `tools/components.py`
on the saved reads so every blueprint's **Code** line lists its new files.

## 3. Code syntax (tokens in Dev Mode)

`python3 tools/codesyntax.py --plugin` writes `dist/figma/code-syntax.json` and
`dist/figma/apply-code-syntax.js`. Apply the script through the Figma MCP (`use_figma`). Report how
many variables were set and every unmapped one: unmapped means Figma has a variable `tokens/` doesn't,
a real drift signal. Names come from `var_name()` in `tools/lib.py`; fix a wrong name there and
regenerate, never hand-type code syntax in Figma. `sh-color-basic` has no code name on purpose.
`python3 tools/export_figma.py` (Figma-importable variable files) only when asked.

## 4. Check. If one fails, stop

```bash
python3 tools/check.py                 # aliases, descriptions, scopes, fonts, contrast. Must end "All checks passed"
python3 tools/order.py --check
python3 tools/build.py                 # regenerates dist/ and the Vision App catalog
python3 tools/web_check.py --all       # every web/ folder: structure, tokens only, Code Connect header
npx figma connect parse > /dev/null    # every Code Connect template reads
```

- **Contrast fails: stop.** Don't build or commit; take the pair back to Figma.
- Web: `python3 tools/web_preview.py <web/*.html> <png>` and compare with Figma, variant by variant.
- SwiftUI, if any changed: `xcrun --sdk iphonesimulator swiftc -typecheck -target
  arm64-apple-ios17.0-simulator dist/ios/SHTokens.swift dist/sh-typo-kit/developer/ios/ShTypography.swift
  $(find components -path '*/swiftui/*.swift' ! -name '*.figma.swift')`. Compose: say you couldn't compile it.
- Stray files: no `*.inlined.html`, screenshots outside `assets/`, `.DS_Store`, scratch, files over
  5 MB, and never tokens, keys or credentials.

## 5. Log

`python3 tools/new_update.py "Short title"`, then fill it in plain language for a colleague who
wasn't there: **What changed** (one line each, naming tokens/components), **Why** (the reason),
**Who needs to do something** (per audience; "nothing" is useful). Update `FOUNDATION.md` only when a
rule changed (a pairing, a token's intended use, a blueprint rule, an accessibility constraint),
never with values.

## 6. Commit and push (GitLab)

1. `git status --short` and `git fetch origin`. If `origin/main` is ahead, **stop** and merge first.
   Never force-push, never rewrite history.
2. Another Claude session busy in this repo (`ListAgents`)? Leave out files it touched in the last few
   minutes, and say which, unless the user says to include everything.
3. One commit: the change, its `updates/` entry and any FOUNDATION.md change. Subject = the update
   title; body = what landed and what's still in progress (partial code is fine if it says so); end
   with the attribution lines from the current system reminder.
4. Push through the user's Terminal panel (`mcp__terminal__run_in_terminal`, reuse your idle tab):
   `git push origin main`. Keychain handles login: never ask for, type or paste a password or token.
   Success shows `<old>..<new>  main -> main`; report a rejection exactly and stop.
5. Remotes: `origin` = GitLab `gitlab.com/shaadi/shaadi-app/ai/vision` (source of truth);
   `github` = old mirror. **Don't push to `github`** unless the user asks: its Figma links are
   being retired.

## 7. Publish Code Connect

Two labels come from this repo; Compose and SwiftUI come from the developers' repo once a component is
refined there. **One label, one repo**: never publish the same label from both, or they overwrite
each other.

- **Web** (the `web/*.figma.ts` templates), in the Terminal panel:
  `npx figma connect publish` (`npm install` once; needs `FIGMA_ACCESS_TOKEN` in the user's shell; on
  "Couldn't find a Figma access token" ask the user to set it, never handle it yourself).
  `--dry-run` first lists what would publish.
- **Markdown** (the blueprint link), for every component, with the Figma MCP:
  `add_code_connect_map(fileKey, nodeId = <set id>, label = "Markdown", componentName = "<sh-name>",
  source = "https://gitlab.com/shaadi/shaadi-app/ai/vision/-/blob/main/shaadi-dna-foundation/components/<path>/<sh-name>.md")`.
  Links made before 2026-10-30 point to GitHub; re-map them to this GitLab form.
- Map Figma **properties**, never layer names; cover every variant. A half-mapped component is worse
  than none, because it looks authoritative.
- When code and blueprint disagree: the blueprint wins unless it's stale. Decide with the user, fix
  one, record it in `updates/`.

## 8. Vision App preview

`tools/build.py` (section 4) already refreshed `dist/vision/catalog.json`, so the Shaadi Vision App
shows the new code and status. Open it in the browser pane (`preview_start` with `dna-static`, which
serves the repo root) at `/shaadi-vision-app/#/catalog/components/<sh-name>` for each synced
component (several: the Components page). Check the live web build renders with no console errors,
in Light and Dark, and give the designer the link. If a Jira story uses the component, also open
`#/stories/<JIRA-ID>`.

## 9. Hand off to developers

Once a component is `proposed` and its code is on GitLab, the developers refine it in **their**
Shaadi DNA repo (FOUNDATION.md §8):

1. Open a merge request in the developers' repo with the token files from `dist/` and the
   component's blueprint and draft code, titled `<sh-name>: proposed from Shaadi DNA`.
2. Link the merge request in `components/status.json` (`mr`), leaving the status `proposed` until a
   developer starts (`in-refinement`).
3. Never merge it, and never mark a component `core`: developers do both after review.

**Not connected yet.** The developers' repo isn't set up for this (the DS team has to agree: MG-1034
P3). Until it is, skip this section, and say in the report which components are waiting for
handoff. When it's connected, its clone URL and target branch go here.

## Reporting back

- Which jobs ran, and for which components.
- The commit hash and GitLab range, and a short table of what landed.
- Check warnings, plus every missing token, blueprint gap or Figma inconsistency found but not changed.
- What was left out and why.

Never claim Dev Mode is updated until the publish or script actually ran.
When asked "what changed?", read `updates/README.md` and the entry; don't diff JSON.
