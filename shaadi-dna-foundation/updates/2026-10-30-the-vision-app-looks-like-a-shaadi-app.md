# The Vision App looks like a Shaadi app

**2026-10-30**

## What changed
- New top bar: glass (sh-translucent tokens with blur) with four DNA tabs: Home, Catalog, Components, Stories, and an Auto / Light / Dark switch.
- **Home** is the whole foundation on one page: colours, gradients, text styles, spacing, radius, stroke, opacity, shadows and icons, with a sticky glass chip strip to jump between them.
- **Catalog** is the Core components. **Components** is everything else: full profile view, profile card, account and utility.
- **Stories** lists one card per Jira story. Opening one shows the story header (ID, status, title, summary, counts), its decisions, its phone screens and the components it uses.
- The app's own controls are DNA components: sh-tab-group, sh-segmented-control, sh-chip, sh-search, sh-card and sh-button.
- "Shaadi Vision" no longer shows anywhere in the app. The bar reads "Shaadi DNA" until the Shaadi logo artwork is exported from Figma.

## Why
The app should look and work like a Shaadi app, built from the system it shows.

## Who needs to do something
- **Designers:** nothing; open the app and check. Text on the glass bar is a §10 open decision ("text on glass"); the bar uses the strongest glass level to keep it readable.

## Checks
- [x] Checked in the browser: Light and Dark, phone width, no console errors
