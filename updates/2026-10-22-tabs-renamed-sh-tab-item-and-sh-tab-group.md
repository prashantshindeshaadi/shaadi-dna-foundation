# Tabs renamed: sh-tab-item and sh-tab-group

**2026-10-22**

## What changed

- **`sh-tab` → `sh-tab-item`:** one tab (Style Underline / Segmented / Vertical, Selected, count, dot).
- **`sh-tabs` → `sh-tab-group`:** the ready row or column of tab items (Orientation Horizontal / Vertical).
- Node ids, variants, properties and all instances are unchanged; only the names, descriptions and canvas labels changed. The 80 tab-item and 3 tab-group instances keep their link.
- The `sh-segmented-control` description now names `sh-tab-item`.
- Blueprint folders moved: `components/sh-tab-item/sh-tab-item.md` and `components/sh-tab-group/sh-tab-group.md`. The index in `components/README.md` is updated.
- "Tab bar" was not used: on iOS it means the bottom navigation, which is a different component.

## Why

`sh-tab` and `sh-tabs` differed by one letter, so they were easy to mix up. The new names say which one is a single tab and which one is the group.

## Who needs to do something

- **Designers:** nothing. Search for "tab item" or "tab group" in Assets.
- **Developers:** two components, both kept. `sh-tab-group` maps to the tabs container and `sh-tab-item` maps to its child tab. When Code Connect files are written, name them `sh-tab-item.figma.*` and `sh-tab-group.figma.*`.
- **Code Connect:** links point to node ids, so they survive the rename. Re-point each Markdown link's source URL to the new blueprint path.

## Checks

- [x] Both sets renamed in Figma; 0 old names left on component descriptions or layers
- [x] Blueprints and the components index use the new names
- [ ] Code Connect Markdown links re-pointed to the new paths
