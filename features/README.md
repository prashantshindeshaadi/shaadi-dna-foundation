# Features

Feature-level specs for the catalogue app and the demo app that follows it.

A feature is a real piece of the product built from components: profile card,
match list, onboarding step, premium upsell. Each file records the screens, the
components used, the states, and anything the feature needs that the system
doesn't cover yet.

That last part matters most. Features are where gaps in the foundation surface,
and this folder is where they get recorded instead of being worked around.

## Order of work

1. Foundation — tokens. Done.
2. Components — blueprints in `../components/`. Button done, the rest pending.
3. Catalogue app — every component and every state, rendered from the tokens.
   This is the proving ground: if a component can't be built from tokens alone,
   the foundation has a gap.
4. Demo app — real features assembled from catalogue components.

## Status

Nothing specified yet. Start after the core components are blueprinted.
