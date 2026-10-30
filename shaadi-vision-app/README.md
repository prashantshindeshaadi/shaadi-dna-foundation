# Shaadi Vision App (web)

Catalog + Stories for the Shaadi DNA Foundation. It holds no tokens or component code:
everything comes from `../shaadi-dna-foundation/`, so what you see here is what the repo ships.

It looks like a Shaadi app: a glass top bar (sh-translucent tokens + blur) with DNA tabs, and every
control on the page is a DNA component (sh-tab-group, sh-segmented-control, sh-chip, sh-search, sh-card,
sh-button). "Shaadi Vision" is only our internal name; the app shows "Shaadi DNA".

| Tab | Shows | Source |
|---|---|---|
| Home | The whole foundation: colours (Light + Dark), gradients, text styles, spacing, radius, stroke, opacity, shadows, icons, plus component counts by status | `dist/json/tokens.json`, `dist/css/tokens.css`, the sh-typo kit, `icons/` |
| Catalog | The Core components: status, platforms with code, Figma and GitLab links, live web build | `dist/vision/catalog.json` (`tools/vision.py`), `components/*/web/` |
| Components | Everything else (full profile view, profile card, account, utility), same layout | same |
| Stories | One card per Jira story; open one for its header, decisions, phone screens and the components it uses | `stories.json` |

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
