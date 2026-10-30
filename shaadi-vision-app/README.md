# Shaadi Vision App (web)

A phone-sized Shaadi app built only from Shaadi DNA components: full screen on a phone, a centred phone on a
desktop. It holds no tokens or component code: styles come from `../shaadi-dna-foundation/` (every component
stylesheet, via `dist/vision/components.css`), so what you see is what the repo ships. "Shaadi Vision" is only our
internal name; the app shows "Shaadi".

| Tab (sh-navigation-bar) | Shows | Source |
|---|---|---|
| Home | The My Shaadi screen (Figma "Account — Premium") | `screens/home.html` |
| Matches | Matches — Near Me | `screens/matches.html` |
| Catalog | Core components (stage, icon, purpose → detail with stage stepper and live build) and the Foundation (tokens, type, icons) | `dist/vision/catalog.json`, `dist/json/tokens.json` |
| Components | Every other component, and the Jira stories with their screens | `dist/vision/catalog.json`, `stories.json` |
| Premium | Premium plans | `screens/premium.html` |

The shared link (GitLab Pages) rebuilds on every push to `main`.

## Run

From the repo root:

```bash
python3 shaadi-dna-foundation/tools/build.py
python3 -m http.server 8765
```

Open http://localhost:8765/shaadi-vision-app/. Theme: System / Light / Dark, top right.

## Add a story

Add an entry to `stories.json`: `id` (the Jira ID), `title`, `status`, `summary`, optional
`decisions`, and `screens`. Each screen is a list of blocks:

- `{ "from": "<web demo page under shaadi-dna-foundation/>", "pick": "<CSS selector>", "count": 1, "skip": 0 }`
  takes that component's markup and stylesheets from its web demo.
- `{ "html": "<h1 class=\"sh-heading-md\">Title</h1>" }` adds layout markup. DNA classes only.

A component needs web code before a story can use it. A block that matches nothing shows a
"Missing" line in the screen instead of failing silently.
