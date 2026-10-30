# Refresh: semantic button Small 32, blueprints link their code

**2026-10-26**

## What changed

This is a second live read of the Figma file today (`/shaadi-dna-update`).

- **Variables and gradient styles:** no changes since this morning's refresh.
- **Components:** the same 119 sets.
  - Only `sh-semantic-button` changed. Size Small is now 32 tall with `sh-space/8` top and bottom padding, matching `sh-button` Small. That's all 72 Small variants. See "Small button 32" (2026-10-26).
- **Blueprints link their code:** 16 blueprints now have a **Code** line pointing to their new `web/`, `compose/` and `swiftui/` files. They include `sh-button`, `sh-tag`, `sh-overlay`, the profile-card parts and the others built today.
- **Components index:** now points to the icon code (`sh-icon/sh-icon.md`).
- **Icon pack:** no changes (400 icons).

## Why

To keep the repo the same as Figma after today's design and code work.

## Who needs to do something

- **Web / Android / iOS:** semantic buttons at Size Small are 32 tall now (was 28).

## Checks

- [x] `python3 tools/check.py` passes
- [x] `python3 tools/order.py --check`
- [x] `python3 tools/build.py` run
