# Shaadi Vision

One repo for Shaadi's design system and the app that shows it.

| Folder | What it is |
|---|---|
| [`shaadi-dna-foundation/`](shaadi-dna-foundation/README.md) | **Shaadi DNA Foundation**, the design system: tokens, component blueprints and code (web, Compose, SwiftUI), icons, fonts, tools, skills, update log. Synced from the Shaadi DNA Figma file. |
| [`shaadi-vision-app/`](shaadi-vision-app/README.md) | **Shaadi Vision App**: Catalog (tokens, icons, every `sh-*` component) and Stories (screens per Jira story), built only from the foundation. It proves that what's in Figma is in the repo and looks right. |

The flow: Figma → `shaadi-dna-foundation/` → `shaadi-vision-app/`.

## Run the Vision App

```bash
python3 shaadi-dna-foundation/tools/build.py
python3 -m http.server 8765
```

Then open http://localhost:8765/shaadi-vision-app/.
